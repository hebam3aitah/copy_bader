// app/api/admin/convert-to-project/route.js
import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';
import Project from '@/models/Project';
import Notification from '@/models/Notification';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();
    const { issueId } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
      return NextResponse.json({ error: 'معرف البلاغ غير صالح' }, { status: 400 });
    }

    const issue = await Issue.findById(issueId).populate('category');
    if (!issue) {
      return NextResponse.json({ error: 'البلاغ غير موجود' }, { status: 404 });
    }

    if (issue.status === 'converted-to-project') {
      return NextResponse.json({ error: 'تم تحويل البلاغ سابقًا إلى مشروع' }, { status: 400 });
    }

    if (!issue.category) {
      return NextResponse.json({ error: 'البلاغ لا يحتوي على تصنيف (category)' }, { status: 400 });
    }

    const project = await Project.create({
      title: issue.problemType || 'مشروع بدون اسم',
      description: issue.description || '',
      location: issue.location || '',
      category: issue.category._id,
      images: Array.isArray(issue.images) ? issue.images.map(img => img.url) : [],
      severity: issue.severityLevel || 'medium',
      createdBy: issue.reportedBy || issue.createdBy,
      donationTarget: issue.donationTarget || 0,
      volunteerCount: issue.volunteerCount || 0,
      createdFromIssue: issue._id,
      status: 'pending',
    });

    issue.status = 'converted-to-project';
    issue.projectId = project._id;
    await issue.save();

   await Notification.create({
  user: issue.reportedBy || issue.createdBy,
  message: `تمت الموافقة على البلاغ وتحويله إلى مشروع: "${project.title}".`,
  type: 'info',
});

    return NextResponse.json({ success: true, projectId: project._id });
  } catch (err) {
    console.error('❌ خطأ أثناء تحويل البلاغ إلى مشروع:', {
      message: err.message,
      stack: err.stack,
      errors: err.errors || null,
    });
    return NextResponse.json({ error: err.message || 'حدث خطأ داخلي في السيرفر' }, { status: 500 });
  }
}

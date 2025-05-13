import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Comment from '@/models/Comment';

export async function GET(request, { params }) {
  try {
    await connectDB();

    // تحقق من صحة الـ ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'معرف المشروع غير صالح' },
        { status: 400 }
      );
    }

    const project = await Project.findById(params.id)
      .populate('category', 'name')
      // .populate('createdBy', 'name') // تم التعليق أو الحذف بسبب عدم وجود الحقل في السكيمة
      .lean();

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // جلب التعليقات
    const comments = await Comment.find({ project: params.id })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      project,
      comments: comments.map(comment => ({
        id: comment._id,
        user: comment.user.name,
        text: comment.text,
        date: new Date(comment.createdAt).toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات المشروع', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { action } = await request.json();
    
    if (action === 'like') {
      await connectDB();
      
      if (!mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json(
          { error: 'معرف المشروع غير صالح' },
          { status: 400 }
        );
      }

      const project = await Project.findById(params.id);
      if (!project) {
        return NextResponse.json(
          { error: 'المشروع غير موجود' },
          { status: 404 }
        );
      }

      // هنا يمكنك إضافة منطق التحقق من المستخدم وتحديث الإعجابات
      // project.likes += 1;
      // await project.save();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'إجراء غير صالح' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المشروع', details: error.message },
      { status: 500 }
    );
  }
}

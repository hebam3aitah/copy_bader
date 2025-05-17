// 📁 /app/api/admin/users/route.js
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import Project from '@/models/Project';
import Volunteer from '@/models/Volunteer';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
   
    

    const users = await User.find({});

    const result = await Promise.all(
      users.map(async (user) => {
        const volunteered = await Volunteer.find({ volunteer: user._id, status: 'accepted' });
        const reportedProjects = await Project.countDocuments({createdFromIssue: user._id });
        const volunteerRequests = await Volunteer.find({ volunteer: user._id })
          .populate('project', 'title');

        // جمع taskHours إذا كانت موجودة
        const volunteeredHours = volunteered.reduce(
          (sum, v) => sum + (v.taskHours || 0),
          0
        );

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          volunteeredHours,
          reportedProjectsCount: reportedProjects,
          volunteerRequests: volunteerRequests.map((r) => ({
            _id: r._id,
            projectId: r.project._id,
            projectName: r.project.title,
            status: r.status,
          })),
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
  }
}

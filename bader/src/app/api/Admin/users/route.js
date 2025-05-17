// // 📁 /app/api/admin/users/route.js
// import { connectDB } from '@/lib/mongoose';
// import User from '@/models/User';
// import Project from '@/models/Project';
// import Volunteer from '@/models/Volunteer';
// import { NextResponse } from 'next/server';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const roleFilter = searchParams.get("role");

//     let userQuery = {};
//     if (roleFilter && roleFilter !== 'all') {
//       userQuery.role = roleFilter;
//     }

//     const users = await User.find(userQuery);

//     const result = await Promise.all(
//       users.map(async (user) => {
//         const volunteered = await Volunteer.find({ volunteer: user._id, status: 'accepted' });
//         const reportedProjects = await Project.countDocuments({ createdFromIssue: user._id });

//         const volunteerRequests = await Volunteer.find({ volunteer: user._id })
//           .populate('projectAssigned', 'title');

//         const volunteeredHours = volunteered.reduce(
//           (sum, v) => sum + (v.taskHours || 0),
//           0
//         );

//         return {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           volunteeredHours,
//           reportedProjectsCount: reportedProjects,
//           volunteerRequests: volunteerRequests.map((r) => ({
//             _id: r._id,
//             projectId: r.projectAssigned?._id,
//             projectName: r.projectAssigned?.title || 'غير محدد',
//             status: r.status,
//           })),
//         };
//       })
//     );

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
//   }
// }
// 📁 /app/api/admin/users/route.js
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import Project from '@/models/Project';
import Volunteer from '@/models/Volunteer';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get("role");
    const search = searchParams.get("search")?.toLowerCase() || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let userQuery = {};
    if (roleFilter && roleFilter !== 'all') {
      userQuery.role = roleFilter;
    }
    if (search) {
      userQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const totalUsers = await User.countDocuments(userQuery);
    const users = await User.find(userQuery).skip(skip).limit(limit);

    const result = await Promise.all(
      users.map(async (user) => {
        const volunteered = await Volunteer.find({ volunteer: user._id, status: 'accepted' });
        const reportedProjects = await Project.countDocuments({ createdFromIssue: user._id });

        const volunteerRequests = await Volunteer.find({ volunteer: user._id })
          .populate('projectAssigned', 'title');

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
            projectId: r.projectAssigned?._id,
            projectName: r.projectAssigned?.title || 'غير محدد',
            status: r.status,
          })),
        };
      })
    );

    return NextResponse.json({ users: result, total: totalUsers, page, totalPages: Math.ceil(totalUsers / limit) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
  }
}
import dbConnect from '@/lib/connectDb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // تأكد من المسار الصحيح

export async function GET(req) {
  await dbConnect();

  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== 'admin') {
  //   return Response.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const query = {};
  if (status && status !== 'all') {
    query.status = status;
  }

  const projects = await Project.find(query).sort({ createdAt: -1 });
  return Response.json(projects);
}

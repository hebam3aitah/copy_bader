import dbConnect from '@/lib/connectDb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req, { params }) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    await Project.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    return Response.json({ error: 'Error deleting project' }, { status: 500 });
  }
}

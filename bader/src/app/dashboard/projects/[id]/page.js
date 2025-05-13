import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(_, { params }) {
  await connectDB();
  const project = await Project.findById(params.id).populate('category', 'name');
  return Response.json(project);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Project.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Project.findByIdAndDelete(params.id);
  return Response.json({ message: 'تم حذف المشروع' });
}

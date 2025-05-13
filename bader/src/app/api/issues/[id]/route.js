import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';

export async function GET(_, { params }) {
  await connectDB();
  const issue = await Issue.findById(params.id).populate('Category', 'name');
  if (!issue) {
    return new Response(JSON.stringify({ message: 'المشكلة غير موجودة' }), { status: 404 });
  }
  return Response.json(issue);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Issue.findByIdAndUpdate(params.id, data, { new: true });
  if (!updated) {
    return new Response(JSON.stringify({ message: 'لم يتم العثور على المشكلة' }), { status: 404 });
  }
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  const deleted = await Issue.findByIdAndDelete(params.id);
  if (!deleted) {
    return new Response(JSON.stringify({ message: 'المشكلة غير موجودة' }), { status: 404 });
  }
  return Response.json({ message: 'تم الحذف بنجاح' });
}

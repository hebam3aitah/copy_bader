import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';
import Project from '@/models/Project';
import Notification from '@/models/Notification';

export async function POST(req) {
  await dbConnect();
  const { issueId } = await req.json();

  const issue = await Issue.findById(issueId);
  if (!issue) {
    return Response.json({ error: 'Issue not found' }, { status: 404 });
  }

  // أنشئ المشروع من بيانات البلاغ
  const project = await Project.create({
    title: issue.title,
    description: issue.description,
    location: issue.location,
    images: issue.images,
    severity: issue.severity,
    createdBy: issue.createdBy,
    createdFromIssue: issue._id,
    status: "open",
  });

  // حدّث حالة البلاغ
  issue.status = "approved";
  await issue.save();

  // أنشئ إشعارًا للمستخدم
  await Notification.create({
    user: issue.createdBy,
    message: `Your issue "${issue.title}" was approved and turned into a project.`,
    type: "info",
  });

  return Response.json({ success: true, projectId: project._id });
}

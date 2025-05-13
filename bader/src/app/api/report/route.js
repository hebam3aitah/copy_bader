import connectDB from "@/lib/connectDb";
import Issue from "@/models/Issue";
import Joi from "joi";
import { sendAdminNotification } from "@/lib/notifyAdmin";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("📥 Received data:", body);

    // ✅ Joi validation
    const schema = Joi.object({
      problemType: Joi.string().required(),
      location: Joi.string().required(),
      severityLevel: Joi.string().valid("low", "medium", "high").required(),
      description: Joi.string().required(),
      images: Joi.array().items(Joi.string().uri()).max(5),
      reporterName: Joi.string().required(),
      phone: Joi.string()
        .pattern(/^[\d+]{8,15}$/)
        .required(),
    });

    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      return new Response(
        JSON.stringify({
          message: "❌ تحقق من صحة الحقول",
          errors: error.details,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const {
      problemType,
      location,
      severityLevel,
      description,
      images,
      reporterName,
      phone,
    } = body;

    const issue = await Issue.create({
      problemType,
      location,
      severityLevel,
      description,
      images: (images || []).map((url) => ({ url })), // ✅ تصحيح هنا
      reporterName,
      phone,
    });

    console.log("✅ Issue created:", issue);

    // ✅ إرسال إشعار إلى الأدمن (بسيط)
    await sendAdminNotification({
      title: "🔔 بلاغ جديد",
      message: `${reporterName} أبلغ عن: ${problemType}`,
      severity: severityLevel,
      link: "/dashboard/issues",
    });

    return new Response(JSON.stringify(issue), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error creating issue:", error);
    return new Response(
      JSON.stringify({
        message: "حدث خطأ أثناء إنشاء البلاغ",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

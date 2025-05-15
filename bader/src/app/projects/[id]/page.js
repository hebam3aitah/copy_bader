// app/project/[id]/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiDollarSign,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import ReportModal from "../[id]/components/ReportModal/page";

const PLACEHOLDER = "/placeholder.png";

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCommentId, setReportCommentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (!params.id) {
          throw new Error("معرف المشروع غير صالح");
        }

        setLoading(true);
        const response = await fetch(`/api/projects/${params.id}`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "فشل في جلب بيانات المشروع");
        }
        const data = await response.json();
        if (!data.project) {
          throw new Error("لم يتم العثور على المشروع");
        }
        setProject(data.project);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [params.id]);

  const handleLike = async () => {
    try {
      console.log(params.id);
      const res = await fetch(`/api/projects/${params.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // مهم جداً عشان يبعث الكوكيز مع الطلب
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const updatedProject = await res.json();
      console.log("Project updated:", updatedProject);
      // مثلاً ممكن تحدّثي الحالة في الواجهة بناءً على updatedProject
    } catch (error) {
      console.error("Error while liking the project:", error.message);
    }
  };
  

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const response = await fetch(`/api/projects/${params.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText }),
      });
      if (!response.ok) throw new Error("فشل في إضافة التعليق");
      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleShare = (platform) => {
    const shareUrl = `${window.location.origin}/projects/${params.id}`;
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=تعرف على مشروع ${
            project?.title || ""
          } من بادر&url=${shareUrl}`
        );
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=تعرف على مشروع ${
            project?.title || ""
          } من بادر: ${shareUrl}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        alert("تم نسخ الرابط بنجاح!");
        break;
    }
    setShowShareOptions(false);
  };

  const handleReportComment = (commentId) => {
    setReportCommentId(commentId);
    setShowReportModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (project?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (project?.images?.length || 1) - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <FiLoader className="text-4xl text-[#fa9e1b] animate-spin mb-4" />
          <p className="text-xl font-semibold text-[#31124b]">
            جاري تحميل المشروع...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <FiAlertTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#31124b] mb-2">
            عذراً، حدث خطأ!
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/projects"
            className="inline-block bg-[#31124b] text-white px-6 py-2 rounded-lg hover:bg-[#2a0f40] transition-colors"
          >
            العودة للمشاريع
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <FiAlertTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#31124b] mb-2">
            لم يتم العثور على المشروع
          </h2>
          <p className="text-gray-600 mb-4">
            المشروع الذي تبحث عنه غير موجود أو تم حذفه
          </p>
          <Link
            href="/projects"
            className="inline-block bg-[#31124b] text-white px-6 py-2 rounded-lg hover:bg-[#2a0f40] transition-colors"
          >
            العودة للمشاريع
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* الصورة الرئيسية */}
      <div className="relative w-full h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
        <Image
          src={project.mainImage || PLACEHOLDER}
          alt={project.title || "مشروع"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 right-0 p-8 z-20">
          <h1 className="text-4xl font-bold text-white mb-2">
            {project.title || "مشروع بدون عنوان"}
          </h1>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center">
              <FiUsers className="ml-1" />
              <span>{project.volunteers.length || 0} متطوع</span>
            </div>
            <div className="flex items-center">
              <FiDollarSign className="ml-1" />
              <span>{project.donations || 0} ريال</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* معلومات المشروع */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#31124b]">
                عن المشروع
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {project.description || "لا يوجد وصف متاح لهذا المشروع."}
              </p>

              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike()}
                    className={`flex items-center gap-2 ${
                      liked ? "text-red-500" : "text-gray-500"
                    } hover:text-red-500 transition-colors`}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
                    />
                    <span>{project.likes.length || 0}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#31124b] transition-colors">
                    <FiMessageCircle className="w-5 h-5" />
                    <span>{comments.length}</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="flex items-center gap-2 text-gray-500 hover:text-[#31124b] transition-colors"
                    >
                      <FiShare2 className="w-5 h-5" />
                      <span>مشاركة</span>
                    </button>

                    <AnimatePresence>
                      {showShareOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 z-30 w-48"
                        >
                          <button
                            onClick={() => handleShare("facebook")}
                            className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded"
                          >
                            فيسبوك
                          </button>
                          <button
                            onClick={() => handleShare("twitter")}
                            className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded"
                          >
                            تويتر
                          </button>
                          <button
                            onClick={() => handleShare("whatsapp")}
                            className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded"
                          >
                            واتساب
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded"
                          >
                            نسخ الرابط
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <Link
                  href={`/projects/${params.id}/reports`}
                  className="flex items-center gap-2 text-[#31124b] hover:text-[#fa9e1b] transition-colors"
                >
                  <FiBarChart2 className="w-5 h-5" />
                  <span>التقارير</span>
                </Link>
              </div>

              {/* معرض الصور */}
              <h3 className="text-xl font-bold mb-4 text-[#31124b]">
                معرض الصور
              </h3>
              <div className="relative mb-8">
                <div className="w-full h-80 relative rounded-xl overflow-hidden">
                  <Image
                    src={
                      project.images && project.images[currentImageIndex]
                        ? project.images[currentImageIndex]
                        : PLACEHOLDER
                    }
                    alt={`صورة ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-[#31124b] hover:text-white transition-colors"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-[#31124b] hover:text-white transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex justify-center mt-4 gap-2">
                  {(project.images && project.images.length > 0
                    ? project.images
                    : [PLACEHOLDER]
                  ).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentImageIndex === index
                          ? "bg-[#fa9e1b]"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* التعليقات */}
              <h3 className="text-xl font-bold mb-4 text-[#31124b]">
                التعليقات
              </h3>
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="اكتب تعليقك هنا..."
                    className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fa9e1b] focus:border-transparent outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#31124b] text-white px-6 py-2 rounded-lg hover:bg-[#2a0f40] transition-colors"
                  >
                    إرسال
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.length === 0 && (
                  <div className="text-gray-400">لا توجد تعليقات بعد.</div>
                )}
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#31124b] rounded-full flex items-center justify-center text-white">
                          {comment.user?.charAt(0) || "?"}
                        </div>
                        <span className="font-semibold text-[#31124b]">
                          {comment.user || "مستخدم"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[#31124b]">
                معلومات المشروع
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">الحالة</span>
                  <span
                    className={`font-semibold ${
                      project.status === "مكتمل"
                        ? "text-green-600"
                        : project.status === "قيد التنفيذ"
                        ? "text-[#fa9e1b]"
                        : "text-blue-600"
                    }`}
                  >
                    {project.status || "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">التصنيف</span>
                  <span className="font-semibold text-[#31124b]">
                    {project.category?.name || project.category || "غير مصنف"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">تاريخ البدء</span>
                  <span className="font-semibold text-[#31124b]">
                    {project.startDate || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">تاريخ الانتهاء</span>
                  <span className="font-semibold text-[#31124b]">
                    {project.endDate || "-"}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  href={`/volunteer-opportunities/${params.id}`}
                  className="block w-full bg-[#4caf50] text-white text-center py-3 rounded-lg hover:bg-[#3f6f41] transition-colors"
                >
                  تطوع معنا
                </Link>

                <Link
                  href={`/payment/${params.id}`}
                  className="block w-full bg-[#1976d2] text-white text-center py-3 rounded-lg hover:bg-[#52779b] transition-colors"
                >
                  تبرع الآن
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* نافذة الإبلاغ عن تعليق */}
      {showReportModal && (
        <ReportModal
          commentId={reportCommentId}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FiClock,
//   FiCheckCircle,
//   FiArrowRight,
//   FiHeart,
//   FiUsers,
//   FiTrendingUp,
//   FiShare2,
//   FiInfo
// } from 'react-icons/fi';

// const ProjectCard = ({
//   id,
//   image,
//   month,
//   title,
//   description,
//   status,
//   progress,
//   showDonate = true,
//   showVolunteer = true
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showShareMenu, setShowShareMenu] = useState(false);

//   const getStatusIcon = () => {
//     switch(status) {
//       case 'مكتمل':
//         return <FiCheckCircle className="ml-1" />;
//       case 'قيد التنفيذ':
//         return <FiTrendingUp className="ml-1" />;
//       default:
//         return <FiClock className="ml-1" />;
//     }
//   };

//   const getStatusColor = () => {
//     switch(status) {
//       case 'مكتمل':
//         return 'text-green-600';
//       case 'قيد التنفيذ':
//         return 'text-[#fa9e1b]';
//       default:
//         return 'text-blue-600';
//     }
//   };

//   const getProgressWidth = () => {
//     if (status === 'مكتمل') return '100%';
//     if (status === 'قيد التنفيذ') return `${progress || 50}%`;
//     return `${progress || 30}%`;
//   };

//   const getProgressBarColor = () => {
//     if (status === 'مكتمل') return 'bg-green-500';
//     if (status === 'قيد التنفيذ') return 'bg-[#fa9e1b]';
//     return 'bg-blue-500';
//   };

//   const handleShare = (platform) => {
//     const shareUrl = `${window.location.origin}/projects/${id}`;

//     switch(platform) {
//       case 'twitter':
//         window.open(`https://twitter.com/intent/tweet?text=تعرف على مشروع ${title} من بادر&url=${shareUrl}`);
//         break;
//       case 'facebook':
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
//         break;
//       case 'whatsapp':
//         window.open(`https://wa.me/?text=تعرف على مشروع ${title} من بادر: ${shareUrl}`);
//         break;
//       case 'copy':
//         navigator.clipboard.writeText(shareUrl);
//         alert('تم نسخ الرابط بنجاح!');
//         break;
//     }

//     setShowShareMenu(false);
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {setIsHovered(false); setShowShareMenu(false);}}
//     >
//       {/* صورة المشروع مع تأثيرات */}
//       <div className="relative h-52 overflow-hidden">
//         <motion.img
//           src={image || "/placeholder.png"}
//           alt={title}
//           className="w-full h-full object-cover"
//           animate={{ scale: isHovered ? 1.1 : 1 }}
//           transition={{ duration: 0.7 }}
//         />

//         {/* تصنيف المشروع */}
//         <div className="absolute top-40 right-0 m-3">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white bg-opacity-90 px-3 py-1 rounded-lg text-[#31124b] font-bold text-sm shadow-md"
//           >
//             {month}
//           </motion.div>
//         </div>

//         {/* زر المشاركة */}
//         <div className="absolute top-0 left-0 m-3">
//           <div className="relative">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="bg-white bg-opacity-90 p-2 rounded-full text-[#31124b] shadow-md hover:bg-[#31124b] hover:text-white transition-colors duration-300"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowShareMenu(!showShareMenu);
//               }}
//             >
//               <FiShare2 className="text-lg" />
//             </motion.button>

//             {/* قائمة المشاركة */}
//             {showShareMenu && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="absolute left-0 top-12 bg-white rounded-lg shadow-xl p-3 z-50 min-w-[150px]"
//               >
//                 <div className="mb-2 pb-1 border-b border-gray-100 text-center">
//                   <span className="text-xs font-semibold text-gray-500">مشاركة المشروع</span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     onClick={() => handleShare('twitter')}
//                     className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
//                   >
//                     <span className="text-xs">تويتر</span>
//                   </button>
//                   <button
//                     onClick={() => handleShare('facebook')}
//                     className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
//                   >
//                     <span className="text-xs">فيسبوك</span>
//                   </button>
//                   <button
//                     onClick={() => handleShare('whatsapp')}
//                     className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
//                   >
//                     <span className="text-xs">واتساب</span>
//                   </button>
//                   <button
//                     onClick={() => handleShare('copy')}
//                     className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-300"
//                   >
//                     <span className="text-xs">نسخ الرابط</span>
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* محتوى البطاقة */}
//       <div className="p-4 flex-grow flex flex-col">
//         <h3 className="text-xl font-bold text-[#31124b] mb-2">{title}</h3>
//         <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>

//         {/* حالة المشروع */}
//         <div className="mt-auto">
//           <div className="flex items-center mb-2">
//             <span className="text-sm font-semibold">حالة المشروع :</span>
//             <span className={`text-sm font-bold ${getStatusColor()} flex items-center`}>
//               {getStatusIcon()}
//               {status}
//             </span>
//           </div>

//           {/* شريط التقدم */}
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//             <div
//               className={`${getProgressBarColor()} h-2 rounded-full transition-all duration-500`}
//               style={{ width: getProgressWidth() }}
//             />
//           </div>

//           {/* أزرار العمل */}
//           <div className="flex justify-between gap-2 mt-3">
//             <Link
//               href={`/projects/${id}`}
//               className="bg-[#31124b] hover:bg-[#826798] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm flex items-center justify-center gap-2"
//             >
//               <span>عرض التفاصيل</span>
//               <FiArrowRight className="text-lg" />
//             </Link>

//             {showVolunteer && (
//               <Link
//                 href={`/volunteer-opportunities/${id}`}
//                 className="bg-[#4caf50] hover:bg-[#3f6f41] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm flex items-center justify-center gap-2"
//               >
//                 <FiUsers className="text-lg" />
//                 <span>تطوع معنا</span>
//               </Link>
//             )}

//             {showDonate && (
//               <Link
//                 href={`/payment/${id}`}
//                 className="bg-[#1976d2] hover:bg-[#52779b] text-white py-2 px-4 rounded-md text-center transition-colors w-full text-sm flex items-center justify-center gap-2"
//               >
//                 <FiHeart className="text-lg" />
//                 <span>تبرع الآن</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock,
  FiCheckCircle,
  FiArrowLeft,
  FiHeart,
  FiUsers,
  FiTrendingUp,
  FiShare2,
  FiTwitter,
  FiCopy,
  FiFacebook,
  FiMessageSquare,
} from "react-icons/fi";

const ProjectCard = ({
  id,
  image,
  month,
  title,
  description,
  status,
  progress,
  showDonate = true,
  showVolunteer = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case "مكتمل":
        return <FiCheckCircle className="ml-2" />;
      case "قيد التنفيذ":
        return <FiTrendingUp className="ml-2" />;
      default:
        return <FiClock className="ml-2" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "مكتمل":
        return "text-green-600 bg-green-50";
      case "قيد التنفيذ":
        return "text-[#fa9e1b] bg-amber-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  const getProgressWidth = () => {
    if (status === "مكتمل") return "100%";
    if (status === "قيد التنفيذ") return `${progress || 50}%`;
    return `${progress || 30}%`;
  };

  const getProgressBarColor = () => {
    if (status === "مكتمل") return "bg-green-500";
    if (status === "قيد التنفيذ") return "bg-[#fa9e1b]";
    return "bg-blue-500";
  };

  const handleShare = (platform) => {
    const shareUrl = `${window.location.origin}/projects/${id}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=تعرف على مشروع ${title} من بادر&url=${shareUrl}`
        );
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=تعرف على مشروع ${title} من بادر: ${shareUrl}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }

    if (platform !== "copy") {
      setShowShareMenu(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowShareMenu(false);
      }}
    >
      {/* صورة المشروع مع تأثيرات */}
      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={image || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />

        {/* تدرج شفاف فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

        {/* شهر المشروع */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white bg-opacity-95 px-4 py-1.5 rounded-full text-[#31124b] font-bold text-sm shadow-lg flex items-center"
          >
            {month}
          </motion.div>
        </div>

        {/* حالة المشروع في الصورة */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center ${getStatusColor()}`}
          >
            {getStatusIcon()}
            {status}
          </motion.div>
        </div>

        {/* زر المشاركة */}
        <div className="absolute top-4 left-4">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white bg-opacity-95 p-2.5 rounded-full text-[#31124b] shadow-lg hover:bg-[#31124b] hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
            >
              <FiShare2 className="text-lg" />
            </motion.button>

            {/* قائمة المشاركة المحسنة */}
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-14 bg-white rounded-xl shadow-2xl p-4 z-50 min-w-[180px]"
                >
                  <div className="mb-3 pb-2 border-b border-gray-100">
                    <span className="text-sm font-semibold text-[#31124b]">
                      مشاركة المشروع
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center justify-start p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300 w-full text-blue-500"
                    >
                      <FiTwitter className="ml-2 text-lg" />
                      <span className="text-sm">تويتر</span>
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex items-center justify-start p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300 w-full text-blue-700"
                    >
                      <FiFacebook className="ml-2 text-lg" />
                      <span className="text-sm">فيسبوك</span>
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex items-center justify-start p-2 hover:bg-green-50 rounded-lg transition-colors duration-300 w-full text-green-600"
                    >
                      <FiMessageSquare className="ml-2 text-lg" />
                      <span className="text-sm">واتساب</span>
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="flex items-center justify-start p-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 w-full text-gray-700"
                    >
                      <FiCopy className="ml-2 text-lg" />
                      <span className="text-sm">
                        {copied ? "تم النسخ!" : "نسخ الرابط"}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#31124b] mb-3 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-5 text-sm line-clamp-2">{description}</p>

        {/* شريط التقدم مع نسبة مئوية */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              نسبة الإنجاز
            </span>
            <span className="text-sm font-bold">
              {status === "مكتمل" ? "100%" : `${progress || 0}%`}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: getProgressWidth() }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${getProgressBarColor()} h-2.5 rounded-full transition-all duration-500`}
            />
          </div>

          {/* أزرار العمل */}
          <div className="grid grid-cols-1 gap-3 mt-3">
            <Link
              href={`/projects/${id}`}
              className="bg-[#31124b] hover:bg-[#2a0f40] text-white py-3 px-6 rounded-xl text-center transition-all duration-300 w-full text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>عرض التفاصيل</span>
              <FiArrowLeft className="text-lg" />
            </Link>

            <div className="flex gap-3">
              {showVolunteer && (
                <Link
                  href={`/volunteer-opportunities?project_id=${id}`}
                  className="bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 py-2.5 px-4 rounded-xl text-center transition-all duration-300 w-full text-sm font-medium flex items-center justify-center gap-2 border border-green-200"
                >
                  <FiUsers className="text-lg" />
                  <span>تطوع</span>
                </Link>
              )}

              {showDonate && (
                <Link
                  href={`/payment/${id}`}
                  className="bg-[#fa9e1b20] hover:bg-[#fa9e1b30] text-[#fa9e1b] hover:text-[#e89018] py-2.5 px-4 rounded-xl text-center transition-all duration-300 w-full text-sm font-medium flex items-center justify-center gap-2 border border-[#fa9e1b40]"
                >
                  <FiHeart className="text-lg" />
                  <span>تبرع</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* شريط ملون في الأسفل */}
      <div
        className={`h-1 w-full transition-colors duration-300 ${
          status === "مكتمل"
            ? "bg-green-500"
            : status === "قيد التنفيذ"
            ? "bg-[#fa9e1b]"
            : "bg-blue-500"
        }`}
      ></div>
    </motion.div>
  );
};

export default ProjectCard;

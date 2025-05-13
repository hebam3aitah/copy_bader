// // pages/project/[id].js
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Image from 'next/image';
// import { Heart, MessageCircle, Share2, Flag, BarChart2, DollarSign, Users, AlertTriangle } from 'lucide-react';
// import Link from 'next/link';
// import Head from 'next/head';

// export default function ProjectDetails() {
//   const router = useRouter();
//   const { id } = router.query;
  
//   const [project, setProject] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [commentText, setCommentText] = useState('');
//   const [liked, setLiked] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [reportCommentId, setReportCommentId] = useState(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);
  
//   useEffect(() => {
//     if (!id) return;
    
//     const fetchProjectData = async () => {
//       try {
//         setLoading(true);
//         // في التطبيق الحقيقي، ستقوم بالاتصال بـ API الفعلي
//         // هذه مجرد بيانات وهمية للعرض
//         const projectData = {
//           id: id,
//           title: "مشروع المساعدة الإنسانية",
//           description: "هذا المشروع يهدف لمساعدة المحتاجين في المناطق المتضررة. نعمل على توفير المأوى والغذاء والرعاية الصحية للأشخاص المتضررين من الكوارث الطبيعية والنزاعات.",
//           mainImage: "/api/placeholder/800/400",
//           images: [
//             "/api/placeholder/800/400",
//             "/api/placeholder/800/400",
//             "/api/placeholder/800/400",
//             "/api/placeholder/800/400"
//           ],
//           likes: 234,
//           volunteers: 45,
//           donations: 12500,
//           relatedProjects: [
//             { id: 1, title: "مشروع التعليم للجميع", image: "/api/placeholder/400/200" },
//             { id: 2, title: "مشروع الدعم النفسي", image: "/api/placeholder/400/200" },
//             { id: 3, title: "مشروع الرعاية الصحية", image: "/api/placeholder/400/200" }
//           ]
//         };
        
//         const commentsData = [
//           { id: 1, user: "أحمد محمد", text: "مشروع رائع! أتمنى لكم التوفيق", date: "قبل 2 ساعة", likes: 12 },
//           { id: 2, user: "سارة علي", text: "أنا مهتمة بالتطوع معكم، كيف يمكنني المشاركة؟", date: "قبل 5 ساعات", likes: 8 },
//           { id: 3, user: "محمد خالد", text: "هل يمكن التبرع عبر الإنترنت؟", date: "قبل يوم", likes: 5 }
//         ];
        
//         setProject(projectData);
//         setComments(commentsData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//         setLoading(false);
//       }
//     };
    
//     fetchProjectData();
//   }, [id]);
  
//   const handleLike = () => {
//     setLiked(!liked);
//     if (!liked) {
//       setProject({...project, likes: project.likes + 1});
//     } else {
//       setProject({...project, likes: project.likes - 1});
//     }
//   };
  
//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
    
//     const newComment = {
//       id: comments.length + 1,
//       user: "أنت",
//       text: commentText,
//       date: "الآن",
//       likes: 0
//     };
    
//     setComments([newComment, ...comments]);
//     setCommentText('');
//   };
  
//   const handleReportComment = (commentId) => {
//     setReportCommentId(commentId);
//     setShowReportModal(true);
//   };
  
//   const submitReport = () => {
//     // في التطبيق الحقيقي، ستقوم بإرسال البلاغ إلى الخادم
//     alert("تم إرسال البلاغ بنجاح");
//     setShowReportModal(false);
//   };
  
//   const handleShare = () => {
//     setShowShareOptions(!showShareOptions);
//   };
  
//   const nextImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === project.images.length - 1 ? 0 : prev + 1
//     );
//   };
  
//   const prevImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === 0 ? project.images.length - 1 : prev - 1
//     );
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-3xl font-bold text-gray-600">جاري التحميل...</div>
//       </div>
//     );
//   }
  
//   if (!project) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-2xl font-bold text-gray-600">لم يتم العثور على المشروع</div>
//       </div>
//     );
//   }
  
//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-50">
//       <Head>
//         <title>{project.title}</title>
//         <meta name="description" content={project.description} />
//       </Head>
      
//       {/* الصورة الرئيسية */}
//       <div className="relative w-full h-96">
//         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
//         <Image 
//           src={project.mainImage} 
//           alt={project.title}
//           layout="fill" 
//           objectFit="cover" 
//           priority
//         />
//         <div className="absolute bottom-0 right-0 p-8 z-20">
//           <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             {/* معلومات المشروع */}
//             <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-bold mb-4 text-[#31124b]">عن المشروع</h2>
//               <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
              
//               <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-6">
//                 <div className="flex items-center space-x-4 space-x-reverse">
//                   <button 
//                     onClick={handleLike} 
//                     className={`flex items-center space-x-2 space-x-reverse ${liked ? 'text-red-500' : 'text-gray-500'}`}
//                   >
//                     <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
//                     <span>{project.likes}</span>
//                   </button>
                  
//                   <button className="flex items-center space-x-2 space-x-reverse text-gray-500">
//                     <MessageCircle className="w-5 h-5" />
//                     <span>{comments.length}</span>
//                   </button>
                  
//                   <div className="relative">
//                     <button onClick={handleShare} className="flex items-center space-x-2 space-x-reverse text-gray-500">
//                       <Share2 className="w-5 h-5" />
//                       <span>مشاركة</span>
//                     </button>
                    
//                     {showShareOptions && (
//                       <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 z-30 w-48">
//                         <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">فيسبوك</button>
//                         <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">تويتر</button>
//                         <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">واتساب</button>
//                         <button className="block w-full text-right py-2 px-3 hover:bg-gray-100 rounded">نسخ الرابط</button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <Link href={`/project/${id}/reports`}>
//                   <a className="flex items-center space-x-2 space-x-reverse text-[#31124b]">
//                     <BarChart2 className="w-5 h-5" />
//                     <span>التقارير</span>
//                   </a>
//                 </Link>
//               </div>
              
//               {/* معرض الصور */}
//               <h3 className="text-xl font-bold mb-4 text-[#31124b]">معرض الصور</h3>
//               <div className="relative mb-8">
//                 <div className="w-full h-80 relative">
//                   <Image 
//                     src={project.images[currentImageIndex]} 
//                     alt={`صورة ${currentImageIndex + 1}`}
//                     layout="fill" 
//                     objectFit="cover" 
//                     className="rounded-lg"
//                   />
//                 </div>
//                 <button 
//                   onClick={prevImage}
//                   className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#31124b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//                 <button 
//                   onClick={nextImage}
//                   className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#31124b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <div className="flex justify-center mt-4 space-x-2 space-x-reverse">
//                   {project.images.map((_, index) => (
//                     <button 
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)} 
//                       className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-[#e08c18]' : 'bg-gray-300'}`}
//                     />
//                   ))}
//                 </div>
//               </div>
              
//               {/* التعليقات */}
//               <h3 className="text-xl font-bold mb-4 text-[#31124b]">التعليقات</h3>
//               <form onSubmit={handleAddComment} className="mb-6">
//                 <div className="flex">
//                   <textarea 
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                     placeholder="اكتب تعليقك هنا..."
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
//                     rows="3"
//                   />
//                 </div>
//                 <div className="mt-2 text-left">
//                   <button 
//                     type="submit" 
//                     className="bg-[#e08c18] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
//                   >
//                     إرسال
//                   </button>
//                 </div>
//               </form>
              
//               <div className="space-y-4">
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="border-b border-gray-200 pb-4">
//                     <div className="flex justify-between mb-2">
//                       <div className="font-bold">{comment.user}</div>
//                       <div className="text-gray-500 text-sm">{comment.date}</div>
//                     </div>
//                     <p className="text-gray-700 mb-2">{comment.text}</p>
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center space-x-4 space-x-reverse">
//                         <button className="text-gray-500 text-sm flex items-center">
//                           <Heart className="w-4 h-4 ml-1" />
//                           <span>{comment.likes}</span>
//                         </button>
//                         <button 
//                           onClick={() => handleReportComment(comment.id)}
//                           className="text-gray-500 text-sm flex items-center"
//                         >
//                           <Flag className="w-4 h-4 ml-1" />
//                           <span>إبلاغ</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div>
//             {/* قسم التبرع والتطوع */}
//             <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//               <h3 className="text-xl font-bold mb-4 text-[#31124b]">دعم المشروع</h3>
              
//               <div className="border-b border-gray-200 pb-4 mb-4">
//                 <div className="flex justify-between text-gray-600 mb-2">
//                   <span>تبرعات تم جمعها</span>
//                   <span className="font-bold">{project.donations} $</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                   <div className="bg-[#e08c18] h-2.5 rounded-full" style={{ width: "70%" }}></div>
//                 </div>
//               </div>
              
//               <Link href={`/project/${id}/donate`}>
//                 <a className="block w-full bg-[#e08c18] text-white text-center py-3 rounded-lg font-bold mb-4 hover:bg-opacity-90 transition-colors">
//                   <DollarSign className="inline-block w-5 h-5 ml-2" />
//                   تبرع الآن
//                 </a>
//               </Link>
              
//               <Link href={`/project/${id}/volunteer`}>
//                 <a className="block w-full border-2 border-[#31124b] text-[#31124b] text-center py-3 rounded-lg font-bold hover:bg-[#31124b] hover:text-white transition-colors">
//                   <Users className="inline-block w-5 h-5 ml-2" />
//                   تطوع معنا ({project.volunteers})
//                 </a>
//               </Link>
//             </div>
            
//             {/* المشاريع المتعلقة */}
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-xl font-bold mb-4 text-[#31124b]">مشاريع مشابهة</h3>
//               <div className="space-y-4">
//                 {project.relatedProjects.map((relatedProject) => (
//                   <Link key={relatedProject.id} href={`/project/${relatedProject.id}`}>
//                     <a className="block group">
//                       <div className="flex items-center space-x-4 space-x-reverse">
//                         <div className="relative w-20 h-20 rounded-lg overflow-hidden">
//                           <Image 
//                             src={relatedProject.image} 
//                             alt={relatedProject.title}
//                             layout="fill" 
//                             objectFit="cover" 
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-bold text-[#31124b] group-hover:text-[#e08c18] transition-colors">
//                             {relatedProject.title}
//                           </h4>
//                         </div>
//                       </div>
//                     </a>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* نافذة الإبلاغ عن تعليق */}
//       {showReportModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-[#31124b]">الإبلاغ عن تعليق</h3>
//               <button 
//                 onClick={() => setShowReportModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <p className="text-gray-700 mb-4">يرجى اختيار سبب الإبلاغ:</p>
//               <div className="space-y-2">
//                 <label className="flex items-center">
//                   <input type="radio" name="report-reason" className="ml-2" />
//                   <span>محتوى غير لائق</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input type="radio" name="report-reason" className="ml-2" />
//                   <span>إساءة أو تحرش</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input type="radio" name="report-reason" className="ml-2" />
//                   <span>معلومات مضللة</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input type="radio" name="report-reason" className="ml-2" />
//                   <span>سبب آخر</span>
//                 </label>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <textarea 
//                 placeholder="تفاصيل إضافية (اختياري)"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
//                 rows="3"
//               />
//             </div>
            
//             <div className="flex justify-end space-x-3 space-x-reverse">
//               <button 
//                 onClick={() => setShowReportModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
//               >
//                 إلغاء
//               </button>
//               <button 
//                 onClick={submitReport}
//                 className="px-4 py-2 bg-[#e08c18] text-white rounded-lg hover:bg-opacity-90"
//               >
//                 إرسال البلاغ
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaEdit, FaMapMarkerAlt, FaPhone, FaUser, FaClipboardCheck, 
//   FaRegClock, FaExclamationTriangle, FaStar, FaMedal, 
//   FaTrophy, FaBell, FaCheckCircle, FaClock, FaBellSlash
// } from 'react-icons/fa';

// export default function UserProfile() {
//   // بيانات المستخدم القابلة للتعديل
//   const [userData, setUserData] = useState({
//     name: "أحمد محمد",
//     phone: "0599123456",
//     address: "حي الياسمين، شارع الزهور"
//   });

//   // حالة التعديل
//   const [editing, setEditing] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   // المشاريع التي تطوع فيها المستخدم
//   const [completedProjects] = useState([
//     { id: 1, title: "تنظيف حديقة الحي", date: "2025-03-20", hours: 4, status: "مكتمل" },
//     { id: 2, title: "دهان مقاعد الحديقة العامة", date: "2025-03-10", hours: 6, status: "مكتمل" },
//     { id: 3, title: "زراعة أشجار في الشارع الرئيسي", date: "2025-02-15", hours: 5, status: "مكتمل" }
//   ]);

//   // المشاريع المتاحة للتطوع
//   const [availableProjects] = useState([
//     { id: 4, title: "صيانة ملعب الأطفال", date: "2025-04-25", estimatedHours: 5, status: "متاح" },
//     { id: 5, title: "طلاء جدران المدرسة", date: "2025-05-01", estimatedHours: 8, status: "متاح" }
//   ]);

//   // المشاكل التي أبلغ عنها المستخدم
//   const [reportedIssues] = useState([
//     { id: 1, title: "كسر في رصيف الشارع الرئيسي", date: "2025-04-01", status: "قيد المعالجة" },
//     { id: 2, title: "إنارة معطلة في حديقة الحي", date: "2025-03-25", status: "تمت المعالجة" },
//     { id: 3, title: "تجمع مياه في شارع الزهور", date: "2025-04-10", status: "في انتظار المراجعة" }
//   ]);

//   // إشعارات المستخدم
//   const [notifications, setNotifications] = useState([
//     { 
//       id: 1, 
//       title: "تم تحديث حالة مشكلة", 
//       message: "تم بدء العمل على مشكلة 'كسر في رصيف الشارع الرئيسي'",
//       date: "2025-04-05",
//       isRead: false,
//       type: "issue"
//     },
//     { 
//       id: 2, 
//       title: "مشروع جديد متاح", 
//       message: "مشروع جديد متاح للتطوع: 'صيانة ملعب الأطفال'",
//       date: "2025-04-02",
//       isRead: true,
//       type: "project"
//     },
//     { 
//       id: 3, 
//       title: "حصلت على شارة جديدة", 
//       message: "مبروك! لقد حصلت على شارة 'المتطوع النشط'",
//       date: "2025-03-30",
//       isRead: false,
//       type: "badge"
//     }
//   ]);

//   // شارات المستخدم
//   const [badges] = useState([
//     { id: 1, name: "المتطوع النشط", icon: <FaMedal className="text-[#fa9e1b]" />, description: "أكملت 3 مشاريع تطوعية", achieved: true },
//     { id: 2, name: "مراقب الحي", icon: <FaExclamationTriangle className="text-[#fa9e1b]" />, description: "أبلغت عن 3 مشاكل في الحي", achieved: true },
//     { id: 3, name: "متطوع الذهبي", icon: <FaTrophy className="text-[#fa9e1b]" />, description: "وصلت إلى 15 ساعة تطوع", achieved: false, progress: 15, current: 15 },
//     { id: 4, name: "مصلح المجتمع", icon: <FaStar className="text-[#fa9e1b]" />, description: "شاركت في 10 مشاريع تطوعية", achieved: false, progress: 10, current: 3 }
//   ]);

//   // إظهار الإشعارات
//   const [showNotifications, setShowNotifications] = useState(false);
  
//   // الإحصائيات
//   const totalVolunteerHours = completedProjects.reduce((sum, project) => sum + project.hours, 0);
//   const totalCompletedProjects = completedProjects.length;
//   const totalReportedIssues = reportedIssues.length;
//   const resolvedIssues = reportedIssues.filter(issue => issue.status === "تمت المعالجة").length;

//   // بدء التعديل
//   const startEdit = (field) => {
//     setEditing(field);
//     setEditValue(userData[field]);
//   };

//   // حفظ التعديل
//   const saveEdit = () => {
//     if (editing) {
//       setUserData({ ...userData, [editing]: editValue });
//     }
//     setEditing(null);
//   };

//   // إلغاء التعديل
//   const cancelEdit = () => {
//     setEditing(null);
//   };

//   // تحديد حالة قراءة الإشعار
//   const markNotificationAsRead = (id) => {
//     setNotifications(notifications.map(notification => 
//       notification.id === id ? { ...notification, isRead: true } : notification
//     ));
//   };

//   // عدد الإشعارات غير المقروءة
//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   // لون الحالة
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "مكتمل":
//       case "تمت المعالجة":
//         return "bg-green-500";
//       case "قيد المعالجة":
//         return "bg-blue-500";
//       case "متاح":
//         return "bg-[#fa9e1b]";
//       case "في انتظار المراجعة":
//         return "bg-purple-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   // أيقونة نوع الإشعار
//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "issue":
//         return <FaExclamationTriangle className="text-red-500" />;
//       case "project":
//         return <FaClipboardCheck className="text-blue-500" />;
//       case "badge":
//         return <FaMedal className="text-[#fa9e1b]" />;
//       default:
//         return <FaBell className="text-gray-500" />;
//     }
//   };

//   return (
//     <div   dir="rtl" className="min-h-screen bg-gray-50">
    

//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* القسم الأيمن - معلومات المستخدم والإحصائيات والشارات */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* معلومات المستخدم */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-[#31124b]">الملف الشخصي</h2>
//                   <div className="h-16 w-16 rounded-full bg-[#fa9e1b] flex items-center justify-center text-white text-2xl">
//                     <FaUser />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {/* الاسم */}
//                   <div className="flex items-center justify-between p-3 border-b">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaUser className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">الاسم:</span>
//                     </div>
                    
//                     {editing === 'name' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded"
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.name}</span>
//                         <button onClick={() => startEdit('name')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* رقم الهاتف */}
//                   <div className="flex items-center justify-between p-3 border-b">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaPhone className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">رقم الهاتف:</span>
//                     </div>
                    
//                     {editing === 'phone' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded" 
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.phone}</span>
//                         <button onClick={() => startEdit('phone')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* المكان */}
//                   <div className="flex items-center justify-between p-3">
//                     <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <FaMapMarkerAlt className="text-[#fa9e1b]" />
//                       <span className="font-medium mr-2">المكان:</span>
//                     </div>
                    
//                     {editing === 'address' ? (
//                       <div className="flex items-center">
//                         <input 
//                           type="text" 
//                           value={editValue} 
//                           onChange={(e) => setEditValue(e.target.value)} 
//                           className="border border-gray-300 p-1 rounded" 
//                           dir="rtl"
//                         />
//                         <button onClick={saveEdit} className="text-green-600 mx-1">حفظ</button>
//                         <button onClick={cancelEdit} className="text-red-600 mx-1">إلغاء</button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <span>{userData.address}</span>
//                         <button onClick={() => startEdit('address')} className="text-[#fa9e1b] mr-2">
//                           <FaEdit />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* لوحة الإحصائيات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الإحصائيات</h2>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* إجمالي ساعات التطوع */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">إجمالي ساعات التطوع</p>
//                         <p className="text-2xl font-bold">{totalVolunteerHours}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClock />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاريع المكتملة */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاريع المكتملة</p>
//                         <p className="text-2xl font-bold">{totalCompletedProjects}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClipboardCheck />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل المبلغ عنها */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المبلغ عنها</p>
//                         <p className="text-2xl font-bold">{totalReportedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaExclamationTriangle />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل التي تمت معالجتها */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المحلولة</p>
//                         <p className="text-2xl font-bold">{resolvedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaCheckCircle />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* الشارات والإنجازات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الشارات والإنجازات</h2>
                
//                 <div className="space-y-4">
//                   {badges.map((badge) => (
//                     <div key={badge.id} className="border rounded-lg p-4">
//                       <div className="flex items-center">
//                         <div className={`p-3 rounded-full ${badge.achieved ? 'bg-[#fa9e1b] bg-opacity-20' : 'bg-gray-200'} mr-4`}>
//                           {badge.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className={`font-bold ${badge.achieved ? 'text-[#31124b]' : 'text-gray-500'}`}>
//                             {badge.name}
//                             {badge.achieved && <span className="text-green-500 mr-2 text-sm">(مكتمل)</span>}
//                           </h3>
//                           <p className="text-sm text-gray-600">{badge.description}</p>
                          
//                           {!badge.achieved && badge.progress && (
//                             <div className="mt-2">
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className="bg-[#fa9e1b] h-2 rounded-full" 
//                                   style={{ width: `${(badge.current / badge.progress) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <div className="text-xs text-gray-500 mt-1 text-left">
//                                 {badge.current}/{badge.progress}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* القسم الأيسر - المشاريع والمشاكل */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-2 space-y-6"
//           >
//             {/* المشاريع التي تطوع فيها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaClipboardCheck className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع تطوعت فيها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشروع</th>
//                       <th className="p-3 text-right">التاريخ</th>
//                       <th className="p-3 text-right">الساعات</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {completedProjects.map((project, index) => (
//                       <motion.tr 
//                         key={project.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{project.title}</td>
//                         <td className="p-3">{project.date}</td>
//                         <td className="p-3">{project.hours} ساعات</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
//                             {project.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* المشاريع المتاحة للتطوع */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaRegClock className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع متاحة للتطوع</h2>
//               </div>
              
//               <div className="space-y-4">
//                 {availableProjects.map((project, index) => (
//                   <motion.div 
//                     key={project.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.2 }}
//                     className="border rounded-lg p-4 hover:shadow-md transition-all"
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-bold text-lg">{project.title}</h3>
//                         <p className="text-gray-600">التاريخ: {project.date}</p>
//                         <p className="text-gray-600">الوقت المتوقع: {project.estimatedHours} ساعات</p>
//                       </div>
//                       <div>
//                         <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-md hover:bg-[#e89018] transition-colors">
//                           تطوع الآن
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* المشاكل المبلغ عنها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaExclamationTriangle className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">المشاكل التي أبلغت عنها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشكلة</th>
//                       <th className="p-3 text-right">تاريخ الإبلاغ</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportedIssues.map((issue, index) => (
//                       <motion.tr 
//                         key={issue.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{issue.title}</td>
//                         <td className="p-3">{issue.date}</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
//                             {issue.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="mt-4">
//                 <button className="bg-[#31124b] text-white px-4 py-2 rounded-md hover:bg-[#25093b] transition-colors w-full">
//                   الإبلاغ عن مشكلة جديدة
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////////////////
// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { 
//   FaEdit, FaMapMarkerAlt, FaPhone, FaUser, FaClipboardCheck, 
//   FaRegClock, FaExclamationTriangle, FaStar, FaMedal, 
//   FaTrophy, FaBell, FaCheckCircle, FaClock
// } from 'react-icons/fa';

// export default function UserProfile() {
//   const router = useRouter();

//   const [userData, setUserData] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     image: ''
//   });

//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [availableProjects, setAvailableProjects] = useState([]);
//   const [reportedIssues, setReportedIssues] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [badges, setBadges] = useState([]);

//   const [editing, setEditing] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const resUser = await fetch('/api/current-user');
//       if (resUser.status === 401) {
//         toast.error('يرجى تسجيل الدخول أولاً');
//         return router.push('/login');
//       }
//       const user = await resUser.json();
//       setUserData({
//         name: user.name || '',
//         phone: user.phone || '',
//         address: user.address|| '',
//         image: user.image || ''
//       });

//       const [completed, available, issues, notifs, badges] = await Promise.all([
//         fetch('/api/user/completed-projects').then(res => res.json()),
//         fetch('/api/projects/available').then(res => res.json()),
//         fetch('/api/user/reported-issues').then(res => res.json()),
//         fetch('/api/user/notifications').then(res => res.json()),
//         fetch('/api/user/badges').then(res => res.json()),
//       ]);

//       setCompletedProjects(completed.projects || []);
//       setAvailableProjects(available.projects || []);
//       setReportedIssues(issues.issues || []);
//       setNotifications(notifs.notifications || []);
//       setBadges(badges.badges || []);

//     } catch (err) {
//       console.error(err);
//       toast.error('حدث خطأ أثناء تحميل البيانات');
//     }
//   };

//   const startEdit = (field) => {
//     setEditing(field);
//     setEditValue(userData[field]);
//   };

//   const cancelEdit = () => {
//     setEditing(null);
//   };

//   const saveEdit = async () => {
//     if (!editing) return;
//     try {
//       const res = await fetch('/api/update-profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ [editing]: editValue }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         setUserData(data.updatedUser); // ✅ بدل التحديث اليدوي
//         toast.success('تم تحديث البيانات بنجاح ✅');
//       } else {
//         toast.error(data.message || 'فشل التحديث ❌');
//       }
  
//       setEditing(null);
//     } catch (err) {
//       console.error(err);
//       toast.error('حدث خطأ أثناء الحفظ ❌');
//     }
//   };
  

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
//     formData.append('folder', 'user-profiles');

//     try {
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       const imageUrl = data.secure_url;

//       await fetch('/api/update-profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image: imageUrl }),
//       });

//       setUserData({ ...userData, image: imageUrl });
//       toast.success('تم رفع الصورة بنجاح ✅');
//     } catch (error) {
//       console.error(error);
//       toast.error('فشل رفع الصورة ❌');
//     }
//   };

//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   const totalVolunteerHours = completedProjects.reduce((sum, project) => sum + (project.hours || 0), 0);
//   const totalCompletedProjects = completedProjects.length;
//   const totalReportedIssues = reportedIssues.length;
//   const resolvedIssues = reportedIssues.filter(issue => issue.status === 'تمت المعالجة').length;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "مكتمل": case "تمت المعالجة": return "bg-green-500";
//       case "قيد المعالجة": return "bg-blue-500";
//       case "متاح": return "bg-yellow-500";
//       case "في انتظار المراجعة": return "bg-purple-500";
//       default: return "bg-gray-500";
//     }
//   };

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "issue": return <FaExclamationTriangle className="text-red-500" />;
//       case "project": return <FaClipboardCheck className="text-blue-500" />;
//       case "badge": return <FaMedal className="text-yellow-500" />;
//       default: return <FaBell className="text-gray-500" />;
//     }
//   };

//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-6">

//         {/* معلومات المستخدم */}
//         <motion.div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//           <div className="flex flex-col items-center">
//             {userData.image ? (
//               <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
//             ) : (
//               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
//                 <FaUser className="text-3xl text-gray-500" />
//               </div>
//             )}
//             <input type="file" accept="image/*" className="mt-4" onChange={handleImageUpload} />
//           </div>

//           <div className="mt-6 space-y-4">

//             {/* الاسم */}
//             <div className="flex justify-between">
//               <div className="flex gap-2 items-center">
//                 <FaUser className="text-yellow-500" /> <span>الاسم:</span>
//               </div>
//               {editing === 'name' ? (
//                 <div className="flex gap-2">
//                   <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
//                   <button onClick={saveEdit} className="text-green-500">حفظ</button>
//                   <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <span>{userData.name}</span>
//                   <button onClick={() => startEdit('name')}><FaEdit className="text-yellow-500" /></button>
//                 </div>
//               )}
//             </div>

//             {/* الهاتف */}
//             <div className="flex justify-between">
//               <div className="flex gap-2 items-center">
//                 <FaPhone className="text-yellow-500" /> <span>رقم الهاتف:</span>
//               </div>
//               {editing === 'phone' ? (
//                 <div className="flex gap-2">
//                   <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
//                   <button onClick={saveEdit} className="text-green-500">حفظ</button>
//                   <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <span>{userData.phone}</span>
//                   <button onClick={() => startEdit('phone')}><FaEdit className="text-yellow-500" /></button>
//                 </div>
//               )}
//             </div>

//             {/* العنوان */}
//             <div className="flex justify-between">
//               <div className="flex gap-2 items-center">
//                 <FaMapMarkerAlt className="text-yellow-500" /> <span>العنوان:</span>
//               </div>
//               {editing === 'address' ? (
//                 <div className="flex gap-2">
//                   <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1" />
//                   <button onClick={saveEdit} className="text-green-500">حفظ</button>
//                   <button onClick={cancelEdit} className="text-red-500">إلغاء</button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <span>{userData.address}</span>
//                   <button onClick={() => startEdit('address')}><FaEdit className="text-yellow-500" /></button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </motion.div>

//                     {/* لوحة الإحصائيات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الإحصائيات</h2>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* إجمالي ساعات التطوع */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">إجمالي ساعات التطوع</p>
//                         <p className="text-2xl font-bold">{totalVolunteerHours}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClock />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاريع المكتملة */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاريع المكتملة</p>
//                         <p className="text-2xl font-bold">{totalCompletedProjects}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaClipboardCheck />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل المبلغ عنها */}
//                   <div className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المبلغ عنها</p>
//                         <p className="text-2xl font-bold">{totalReportedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaExclamationTriangle />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* عدد المشاكل التي تمت معالجتها */}
//                   <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] p-4 rounded-lg text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs opacity-75">المشاكل المحلولة</p>
//                         <p className="text-2xl font-bold">{resolvedIssues}</p>
//                       </div>
//                       <div className="text-3xl opacity-75">
//                         <FaCheckCircle />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* الشارات والإنجازات */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-[#31124b] mb-4">الشارات والإنجازات</h2>
                
//                 <div className="space-y-4">
//                   {badges.map((badge) => (
//                     <div key={badge.id} className="border rounded-lg p-4">
//                       <div className="flex items-center">
//                         <div className={`p-3 rounded-full ${badge.achieved ? 'bg-[#fa9e1b] bg-opacity-20' : 'bg-gray-200'} mr-4`}>
//                           {badge.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className={`font-bold ${badge.achieved ? 'text-[#31124b]' : 'text-gray-500'}`}>
//                             {badge.name}
//                             {badge.achieved && <span className="text-green-500 mr-2 text-sm">(مكتمل)</span>}
//                           </h3>
//                           <p className="text-sm text-gray-600">{badge.description}</p>
                          
//                           {!badge.achieved && badge.progress && (
//                             <div className="mt-2">
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className="bg-[#fa9e1b] h-2 rounded-full" 
//                                   style={{ width: `${(badge.current / badge.progress) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <div className="text-xs text-gray-500 mt-1 text-left">
//                                 {badge.current}/{badge.progress}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* القسم الأيسر - المشاريع والمشاكل */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-2 space-y-6"
//           >
//             {/* المشاريع التي تطوع فيها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaClipboardCheck className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع تطوعت فيها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشروع</th>
//                       <th className="p-3 text-right">التاريخ</th>
//                       <th className="p-3 text-right">الساعات</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {completedProjects.map((project, index) => (
//                       <motion.tr 
//                         key={project.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{project.title}</td>
//                         <td className="p-3">{project.date}</td>
//                         <td className="p-3">{project.hours} ساعات</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
//                             {project.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* المشاريع المتاحة للتطوع */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaRegClock className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">مشاريع متاحة للتطوع</h2>
//               </div>
              
//               <div className="space-y-4">
//                 {availableProjects.map((project, index) => (
//                   <motion.div 
//                     key={project.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.2 }}
//                     className="border rounded-lg p-4 hover:shadow-md transition-all"
//                   >
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-bold text-lg">{project.title}</h3>
//                         <p className="text-gray-600">التاريخ: {project.date}</p>
//                         <p className="text-gray-600">الوقت المتوقع: {project.estimatedHours} ساعات</p>
//                       </div>
//                       <div>
//                         <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-md hover:bg-[#e89018] transition-colors">
//                           تطوع الآن
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* المشاكل المبلغ عنها */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <FaExclamationTriangle className="text-[#fa9e1b] text-xl ml-2" />
//                 <h2 className="text-xl font-bold text-[#31124b]">المشاكل التي أبلغت عنها</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-3 text-right">المشكلة</th>
//                       <th className="p-3 text-right">تاريخ الإبلاغ</th>
//                       <th className="p-3 text-right">الحالة</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportedIssues.map((issue, index) => (
//                       <motion.tr 
//                         key={issue.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="p-3">{issue.title}</td>
//                         <td className="p-3">{issue.date}</td>
//                         <td className="p-3">
//                           <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
//                             {issue.status}
//                           </span>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="mt-4">
//                 <button className="bg-[#31124b] text-white px-4 py-2 rounded-md hover:bg-[#25093b] transition-colors w-full">
//                   الإبلاغ عن مشكلة جديدة
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//   );
// }
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaEdit, FaMapMarkerAlt, FaPhone, FaUser, FaClipboardCheck, 
  FaRegClock, FaExclamationTriangle, FaStar, FaMedal, 
  FaTrophy, FaBell, FaCheckCircle, FaClock, FaCamera,
  FaChartLine, FaAward, FaHandsHelping, FaInfoCircle
} from 'react-icons/fa';

export default function UserProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');

  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
    image: ''
  });

  const [completedProjects, setCompletedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [reportedIssues, setReportedIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [badges, setBadges] = useState([]);

  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const resUser = await fetch('/api/current-user');
      if (resUser.status === 401) {
        toast.error('يرجى تسجيل الدخول أولاً');
        return router.push('/login');
      }
      const user = await resUser.json();
      setUserData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address|| '',
        image: user.image || ''
      });

      const [completed, available, issues, notifs, badges] = await Promise.all([
        fetch('/api/user/completed-projects').then(res => res.json()),
        fetch('/api/projects/available').then(res => res.json()),
        fetch('/api/user/reported-issues').then(res => res.json()),
        fetch('/api/user/notifications').then(res => res.json()),
        fetch('/api/user/badges').then(res => res.json()),
      ]);

      setCompletedProjects(completed.projects || []);
      setAvailableProjects(available.projects || []);
      setReportedIssues(issues.issues || []);
      setNotifications(notifs.notifications || []);
      setBadges(badges.badges || []);

    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء تحميل البيانات');
    }
  };

  const startEdit = (field) => {
    setEditing(field);
    setEditValue(userData[field]);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const res = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [editing]: editValue }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUserData(data.updatedUser);
        toast.success('تم تحديث البيانات بنجاح ✅');
      } else {
        toast.error(data.message || 'فشل التحديث ❌');
      }
  
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء الحفظ ❌');
    }
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'user-profiles');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      const imageUrl = data.secure_url;

      await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      });

      setUserData({ ...userData, image: imageUrl });
      toast.success('تم رفع الصورة بنجاح ✅');
    } catch (error) {
      console.error(error);
      toast.error('فشل رفع الصورة ❌');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const totalVolunteerHours = completedProjects.reduce((sum, project) => sum + (project.hours || 0), 0);
  const totalCompletedProjects = completedProjects.length;
  const totalReportedIssues = reportedIssues.length;
  const resolvedIssues = reportedIssues.filter(issue => issue.status === 'تمت المعالجة').length;

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل": case "تمت المعالجة": return "bg-green-500";
      case "قيد المعالجة": return "bg-blue-500";
      case "متاح": return "bg-yellow-500";
      case "في انتظار المراجعة": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "issue": return <FaExclamationTriangle className="text-red-500" />;
      case "project": return <FaClipboardCheck className="text-blue-500" />;
      case "badge": return <FaMedal className="text-yellow-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#31124b] to-[#42195e] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative">
                {userData.image ? (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#fa9e1b] overflow-hidden">
                    <img 
                      src={userData.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full border-4 border-[#fa9e1b] flex items-center justify-center">
                    <FaUser className="text-3xl text-gray-500" />
                  </div>
                )}
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-[#fa9e1b] p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors">
                  <FaCamera className="text-white text-sm" />
                </label>
                <input 
                  id="profile-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </div>
              <div className="mr-4">
                <h1 className="text-2xl font-bold">{userData.name || 'مرحباً بك'}</h1>
                <div className="flex items-center mt-1 text-sm text-gray-200">
                  <FaMapMarkerAlt className="mr-1" /> 
                  <span>{userData.address|| 'لم يتم تحديد العنوان'}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* User info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-[#31124b]"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#31124b]">المعلومات الشخصية</h3>
                <FaUser className="text-[#fa9e1b] text-xl" />
              </div>
              <div className="space-y-4">
                {/* الاسم */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <FaUser className="text-[#fa9e1b] ml-2 text-sm" /> 
                    <span>الاسم:</span>
                  </div>
                  {editing === 'name' ? (
                    <div className="flex gap-2">
                      <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1 text-sm" />
                      <button onClick={saveEdit} className="text-green-500 text-sm hover:text-green-700">حفظ</button>
                      <button onClick={cancelEdit} className="text-red-500 text-sm hover:text-red-700">إلغاء</button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span>{userData.name}</span>
                      <button onClick={() => startEdit('name')}>
                        <FaEdit className="text-[#fa9e1b] hover:text-yellow-600 transition-colors" />
                      </button>
                    </div>
                  )}
                </div>

                {/* الهاتف */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="text-[#fa9e1b] ml-2 text-sm" /> 
                    <span>رقم الهاتف:</span>
                  </div>
                  {editing === 'phone' ? (
                    <div className="flex gap-2">
                      <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1 text-sm" />
                      <button onClick={saveEdit} className="text-green-500 text-sm hover:text-green-700">حفظ</button>
                      <button onClick={cancelEdit} className="text-red-500 text-sm hover:text-red-700">إلغاء</button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span>{userData.phone || 'لم يتم تحديد رقم'}</span>
                      <button onClick={() => startEdit('phone')}>
                        <FaEdit className="text-[#fa9e1b] hover:text-yellow-600 transition-colors" />
                      </button>
                    </div>
                  )}
                </div>

                {/* العنوان */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="text-[#fa9e1b] ml-2 text-sm" /> 
                    <span>العنوان:</span>
                  </div>
                  {editing === 'address' ? (
                    <div className="flex gap-2">
                      <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="border rounded p-1 text-sm" />
                      <button onClick={saveEdit} className="text-green-500 text-sm hover:text-green-700">حفظ</button>
                      <button onClick={cancelEdit} className="text-red-500 text-sm hover:text-red-700">إلغاء</button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span>{userData.address|| 'لم يتم تحديد العنوان'}</span>
                      <button onClick={() => startEdit('address')}>
                        <FaEdit className="text-[#fa9e1b] hover:text-yellow-600 transition-colors" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-[#fa9e1b]"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#31124b]">إحصائيات التطوع</h3>
                <FaChartLine className="text-[#fa9e1b] text-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#31124b] to-[#42195e] rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <FaClock className="text-2xl opacity-80" />
                    <div className="text-right">
                      <p className="text-xs opacity-75">ساعات التطوع</p>
                      <p className="text-xl font-bold">{totalVolunteerHours}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#fa9e1b] to-[#f8b957] rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <FaClipboardCheck className="text-2xl opacity-80" />
                    <div className="text-right">
                      <p className="text-xs opacity-75">المشاريع المكتملة</p>
                      <p className="text-xl font-bold">{totalCompletedProjects}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#fa9e1b] to-[#f8b957] rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <FaExclamationTriangle className="text-2xl opacity-80" />
                    <div className="text-right">
                      <p className="text-xs opacity-75">المشاكل المبلغة</p>
                      <p className="text-xl font-bold">{totalReportedIssues}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#31124b] to-[#42195e] rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <FaCheckCircle className="text-2xl opacity-80" />
                    <div className="text-right">
                      <p className="text-xs opacity-75">المشاكل المحلولة</p>
                      <p className="text-xl font-bold">{resolvedIssues}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-[#31124b]"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#31124b]">أحدث الإشعارات</h3>
                <FaBell className="text-[#fa9e1b] text-xl" />
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notification, index) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border-r-4 ${notification.isRead ? 'border-gray-300 bg-gray-50' : 'border-[#fa9e1b] bg-amber-50'}`}
                  >
                    <div className="flex items-start">
                      <div className="mt-1 ml-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {notifications.length > 4 && (
                  <button className="text-[#31124b] text-sm hover:text-[#fa9e1b] transition-colors w-full text-center mt-2">
                    عرض جميع الإشعارات ({notifications.length})
                  </button>
                )}
                {notifications.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    لا توجد إشعارات جديدة
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b overflow-x-auto">
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-4 flex items-center font-medium text-sm transition-colors ${activeTab === 'stats' 
                ? 'border-b-2 border-[#fa9e1b] text-[#31124b]' 
                : 'text-gray-500 hover:text-[#31124b]'}`}
            >
              <FaChartLine className="ml-2" /> الإحصائيات والإنجازات
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 flex items-center font-medium text-sm transition-colors ${activeTab === 'projects' 
                ? 'border-b-2 border-[#fa9e1b] text-[#31124b]' 
                : 'text-gray-500 hover:text-[#31124b]'}`}
            >
              <FaClipboardCheck className="ml-2" /> المشاريع التطوعية
            </button>
            <button 
              onClick={() => setActiveTab('available')}
              className={`px-6 py-4 flex items-center font-medium text-sm transition-colors ${activeTab === 'available' 
                ? 'border-b-2 border-[#fa9e1b] text-[#31124b]' 
                : 'text-gray-500 hover:text-[#31124b]'}`}
            >
              <FaRegClock className="ml-2" /> فرص التطوع المتاحة
            </button>
            <button 
              onClick={() => setActiveTab('issues')}
              className={`px-6 py-4 flex items-center font-medium text-sm transition-colors ${activeTab === 'issues' 
                ? 'border-b-2 border-[#fa9e1b] text-[#31124b]' 
                : 'text-gray-500 hover:text-[#31124b]'}`}
            >
              <FaExclamationTriangle className="ml-2" /> المشاكل المبلغ عنها
            </button>
          </div>

          <div className="p-6">
            {/* Stats & Achievements Tab */}
            {activeTab === 'stats' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <FaAward className="text-[#fa9e1b] text-xl ml-3" />
                    <h2 className="text-xl font-bold text-[#31124b]">الشارات والإنجازات</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        variants={itemVariants}
                        className={`rounded-xl p-5 transition-all ${
                          badge.achieved 
                            ? 'bg-gradient-to-r from-[#31124b]/10 to-[#fa9e1b]/10 border border-[#fa9e1b]/30' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-3 rounded-full ${
                            badge.achieved 
                              ? 'bg-gradient-to-br from-[#fa9e1b] to-[#f8b957] text-white' 
                              : 'bg-gray-200 text-gray-500'
                          } ml-4 shadow-md`}>
                            {badge.icon}
                          </div>
                          <div>
                            <h3 className={`font-bold ${badge.achieved ? 'text-[#31124b]' : 'text-gray-600'}`}>
                              {badge.name}
                              {badge.achieved && (
                                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded mr-2">
                                  مكتمل
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                            
                            {!badge.achieved && badge.progress && (
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] h-2 rounded-full" 
                                    style={{ width: `${(badge.current / badge.progress) * 100}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>المتبقي: {badge.progress - badge.current}</span>
                                  <span>{badge.current}/{badge.progress}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-6">
                    <FaChartLine className="text-[#fa9e1b] text-xl ml-3" />
                    <h2 className="text-xl font-bold text-[#31124b]">التقدم والإنجازات</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Progress Chart (Placeholder) */}
                    <motion.div 
                      variants={itemVariants}
                      className="bg-white rounded-xl border shadow-sm p-5 h-64"
                    >
                      <h3 className="text-lg font-medium text-[#31124b] mb-3">نشاط التطوع الشهري</h3>
                      <div className="h-full flex items-center justify-center text-gray-400">
                        رسم بياني للنشاط التطوعي
                      </div>
                    </motion.div>
                    
                    {/* Achievements Overview */}
                    <motion.div 
                      variants={itemVariants}
                      className="bg-white rounded-xl border shadow-sm p-5"
                    >
                      <h3 className="text-lg font-medium text-[#31124b] mb-3">مستوى التطوع</h3>
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#31124b] to-[#42195e] flex items-center justify-center text-white mb-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{totalVolunteerHours}</div>
                            <div className="text-xs opacity-75">ساعة تطوع</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                          <div 
                            className="bg-gradient-to-r from-[#fa9e1b] to-[#f8b957] h-3 rounded-full" 
                            style={{ width: `${Math.min((totalVolunteerHours / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between w-full text-xs text-gray-500">
                          <span>0 ساعة</span>
                          <span>100 ساعة</span>
                        </div>
                        <div className="mt-4 text-center">
                          <h4 className="font-medium text-[#31124b]">متطوع {totalVolunteerHours >= 50 ? "متقدم" : "مبتدئ"}</h4>
                          <p className="text-sm text-gray-500 mt-2">
                            {totalVolunteerHours >= 50 
                              ? "رائع! أنت متطوع متقدم الآن. واصل العطاء!" 
                              : `تحتاج إلى ${50 - totalVolunteerHours} ساعة إضافية للوصول للمستوى المتقدم`}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Completed Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center mb-6">
                  <FaClipboardCheck className="text-[#fa9e1b] text-xl ml-3" />
                  <h2 className="text-xl font-bold text-[#31124b]">المشاريع التي تطوعت فيها</h2>
                </div>

                {completedProjects.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">المشروع</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">التاريخ</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">الساعات</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">الحالة</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">التفاصيل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedProjects.map((project, index) => (
                          <motion.tr 
                            key={project.id}
                            variants={itemVariants}
                            className="border-b hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4 font-medium text-[#31124b]">{project.title}</td>
                            <td className="py-4 px-4 text-gray-600">{project.date}</td>
                            <td className="py-4 px-4">
                              <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-sm">
                                {project.hours} ساعات
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button className="text-[#fa9e1b] hover:text-[#31124b] transition-colors">
                                عرض التفاصيل
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <FaClipboardCheck className="text-gray-300 text-4xl mx-auto mb-3" />
                    <h3 className="text-gray-500 font-medium mb-2">لم تشارك في أي مشاريع بعد</h3>
                    <p className="text-gray-400 text-sm mb-4">ابدأ رحلتك التطوعية الآن!</p>
                    <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-lg hover:bg-[#e89018] transition-colors">
                      استكشف فرص التطوع
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Available Projects Tab */}
            {activeTab === 'available' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaRegClock className="text-[#fa9e1b] text-xl ml-3" />
                    <h2 className="text-xl font-bold text-[#31124b]">مشاريع متاحة للتطوع</h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-[#31124b]/10 text-[#31124b] px-3 py-1 rounded-full">
                      عرض الكل
                    </button>
                    <button className="text-xs bg-[#fa9e1b]/10 text-[#fa9e1b] px-3 py-1 rounded-full">
                      الأقرب إليك
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableProjects.map((project, index) => (
                    <motion.div 
                      key={project.id}
                      variants={itemVariants}
                      className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="border-b bg-gray-50 px-4 py-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-[#31124b]">{project.title}</h3>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            {project.estimatedHours} ساعات
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <FaClock className="ml-2 text-[#fa9e1b]" />
                          <span>التاريخ: {project.date}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <FaMapMarkerAlt className="ml-2 text-[#fa9e1b]" />
                          <span>الموقع: {project.address|| 'غير محدد'}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <button className="text-[#31124b] hover:text-[#fa9e1b] text-sm transition-colors">
                            عرض التفاصيل
                          </button>
                          <button className="bg-[#fa9e1b] text-white px-4 py-2 rounded-lg hover:bg-[#e89018] transition-colors text-sm">
                            تطوع الآن
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {availableProjects.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <FaRegClock className="text-gray-300 text-4xl mx-auto mb-3" />
                    <h3 className="text-gray-500 font-medium mb-2">لا توجد مشاريع متاحة حاليًا</h3>
                    <p className="text-gray-400 text-sm">ترقب مشاريع جديدة قريبًا</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Reported Issues Tab */}
            {activeTab === 'issues' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="text-[#fa9e1b] text-xl ml-3" />
                    <h2 className="text-xl font-bold text-[#31124b]">المشاكل المبلغ عنها</h2>
                  </div>
                  <button className="bg-[#31124b] text-white px-4 py-2 rounded-lg hover:bg-[#25093b] transition-colors flex items-center">
                    <FaExclamationTriangle className="ml-2" />
                    الإبلاغ عن مشكلة
                  </button>
                </div>
                
                {reportedIssues.length > 0 ? (
                  <div className="space-y-4">
                    {reportedIssues.map((issue, index) => (
                      <motion.div 
                        key={issue.id}
                        variants={itemVariants}
                        className={`border rounded-xl overflow-hidden ${
                          issue.status === 'تمت المعالجة' 
                            ? 'bg-green-50 border-green-200' 
                            : issue.status === 'قيد المعالجة'
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-[#31124b]">{issue.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{issue.description || 'لا يوجد وصف'}</p>
                              <div className="flex items-center mt-3 text-xs text-gray-500">
                                <span className="ml-4">تاريخ الإبلاغ: {issue.date}</span>
                                <span>رقم البلاغ: #{issue.id}</span>
                              </div>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(issue.status)}`}>
                                {issue.status}
                              </span>
                            </div>
                          </div>
                          
                          {issue.responseDate && (
                            <div className="mt-4 pt-3 border-t border-dashed">
                              <p className="text-sm text-gray-600 flex items-center">
                                <FaInfoCircle className="ml-2 text-blue-500" />
                                <span className="font-medium">رد الإدارة:</span>
                                <span className="mr-2">{issue.response || 'جاري معالجة المشكلة'}</span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                بتاريخ: {issue.responseDate}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <FaCheckCircle className="text-gray-300 text-4xl mx-auto mb-3" />
                    <h3 className="text-gray-500 font-medium mb-2">لا توجد مشاكل مبلغ عنها</h3>
                    <p className="text-gray-400 text-sm">شكرًا لمساهمتك في تحسين النظام</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#31124b] text-white p-6 mt-10">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-sm opacity-75">منصة التطوع © 2025</p>
            <div className="flex justify-center mt-2 space-x-4 space-x-reverse">
              <button className="hover:text-[#fa9e1b] transition-colors">المساعدة</button>
              <button className="hover:text-[#fa9e1b] transition-colors">الشروط والأحكام</button>
              <button className="hover:text-[#fa9e1b] transition-colors">سياسة الخصوصية</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
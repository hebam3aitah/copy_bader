// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function AdminNotificationPage() {
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const [type, setType] = useState('general');
//   const [severity, setSeverity] = useState('medium');

//   const sendNotification = async () => {
//     try {
//       await axios.post('/api/notifications', { title, message, type, severity });
//       toast.success('تم إرسال الإشعار بنجاح!');
//       setTitle('');
//       setMessage('');
//     } catch (err) {
//       console.error(err);
//       toast.error('فشل إرسال الإشعار');
//     }
//   };

//   return (
//     <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">إرسال إشعار جديد</h2>

//       <input 
//         className="border p-2 mb-4 w-full" 
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="عنوان الإشعار"
//       />

//       <textarea 
//         className="border p-2 mb-4 w-full" 
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="نص الإشعار"
//       />

//       <select 
//         className="border p-2 mb-4 w-full"
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//       >
//         <option value="general">عام</option>
//         <option value="project">مشروع جديد</option>
//         <option value="donation">تبرع</option>
//         <option value="volunteer">تطوع</option>
//         <option value="welcome">ترحيب</option>
//       </select>

//       <select 
//         className="border p-2 mb-6 w-full"
//         value={severity}
//         onChange={(e) => setSeverity(e.target.value)}
//       >
//         <option value="low">منخفض</option>
//         <option value="medium">متوسط</option>
//         <option value="high">عالي</option>
//       </select>

//       <button 
//         onClick={sendNotification}
//         className="bg-[#31124b] hover:bg-[#53386c] text-white px-4 py-2 rounded-md"
//       >
//         إرسال الإشعار
//       </button>
//     </div>
//   );
// }

import AdminNotificationPage from '@/app/components/AdminNotification';

export default function Page() {
    return <AdminNotificationPage />;
  }
  
"use client";

export default function ReportModal({ commentId, onClose }) {
  const submitReport = () => {
    // في التطبيق الحقيقي، ستقوم بإرسال البلاغ إلى الخادم
    alert("تم إرسال البلاغ بنجاح");
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#31124b]">الإبلاغ عن تعليق</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-4">يرجى اختيار سبب الإبلاغ:</p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="report-reason" className="ml-2" />
              <span>محتوى غير لائق</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="report-reason" className="ml-2" />
              <span>إساءة أو تحرش</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="report-reason" className="ml-2" />
              <span>معلومات مضللة</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="report-reason" className="ml-2" />
              <span>سبب آخر</span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <textarea 
            placeholder="تفاصيل إضافية (اختياري)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
            rows="3"
          />
        </div>
        
        <div className="flex justify-end space-x-3 space-x-reverse">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            إلغاء
          </button>
          <button 
            onClick={submitReport}
            className="px-4 py-2 bg-[#e08c18] text-white rounded-lg hover:bg-opacity-90"
          >
            إرسال البلاغ
          </button>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";

// export default function ReportModal({ commentId, onClose }) {
//   const [reason, setReason] = useState("");
//   const [details, setDetails] = useState("");

//   const submitReport = async () => {
//     if (!reason) {
//       alert("يرجى اختيار سبب الإبلاغ");
//       return;
//     }

//     try {
//       const res = await fetch("/api/reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           commentId,
//           reason,
//           details,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("فشل إرسال البلاغ");
//       }

//       alert("✅ تم إرسال البلاغ بنجاح");
//       onClose();
//     } catch (error) {
//       console.error("Report error:", error);
//       alert("حدث خطأ أثناء إرسال البلاغ");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-[#31124b]">الإبلاغ عن تعليق</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="mb-4">
//           <p className="text-gray-700 mb-4">يرجى اختيار سبب الإبلاغ:</p>
//           <div className="space-y-2">
//             {["محتوى غير لائق", "إساءة أو تحرش", "معلومات مضللة", "سبب آخر"].map((r) => (
//               <label key={r} className="flex items-center">
//                 <input
//                   type="radio"
//                   name="report-reason"
//                   className="ml-2"
//                   value={r}
//                   checked={reason === r}
//                   onChange={(e) => setReason(e.target.value)}
//                 />
//                 <span>{r}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4">
//           <textarea
//             placeholder="تفاصيل إضافية (اختياري)"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e08c18]"
//             rows="3"
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end space-x-3 space-x-reverse">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
//           >
//             إلغاء
//           </button>
//           <button
//             onClick={submitReport}
//             className="px-4 py-2 bg-[#e08c18] text-white rounded-lg hover:bg-opacity-90"
//           >
//             إرسال البلاغ
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

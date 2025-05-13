"use client";

import { useEffect, useState } from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports/all');
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error('فشل في تحميل البلاغات:', error);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذا البلاغ؟");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/reports/${id}`, {
        method: 'DELETE'
      });
      fetchReports();
    } catch (error) {
      console.error('فشل في حذف البلاغ:', error);
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم - بلاغات التعليقات 🚨</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">لا توجد بلاغات حالياً.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-white shadow rounded-lg p-4 border-r-4 border-[#e08c18]">
              <div className="flex items-center justify-between mb-2 text-[#31124b]">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold">بلاغ على تعليق #{report.commentId}</h3>
                </div>
                <button onClick={() => deleteReport(report._id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700"><span className="font-bold">السبب:</span> {report.reason}</p>
              {report.details && <p className="text-gray-600 mt-2">✏️ <span className="font-medium">تفاصيل:</span> {report.details}</p>}
              <p className="text-sm text-gray-400 mt-2">📅 {new Date(report.reportedAt).toLocaleString('ar-EG')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

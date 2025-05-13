
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AdminIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/Admin/issues');
      setIssues(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('فشل في جلب البلاغات');
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post('/api/Admin/approve-issue', { id });
      toast.success('تم قبول البلاغ وتحويله إلى مشروع');
      fetchIssues();
    } catch (err) {
      toast.error('فشل في القبول');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post('/api/Admin/reject-issue', { id });
      toast.success('تم رفض البلاغ');
      fetchIssues();
    } catch (err) {
      toast.error('فشل في الرفض');
    }
  };

  // تصفية البلاغات حسب الحالة والبحث
  const filteredIssues = issues
    .filter(issue => filter === 'all' || issue.status?.toLowerCase() === filter)
    .filter(issue => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        issue.problemType?.toLowerCase().includes(searchLower) ||
        issue.description?.toLowerCase().includes(searchLower) ||
        issue.location?.toLowerCase().includes(searchLower) ||
        issue.reporterName?.toLowerCase().includes(searchLower)
      );
    });

  // عدد البلاغات حسب الحالة للإحصائيات
  const issueStats = {
    all: issues.length,
    pending: issues.filter(issue => issue.status === 'pending').length,
    approved: issues.filter(issue => issue.status === 'approved').length,
    rejected: issues.filter(issue => issue.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      {/* الترويسة مع التدرج اللوني */}
      <div className="bg-gradient-to-r from-[#31124b] to-[#3d1a5e] shadow-lg py-4 px-6">
        <h1 className="text-2xl font-bold text-white">لوحة إدارة البلاغات</h1>
      </div>

      <div className="container mx-auto p-6">
        {/* بطاقات إحصائية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="جميع البلاغات" count={issueStats.all} color="#31124b" />
          <StatCard title="بلاغات معلقة" count={issueStats.pending} color="#f3a536" />
          <StatCard title="بلاغات مقبولة" count={issueStats.approved} color="#10b981" />
          <StatCard title="بلاغات مرفوضة" count={issueStats.rejected} color="#ef4444" />
        </div>

        {/* أدوات التصفية والبحث */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="font-medium text-gray-700 block mb-1">تصفية حسب الحالة</label>
                <div className="flex gap-2">
                  <FilterButton 
                    active={filter === 'all'} 
                    onClick={() => setFilter('all')}
                    count={issueStats.all}
                    color="#31124b"
                  >
                    الكل
                  </FilterButton>
                  <FilterButton 
                    active={filter === 'pending'} 
                    onClick={() => setFilter('pending')}
                    count={issueStats.pending}
                    color="#f3a536"
                  >
                    معلقة
                  </FilterButton>
                  <FilterButton 
                    active={filter === 'approved'} 
                    onClick={() => setFilter('approved')}
                    count={issueStats.approved}
                    color="#10b981"
                  >
                    مقبولة
                  </FilterButton>
                  <FilterButton 
                    active={filter === 'rejected'} 
                    onClick={() => setFilter('rejected')}
                    count={issueStats.rejected}
                    color="#ef4444"
                  >
                    مرفوضة
                  </FilterButton>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <label className="font-medium text-gray-700 block mb-1">بحث</label>
              <input
                type="text"
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#31124b] focus:border-transparent"
                placeholder="ابحث عن بلاغ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-9">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* جدول البلاغات */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-[#fa9e1b] border-t-[#31124b] rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">جاري تحميل البلاغات...</p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="mt-4 text-lg text-gray-600">لا توجد بلاغات لعرضها</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="bg-gradient-to-r from-[#31124b] to-[#3d1a5e] text-white">
                    <th className="px-4 py-3 font-medium">العنوان</th>
                    <th className="px-4 py-3 font-medium">الوصف</th>
                    <th className="px-4 py-3 font-medium">الموقع</th>
                    <th className="px-4 py-3 font-medium">الخطورة</th>
                    <th className="px-4 py-3 font-medium">الصور</th>
                    <th className="px-4 py-3 font-medium">صاحب البلاغ</th>
                    <th className="px-4 py-3 font-medium">رقم الهاتف</th>
                    <th className="px-4 py-3 font-medium">الحالة</th>
                    <th className="px-4 py-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIssues.map((issue, index) => (
                    <tr 
                      key={issue._id} 
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3">{issue.problemType}</td>
                      <td className="px-4 py-3 max-w-xs truncate" title={issue.description}>
                        {issue.description}
                      </td>
                      <td className="px-4 py-3">{issue.location}</td>
                      <td className="px-4 py-3">
                        <SeverityBadge level={issue.severityLevel} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {issue.images?.slice(0, 2).map((img, i) => (
                            <div key={i} className="relative group">
                              <div className="w-14 h-14 rounded-md border border-gray-200 bg-gray-50 overflow-hidden">
                                <img
                                  src={img.url}
                                  alt="صورة"
                                  className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition duration-300"
                                  onClick={() => setSelectedImage(img.url)}
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-md">
                                <div className="bg-white/70 p-1 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#31124b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {issue.images?.length > 2 && (
                          <button
                            className="mt-2 flex items-center text-[#31124b] hover:text-[#fa9e1b] text-xs font-medium bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-md border border-gray-200 transition-colors"
                            onClick={() => setShowAllImages(issue.images.map(img => img.url))}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            عرض {issue.images.length - 2}+ صورة أخرى
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">{issue.reporterName}</td>
                      <td className="px-4 py-3">{issue.phone}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={issue.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {issue.status === 'pending' && (
                            <>
                              <button
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-1"
                                onClick={() => handleApprove(issue._id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                قبول
                              </button>
                              <button
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-1"
                                onClick={() => handleReject(issue._id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                رفض
                              </button>
                            </>
                          )}
                          <button
                            className="bg-gradient-to-r from-[#31124b] to-[#3d1a5e] hover:from-[#3d1a5e] hover:to-[#31124b] text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-1"
                            onClick={() => router.push(`/dashboard/issues/${issue._id}/edit`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            تعديل
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal لعرض صورة واحدة */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-xl bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-white/50 to-transparent">
              <h3 className="text-white font-medium">عرض الصورة</h3>
              <button
                className="bg-white/90 rounded-full p-2 hover:bg-white transition"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-[#f8f8f8] h-full flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt="صورة مكبرة"
                className="max-w-full max-h-[80vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal لعرض كل الصور */}
      {showAllImages.length > 0 && (
        <div
          className="fixed inset-0  backdrop-blur-3xl bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAllImages([])}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#31124b] to-[#3d1a5e] text-white">
              <h3 className="text-xl font-medium">معرض الصور</h3>
              <button
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                onClick={() => setShowAllImages([])}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {showAllImages.map((url, index) => (
                  <div key={index} className="relative bg-gray-50 rounded-md border border-gray-200 aspect-square group cursor-pointer overflow-hidden">
                    <img
                      src={url}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onClick={() => setSelectedImage(url)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-3">
                      <button
                        className="bg-white/90 text-[#31124b] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-white transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(url);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        عرض
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// مكونات إضافية للواجهة

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      text: "معلقة",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    approved: {
      text: "مقبولة",
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    rejected: {
      text: "مرفوضة",
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${config.bgClass} ${config.textClass} text-xs font-medium`}>
      {config.icon}
      <span className="mr-1">{config.text}</span>
    </span>
  );
};

const SeverityBadge = ({ level }) => {
  const severityConfig = {
    "منخفضة": {
      color: "bg-blue-100 text-blue-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    "متوسطة": {
      color: "bg-yellow-100 text-yellow-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    "عالية": {
      color: "bg-red-100 text-red-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    "حرجة": {
      color: "bg-red-100 text-red-800 border border-red-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  };

  const config = severityConfig[level] || {
    color: "bg-gray-100 text-gray-800",
    icon: null
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${config.color} text-xs font-medium`}>
      {config.icon}
      <span className="mr-1">{level}</span>
    </span>
  );
};

const StatCard = ({ title, count, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-t-4" style={{ borderColor: color }}>
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold mt-2" style={{ color }}>{count}</p>
    </div>
  );
};

const FilterButton = ({ active, onClick, children, count, color }) => {
  return (
    <button
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1
        ${active 
          ? `bg-gradient-to-r from-[#31124b] to-[#3d1a5e] text-white shadow-sm` 
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      onClick={onClick}
    >
      {children}
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
        {count}
      </span>
    </button>
  );
};
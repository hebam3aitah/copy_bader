'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditIssuePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: '',
    category: '',
    images: [],
    reporterName: '',
    reporterPhone: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const res = await axios.get(`/api/Admin/issues/${id}`);
      setFormData(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('فشل في جلب بيانات البلاغ');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/Admin/update-issue', { id, ...formData });
      toast.success('تم تحديث البلاغ بنجاح');
      router.push('/dashboard/issues');
    } catch (err) {
      toast.error('فشل في تحديث البلاغ');
    }
  };

  if (loading) return <p className="p-6">جاري التحميل...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      <h1 className="text-2xl font-bold mb-4 text-[#31124b]">تعديل البلاغ</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* ✅ الاسم */}
        <div>
          <label className="block mb-1">الاسم</label>
          <input
            value={formData.reporterName}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* ✅ رقم الهاتف */}
        <div>
          <label className="block mb-1">رقم الهاتف</label>
          <input
            value={formData.reporterPhone}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* ✅ نوع المشكلة */}
        <div>
          <label className="block mb-1">نوع المشكلة</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* ✅ مكان المشكلة */}
        <div>
          <label className="block mb-1">الموقع</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* ✅ درجة الخطورة */}
        <div>
          <label className="block mb-1">درجة الخطورة</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">اختر</option>
            <option value="high">مرتفعة</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>

        {/* ✅ وصف المشكلة */}
        <div>
          <label className="block mb-1">وصف المشكلة</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        {/* ✅ عرض الصور */}
        {formData.images?.length > 0 && (
          <div>
            <label className="block mb-1">صور المشكلة</label>
            <div className="flex gap-3 flex-wrap">
              {formData.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="صورة"
                  className="w-32 h-32 object-cover border rounded"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}

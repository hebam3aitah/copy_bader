// ✅ صفحة إدارة المشاريع للأدمن مع خيار تعديل الحالة
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminProjectsDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('فشل تحميل المشاريع:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('هل أنت متأكد من حذف هذا المشروع؟');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error('فشل في حذف المشروع:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/projects/${id}`, { status: newStatus });
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error('فشل في تعديل الحالة:', err);
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-[#31124b] mb-6">إدارة المشاريع</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">لا توجد مشاريع حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow p-4 space-y-2">
              <h2 className="text-xl font-bold text-[#31124b]">{project.title}</h2>
              <p className="text-sm text-gray-700">{project.description}</p>
              <p className="text-sm">📍 الموقع: {project.location}</p>
              <p className="text-sm">📂 التصنيف: {project.category?.name || 'غير محدد'}</p>
              <p className="text-sm">⚠️ الأولوية: {project.priority}</p>

              {/* ✅ تغيير الحالة */}
              <div className="text-sm">
                🛠 الحالة:
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(project._id, e.target.value)}
                  className="ml-2 border px-2 py-1 rounded"
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="in-progress">قيد التنفيذ</option>
                  <option value="completed">مكتمل</option>
                </select>
              </div>

              <div className="flex gap-2 mt-3">
                <Link
                  href={`/dashboard/projects/${project._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

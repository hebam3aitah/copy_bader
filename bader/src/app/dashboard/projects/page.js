'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from 'react-toastify';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/Admin/projects', {
        params: statusFilter !== 'all' ? { status: statusFilter } : {},
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects', err);
      toast.error('فشل في تحميل المشاريع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    try {
      await axios.delete(`/api/Admin/projects/${id}`);
      toast.success('تم حذف المشروع بنجاح');
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error('فشل في حذف المشروع');
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6">إدارة المشاريع</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">فلترة حسب الحالة:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="all">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <FiLoader className="animate-spin text-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="border rounded-lg p-4 shadow bg-white">
              <img
                src={project.mainImage || '/placeholder.png'}
                alt={project.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-1">الحالة: {project.status}</p>
              <p className="text-sm text-gray-500 mb-1">النسبة: {project.progress || 0}%</p>
              <p className="text-sm text-gray-500 mb-2">
                تاريخ الإضافة: {format(new Date(project.createdAt), 'dd MMMM yyyy', { locale: ar })}
              </p>
              <div className="flex gap-3 mt-2">
                <button className="text-blue-600 hover:underline flex items-center gap-1">
                  <FiEdit />
                  تعديل
                </button>
                <button
                  className="text-red-600 hover:underline flex items-center gap-1"
                  onClick={() => handleDelete(project._id)}
                >
                  <FiTrash2 />
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

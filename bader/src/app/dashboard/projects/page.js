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
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: '' });
  const [saving, setSaving] = useState(false);

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

  const handleEdit = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      status: project.status || 'pending',
    });
  };

  const handleFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    setSaving(true);
    try {
      await axios.put(`/api/Admin/projects/${editingProject._id}`, editForm);
      toast.success('تم تحديث المشروع بنجاح');
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error('فشل في تحديث المشروع');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setEditingProject(null);
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
                src={
                  Array.isArray(project.images) && project.images.length > 0
                    ? project.images[0]
                    : '/placeholder.png'
                }
                alt={project.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-1">الحالة: {project.status}</p>
              <p className="text-sm text-gray-500 mb-1">النسبة: {project.progress || 0}%</p>
              <p className="text-sm text-gray-500 mb-2">
                تاريخ الإضافة: {project.createdAt
                  ? format(new Date(project.createdAt), 'dd MMMM yyyy', { locale: ar })
                  : '---'}
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  className="text-blue-600 hover:underline flex items-center gap-1"
                  onClick={() => handleEdit(project)}
                >
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

      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">تعديل المشروع</h3>
            <div className="mb-3">
              <label className="block mb-1">العنوان</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">الوصف</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                rows={3}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">الحالة</label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="pending">قيد الانتظار</option>
                <option value="in-progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
              onClick={handleSaveEdit}
              disabled={saving}
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const fetchProjects = async () => {
  try {
    setLoading(true);
    const res = await axios.get('/api/Admin/projects', {
      params: statusFilter !== 'all' ? { status: statusFilter } : {},
      withCredentials: true
    });
    setProjects(res.data);
  } catch (err) {
    console.error('Failed to load projects', err);
    toast.error('فشل في تحميل المشاريع');
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
  try {
    await axios.delete(`/api/Admin/projects/${id}`, {
      withCredentials: true
    });
    toast.success('تم حذف المشروع بنجاح');
    fetchProjects();
  } catch (err) {
    console.error(err);
    toast.error('فشل في حذف المشروع');
  }
}; 
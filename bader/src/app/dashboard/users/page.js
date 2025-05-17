
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { unparse } from "papaparse";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchUsers = async () => {
    const res = await axios.get(
      `/api/Admin/users?role=${roleFilter}&search=${search}&page=${page}&limit=${limit}`
    );
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, search, page]);

  const changeRole = async (userId, newRole) => {
    await axios.patch(`/api/Admin/users/${userId}/role`, { role: newRole });
    fetchUsers();
  };

  const approveVolunteer = async (requestId) => {
    await axios.patch(`/api/Admin/volunteer-requests/${requestId}`, {
      status: "approved",
    });
    fetchUsers();
  };

  const exportToCSV = () => {
    const csv = unparse(
      users.map((u) => ({
        "الاسم": u.name,
        "البريد الإلكتروني": u.email,
        "الهاتف": u.phone,
        "الدور": u.role,
        "عدد المشاريع المُبلغ عنها": u.reportedProjectsCount,
        "ساعات التطوع": u.volunteeredHours,
      }))
    );
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users-arabic.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", format: "a4" });
    doc.setFont("helvetica");
    autoTable(doc, {
      head: [["الاسم", "البريد", "الهاتف", "الدور", "عدد المشاريع", "ساعات التطوع"]],
      body: users.map((u) => [
        u.name,
        u.email,
        u.phone,
        u.role,
        u.reportedProjectsCount,
        u.volunteeredHours,
      ]),
      styles: { font: "helvetica", halign: "right" },
      headStyles: { fillColor: [22, 160, 133], textColor: 255 },
      margin: { top: 20 },
    });
    doc.save("users-arabic.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">إدارة المستخدمين</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-medium">تصفية حسب الدور:</label>
          <select
            value={roleFilter}
            onChange={(e) => {
              setPage(1);
              setRoleFilter(e.target.value);
            }}
            className="border px-3 py-1 rounded"
          >
            <option value="all">الكل</option>
            <option value="user">مستخدم</option>
            <option value="volunteer">متطوع</option>
            <option value="admin">أدمن</option>
            <option value="donor">متبرع</option>
            <option value="supporter">داعم</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد..."
            className="border px-3 py-1 rounded"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            تصدير CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            تصدير PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold">{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🎖️ الدور: {user.role}</p>
            <p>⏱️ ساعات التطوع: {user.volunteeredHours} ساعة</p>
            <p>📋 عدد المشاريع المبلغ عنها: {user.reportedProjectsCount}</p>

            <div className="mt-2 space-x-2 rtl:space-x-reverse">
              {["user", "volunteer", "admin", "donor", "supporter"].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRole(user._id, r)}
                  className={`px-3 py-1 text-sm rounded border ${
                    user.role === r
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {user.volunteerRequests?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold">طلبات التطوع:</h4>
                {user.volunteerRequests.map((req) => (
                  <div key={req.projectId} className="border p-2 mt-2 rounded">
                    <p>📌 المشروع: {req.projectName}</p>
                    <p>الحالة: {req.status}</p>
                    {req.status === "pending" && (
                      <button
                        onClick={() => approveVolunteer(req._id)}
                        className="px-3 py-1 mt-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        الموافقة على التطوع
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          السابق
        </button>
        <span className="px-3 py-2">{`الصفحة ${page} من ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/Admin/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const changeRole = async (userId, newRole) => {
    await axios.patch(`/api/Admin/users/${userId}/role`, { role: newRole });
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  const approveVolunteer = async (requestId) => {
    await axios.patch(`/api/Admin/volunteer-requests/${requestId}`, { status: "approved" });
    setUsers((prev) =>
      prev.map((u) => ({
        ...u,
        volunteerRequests: u.volunteerRequests.map((req) =>
          req._id === requestId ? { ...req, status: "approved" } : req
        ),
      }))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">إدارة المستخدمين</h2>
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
              {["user", "volunteer", "Admin"].map((r) => (
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
    </div>
  );
}

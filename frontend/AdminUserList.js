// AdminUserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // token lưu khi login
      const res = await axios.get("http://localhost:5000/users", {
        headers: { token: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Bạn không có quyền truy cập");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { token: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.log(err);
      alert("Xóa user thất bại");
    }
  };

  return (
    <div>
      <h2>Danh sách User</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;

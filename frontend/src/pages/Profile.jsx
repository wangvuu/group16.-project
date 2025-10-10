// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // đổi nếu backend dùng /api

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setMsg('Bạn chưa đăng nhập');
      return;
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Lỗi fetch profile');
      setUser(data.user);
      setForm({
        name: data.user.name || '',
        phone: data.user.phone || '',
        address: data.user.address || ''
      });
    } catch (err) {
      console.error(err);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setUser(data.user);
      setMsg('Cập nhật thành công');
    } catch (err) {
      console.error(err);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  if (!token) return <div>Vui lòng đăng nhập để xem trang này.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h2>Profile</h2>
      {loading && <div>Đang tải...</div>}
      {msg && <div style={{ color: 'green' }}>{msg}</div>}
      {user && (
        <div style={{ marginBottom: 20 }}>
          <strong>Email:</strong> {user.email} <br />
          <strong>Tên:</strong> {user.name} <br />
          <strong>Số điện thoại:</strong> {user.phone || '-'} <br />
          <strong>Địa chỉ:</strong> {user.address || '-'} <br />
          {user.avatar && <img src={user.avatar} alt="avatar" style={{ width: 120, borderRadius: 8, marginTop: 8 }} />}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Số điện thoại</label><br />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Địa chỉ</label><br />
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>Cập nhật</button>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // Lấy dữ liệu từ backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧍 Danh sách người dùng</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <h2>📝 Thêm người dùng mới</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Nhập tên..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default App;

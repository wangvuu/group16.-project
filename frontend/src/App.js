import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // Lấy danh sách khi load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Lỗi lấy danh sách:', error);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post('/api/todos', { title });
      setTodos([...todos, res.data]);
      setTitle('');
    } catch (error) {
      console.error('Lỗi thêm todo:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Danh sách công việc</h1>

      <input
        type="text"
        value={title}
        placeholder="Nhập công việc..."
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Thêm</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

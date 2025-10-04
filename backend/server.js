const express = require('express');
const app = express();

// DÒNG NÀY BẮT BUỘC
app.use(express.json()); // <-- Đọc dữ liệu JSON từ body

// Import route
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

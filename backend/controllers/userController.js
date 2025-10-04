// Mảng tạm người dùng (lưu trong bộ nhớ)
let users = [];

// GET /users
const getUsers = (req, res) => {
  res.json(users);
};

// POST /users
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Tên và email là bắt buộc' });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
};

module.exports = { getUsers, createUser };

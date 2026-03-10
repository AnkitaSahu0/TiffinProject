// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/api/auth/register", (req, res) => {
//   const { name, email, password } = req.body;

//   res.json({
//     message: "User registered successfully",
//     user: { name, email, role: "customer" },
//   });
// });

// app.post("/api/auth/login", (req, res) => {
//   const { name,email, password } = req.body;

//   res.json({
//     token: "fake-jwt-token",
//     user: { name, email, role: "customer" },
//   });
// });

// app.listen(5000, () => {
//   console.log("✅ Server running on http://localhost:5000");
// });


const express = require("express");
const cors = require("cors");

const app = express();
app.get("/", (req, res) => {
  res.send("Tiffin Backend API Running");
});

app.use(cors());
app.use(express.json());

// 🗂 Temporary in-memory users storage
let users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    address: "",
    phone: "",
  },
];

/* ================= REGISTER ================= */
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: "customer",
    address: "",
    phone: "",
  };

  users.push(newUser);

  res.json({
    message: "User registered successfully",
  });
});

/* ================= LOGIN ================= */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const token = "token-" + user.id;

  // Save token in user
  user.token = token;

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
    },
    message: "Login successful",
  });
});

/* ================= UPDATE PROFILE ================= */
app.put("/api/users/update", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const token = authHeader.split(" ")[1];

  // Extract ID from token
  const userId = token.split("-")[1];
// if user is logged in and token is valid, find the user
  const user = users.find((u) => u.id == userId);

  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const { name, email, address, phone, password } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (phone) user.phone = phone;
  if (password) user.password = password;

  res.json({
    message: "Profile updated successfully",
    user,
  });
});

/* ================= START SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
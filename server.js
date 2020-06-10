const express = require("express");
const db = require("./data.js");

const server = express();

server.use(express.json());

// Get Requests

server.get("/api/users", (req, res) => {
  const user = db.getUsers();
  if (!user) {
    return res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  } else {
    return res.json(user);
  }
});

server.get("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// Delete
server.delete("/api/users/:id", (req, res) => {
  const user = db.deleteUser(req.params.id);
  if (user) {
    db.deleteUser(user.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// POST
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Need a Name and Bio",
    });
  }
  const newUser = db.createUser({
    name: res.body.name,
    bio: res.body.bio,
  });
  res.status(201).json(newUser);
});

// Put

server.put("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);
  if (user) {
  }
});

server.listen(5000, () => {
  console.log("server started on port 5000");
});

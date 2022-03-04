const bcryptjs = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcryptjs.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "Hamza",
    email: "hamzaig@yahoo.com",
    password: bcryptjs.hashSync("12345678", 10),
  },
  {
    name: "azeez",
    email: "azeez@gmail.com",
    password: bcryptjs.hashSync("12345678", 10),
  },
];


module.exports = users;
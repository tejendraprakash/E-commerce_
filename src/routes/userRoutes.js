const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/userHandler");

router.get("/", userHandler.getAllUsers);
router.get("/:id", userHandler.getUserById);
router.post("/", userHandler.createUser);
router.put("/:id", userHandler.updateUser);
router.delete("/:id", userHandler.deleteUser);

module.exports = router;

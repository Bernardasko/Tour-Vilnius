const express = require("express");
const userControler = require("../controllers/userController");
const authControler = require("../controllers/authController");

const { signup, login } = authControler;

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);


module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/all",userController.getall);
router.post("",userController.create);
router.put("/:id",userController.update);
router.delete("/:id",userController.delete);

router.post("/login",userController.login);
router.get("/me",userController.me);



module.exports = router;
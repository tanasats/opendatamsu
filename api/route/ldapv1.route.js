const express = require("express");
const router = express.Router();
const ldapController = require("../controller/ldap.controller");
const {authjwt} = require("../middleware/auth");


router.get("/hello",(req,res)=>{
	res.json("hello ldap service");
});
router.get("/test",ldapController.test);
router.get("/testtoken",authjwt.verifyToken,ldapController.testtoken);
router.post("/login",ldapController.login);
router.post("/info",ldapController.entryInfo);



module.exports = router;
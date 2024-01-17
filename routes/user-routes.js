const express = require('express');
const { UserContoller } = require('../controller/user-controller');

const router = express.Router();
const userContoller = new UserContoller();

router.get("/",userContoller.getAllUsers);
router.post("/addUser",userContoller.addUser);
router.delete("/deleteUser/:_id",userContoller.deleteUser);
router.delete("/deleteAllUsers",userContoller.deleteAllUsers);

module.exports = router;
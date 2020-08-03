const router = require("express").Router();
const {createUser, login} = require("../controller/userDetails");
const { createTask, 
    viewTaskById, 
    updateTaskById, 
    deleteTaskById, 
    viewAllTask } = require("../controller/todos");

const { registerValidation, loginValidation } = require("../validation/validation");
const { checkToken } = require("../verifyToken/verify");

router.post("/register",registerValidation, createUser);
router.post("/login", loginValidation,  login);
router.get("/getAll", checkToken, viewAllTask);
router.get("/getMeeting/:_id", checkToken, viewTaskById);
router.post("/addTask", checkToken, createTask);
router.put("/update/:_id", checkToken, updateTaskById);
router.delete("/delete/:_id", checkToken, deleteTaskById);

module.exports = router;
const express =require("express");
const router=express.Router();
const studentController=require("../controllers/studentscontroller");
 router.get("/",studentController.view);

 router.get("/adduser",studentController.adduser);
 router.post("/adduser",studentController.save);
 
router.get("/edituser/:id",studentController.edituser);
router.post("/edituser/:id",studentController.edit);

router.get("/Deleteuser/:id",studentController.Delete);
 module.exports=router;
import { Router } from "express";
import { signin, signup } from "../controllers/authController";
import { content, deleteContent, shareBrain, shareBrainId, type } from "../controllers/crudController";
import { userMiddleware } from "../middleware/middleware";

 const router = Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/content",userMiddleware ,content);
// router.get("/newcontent",userMiddleware ,NewContent);
router.post("/filter/type",userMiddleware ,type);


router.delete("/content",userMiddleware, deleteContent);
router.post("/brain/share" ,userMiddleware,shareBrain);
router.get("/brain/:shareLink",shareBrainId)


export default router


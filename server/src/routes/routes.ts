import { Router } from "express";
import { signin, signup } from "../controllers/authController";
import { addContent,allcontent,deleteContent, shareBrain, shareBrainId, type } from "../controllers/crudController";
import { userMiddleware } from "../middleware/middleware";

 const router = Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/content",userMiddleware ,allcontent);
router.post("/addcontent",userMiddleware ,addContent);
router.get("/filter/type" ,type);


router.delete("/delete-content", deleteContent);
router.post("/brain/share" ,userMiddleware,shareBrain);
router.get("/brain/:shareLink",userMiddleware,shareBrainId)


export default router


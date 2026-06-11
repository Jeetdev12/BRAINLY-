import { Router } from "express";
import { signin, signup, updateUser } from "../controllers/authController";
import {
  addContent,
  allcontent,
  deleteContent,
  shareBrain,
  shareBrainId,
  filterByType,
} from "../controllers/crudController";
import { userMiddleware } from "../middleware/middleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/update", updateUser);

router.get("/content", userMiddleware, allcontent);
router.post("/addcontent", userMiddleware, addContent);

router.get("/filter", userMiddleware, filterByType);

router.delete("/delete-content", userMiddleware, deleteContent);

router.post("/brain/share", userMiddleware, shareBrain);
router.get("/brain/:shareLink", shareBrainId);

export default router;
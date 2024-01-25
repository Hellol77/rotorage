import { Router } from "express";
import { checkAdmin } from "../controllers/admin/checkAdmin";
import { getReportedPosts } from "../controllers/admin/getReportedPosts";
import { getReportedComments } from "../controllers/admin/getReportedComments";

const adminRouter = Router();

adminRouter.get("/", checkAdmin);
adminRouter.get("/post/:page", getReportedPosts);
adminRouter.get("/comment/:page", getReportedComments);
export { adminRouter };

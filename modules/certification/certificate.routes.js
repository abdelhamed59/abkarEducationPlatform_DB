import express from "express";
import { protectRoute } from "../../middleware/verifyToken.js";
import { generateCertificate, getUserCertificates } from "./certificate.controller.js";


const certificateRoutes = express.Router();

// Route to generate a certificate after completing a test
certificateRoutes.get("/generate/:testId",protectRoute, generateCertificate);

// Route to fetch all certificates for the logged-in user
certificateRoutes.get("/userCertificate", protectRoute, getUserCertificates);

export default certificateRoutes;

import { certificateModel } from "../../DB/models/certificate.model.js";
import { testModel } from "../../DB/models/test.model.js";
import { userModel } from "../../DB/models/user.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import AppError from "../../utili/appError.js";
import PDFDocument from "pdfkit"

 const generateCertificate = handleError(async (req, res, next) => {
  const { testId } = req.params;
  const userId = req.user.id;
console.log(testId);

  const user = await userModel.findById(userId).select("name email");
  const test = await testModel.findById(testId).select("title");

  if (!user || !test) {
    return next(new AppError("User or Test not found", 404));
  }

  const existingCertificate = await certificateModel.findOne({ userId, testId });
  if (!existingCertificate) {
    await certificateModel.create({ userId, testId });
  }

  const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${user.name}-certificate.pdf"`);
    doc.pipe(res);

    // Background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f3f3f3");

    // Border
    const margin = 20;
    doc.lineWidth(3)
      .rect(margin, margin, doc.page.width - margin * 2, doc.page.height - margin * 2)
      .stroke("#000");

    // Certificate Title
    doc.fontSize(36)
      .fillColor("#333")
      .font("Helvetica-Bold")
      .text("Certificate of Achievement", { align: "center", underline: true })
      .moveDown(2);

    // Recipient Name
    doc.fontSize(30)
      .fillColor("#000")
      .font("Helvetica")
      .text(`${user.name}`, { align: "center" })
      .moveDown(1);

    // Description
    doc.fontSize(20)
      .fillColor("#555")
      .font("Helvetica")
      .text(`For successfully completing the test titled:`, { align: "center" })
      .moveDown(0.5)
      .fontSize(25)
      .fillColor("#000")
      .font("Helvetica-Bold")
      .text(`"${test.title}"`, { align: "center" })
      .moveDown(2);

    // Completion Date
    const completionDate = new Date().toLocaleDateString();
    doc.fontSize(16)
      .fillColor("#333")
      .font("Helvetica")
      .text(`Date of Completion: ${completionDate}`, { align: "center" })
      .moveDown(2);

    // Signature Line
    doc.moveTo(50, doc.page.height - 100)
      .lineTo(doc.page.width - 50, doc.page.height - 100)
      .stroke("#000");

    doc.fontSize(16)
      .fillColor("#000")
      .text("Authorized Signature", doc.page.width - 200, doc.page.height - 90);

    // End the document
    doc.end();

})


  


 const getUserCertificates = async (req, res, next) => {
    const userId = req.user.id;
  
    const certificates = await certificateModel
      .find({ userId })
      .populate("testId", "title")
      .sort({ issuedDate: -1 });
  
    res.status(200).json({
      message: "Certificates fetched successfully",
      certificates,
    });
  };
  

export{
    generateCertificate,
    getUserCertificates
}

import path from "path";
import fs from "fs";
import { generateCareplanReport } from "../utils/generateCareplanReport.js";
import { getUserWithPractice } from "../services/userService.js"; // Import the function that fetches user and practice
import { getTreatmentlistOnlyService } from "../services/conditionService.js";
import { getConditionByIdService } from "../services/conditionService.js";

export const generate = async (req, res) => {
  try {
    const { userid, conditionName, practiceid, careplanData } = req.body;

    // Generate dynamic file name based on condition name
    const timestamp = Date.now();
    const fileName = `careplan-report-${userid}-${timestamp}.pdf`; // Unique file name
    const filePath = path.resolve("public/reports/careplan", fileName); // Ensure correct file path

    const user = await getUserWithPractice(userid);
    const practice = user.Practice || {}; // In case the user has no practice associated
    const practiceName = practice.practicename;
    const fullAddress = `${practice.address1}, ${practice.city}, ${practice.state}, ${practice.postalcode}`;
    const phoneNumber = practice.contactnumber;

    const area = conditionName.split("-")[0];
    const acondition = conditionName.split("-")[1];

    const aacondition = await getConditionByIdService(conditionName);

    const realACondition = conditionName.find("-")
      ? acondition
      : aacondition.acondition;

    const response = await getTreatmentlistOnlyService(area, acondition);

    const description =
      response.description ||
      "Pronation is the inward movement of the foot as it rolls to optimally distribute the force of impact on the ground as you run. With 'normal' pronation, the foot rolls inward about 15 percent, comes in complete contact with the ground, and can support your body weight without any problem. Pronation is critical to proper shock absorption, and it helps you push off evenly from the ball of the foot at the end of the gait cycle.";

    const bmimg = response.bmname || "Pronation";

    const treatmentsData = careplanData.treatmentsData; // Corrected
    const phasesData = careplanData.phasesData; // Corrected

    // Generate the PDF with dynamic data
    await generateCareplanReport(
      practiceName,
      fullAddress,
      phoneNumber,
      realACondition,
      bmimg,
      description,
      treatmentsData,
      phasesData,
      fileName
    );

    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("❌ Error sending PDF:", err);
      }
    });
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
  }
};

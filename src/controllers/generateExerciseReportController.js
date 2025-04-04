import path from "path";
import fs from "fs";
import { generateExerciseReport } from "../utils/generateExerciseReport.js";
import { getUserWithPractice } from "../services/userService.js"; // Import the function that fetches user and practice
import { getProtExerciseWithPracIDnProtIDService } from "../services/protexerciseService.js";
import { getNamenBMnameByIdService } from "../services/exerciseService.js";
import { getEBProtExerciseWithProtIDService } from "../services/ebprotexerciseService.js";

export const generate = async (req, res) => {
  try {
    const { userid, conditionName, practiceid, protocolid, type } = req.body;

    // Generate dynamic file name based on condition name
    const timestamp = Date.now();
    const fileName = `exercise-report-${userid}-${timestamp}.pdf`; // Unique file name
    const filePath = path.resolve("public/reports/exercise", fileName); // Ensure correct file path

    const user = await getUserWithPractice(userid);
    const practice = user.Practice || {}; // In case the user has no practice associated
    const practiceName = practice.practicename;
    const fullAddress = `${practice.address1}, ${practice.city}, ${practice.state}, ${practice.postalcode}`;
    const phoneNumber = practice.contactnumber;

    let selectedExerciseData;

    if (type === "custom") {
      selectedExerciseData = await getProtExerciseWithPracIDnProtIDService(
        practiceid,
        protocolid
      );
    } else if (type === "ebp") {
      selectedExerciseData = await getEBProtExerciseWithProtIDService(
        protocolid
      );
    }

    const exerciseIDs = selectedExerciseData.map(
      (exercise) => exercise.exerciseid
    );
    const response = await getNamenBMnameByIdService(exerciseIDs);

    const exercises = selectedExerciseData.map((exercise, index) => ({
      name: response[index]?.name,
      bmname: response[index]?.bmname,
      instructions: exercise.instructions,
      hold: exercise.hold,
      repeat: exercise.repeat,
      timesperday: exercise.timesperday,
    }));

    // Generate the PDF with dynamic data
    await generateExerciseReport(
      practiceName,
      fullAddress,
      phoneNumber,
      conditionName,
      exercises,
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

import path from "path";

export const getReportByFilename = async (req, res) => {
  const { fileName } = req.params;

  let baseDir;

  if (fileName.startsWith("careplan")) {
    baseDir = "public/reports/careplan";
  } else if (fileName.startsWith("exercise")) {
    baseDir = "public/reports/exercise";
  } else {
    return res.status(400).json({ error: "Invalid filename prefix." });
  }

  const filePath = path.resolve(baseDir, fileName);

  res.contentType("application/pdf");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("❌ Error sending PDF:", err);
    }
  });
};

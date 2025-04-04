// Import required modules
import fs from "fs";
import PDFDocument from "pdfkit";

// Function to draw the header
const drawHeader = (
  doc,
  practiceName,
  fullAddress,
  phoneNumber,
  conditionName,
  fonts
) => {
  doc
    .font(fonts.practiceName)
    .fontSize(15)
    .text(`${practiceName}`, { align: "center" })
    .moveDown(0.2);

  doc
    .font(fonts.fullAddress)
    .fontSize(10)
    .text(`${fullAddress}`, { align: "center" })
    .moveDown(0.2)
    .text(`${phoneNumber}`, { align: "center" })
    .moveDown(2);

  doc.rect(40, doc.y - 5, doc.page.width - 80, 35).stroke();
  doc.moveDown(0.2);

  doc
    .font(fonts.conditionName)
    .fontSize(13)
    .text(`Condition: ${conditionName}`, { align: "center" })
    .moveDown(2);
};
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
// Function to draw care plans
const drawCareplans = (
  doc,
  condition,
  bmimg,
  description,
  treatmentsData,
  phasesData,
  fonts
) => {
  const imagePath = `public/assets/condition/${bmimg}.png`;
  let summaryBottomY = doc.y;
  if (fs.existsSync(imagePath)) {
    doc.image(imagePath, doc.x, doc.y, { width: 150 });
    summaryBottomY = doc.y + 120;
  } else {
    console.warn(`⚠️ Image not found: ${imagePath}`);
  }

  doc
    .font(fonts.practiceName)
    .fontSize(10)
    .text(`${condition}:`, 160, doc.y, {
      width: PAGE_WIDTH - 64 - 160,
      continued: true,
    })
    .font(fonts.fullAddress)
    .fontSize(9)
    .text(description)
    .moveDown(0.8);

  summaryBottomY = Math.max(summaryBottomY, doc.y);

  doc
    .font(fonts.practiceName)
    .fontSize(10)
    .text("Treatments", 32, summaryBottomY + 10)
    .moveDown(0.8);
  const treatMentX = doc.x;
  treatmentsData?.forEach((treatment) => {
    doc
      .font(fonts.practiceName)
      .fontSize(10)
      .text(`${treatment.name}: `, treatMentX + 10, doc.y, { continued: true })
      .font(fonts.fullAddress)
      .fontSize(10)
      .text(treatment.description)
      .moveDown(0.8);
  });

  doc
    .font(fonts.practiceName)
    .fontSize(10)
    .text("Phases of Care:", treatMentX, doc.y)
    .moveDown(0.8);

  phasesData?.forEach((phase) => {
    doc.font(fonts.practiceName).fontSize(10);
    const height1 = doc.heightOfString(`${phase.name}: `, {
      width: PAGE_WIDTH - 64 - treatMentX - 10,
    });

    const height2 = doc.heightOfString(
      `${phase.active} - ${phase.repeattime} for ${phase.duration}`,
      {
        width: PAGE_WIDTH - 64 - treatMentX - 10,
      }
    );
    doc.font(fonts.practiceName).fontSize(10);
    const height3 = doc.heightOfString(`${phase.description}`, {
      width: PAGE_WIDTH - 64 - treatMentX - 10,
    });
    let startY = doc.y;
    if (doc.y + height1 + height2 + height3 + 1.6 > PAGE_HEIGHT - 32) {
      startY = PAGE_HEIGHT + 16;
    }

    doc
      .font(fonts.practiceName)
      .fontSize(10)
      .text(`${phase.name}: `, treatMentX + 10, startY)
      .moveDown(0.8);
    doc
      .font(fonts.practiceName)
      .fontSize(10)
      .text(
        `${phase.active} - ${phase.repeattime} for ${phase.duration}`,
        treatMentX + 10,
        doc.y
      )
      .moveDown(0.8);
    doc
      .font(fonts.fullAddress)
      .fontSize(10)
      .text(`${phase.description}`, treatMentX + 10, doc.y)
      .moveDown(0.8);
  });
};

// Main function to generate and save the PDF
export const generateCareplanReport = async (
  practiceName,
  fullAddress,
  phoneNumber,
  condition,
  bmimg,
  description,
  treatmentsData,
  phasesData,
  fileName
) => {
  console.log("============");
  console.log(treatmentsData.length);

  console.log("+++++++++++");
  console.log(phasesData.length);

  return new Promise((resolve, reject) => {
    const filePath = `public/reports/careplan/${fileName}`;
    const fonts = {
      practiceName: "fonts/OpenSans-ExtraBold.ttf",
      fullAddress: "fonts/NotoSans-Medium.ttf",
      conditionName: "fonts/OpenSans-ExtraBoldItalic.ttf",
    };

    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 16, bottom: 16, left: 32, right: 32 },
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    drawHeader(doc, practiceName, fullAddress, phoneNumber, condition, fonts);

    doc.on("pageAdded", () => {
      drawHeader(doc, practiceName, fullAddress, phoneNumber, condition, fonts);
    });

    drawCareplans(
      doc,
      condition,
      bmimg,
      description,
      treatmentsData,
      phasesData,
      fonts
    );

    doc.end();

    stream.on("finish", () => {
      console.log(`✅ PDF successfully generated: ${filePath}`);
      resolve(true);
    });

    stream.on("error", (err) => {
      console.error(`❌ Error generating PDF: ${err.message}`);
      reject(false);
    });
  });
};

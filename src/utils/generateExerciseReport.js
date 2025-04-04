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
    .moveDown(1);

  doc
    .font(fonts.practiceName)
    .fontSize(13)
    .text("Exercise Report", { align: "center" })
    .moveDown(0.4);

  doc.rect(40, doc.y - 5, doc.page.width - 80, 35).stroke();
  doc.moveDown(0.2);

  doc
    .font(fonts.conditionName)
    .fontSize(13)
    .text(`Condition: ${conditionName}`, { align: "center" })
    .moveDown(2);
};

// Function to draw exercises
const drawExercises = (doc, exercises, fonts) => {
  const pageWidth = doc.page.width;
  const columnWidth = (pageWidth - 100) / 2;
  const startXLeft = 50;
  const startXRight = startXLeft + columnWidth + 10;
  let currentX = startXLeft;
  let currentY = doc.y;
  let isLeftColumn = true;
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;

  exercises?.forEach((exercise, index) => {
    if (!isLeftColumn) {
      currentX = startXRight;
    } else {
      currentX = startXLeft;
      if (index > 0) doc.moveDown(1);
    }

    const heights = [];
    const spaces = [];

    const imagePath = `public/assets/exercise/${exercise.bmname}.png`;
    const videoUrl = `https://d2nut6gc5qzbiv.cloudfront.net/53288331/${exercise.bmname}.mp4`;

    doc.font(fonts.practiceName).fontSize(11);
    heights.push(
      doc.heightOfString(exercise.name, currentX, currentY, {
        width: columnWidth,
      })
    );
    spaces.push(0.8);

    if (fs.existsSync(imagePath)) {
      heights.push(180);
      spaces.push(9);
    } else {
      console.warn(`⚠️ Image not found: ${imagePath}`);
    }

    doc.font(fonts.fullAddress).fontSize(10);
    heights.push(
      doc.heightOfString(exercise.instructions, { width: columnWidth })
    );
    spaces.push(0.8);

    doc.font(fonts.fullAddress).fontSize(9);
    heights.push(
      doc.heightOfString(`Hold each pose for ${exercise.hold} seconds.`, {
        width: columnWidth,
      })
    );
    heights.push(
      doc.heightOfString(`Repeat each exercise ${exercise.repeat} times.`, {
        width: columnWidth,
      })
    );
    heights.push(
      doc.heightOfString(
        `Perform the exercise ${exercise.timesperday} times per day.`,
        { width: columnWidth }
      )
    );
    spaces.push(1.5);

    if (!isLeftColumn) {
      spaces.push(1);
    }

    const sumHeight = heights.reduce((sum, height) => sum + height, 0);
    const sumSpaces = spaces.reduce((sum, height) => sum + height, 0);
    if (sumHeight + sumSpaces + currentY >= PAGE_HEIGHT - 32) {
      doc.addPage();
      currentY = doc.y;
    }

    doc
      .font(fonts.practiceName)
      .fontSize(11)
      .text(exercise.name, currentX, currentY, { width: columnWidth })
      .moveDown(0.8);

    if (fs.existsSync(imagePath)) {
      const startY = doc.y;
      doc.image(imagePath, currentX, startY, { width: 200, height: 150 });
      doc.link(currentX, startY, 200, 150, videoUrl); // Clickable image
      doc.moveDown(12);
    } else {
      console.warn(`⚠️ Image not found: ${imagePath}`);
    }

    doc
      .font(fonts.fullAddress)
      .fontSize(10)
      .text(exercise.instructions, currentX, undefined, { width: columnWidth })
      .moveDown(0.8);

    doc
      .font(fonts.fullAddress)
      .fontSize(9)
      .text(
        `Hold each pose for ${exercise.hold} seconds.`,
        currentX,
        undefined,
        { width: columnWidth }
      )
      .text(
        `Repeat each exercise ${exercise.repeat} times.`,
        currentX,
        undefined,
        { width: columnWidth }
      )
      .text(
        `Perform the exercise ${exercise.timesperday} times per day.`,
        currentX,
        undefined,
        { width: columnWidth }
      )
      .moveDown(1.5);

    isLeftColumn = !isLeftColumn;
    if (isLeftColumn) {
      doc.moveDown(1);
      currentY = doc.y;
    }
  });
};

// Main function to generate and save the PDF
export const generateExerciseReport = async (
  practiceName,
  fullAddress,
  phoneNumber,
  conditionName,
  exercises,
  fileName
) => {
  return new Promise((resolve, reject) => {
    const filePath = `public/reports/exercise/${fileName}`;
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

    drawHeader(
      doc,
      practiceName,
      fullAddress,
      phoneNumber,
      conditionName,
      fonts
    );

    doc.on("pageAdded", () => {
      drawHeader(
        doc,
        practiceName,
        fullAddress,
        phoneNumber,
        conditionName,
        fonts
      );
    });

    drawExercises(doc, exercises, fonts);

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

import { sendText } from "../utils/sendText.js";

export const sendExercise = async (req, res) => {
  const { who, what, subject, type, fileName } = req.body;

  try {
    const result = await sendText({
      who,
      what,
      subject,
      type,
      fileName,
    });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendCareplan = async (req, res) => {
  const { who, what, subject, type, fileName } = req.body;

  try {
    const result = await sendText({
      who,
      what,
      subject,
      type,
      fileName,
    });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendVideo = async (req, res) => {
  const { who, what, subject, type, fileName } = req.body;

  try {
    const result = await sendText({
      who,
      what,
      subject,
      type,
      fileName,
    });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { getUserWithPractice } from "../services/userService.js"; // Import the function that fetches user and practice

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await getUserWithPractice(user.userid);
    const practice = response.Practice || {}; // In case the user has no practice associated

    return res.status(200).json({
      user: {
        userid: user.userid,
        username: user.username,
        email: user.email,
        securityType: user.securitytype,
        practiceId: user.practiceid,
        practiceName: practice.practicename,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

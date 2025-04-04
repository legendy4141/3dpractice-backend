import { getUserWithPractice } from "../services/userService.js"; // Import the function that fetches user and practice

const getProfile = async (req, res) => {
  try {
    const user = await getUserWithPractice(req.body.userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract practice information from the user object
    const practice = user.Practice || {}; // In case the user has no practice associated

    // Prepare the response data
    const response = {
      practiceName: practice.practicename || "", // Assuming practice has a 'name' field
      practiceEmail: user.email || "", // Assuming practice has an 'email' field
      reportLinkDescription: practice.blurb || "", // This can be fetched or updated as needed
      phoneNumber: practice.contactnumber || "",
      addressFirstLine: practice.address1 || "",
      addressSecondLine: practice.address2 || "",
      city: practice.city || "",
      state: practice.state || "",
      country: practice.country || "",
      postalCode: practice.postalcode || "",
      reportLinkURL: practice.linkurl1, // Update this as necessary
      postureCoVideoKey: "", // Add real value as required
    };

    return res.status(200).json(response); // Return the response
  } catch (err) {
    console.error("Error fetching user with practice:", err);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

const editProfile = async (req, res) => {
  try {
    const user = await getUserWithPractice(req.body.userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract practice information from the user object
    const practice = user.Practice || {}; // In case the user has no practice associated

    // Prepare the response data
    const response = {
      practiceName: practice.practicename || "", // Assuming practice has a 'name' field
      practiceEmail: user.email || "", // Assuming practice has an 'email' field
      reportLinkDescription: practice.blurb || "", // This can be fetched or updated as needed
      phoneNumber: practice.contactnumber || "",
      addressFirstLine: practice.address1 || "",
      addressSecondLine: practice.address2 || "",
      city: practice.city || "",
      state: practice.state || "",
      country: practice.country || "",
      postalCode: practice.postalcode || "",
      reportLinkURL: practice.linkurl1, // Update this as necessary
      postureCoVideoKey: "", // Add real value as required
    };

    return res.status(200).json(response); // Return the response
  } catch (err) {
    console.error("Error fetching user with practice:", err);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

export { getProfile, editProfile };

import axios from "axios";

const uploadToImgBB = async (file) => {
  const API_KEY = "b7ac12614c6b362b707fb8d9a5079f3e";
  const apiUrl = "https://api.imgbb.com/1/upload";

  try {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", API_KEY);

    // Make the API request
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Extract the embed URL
    if (response.data.success) {
      const embedUrl = response.data.data.url;
      console.log("Embed URL:", embedUrl);
      return embedUrl;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadToImgBB;

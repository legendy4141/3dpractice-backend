import {
  getVideoByRandomKeyService,
  getAllVideosService,
  getVideosService,
  getVideoByIdService,
  createVideoService,
  updateVideoService,
  deleteVideoService,
} from "../services/videoService.js";

// Get all Videos
export const getVideos = async (req, res) => {
  const { userId } = req.body;

  try {
    const videos = await getAllVideosService(userId);
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await getVideosService();
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

// Get Video by ID
export const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await getVideoByIdService(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: error.message });
  }
};

export const getVideoByRandomkey = async (req, res) => {
  const { id, randomKey } = req.body;

  try {
    const video = await getVideoByRandomKeyService(id, randomKey);
    res.status(200).json(video.videolink);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

// Create a new Video
export const createVideo = async (req, res) => {
  const { displayname, videolink, vimeolink, randomkey } = req.body;
  try {
    const newVideo = await createVideoService({
      displayname,
      videolink,
      vimeolink,
      randomkey,
    });
    res.status(201).json(newVideo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating video", error: error.message });
  }
};

// Update a Video
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { displayname, videolink, vimeolink, randomkey } = req.body;
  try {
    const updatedVideo = await updateVideoService(id, {
      displayname,
      videolink,
      vimeolink,
      randomkey,
    });
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating video", error: error.message });
  }
};

// Delete a Video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVideo = await deleteVideoService(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: error.message });
  }
};

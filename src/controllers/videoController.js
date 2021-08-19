import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos: videos });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  return res.render("videos/editVideo", {
    pageTitle: `Editing: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const watch = async (req, res) => {
  const { id } = req.params; //equal with const id = req.params.id;
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  return res.render("videos/watch", {
    pageTitle: `Watching: ${video.title}`,
    video,
  });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file: { path: fileUrl },
    session: { user: _id },
  } = req;

  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl,
      owner: _id,
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { title } = req.query;
  let videos = [];
  if (title) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${title}$`, "i"),
      },
    });
  }
  return res.render("videos/search", { pageTitle: "Search Video", videos });
};

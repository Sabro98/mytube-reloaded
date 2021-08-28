import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .populate("owner")
    .sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos: videos });
};

export const getEdit = async (req, res) => {
  const {
    params: { id: videoID },
    session: {
      user: { _id: loginID },
    },
  } = req;

  const video = await Video.findById(videoID);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  if (String(video.owner) !== String(loginID)) {
    return res.status(403).redirect("/");
  }

  return res.render("videos/editVideo", {
    pageTitle: `Editing: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const {
    params: { id: videoID },
    body: { title, description, hashtags },
    session: {
      user: { _id: loginID },
    },
  } = req;

  const video = await Video.findById(videoID);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  if (String(video.owner) !== String(loginID)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(videoID, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${videoID}`);
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
    file: { location: fileLocation },
    session: { user: _id },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileLocation,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const remove = async (req, res) => {
  const {
    params: { id: videoID },
    session: {
      user: { _id: loginID },
    },
  } = req;

  const video = await Video.findById(videoID);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
  }

  if (String(video.owner) !== String(loginID)) {
    return res.status(403).redirect("/");
  }

  const user = await User.findById(loginID);
  user.videos = user.videos.filter(
    (video) => String(video) !== String(videoID)
  );
  await user.save();

  await Video.findByIdAndDelete(videoID);
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

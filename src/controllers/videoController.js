import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos: videos });
};

export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing:` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;

  return res.redirect(`/videos/${id}`);
};

export const watch = (req, res) => {
  const { id } = req.params; //equal with const id = req.params.id;

  return res.render("watch", {
    pageTitle: `Watching: `,
  });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  await Video.create({
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  return res.redirect("/");
};

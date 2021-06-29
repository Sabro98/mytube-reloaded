let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 1,
    id: 0,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];

  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id].title = title;
  return res.redirect(`/videos/${id}`);
};

export const watch = (req, res) => {
  const { id } = req.params; //equal with const id = req.params.id;
  const video = videos[id];

  return res.render("watch", {
    pageTitle: `Watching: ${video.title}`,
    video, // equal with video: video
  });
};

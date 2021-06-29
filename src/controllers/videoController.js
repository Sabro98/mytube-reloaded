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

export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit", videoID: `${req.params.id}` });

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id];

  return res.render("watch", {
    pageTitle: `Watching ${video.title}`,
    video,
  });
};

export const search = (req, res) => res.send("Search Video");

export const upload = (req, res) => res.send("Upload Video");

export const remove = (req, res) => res.send("Remove Video");

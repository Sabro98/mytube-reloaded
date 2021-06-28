export const trending = (req, res) => {
  const videos = [
    {
      title: "First Vodeo",
      rating: 5,
      comments: 2,
      createAt: "2 minutes ago",
      view: 59,
      id: 1,
    },
    {
      title: "Second Vodeo",
      rating: 5,
      comments: 2,
      createAt: "2 minutes ago",
      view: 59,
      id: 2,
    },
    {
      title: "Third Vodeo",
      rating: 5,
      comments: 2,
      createAt: "2 minutes ago",
      view: 59,
      id: 3,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};

export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit", videoID: `${req.params.id}` });

export const see = (req, res) =>
  res.render("watch", { pageTitle: "Watch", videoID: `${req.params.id}` });

export const search = (req, res) => res.send("Search Video");

export const upload = (req, res) => res.send("Upload Video");

export const remove = (req, res) => {
  console.log(req.params);
  res.send("Remove Video");
};

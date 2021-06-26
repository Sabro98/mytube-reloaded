export const trending = (req, res) => res.render("home", { pageTitle: "Home" });

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

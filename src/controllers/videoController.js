export const trending = (req, res) => res.render("home");
export const edit = (req, res) => res.render("edit");
export const see = (req, res) => res.render("watch");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");

export const remove = (req, res) => {
  console.log(req.params);
  res.send("Remove Video");
};

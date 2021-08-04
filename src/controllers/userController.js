import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.render("join", {
      pageTitle: pageTitle,
      errorMessage: "Password not match.",
    });
  }

  const userExists = await User.exists({ $or: [{ username }, { email }] });
  if (userExists) {
    return res.render("join", {
      pageTitle: pageTitle,
      errorMessage: "User already Exist",
    });
  }

  await User.create({
    name,
    email,
    username,
    password,
    location,
  });

  return res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Login User");
export const logout = (req, res) => res.send("Logout User");
export const see = (req, res) => res.send("See User");

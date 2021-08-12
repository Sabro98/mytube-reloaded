export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  res.locals.siteName = "Mytube";
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (isUserLoggedIn(req)) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!isUserLoggedIn(req)) {
    next();
  } else {
    return res.redirect("/");
  }
};

const isUserLoggedIn = (req) => req.session.loggedIn;

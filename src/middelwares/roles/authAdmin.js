const auth = (req, res, next) => {
  // Autorizacion superior por estar autenticado bajo el rol de admin
  if (req.session?.user?.email && req.session?.user?.role === "admin") {
    return next();
  }

  return res.status(401).send({ message: "Error de autorización!" });
};

export default auth;

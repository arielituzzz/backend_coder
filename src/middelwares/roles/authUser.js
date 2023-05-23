const authUser = (req, res, next) => {
  // Autorizacion estandar con solo estar autenticado
  if (req.session?.user?.email) {
    return next();
  }

  return res.status(401).send({ message: "Error de autorización!" });
};

export default authUser;

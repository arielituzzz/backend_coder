import UserManager from "../managersDB/UserManager.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  //Validacion por si no se ingresan alguno de los dos datos requeridos
  if (!email && !password) {
    return res
      .status(400)
      .send({ status: "error", message: "Email and Password invalid format." });
  }

  //Validacion para chequear que se vuelva a logear un usuario logeado
  if (req.session?.user) {
    return res
      .status(400)
      .send({ status: "error", message: "The user is already logged in." });
  }

  try {
    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);

    //Validacion para chequear que la contraseña sea correcta (Lo realiza internamente la libreria bcrypt)
    const isHashedPassword = await bcrypt.compare(password, user.password);

    if (!isHashedPassword) {
      return res
        .status(401)
        .send({ message: "Login failed, invalid password." });
    }

    //Creacion de la sesion retornando el email y el rol
    req.session.user = { email, role: user.role };

    res.send({ status: "success", message: "Login success!" });
  } catch (error) {
    res.status(401).send({ status: "error", error: error.message });
  }
};

export const logout = async (req, res) => {
  //Destruccion de la sesion
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).send({ message: "Logout ok!" });
    }

    res.status(400).send({ message: "Logout error!", body: err });
  });
};

export const signup = async (req, res) => {
  try {
    const manager = new UserManager();

    //Validacion para impedir que se pueda asignar roles
    if (req.body.role) {
      req.body.role = undefined;
    }

    //Encryptacion de la contraseña
    const payload = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const user = await manager.create(payload);

    res.status(201).send({ status: "success", user, message: "User created." });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

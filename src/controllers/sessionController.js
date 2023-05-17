import UserManager from "../managersDB/UserManager.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res
      .status(400)
      .send({ status: "error", message: "Email and Password invalid format." });
  }

  try {
    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);
    const isHashedPassword = await bcrypt.compare(password, user.password);

    if (!isHashedPassword) {
      return res
        .status(401)
        .send({ message: "Login failed, invalid password." });
    }

    req.session.user = { email };

    res.send({ status: "success", message: "Login success!" });
  } catch (error) {
    res.status(401).send({ status: "error", error: error.message });
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.send({ message: "Logout ok!" });
    }

    res.send({ message: "Logout error!", body: err });
  });
};

export const signup = async (req, res) => {
  try {
    const manager = new UserManager();

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

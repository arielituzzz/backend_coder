import UserManager from "../managersDB/UserManager.js";
import bcrypt from "bcrypt";

export const list = async (req, res) => {
  const { limit, page } = req.query;

  try {
    const manager = new UserManager();
    // Obtengo todos los usuarios
    const users = await manager.paginate({ limit, page });

    return res.status(200).send({
      status: "success",
      users: users.docs,
      ...users,
      docs: undefined,
    });
  } catch (error) {
    return res.status(404).send({ status: "error", error: error.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtengo el usuario
    const manager = new UserManager();
    const user = await manager.getOne(id);

    return res.status(200).send({ status: "success", user });
  } catch (error) {
    return res.status(404).send({ status: "error", message: error.message });
  }
};

export const save = async (req, res) => {
  try {
    const manager = new UserManager();

    // Genero un nuevo usuario y hasheo la contraseña
    const payload = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    // Le paso el usuario a la base de datos con la contraseña hasheada
    const user = await manager.create(payload);

    return res
      .status(201)
      .send({ status: "success", user, message: "User created." });
  } catch (error) {
    return res.status(400).send({ status: "error", message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const manager = new UserManager();
    const result = await manager.updateOne(id, req.body);

    return res
      .status(200)
      .send({ status: "success", result, message: "User updated." });
  } catch (error) {
    return res.status(400).send({ status: "error", message: error.message });
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = new UserManager();
    await manager.deleteOne(id);

    res.status(200).send({ status: "success", message: "User deleted." });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};

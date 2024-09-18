import { getConnection } from "../database.js";

export const getSaldo = (req, res) => {
  const db = getConnection();
  const userFound = db.data.users.find((user) => user.id === req.params.id);
  if (!userFound) res.sendStatus(404);

  const saldo = userFound.saldo;
  res.json(saldo);
};

export const updateSaldo = async (req, res) => {
  const { saldo } = req.body;

  try {
    const db = getConnection();
    const userFound = db.data.users.find((user) => user.id === req.params.id);

    if (!userFound) return res.sendStatus(404);

    userFound.saldo = Number(saldo);

    db.data.users.map((user) => (user.id === req.params.id ? userFound : user));

    await db.write();

    res.json(userFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

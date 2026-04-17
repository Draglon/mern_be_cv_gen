import jwt from "jsonwebtoken";

export default (userId) => jwt.sign({ _id: userId }, 'secret123', { expiresIn: '30d'});

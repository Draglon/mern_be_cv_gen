import bcrypt from "bcrypt";

export default async (password, passwordHash) => await bcrypt.compare(password, passwordHash);
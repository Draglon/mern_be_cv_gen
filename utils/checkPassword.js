import bcrypt from "bcrypt";

export default async (password, user) => await bcrypt.compare(password, user._doc.passwordHash);
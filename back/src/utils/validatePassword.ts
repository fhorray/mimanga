import type { SelectUser } from "@/db/schemas";
import * as bcrypt from "bcryptjs";

// VALIDADE USER PASSWORD
export const validatePassword = async (user: SelectUser, password: string) => {
  // Implemente a validação da senha
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) return true;

  return false;
};

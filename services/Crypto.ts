import { promisify } from "util";

import { randomBytes, scrypt } from "crypto";

const scryptAsync = promisify(scrypt);

export class CryptoManager {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");

    const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${hashedPassword.toString("hex")}.${salt}`;
  }

  async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return `${buf.toString("hex")}` === hashedPassword;
  }
}



import { promisify } from "util";

import { randomBytes, scrypt } from "crypto";

const scrypr = promisify(scrypt);

export class CryptoManager {}

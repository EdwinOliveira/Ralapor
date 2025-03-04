import { scrypt, timingSafeEqual } from "node:crypto";
import { RandomProvider } from "./RandomProvider";

const HashProvider = () => {
	return {
		hash: async (data: string | Buffer): Promise<string> => {
			return await new Promise((resolve, reject) => {
				const hashSalt = RandomProvider().createRandomString(24);

				scrypt(data, hashSalt, 64, (err, derivedKey) => {
					if (err != null) reject(err);
					resolve(`${hashSalt}.${derivedKey.toString("hex")}`);
				});
			});
		},
		compare: async (rawData: string, hashedData: string) => {
			return await new Promise<boolean>((resolve, reject) => {
				const [salt, hashKey] = hashedData.split(".");
				const hashKeyBuff = Buffer.from(hashKey, "hex");

				scrypt(rawData, salt, 64, (err, derivedKey) => {
					if (err != null) reject(err);
					resolve(timingSafeEqual(hashKeyBuff, derivedKey));
				});
			});
		},
	};
};

export { HashProvider };

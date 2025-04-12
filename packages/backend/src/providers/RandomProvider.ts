import { randomBytes } from "node:crypto";

const RandomProvider = () => {
	return {
		createRandomString: (size: number) => {
			return randomBytes(size).toString("hex");
		},
		createAccessCode: (size: number) => {
			const upperCaseCharacters = "ABCDEFGIJKLMNOPQRSTUVYXZ";
			const lowerCaseCharacters = "abcdefghijklmnopqrstuvyxz";
			const symbolsCharacters = "$";
			const numbersCharacters = "0123456789";

			const randomCharacter = (characters: string) => {
				return characters.charAt(Math.floor(Math.random() * characters.length));
			};

			const accessCode: Array<string> = [];
			accessCode.push(randomCharacter(upperCaseCharacters));
			accessCode.push(randomCharacter(lowerCaseCharacters));
			accessCode.push(randomCharacter(symbolsCharacters));
			accessCode.push(randomCharacter(numbersCharacters));

			while (accessCode.length < size) {
				const characterOption = Math.floor(Math.random() * 3);

				switch (characterOption) {
					case 0: {
						accessCode.push(randomCharacter(upperCaseCharacters));
						break;
					}
					case 1: {
						accessCode.push(randomCharacter(lowerCaseCharacters));
						break;
					}
					case 2: {
						accessCode.push(randomCharacter(symbolsCharacters));
						break;
					}
					case 3: {
						accessCode.push(randomCharacter(numbersCharacters));
						break;
					}
				}
			}

			return accessCode.join("");
		},
	};
};

export { RandomProvider };

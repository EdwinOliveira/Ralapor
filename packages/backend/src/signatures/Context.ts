import type { HashProvider } from "../providers/HashProvider";
import type { MailProvider } from "../providers/MailProvider";
import type { RandomProvider } from "../providers/RandomProvider";
import type { DatabaseService } from "../services/DatabaseService";

type Context = {
	providers: {
		hashProvider: ReturnType<typeof HashProvider>;
		mailProvider: ReturnType<typeof MailProvider>;
		randomProvider: ReturnType<typeof RandomProvider>;
	};
	services: {
		databaseService: ReturnType<typeof DatabaseService>;
	};
};

export type { Context };

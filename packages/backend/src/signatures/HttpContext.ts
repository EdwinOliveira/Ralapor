import type { HashProvider } from "../providers/HashProvider";
import type { MailProvider } from "../providers/MailProvider";
import type { RandomProvider } from "../providers/RandomProvider";
import type { SessionProvider } from "../providers/SessionProvider";
import type { DatabaseService } from "../services/DatabaseService";

type HttpContext = {
	providers: {
		hashProvider: ReturnType<typeof HashProvider>;
		mailProvider: ReturnType<typeof MailProvider>;
		randomProvider: ReturnType<typeof RandomProvider>;
		sessionProvider: ReturnType<typeof SessionProvider>;
	};
	services: {
		databaseService: ReturnType<typeof DatabaseService>;
	};
};

export type { HttpContext };

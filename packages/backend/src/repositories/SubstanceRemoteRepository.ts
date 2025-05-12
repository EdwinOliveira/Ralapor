import { DatabaseService } from "../services/DatabaseService";

const SubstanceRemoteRepository = (): SubstanceRepository => {
	const { createConnection, destroyConnection } = DatabaseService();

	return {};
};

export { SubstanceRemoteRepository };

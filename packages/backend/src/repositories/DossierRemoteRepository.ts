import type { DossierEntity, DossierRepository } from "../domains/Dossier";
import { DatabaseService } from "../services/DatabaseService";

const DossierRemoteRepository = (): DossierRepository => {
	const { createConnection, createDossiersTable } = DatabaseService();

	return {
		findDossierById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createDossiersTable(dbConnection);

			const foundDossier = await dbConnection<DossierEntity>("Dossiers")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundDossier === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundDossier.id], affectedRows: [foundDossier] };
		},
		findDossiersByUserId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createDossiersTable(dbConnection);

			const foundDossiers = await dbConnection<DossierEntity>("Dossiers").where(
				"userId",
				query.userId,
			);

			await dbConnection.destroy();

			if (foundDossiers.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundDossiers.map((foundDossier) => foundDossier.id),
				affectedRows: foundDossiers,
			};
		},
		findDossiersByCategoryId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createDossiersTable(dbConnection);

			const foundDossiers = await dbConnection<DossierEntity>("Dossiers").where(
				"categoryId",
				query.categoryId,
			);

			await dbConnection.destroy();

			if (foundDossiers.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundDossiers.map((foundDossier) => foundDossier.id),
				affectedRows: foundDossiers,
			};
		},
		createDossier: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createDossiersTable(dbConnection);

			const createdDossier = await dbConnection<DossierEntity>("Dossiers")
				.insert({ ...args, isVisible: true, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdDossier === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdDossier.id], affectedRows: [] };
		},
		updateDossierById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createDossiersTable(dbConnection);

			const foundDossier = await dbConnection<DossierEntity>("Dossiers")
				.where("id", query.id)
				.first();

			if (foundDossier === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedDossier = await dbConnection<DossierEntity>("Dossiers")
				.where("id", query.id)
				.update({
					designation: args.designation || foundDossier.designation,
					description: args.description || foundDossier.description,
					isVisible: args.isVisible || foundDossier.isVisible,
					isActive: args.isActive || foundDossier.isActive,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedDossier === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedDossier.id],
				affectedRows: [{ updatedAt: updatedDossier.updatedAt }],
			};
		},
	};
};

export { DossierRemoteRepository };

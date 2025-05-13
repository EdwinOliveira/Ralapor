import type {
	SubstanceEntity,
	SubstanceRepository,
} from "../domains/Substance";
import { DatabaseService } from "../services/DatabaseService";

const SubstanceRemoteRepository = (): SubstanceRepository => {
	const { createConnection, destroyConnection } = DatabaseService();

	return {
		findSubstances: async ({ query }) => {
			const connection = createConnection();

			const substances = await connection<SubstanceEntity>("Substances").where(
				(queryBuilder) => {
					if (query !== undefined) {
						const { classification } = query;

						if (classification !== undefined) {
							return queryBuilder.where("classification", classification);
						}
					}
				},
			);

			await destroyConnection(connection);

			return {
				affectedIds: substances.map((susbtance) => susbtance.id),
				affectedRows: substances,
			};
		},
		findSubstanceById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const substance = await connection<SubstanceEntity>("Substances")
				.where("id", query?.id)
				.first();

			await destroyConnection(connection);

			if (substance === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [substance.id], affectedRows: [substance] };
		},
		findSubstanceByDesignation: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const substance = await connection<SubstanceEntity>("Substances")
				.where("designation", query?.designation)
				.first();

			await destroyConnection(connection);

			if (substance === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [substance.id], affectedRows: [substance] };
		},
		createSubstance: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const createdSusbtance = await connection<SubstanceEntity>("Substances")
				.insert(args)
				.returning("id");

			await destroyConnection(connection);

			if (createdSusbtance.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdSusbtance[0].id], affectedRows: [] };
		},
		updateSubstanceById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const foundSubstance = await connection<SubstanceEntity>("Substances")
				.where("id", query.id)
				.first();

			if (foundSubstance === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedSubstances = await connection<SubstanceEntity>("Substances")
				.where("id", query.id)
				.update({
					designation: args.designation || foundSubstance.designation,
					description: args.description || foundSubstance.description,
					classification: args.classification || foundSubstance.classification,
				})
				.returning("*");

			await destroyConnection(connection);

			if (updatedSubstances.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedSubstances[0].id],
				affectedRows: [{ updatedAt: updatedSubstances[0].updatedAt }],
			};
		},
	};
};

export { SubstanceRemoteRepository };

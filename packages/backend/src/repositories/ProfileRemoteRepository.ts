import type { ProfileEntity, ProfileRepository } from "../domains/Profile";
import { DatabaseService } from "../services/DatabaseService";

const ProfileRemoteRepository = (): ProfileRepository => {
	const { createConnection, createProfilesTable } = DatabaseService();

	return {
		findProfileById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createProfilesTable(dbConnection);

			const foundProfile = await dbConnection<ProfileEntity>("Profiles")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundProfile === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundProfile.id], affectedRows: [foundProfile] };
		},
		findProfileByUserId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createProfilesTable(dbConnection);

			const foundProfile = await dbConnection<ProfileEntity>("Profiles")
				.where("userId", query.userId)
				.first();

			await dbConnection.destroy();

			if (foundProfile === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundProfile.id], affectedRows: [foundProfile] };
		},
		createProfile: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createProfilesTable(dbConnection);

			const createdUser = await dbConnection<ProfileEntity>("Profiles")
				.insert({ ...args })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdUser === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdUser.id], affectedRows: [] };
		},
		updateProfileById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createProfilesTable(dbConnection);

			const foundProfile = await dbConnection<ProfileEntity>("Profiles")
				.where("id", query.id)
				.first();

			if (foundProfile === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedProfile = await dbConnection<ProfileEntity>("Profiles")
				.where("id", query.id)
				.update({
					firstName: args.firstName || foundProfile.firstName,
					lastName: args.lastName || foundProfile.lastName,
					dateBirth: args.dateBirth || foundProfile.dateBirth,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedProfile === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedProfile.id],
				affectedRows: [{ updatedAt: updatedProfile.updatedAt }],
			};
		},
	};
};

export { ProfileRemoteRepository };

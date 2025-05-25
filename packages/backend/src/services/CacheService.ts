import { Client } from "memjs";

type CacheData = {
	sessionId: string;
	userId: number;
	roleId: number;
	expiresIn: number;
	refreshToken: string;
	deviceUuid: string;
};

const CacheService = () => {
	const cache = Client.create("", { expires: 3600 });

	const findOnCache = async (property: string) => {
		const { value: cachedData } = await cache.get(property);

		if (cachedData) {
			return JSON.parse(cachedData.toString()) as CacheData;
		}
	};

	const addToCache = async (property: string, data: CacheData) => {
		cache.add(property, JSON.stringify(data));
	};

	const updateOnCache = async (property: string, data: CacheData) => {
		cache.replace(property, JSON.stringify(data));
	};

	const removeFromCache = async (property: string) => {
		cache.delete(property);
	};

	return { findOnCache, addToCache, updateOnCache, removeFromCache };
};

export { CacheService };

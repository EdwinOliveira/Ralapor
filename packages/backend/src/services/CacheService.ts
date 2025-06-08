import { Client } from "memjs";

type CacheData = CacheSession | CacheMFACode;

type CacheSession = {
  sessionId: string;
  userId: number;
  roleId: number;
  expiresIn: number;
  refreshToken: string;
  deviceUuid: string;
};

type CacheMFACode = {
  code: string;
};

const CacheService = () => {
  const cache = Client.create("", { expires: 3600 });

  const findOnCache = async (property: string) => {
    const { value: cachedData } = await cache.get(property);

    if (cachedData) {
      return JSON.parse(cachedData.toString()) as CacheData;
    }
  };

  const isSessionCache = (
    cache: CacheData | undefined
  ): cache is CacheSession => {
    return !!(cache && "sessionId" in cache);
  };

  const isMFACache = (cache: CacheData | undefined): cache is CacheMFACode => {
    return !!(cache && "code" in cache);
  };

  const addToCache = async (
    property: string,
    data: CacheData,
    expiresIn?: number
  ) => {
    cache.add(property, JSON.stringify(data), { expires: expiresIn });
  };

  const updateOnCache = async (property: string, data: CacheData) => {
    cache.replace(property, JSON.stringify(data));
  };

  const removeFromCache = async (property: string) => {
    cache.delete(property);
  };

  return {
    findOnCache,
    isSessionCache,
    isMFACache,
    addToCache,
    updateOnCache,
    removeFromCache,
  };
};

export { CacheService };

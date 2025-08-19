import { afterEach, describe, expect, it, vi } from 'vitest';

import { UserDTOMapper } from '.';
import { userDTOMock, userEntityMock } from './index.spec.data';

describe('User Domain', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('@method UserDTOMapper', () => {
    const { mapToDTO } = UserDTOMapper();

    it('@returns UserDTO', () => {
      expect(mapToDTO(userEntityMock)).toEqual(userDTOMock);
    });
  });
});

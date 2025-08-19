import { afterEach, describe, expect, it, vi } from 'vitest';

import { RoleDTOMapper } from '.';
import { roleDTOMock, roleEntityMock } from './index.spec.data';

describe('Role Domain', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('@method RoleDTOMapper', () => {
    const { mapToDTO } = RoleDTOMapper();

    it('@returns RoleDTO', () => {
      expect(mapToDTO(roleEntityMock)).toEqual(roleDTOMock);
    });
  });
});

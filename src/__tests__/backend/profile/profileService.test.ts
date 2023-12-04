
/**
 * @jest-environment node
 */

import { Database } from '@/backend/database/database'
import { UserProfile } from '@/backend/profile/profileModels'
import { ProfileService } from '@/backend/profile/profileService'
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito'
import { expect, test } from 'vitest'

test('should return undifined when user not found', async () => {
    const id: string = 'username';

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);
    const queryResult: UserProfile[] = [];

    when(mockDatabase.query(anyString(), anything())).thenResolve(queryResult);

    const sut = new ProfileService(database);

    const result = await sut.Get(id);

    expect(result).toBeUndefined();

    verify(mockDatabase.query(anyString(), anything())).once();
})

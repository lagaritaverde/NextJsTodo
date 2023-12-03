
/**
 * @jest-environment node
 */


import { Database } from '@/backend/database/database'
import { AuthResult, AuthUser } from '@/backend/auth/authModels'
import { AuthService } from '@/backend/auth/authService'
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito'
import { expect, test } from 'vitest'

//import { expect, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3)
})

/*
import { Database } from '@/backend/database/database'
import { AuthResult, AuthUser } from '@/backend/auth/authModels'
import { AuthService } from '@/backend/auth/authService'
import { anyString, instance, mock, verify, when } from 'ts-mockito'
import { expect, test } from 'vitest'
*/
test('should return undifined when user not found', async () => {
  const userName: string = 'username';
  const password: string = 'password';

  const mockDatabase: Database = mock<Database>();
  const database: Database = instance(mockDatabase);
  const queryResult: AuthUser[] = [];

  when(mockDatabase.query(anyString(), anything())).thenResolve(queryResult);

  const sut = new AuthService(database);

  const result = await sut.login(userName, password);

  expect(result).toBeUndefined();

  verify(mockDatabase.query(anyString(), anything())).once();
})

test('should return AuthResult when username and password found', async () => {
  const userName: string = 'username';
  const password: string = 'password';

  const mockDatabase: Database = mock<Database>();
  const database: Database = instance(mockDatabase);
  const user: AuthUser = {
    username: userName,
    id: 'id',
    name: 'name',
    email: 'email',
    surname: 'surname'
  }

  const queryResult: AuthUser[] = [user];

  when(mockDatabase.query(anyString(), anything())).thenResolve(queryResult);

  const sut = new AuthService(database);

  const result = await sut.login(userName, password);

  expect(result?.user).toEqual(user);

  verify(mockDatabase.query(anyString(), anything())).once();
})


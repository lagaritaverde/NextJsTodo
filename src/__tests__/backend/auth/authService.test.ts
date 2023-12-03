
/**
 * @jest-environment node
 */

import { Database } from '@/backend/database/database'
import { AuthUser } from '@/backend/auth/authModels'
import { AuthService } from '@/backend/auth/authService'
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito'
import { expect, test } from 'vitest'

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

test('should throw errror when found duplicate users', () => {
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

  const queryResult: AuthUser[] = [user, user];

  when(mockDatabase.query(anyString(), anything())).thenResolve(queryResult);

  const sut = new AuthService(database);

  expect(async () => await sut.login(userName, password)).rejects.toThrowError('catastrophic error');

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

test('should return undefined when invalid token', async () => {
  const mockDatabase: Database = mock<Database>();
  const database: Database = instance(mockDatabase);

  const token = 'invalidtoken'

  const sut = new AuthService(database);

  const result = await sut.getUser(token);

  expect(result).toBeUndefined();

  verify(mockDatabase.query(anyString(), anything())).never();
})

test('should return user from valid token', async () => {
  const mockDatabase: Database = mock<Database>();
  const database: Database = instance(mockDatabase);

  const user: AuthUser = {
    email: 'email',
    id: 'id',
    name: 'admin',
    username: 'username',
    surname: 'surname'
  };

  const token = await givenValidTokenForUser(user);

  const sut = new AuthService(database);

  const result = await sut.getUser(token);

  expect(result).toEqual(user);

  verify(mockDatabase.query(anyString(), anything())).never();
})

async function givenValidTokenForUser(user: AuthUser): Promise<string> {
  const password: string = 'password';

  const mockDatabase: Database = mock<Database>();
  const database: Database = instance(mockDatabase);

  const queryResult: AuthUser[] = [user];

  when(mockDatabase.query(anyString(), anything())).thenResolve(queryResult);

  const sut = new AuthService(database);

  const result = await sut.login(user.username, password);

  if (result == undefined) {
    return '';
  }

  return result.auth.token;
}


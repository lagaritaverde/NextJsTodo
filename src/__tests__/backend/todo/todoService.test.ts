
/**
 * @jest-environment node
 */

import { Database } from '@/backend/database/database'
import { Todo, TodoItem } from '@/backend/todo/todoModels'
import { TodoService } from '@/backend/todo/todoService'
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito'
import { expect, test } from 'vitest'

test('should return the id of new todo', async () => {
    const userId: string = 'userId';
    const title: string = 'title';
    const description: string = 'description';

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);

    when(mockDatabase.query(anyString(), anything())).thenResolve([]);

    const sut = new TodoService(database);

    const result = await sut.Crate(userId, title, description);

    expect(result).not.toBe('');

    verify(mockDatabase.query(anyString(), anything())).once();
})

test('should return list of todo', async () => {
    const userId: string = 'userId';
    const title: string = 'title';
    const description: string = 'description';

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);
    const todo: Todo = {
        id: 'id',
        title: title,
        ownerid: userId,
        description: description,
        items: []
    }

    when(mockDatabase.query(anyString(), anything())).thenResolve([todo]);

    const sut = new TodoService(database);

    const result = await sut.List(userId);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(todo);

    verify(mockDatabase.query(anyString(), anything())).once();
})

test('should return list of todoItem in todo', async () => {
    const userId: string = 'userId';
    const todoId: string = 'todoId';
    const title: string = 'title';

    const belongToMe: boolean = true;

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);
    const todoItem: TodoItem = {
        id: 'id',
        toodId: todoId,
        title: title,
        done: false
    }

    when(mockDatabase.query(anyString(), anything())).thenResolve([todoItem]);
    when(mockDatabase.queryScalar(anyString(), anything())).thenResolve(belongToMe);

    const sut = new TodoService(database);

    const result = await sut.ListItems(userId, todoId);

    expect(result).not.toBeUndefined();

    const resultList = <TodoItem[]>result;

    expect(resultList.length).toBe(1);
    expect(resultList[0]).toEqual(todoItem);

    verify(mockDatabase.query(anyString(), anything())).once();
    verify(mockDatabase.queryScalar(anyString(), anything())).once();
})

test('should return undefined when todo is not belong to user', async () => {
    const userId: string = 'userId';
    const todoId: string = 'todoId';
    const title: string = 'title';

    const belongToMe: boolean = false;

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);

    when(mockDatabase.queryScalar(anyString(), anything())).thenResolve(belongToMe);

    const sut = new TodoService(database);

    const result = await sut.ListItems(userId, todoId);

    expect(result).toBeUndefined();

    verify(mockDatabase.queryScalar(anyString(), anything())).once();
    verify(mockDatabase.query(anyString(), anything())).never();

})

test('should return new todoItem in todo', async () => {
    const userId: string = 'userId';
    const todoId: string = 'todoId';
    const title: string = 'title';

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);
    const belongToMe: boolean = true;

    const todoItem: TodoItem = {
        id: 'id',
        toodId: todoId,
        title: title,
        done: false
    }

    when(mockDatabase.query(anyString(), anything())).thenResolve([]);
    when(mockDatabase.queryScalar(anyString(), anything())).thenResolve(belongToMe);

    const sut = new TodoService(database);

    const result = await sut.AddItem(userId, todoId, title);

    expect(result).not.toBeUndefined();

    expect(result?.toodId).toBe(todoItem.toodId);
    expect(result?.title).toBe(todoItem.title);
    expect(result?.done).toEqual(todoItem.done);

    verify(mockDatabase.query(anyString(), anything())).once();
})

test('should return undefined when todo is not belong to user', async () => {
    const userId: string = 'userId';
    const todoId: string = 'todoId';
    const title: string = 'title';

    const mockDatabase: Database = mock<Database>();
    const database: Database = instance(mockDatabase);
    const belongToMe: boolean = false;

    when(mockDatabase.query(anyString(), anything())).thenResolve([]);
    when(mockDatabase.queryScalar(anyString(), anything())).thenResolve(belongToMe);

    const sut = new TodoService(database);

    const result = await sut.AddItem(userId, todoId, title);

    expect(result).toBeUndefined();

    verify(mockDatabase.query(anyString(), anything())).never();
    verify(mockDatabase.queryScalar(anyString(), anything())).once();
})

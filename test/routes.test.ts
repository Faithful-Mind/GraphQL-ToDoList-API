import request from 'supertest';
import { mongoose } from '@typegoose/typegoose';

import app from '../src/app';

afterAll(() => {
  app.close();
  return mongoose.disconnect();
});

test('Hello world works', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('hello!');
});

describe('GraphQL-ToDoList CRUD tests', () => {
  const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjEwOGI2OWEyZDY0MDNjMzA5MjU5MjgiLCJpYXQiOjE1OTQ5MTk3ODV9.Bvwt6M1csG10_uR6Evo1rsADmDwqiPa5ib0NCsWiwdk';
  let todoId: string;
  test('create Todo /', async () => {
    const { status, body } = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
          createTodo(content: "666") {
            id
          }
        }`,
      })
      .set('Authorization', authorization);
    expect(status).toEqual(200);
    expect(body.data.createTodo.id).toHaveLength(24);
    todoId = body.data.createTodo.id;
  });

  test('retrieve todo /', async () => {
    const { status, body } = await request(app)
      .post('/graphql')
      .send({
        query: `query {
            todos {
              id
              content
              isDone
            }
          }`,
      })
      .set('Authorization', authorization);
    expect(status).toEqual(200);
    expect(body.data.todos).toContainEqual({ id: todoId, content: '666', isDone: false });
  });

  test('update todo /', async () => {
    const { status, body } = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
          updateTodo(id: "${todoId}", content: "999")
        }`,
      })
      .set('Authorization', authorization);
    expect(status).toEqual(200);
    expect(body.data.updateTodo).toBe(true);
    const afterResp = await request(app)
      .post('/graphql')
      .send({
        query: `query {
            todos {
              id
              content
              isDone
            }
          }`,
      })
      .set('Authorization', authorization);
    expect(afterResp.status).toEqual(200);
    expect(afterResp.body.data.todos).toContainEqual({ id: todoId, content: '999', isDone: false });
  });

  test('remove todo /', async () => {
    const { status, body } = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
          removeTodo(id: "${todoId}")
        }`,
      })
      .set('Authorization', authorization);
    expect(status).toEqual(200);
    expect(body.data.removeTodo).toBe(true);
    const afterResp = await request(app)
      .post('/graphql')
      .send({
        query: `query {
            todos {
              id
              content
              isDone
            }
          }`,
      })
      .set('Authorization', authorization);
    expect(afterResp.status).toEqual(200);
    expect(afterResp.body.data.todos).not.toContainEqual({ id: todoId, content: '999', isDone: false });
  });
});

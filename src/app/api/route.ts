import { Say } from '@/logica/say'
import { Client } from 'ts-postgres';



export async function GET(request: Request) {

  const client = new Client({
    host: '127.0.0.1',
    user: 'gamers',
    password: 'password',
    database: 'gamers'
  });

  await client.connect();

  const rows = (await client.query('SELECT * FROM users')).rows;
  
  client.end();
  return Response.json(rows)
}

export async function POST(request: Request) {


  return Response.json({ "hola": "Post" })
}
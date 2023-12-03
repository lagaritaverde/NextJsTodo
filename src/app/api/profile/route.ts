import { Pool } from 'pg'

const pool = new Pool({
  user: 'gamers',
  host: '127.0.0.1',
  database: 'gamers',
  password: 'password',
  port: 5432,
})

export async function GET(request: Request) {
  const rows = (await pool.query('SELECT * FROM users')).rows

  return Response.json(rows)
}

export async function POST(request: Request) {
  await request.json()

  return Response.json({ data: request.headers.get('authorization') })
}

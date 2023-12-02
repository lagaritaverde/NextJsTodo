import { Pool, QueryResultRow } from 'pg'
const pool = new Pool({
    user: 'gamers',
    host: '127.0.0.1',
    database: 'gamers',
    password: 'password',
    port: 5432,
    ssl:false
})

export interface Database {
    query<R extends QueryResultRow>(query: string, values?: any[] | undefined): Promise<R[]>;
}


class PostgresDatabase implements Database {
    async query<R extends QueryResultRow>(query: string, values?: any[] | undefined): Promise<R[]> {
        return (await pool.query<R>(query, values)).rows;
    }
}

export const instance = new PostgresDatabase();

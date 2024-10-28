import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function storeExecution(commands: number, result: number, duration: number) {
  const query = `
    INSERT INTO executions (timestamp, commands, result, duration)
    VALUES (CURRENT_TIMESTAMP, $1, $2, $3)
    RETURNING id, timestamp, commands, result, duration
  `

  const { rows } = await pool.query(query, [commands, result, duration])
  return rows[0]
}

export async function initializeDb() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS executions (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP NOT NULL,
      commands INTEGER NOT NULL,
      result INTEGER NOT NULL,
      duration DOUBLE PRECISION NOT NULL
    )
  `

  await pool.query(createTableQuery)
}

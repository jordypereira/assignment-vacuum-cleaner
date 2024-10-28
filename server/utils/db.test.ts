import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { Pool } from 'pg'
import { storeExecution, initializeDb } from './db'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

beforeAll(async () => {
  await initializeDb()
})

afterAll(async () => {
  await pool.query('DROP TABLE IF EXISTS executions')
  await pool.end()
})

describe('storeExecution', () => {
  it('should store execution and return the stored data', async () => {
    const commands = 10
    const result = 5
    const duration = 2.5

    const storedData = await storeExecution(commands, result, duration)

    expect(storedData).toHaveProperty('id')
    expect(storedData).toHaveProperty('timestamp')
    expect(storedData.commands).toBe(commands)
    expect(storedData.result).toBe(result)
    expect(storedData.duration).toBe(duration)
  })
})

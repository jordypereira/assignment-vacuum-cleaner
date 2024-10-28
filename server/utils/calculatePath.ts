import { Execution } from '~~/types/execution'
import pool from './db'
import { RobotRequest } from '~~/types/robotRequest'

export const enterPath = async (data: RobotRequest) => {
  const startTime = process.hrtime()

  const visited = new Set<string>()
  let { x, y } = data.start
  visited.add(`${x},${y}`)

  for (const command of data.commands) {
    for (let i = 0; i < command.steps; i++) {
      switch (command.direction.toLowerCase()) {
        case 'north': {
          y++
          break
        }
        case 'south': {
          y--
          break
        }
        case 'east': {
          x++
          break
        }
        case 'west': {
          x--
          break
        }
      }
      visited.add(`${x},${y}`)
    }
  }

  const duration = process.hrtime(startTime)
  const durationInSeconds = duration[0] + duration[1] / 1e9

  const result: Partial<Execution> = {
    timestamp: new Date(),
    commands: data.commands.length,
    result: visited.size,
    duration: durationInSeconds,
  }

  await pool.query(
    'INSERT INTO executions (timestamp, commands, result, duration) VALUES ($1, $2, $3, $4)',
    [result.timestamp, result.commands, result.result, result.duration]
  )

  return result
}

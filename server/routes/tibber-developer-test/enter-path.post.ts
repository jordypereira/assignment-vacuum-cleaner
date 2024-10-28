import { z } from 'zod'
import { VacuumCleaner } from '../../../models/VacuumCleaner'

/**
Validations:
0 ≤ number of commmands elements ≤ 10000
−100 000 ≤ x ≤ 100 000, x ∈ Z
−100 000 ≤ y ≤ 100 000, y ∈ Z
direction ∈ {north, east, south, west}
0 < steps < 100000, steps ∈ Z
 */
const Input = z.object({
  start: z.object({
    x: z.number().int().min(-100_000).max(100_000),
    y: z.number().int().min(-100_000).max(100_000),
  }),
  commands: z
    .array(
      z.object({
        direction: z.enum(['north', 'east', 'south', 'west']),
        steps: z.number().int().min(1).max(99_999),
      })
    )
    .max(10_000),
})

/**
 * Output
 * @example
 * 
ID Timestamp Commands Result Duration
1234 2018-05-12 12:45:10.851596 2 4 0.000123
 */

const Output = z.object({
  Commands: z.number(),
  Result: z.number(),
  Duration: z.number(),
})

type Input = z.infer<typeof Input>
type Output = z.infer<typeof Output>

export function startJob(input: Input): Output {
  const start = input.start
  const commands = input.commands

  const startTime = performance.now()
  const vacuumCleaner = new VacuumCleaner(start)
  vacuumCleaner.traverse(commands)

  const endTime = performance.now()
  const duration = endTime - startTime
  const result = vacuumCleaner.result()

  const output: Output = {
    Commands: commands.length,
    Result: result,
    Duration: duration,
  }

  return output
}

export default async function defineEventHandler(event) {
  console.log('🚀 ~ defineEventHandler ~ event:', event)

  const body = await readValidatedBody(event, Input.parse)
  console.log('🚀 ~ defineEventHandler ~ body:', body)

  const output = startJob(body)
  console.log('🚀 ~ defineEventHandler ~ output:', output)

  const dbEntry = await storeExecution(output.Commands, output.Result, output.Duration)
  console.log("🚀 ~ defineEventHandler ~ dbEntry:", dbEntry)

  return output
}

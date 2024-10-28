import { describe, it, expect, vi } from 'vitest'
import { startJob } from '../server/routes/tibber-developer-test/enter-path.post'

vi.mock('~~/models/VacummCleaner', () => {
  return {
    VacuumCleaner: vi.fn().mockImplementation(() => {
      return {
        traverse: vi.fn(),
        result: vi.fn().mockReturnValue(4),
      }
    }),
  }
})

describe('startJob', () => {
  it('should return the correct output', () => {
    const input = {
      start: { x: 0, y: 0 },
      commands: [{ direction: 'east', steps: 10 }],
    }

    // @ts-expect-error
    const output = startJob(input)

    expect(output).toHaveProperty('ID')
    expect(output).toHaveProperty('Timestamp')
    expect(output.Commands).toBe(1)
    expect(output.Result).toBe(11)
    expect(output.Duration).toBeGreaterThanOrEqual(0)
  })
})

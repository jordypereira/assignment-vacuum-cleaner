import { describe, it, expect } from 'vitest'
import { VacuumCleaner } from '../models/VacuumCleaner'

describe('VacuumCleaner', () => {
  describe('step', () => {
    it('should move north', () => {
      const vacuum = new VacuumCleaner({ x: 0, y: 0 })
      const result = vacuum.step(0, 0, 'north')
      expect(result).toEqual({ x: 0, y: 1 })
    })

    it('should move east', () => {
      const vacuum = new VacuumCleaner({ x: 0, y: 0 })
      const result = vacuum.step(0, 0, 'east')
      expect(result).toEqual({ x: 1, y: 0 })
    })

    it('should move south', () => {
      const vacuum = new VacuumCleaner({ x: 0, y: 0 })
      const result = vacuum.step(0, 0, 'south')
      expect(result).toEqual({ x: 0, y: -1 })
    })

    it('should move west', () => {
      const vacuum = new VacuumCleaner({ x: 0, y: 0 })
      const result = vacuum.step(0, 0, 'west')
      expect(result).toEqual({ x: -1, y: 0 })
    })
  })
})

type Point = { x: number; y: number }

export class VacuumCleaner {
  private currentPosition: Point
  private visitedSquares = new Set<string>()

  constructor(startPosition: Point) {
    this.currentPosition = { ...startPosition }
    this.visitSquare(this.currentPosition)
  }

  visitSquare(point: Point) {
    this.visitedSquares.add(`${point.x},${point.y}`)
  }

  result() {
    return this.visitedSquares.size
  }

  step(x: number, y: number, direction: string) {
    switch (direction) {
      case 'north': {
        return { x, y: y + 1 }
      }
      case 'east': {
        return { x: x + 1, y }
      }
      case 'south': {
        return { x, y: y - 1 }
      }
      case 'west': {
        return { x: x - 1, y }
      }

      default: {
        return { x, y }
      }
    }
  }

  traverse(commands: { direction: string; steps: number }[]) {
    for (const command of commands) {
      for (let i = 0; i < command.steps; i++) {
        const { x, y } = this.currentPosition
        const { x: newX, y: newY } = this.step(x, y, command.direction)

        this.currentPosition = { x: newX, y: newY }
        this.visitSquare(this.currentPosition)
      }
    }
  }
}

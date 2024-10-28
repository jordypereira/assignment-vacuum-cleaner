export class VacuumCleaner {
  private visitedSquares = new Set<string>()

  visitSquare(x: number, y: number) {
    this.visitedSquares.add(`${x},${y}`)
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

  traverse(start: { x: number; y: number }, commands: { direction: string; steps: number }[]) {
    let x = start.x
    let y = start.y

    this.visitSquare(start.x, start.y)

    for (const command of commands) {
      for (let i = 0; i < command.steps; i++) {
        const { x: newX, y: newY } = this.step(x, y, command.direction)
        x = newX
        y = newY
        this.visitSquare(x, y)
      }
    }
  }
}

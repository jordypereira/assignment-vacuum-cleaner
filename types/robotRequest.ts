export interface RobotRequest {
  start: StartPosition
  commands: Command[]
}

export interface StartPosition {
  x: number
  y: number
}

export interface Command {
  direction: string
  steps: number
}

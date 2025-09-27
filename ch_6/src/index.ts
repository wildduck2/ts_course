type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'triangle'; base: number; height: number }

function describe(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return 'A circle'
    case 'square':
      return 'A square'
    case 'triangle':
      return 'A triangle'

    default:
      const _exhaustive: never = shape // Error if a new type is added
      return _exhaustive
  }
}

export function pipe<T>(value: T, ...fns: ((value: T) => T)[]) {
  return fns.reduce((acc, fn) => fn(acc), value)
}

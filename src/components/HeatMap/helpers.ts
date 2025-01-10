// returns a new date shifted a certain number of days (can be negative)
export function shiftDate(date: Date | string, numDays: number) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

export function getBeginningTimeForDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export function convertToDate(obj: Date | string | number) {
  return obj instanceof Date ? obj : new Date(obj)
}

export function dateNDaysAgo(numDaysAgo) {
  return shiftDate(new Date(), -numDaysAgo)
}

export function getRange(count: number) {
  const arr: number[] = []
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx)
  }
  return arr
}

export type MaybeDate = Date | string | number

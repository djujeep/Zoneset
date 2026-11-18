
export function skyForHour(hour) {
  if (hour < 6) return 'night'
  if (hour < 10) return 'morning'
  if (hour < 17) return 'day'
  if (hour < 19) return 'dusk'
  return 'night'
}
export function localTime(date) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date)
}
// The time in any city, from its time zone name.
export function timeIn(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function hourIn(date, timeZone) {
  return Number(
    new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hourCycle: 'h23' }).format(date),
  )
}

export function dayPart(hour) {
  if (hour < 5) return 'Night'
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  if (hour < 21) return 'Evening'
  return 'Night'
}

export function isChristmasSeason(date) {
  return date.getMonth() === 11 && date.getDate() <= 26
}
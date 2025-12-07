const intlDate = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return 'TBD'
  }

  return intlDate.format(date)
}

export const getDaysUntil = (isoDate: string) => {
  const due = new Date(isoDate)
  const now = new Date()
  due.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  const diff = due.getTime() - now.getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export const isPastDue = (isoDate: string) => {
  const due = new Date(isoDate)
  return !Number.isNaN(due.getTime()) && due.getTime() < Date.now()
}

export const calculateStartTime = (endTime: Date, typeId: number): Date => {
  if (!endTime) return new Date()
  const duration = typeId === 1 ? 30 : 60
  return new Date(endTime.getTime() - duration * 60 * 1000)
}
export const calculateEndTime = (startTime: Date, typeId: number): Date => {
  if (!startTime) return new Date()
  const duration = typeId === 1 ? 30 : 60
  return new Date(startTime.getTime() + duration * 60 * 1000)
}
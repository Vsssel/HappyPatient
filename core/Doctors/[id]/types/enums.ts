export enum WorkingStatus {
  NOT_WORKING = -1,
  UNAVAILABLE = 0,
  AVAILABLE = 1
}

export enum SlotStatus {
  LUNCH = -1,
  SOME_APPOINTMENT = 0,
  MY_APPOINTMENT = 1
}

export enum ManagerSlotStatus {
  MISSED = "missed",
  BOOKED = "booked",
  CONFIRMED = "confirmed"
}
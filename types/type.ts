export interface Identifiable {
  id: string;
}

export interface Achievement {
  id: string;
  habit: string;
  amount: number | null;
  unit: string;
  date: string;
}

export interface Notification {
  habitId: string;
  notifId: string;
  notifyAt: string;
}

export interface Habit {
  habit: string;
  repetition: { [weekdayNum: string]: boolean };
  amount: number | null;
  unit: string;
  remindAt: string | null;
}

export interface IDHabit extends Habit, Identifiable {}

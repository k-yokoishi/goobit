export interface Achievement {
  id: string;
  habit: string;
  amount: number;
  unit: string;
  done: boolean;
  date: string;
}

export interface Notification {
  habitId: string;
  notifId: string;
  notifyAt: string;
}

export interface Habit {
  habit: string;
  repetition: {
    0: boolean;
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
  };
  amount: number;
  unit: string;
  remindAt: string;
  id: string;
}

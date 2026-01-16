
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatCurrency = (amount: number, currencySymbol: string = '£'): string => {
  return `${currencySymbol}${amount.toFixed(2)}`;
};

export interface DayObject {
  day: string;
  date: number;
  fullDate: Date;
}

export const getNextDays = (count: number): DayObject[] => {
  const days: DayObject[] = [];
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < count; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    days.push({
      day: dayNames[nextDate.getDay()],
      date: nextDate.getDate(),
      fullDate: nextDate,
    });
  }
  return days;
};

export function getNextFiveDays() {
  const today = new Date();
  const daysArray = [];

  for (let i = 0; i < 5; i++) {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() + i);
    daysArray.push(currentDay);
  }

  return daysArray;
}
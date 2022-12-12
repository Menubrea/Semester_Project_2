const optionHour = document.querySelector('#inOneHour');
const optionDay = document.querySelector('#inOneDay');
const optionWeek = document.querySelector('#inOneWeek');

export function setExpiration() {
  const now = new Date();
  const inOneHour = new Date(new Date(now).getTime() + 60 * 60 * 1000);
  const inOneDay = new Date(new Date(now).getTime() + 60 * 60 * 24 * 1000);
  const inOneWeek = new Date(new Date(now).getTime() + 60 * 60 * 24 * 1000 * 7);

  optionHour.value = inOneHour;
  optionDay.value = inOneDay;
  optionWeek.value = inOneWeek;
}

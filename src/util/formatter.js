export function formatAuthor(ar = []) {
  let autors = []
  for (let i in ar) {
    autors.push(ar[i].name);
  }
  return autors.join(" | ");
}

export function formateTime(time) {
  if (isNaN(time)) return "00:00";
  const h = parseInt(time / 3600);
  const minute = parseInt((time / 60) % 60);
  const second = Math.ceil(time % 60);

  const hours = h < 10 ? "0" + h : h;
  const formatSecond = second > 59 ? 59 : second;
  return `${hours > 0 ? `${hours}:` : ""}${
    minute < 10 ? "0" + minute : minute
  }:${formatSecond < 10 ? "0" + formatSecond : formatSecond}`;
}
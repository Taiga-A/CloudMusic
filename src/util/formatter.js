export function formatAuthor(ar = []) {
  let autors = []
  for (let i in ar) {
    autors.push(ar[i].name);
  }
  return autors.join(" | ");
}
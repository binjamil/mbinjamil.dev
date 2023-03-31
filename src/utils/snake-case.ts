const dirtyTokens = ['"', "'", ","];

export default function toSnakeCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word
        .split("")
        .filter((token) => !dirtyTokens.includes(token))
        .join("");
    })
    .join("-");
}

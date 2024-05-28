export function shortenAddress(address: string) {
  if (address.length < 10) return address; // Если адрес слишком короткий, возвращаем его как есть
  return address.slice(0, 6) + "..." + address.slice(-5); // Возвращаем сокращенный адрес
}

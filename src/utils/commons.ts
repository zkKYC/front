export function toFixedHex(number: BigInt, length = 32) {
  let str = number.toString(16);
  while (str.length < length * 2) str = "0" + str;
  str = "0x" + str;
  return str;
}

export function shortenAddress(address: string) {
  if (address.length < 10) return address; // Если адрес слишком короткий, возвращаем его как есть
  return address.slice(0, 6) + "..." + address.slice(-5); // Возвращаем сокращенный адрес
}

export function decimalToHex(decimal: bigint) {
  return decimal.toString(16);
}

export function getRandomBigInt(bits: number) {
  let randomBigInt = BigInt(0);
  for (let i = 0; i < bits; i++) {
    const randomBit = Math.random() < 0.5 ? BigInt(0) : BigInt(1);
    randomBigInt = (randomBigInt << BigInt(1)) | randomBit;
  }
  return randomBigInt;
}

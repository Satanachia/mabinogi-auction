export function goldFormat(value: number): string {
  if (value >= 100000000) {
    const eok = Math.floor(value / 100000000);
    const remainder = value % 100000000;
    if (remainder === 0) {
      return `${eok}억`;
    } else {
      const man = Math.floor(remainder / 10000);
      return man > 0 ? `${eok}억 ${man}만` : `${eok}억`;
    }
  } else if (value >= 10000) {
    const man = Math.floor(value / 10000);
    const remainder = value % 10000;
    if (remainder === 0) {
      return `${man}만`;
    } else {
      const cheon = Math.floor(remainder / 1000);
      return cheon > 0 ? `${man}만 ${cheon}천` : `${man}만`;
    }
  } else if (value >= 1000) {
    const cheon = Math.floor(value / 1000);
    return `${cheon}천`;
  } else {
    return value.toLocaleString();
  }
}

export default function chance(p, t, c, strategy) {
  switch(strategy) {
    case 'majority':
      let k = [...Array(math.floor((c + 1) / 2.0)).keys()];
      let minority = k.map(k => math.combinations(c, k) * p ** (t * k) * math.combinations(c, c - k) * (1 - p ** t) ** (c - k));
      console.log(t, c, minority);
      return 1 - math.sum(minority);
    case 'single':
      return 1 - (1 - p ** t) ** c;
    case 'consensus':
      return p ** (c * t);
    default:
      return 0;
  }
}

export const strategies = [
  'consensus',
  'majority',
  'single'
];

export function formula(strategy) {
  switch(strategy) {
    case 'majority':
      return "$$ 1 - \\sum_{k = 0}^{\\lfloor\\frac{c + 1}{2}\\rfloor} {c \\choose k} p^{tk} {c \\choose c - k} \\left(1 - p^t\\right)^{(c - k)} $$";
      // return "$$ \\sum_{n = \\lceil\\frac{c + 1}{2}\\rceil}^c {c \\choose n} p^t {c \\choose c - n} (1 - p^t) $$";
    case 'single':
      return "$$ 1 - \\left( 1 - p^t \\right)^c $$";
    default:
      return "$$ p^{ct} $$";
  }
}

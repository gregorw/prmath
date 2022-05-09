export default function chance(p, t, c, strategy) {
  switch(strategy) {
    case 'majority':
      let k = [...Array(math.floor(c / 2) + 1).keys()];
      let minority = k.map(k => math.combinations(c, k) * p ** (t * k) * (1 - p ** t) ** (c - k));
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
      return "$$ 1 - \\sum_{k = 0}^{\\lfloor\\frac{c}{2}\\rfloor} {c \\choose k} p^{tk} \\left(1 - p^t\\right)^{(c - k)} $$";
    case 'single':
      return "$$ 1 - \\left( 1 - p^t \\right)^c $$";
    default:
      return "$$ p^{ct} $$";
  }
}

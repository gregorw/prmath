export default function chance(p, c, t, strategy) {
  switch(strategy) {
    case 'majority':
      return p;
    case 'single':
      return p ** t;
    case 'consensus':
      return p ** (c * t);
    default:
      return 0;
  }
}

export const strategies = [
  'consensus',
  // 'majority',
  // 'single'
];

export function formula(strategy) {
  switch(strategy) {
    case 'majority':
      return "p^{ct majority}";
    case 'single':
      return "{c \\choose 1} p^{t}";
    default:
      return "p^{ct}";
  }
}

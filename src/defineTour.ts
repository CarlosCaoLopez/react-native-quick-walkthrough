import type { Tour } from './types';
// Immutable Tour
export function defineTour<const T extends Tour>(tour: T): T {
  return tour;
}

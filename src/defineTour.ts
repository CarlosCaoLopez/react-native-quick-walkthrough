import type { Tour } from './types';

export function defineTour<const T extends Tour>(tour: T): T {
  return tour;
}

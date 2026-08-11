import type { TourLabels } from '../types';

export type ResolvedLabels = Required<TourLabels>;

export const DEFAULT_LABELS: ResolvedLabels = {
  skip: 'Skip',
  prev: 'Prev',
  next: 'Next',
  finish: 'Finish',
  counter: (current, total) => `${current} / ${total}`,
};

/**
 * Merges label sources key by key, lowest precedence first.
 * Undefined values never overwrite an already resolved label, so a
 * step-level `{ next }` keeps the provider-level `{ skip }`.
 */
export function resolveLabels(
  ...sources: (TourLabels | undefined)[]
): ResolvedLabels {
  const resolved: ResolvedLabels = { ...DEFAULT_LABELS };

  for (const source of sources) {
    if (!source) continue;
    if (source.skip !== undefined) resolved.skip = source.skip;
    if (source.prev !== undefined) resolved.prev = source.prev;
    if (source.next !== undefined) resolved.next = source.next;
    if (source.finish !== undefined) resolved.finish = source.finish;
    if (source.counter !== undefined) resolved.counter = source.counter;
  }

  return resolved;
}

import { describe, it, expect } from '@jest/globals';
import { DEFAULT_LABELS, resolveLabels } from '../labels';

describe('resolveLabels', () => {
  it('returns the defaults when no source is given', () => {
    expect(resolveLabels()).toEqual(DEFAULT_LABELS);
  });

  it('ignores undefined sources', () => {
    expect(resolveLabels(undefined, undefined)).toEqual(DEFAULT_LABELS);
  });

  it('applies the last source with highest precedence', () => {
    const resolved = resolveLabels(
      { next: 'Siguiente' },
      { next: 'Continuar' },
      { next: 'Vamos' }
    );

    expect(resolved.next).toBe('Vamos');
  });

  it('merges partial sources key by key instead of replacing them', () => {
    const resolved = resolveLabels(
      { skip: 'Omitir', prev: 'Atrás' },
      { finish: 'Listo' },
      { next: 'Continuar' }
    );

    expect(resolved.skip).toBe('Omitir');
    expect(resolved.prev).toBe('Atrás');
    expect(resolved.finish).toBe('Listo');
    expect(resolved.next).toBe('Continuar');
  });

  it('does not let an explicit undefined clobber a lower precedence label', () => {
    const resolved = resolveLabels({ skip: 'Omitir' }, { skip: undefined });

    expect(resolved.skip).toBe('Omitir');
  });

  it('falls back to the default counter format', () => {
    expect(resolveLabels().counter(1, 3)).toBe('1 / 3');
  });

  it('calls a custom counter with a 1-indexed current step', () => {
    const resolved = resolveLabels({
      counter: (current, total) => `Paso ${current} de ${total}`,
    });

    expect(resolved.counter(1, 3)).toBe('Paso 1 de 3');
  });

  it('does not mutate the defaults', () => {
    resolveLabels({ skip: 'Omitir' });

    expect(DEFAULT_LABELS.skip).toBe('Skip');
  });
});

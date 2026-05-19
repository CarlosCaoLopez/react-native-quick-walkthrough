import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { createRef, type ComponentRef } from 'react';
import type { TargetEntry } from '../../store/registry';
import type { View } from 'react-native';

jest.useFakeTimers();

let waitFor: (
  id: string,
  getEntry: (id: string) => TargetEntry | undefined,
  timeout: number
) => Promise<TargetEntry>;
let notifyWaiters: (id: string, entry: TargetEntry) => void;

function makeEntry(): TargetEntry {
  return { ref: createRef<ComponentRef<typeof View>>() };
}

beforeEach(() => {
  jest.resetModules();
  const mod = require('../waitFor') as typeof import('../waitFor');
  waitFor = mod.waitFor;
  notifyWaiters = mod.notifyWaiters;
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('waitFor', () => {
  it('resolves immediately when entry already exists', async () => {
    const entry = makeEntry();
    const result = await waitFor('a', () => entry, 1000);
    expect(result).toBe(entry);
  });

  it('resolves when notifyWaiters called before timeout', async () => {
    const entry = makeEntry();
    const promise = waitFor('b', () => undefined, 1000);
    notifyWaiters('b', entry);
    await expect(promise).resolves.toBe(entry);
  });

  it('rejects with correct message after timeout', async () => {
    const promise = waitFor('c', () => undefined, 500);
    jest.advanceTimersByTime(500);
    await expect(promise).rejects.toThrow(
      'TourTarget "c" not registered within 500ms'
    );
  });

  it('resolves all concurrent waiters for same id', async () => {
    const entry = makeEntry();
    const p1 = waitFor('d', () => undefined, 1000);
    const p2 = waitFor('d', () => undefined, 1000);
    notifyWaiters('d', entry);
    const [r1, r2] = await Promise.all([p1, p2]);
    expect(r1).toBe(entry);
    expect(r2).toBe(entry);
  });

  it('does not throw when notifyWaiters called after timeout', async () => {
    const promise = waitFor('e', () => undefined, 100);
    jest.advanceTimersByTime(100);
    await expect(promise).rejects.toThrow();
    expect(() => notifyWaiters('e', makeEntry())).not.toThrow();
  });

  it('clears timer when resolved early (no late rejection)', async () => {
    const entry = makeEntry();
    const promise = waitFor('f', () => undefined, 1000);
    notifyWaiters('f', entry);
    await promise;
    jest.advanceTimersByTime(1000);
    // no unhandled rejection
  });
});

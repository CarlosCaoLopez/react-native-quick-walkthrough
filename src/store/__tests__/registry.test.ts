import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import { createRef, type ComponentRef } from 'react';
import type { View } from 'react-native';

jest.useFakeTimers();

let registry: typeof import('../registry').registry;

beforeEach(() => {
  jest.resetModules();
  registry = require('../registry').registry;
});

afterEach(() => {
  jest.clearAllTimers();
});

function makeRef() {
  return createRef<ComponentRef<typeof View>>();
}

describe('registry', () => {
  describe('register / get', () => {
    it('stores entry retrievable by id', () => {
      const ref = makeRef();
      registry.register('a', ref);
      const entry = registry.get('a');
      expect(entry).toBeDefined();
      expect(entry?.ref).toBe(ref);
    });

    it('returns undefined for unknown id', () => {
      expect(registry.get('unknown')).toBeUndefined();
    });
  });

  describe('unregister', () => {
    it('removes entry', () => {
      registry.register('b', makeRef());
      registry.unregister('b');
      expect(registry.get('b')).toBeUndefined();
    });
  });

  describe('waitFor', () => {
    it('resolves immediately for already-registered target', async () => {
      const ref = makeRef();
      registry.register('c', ref);
      const entry = await registry.waitFor('c', 1000);
      expect(entry.ref).toBe(ref);
    });

    it('resolves when target registered after call', async () => {
      const ref = makeRef();
      const promise = registry.waitFor('d', 1000);
      registry.register('d', ref);
      const entry = await promise;
      expect(entry.ref).toBe(ref);
    });

    it('rejects after timeout for never-registered target', async () => {
      const promise = registry.waitFor('e', 300);
      jest.advanceTimersByTime(300);
      await expect(promise).rejects.toThrow(
        'TourTarget "e" not registered within 300ms'
      );
    });
  });
});

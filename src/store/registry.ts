import type { ComponentRef, RefObject } from 'react';
import type { View } from 'react-native';
import type { TargetId, TargetLayout } from '../types';
import { notifyWaiters, waitFor as _waitFor } from '../engine/waitFor';

export interface TargetEntry {
  ref: RefObject<ComponentRef<typeof View> | null>;
  layout?: TargetLayout;
  onLayoutChange?: (layout: TargetLayout) => void;
}

const targets = new Map<TargetId, TargetEntry>();

function register(
  id: TargetId,
  ref: RefObject<ComponentRef<typeof View> | null>
): void {
  const entry: TargetEntry = { ref };
  targets.set(id, entry);
  notifyWaiters(id, entry);
}

function unregister(id: TargetId): void {
  targets.delete(id);
}

function get(id: TargetId): TargetEntry | undefined {
  return targets.get(id);
}

function waitFor(id: TargetId, timeout: number): Promise<TargetEntry> {
  return _waitFor(id, targets.get.bind(targets), timeout);
}

export const registry = { register, unregister, get, waitFor };

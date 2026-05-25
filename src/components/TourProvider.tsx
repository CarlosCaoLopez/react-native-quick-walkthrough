import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import type { ComponentRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { createTourEngine } from '../engine/tourEngine';
import type { NavigationAdapter, PersistenceAdapter } from '../adapters/types';
import type { Tour } from '../types';
import { TourOverlay } from './TourOverlay';
import { useTourPersistence } from '../hooks/useTourPersistence';
import { TourContext } from '../store/tourContext';
import { registry } from '../store/registry';

export { useTourContext } from '../store/tourContext';

interface TourProviderProps {
  tours: Tour[];
  navigationAdapter: NavigationAdapter;
  persistence?: PersistenceAdapter;
  tapOutsideToAdvance?: boolean;
  blockOutsideTouches?: boolean;
  children: ReactNode;
}

export function TourProvider({
  tours,
  navigationAdapter,
  persistence,
  tapOutsideToAdvance,
  blockOutsideTouches,
  children,
}: TourProviderProps) {
  const engine = useMemo(
    () => createTourEngine(navigationAdapter),
    [navigationAdapter]
  );

  const toursMap = useMemo(() => new Map(tours.map((t) => [t.id, t])), [tours]);

  useTourPersistence(persistence, engine, toursMap);

  const containerRef = useRef<ComponentRef<typeof View>>(null);

  useEffect(() => {
    registry.setContainerRef(containerRef);
    return () => registry.setContainerRef(null);
  }, []);

  return (
    <TourContext.Provider value={{ engine, toursMap }}>
      <View ref={containerRef} style={styles.root} collapsable={false}>
        {children}
        <TourOverlay
          tapOutsideToAdvance={tapOutsideToAdvance}
          blockOutsideTouches={blockOutsideTouches}
        />
      </View>
    </TourContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

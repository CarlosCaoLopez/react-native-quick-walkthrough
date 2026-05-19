import { useCallback, useEffect, useState } from 'react';
import type { ComponentRef, RefObject } from 'react';
import { Dimensions } from 'react-native';
import type { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { TargetLayout } from '../types';

export function useTargetLayout(
  ref: RefObject<ComponentRef<typeof View> | null>
): { onLayout: () => void; layout: TargetLayout | null } {
  const [layout, setLayout] = useState<TargetLayout | null>(null);

  const measure = useCallback(() => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
    });
  }, [ref]);

  const onLayout = useCallback(() => {
    requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', measure);
    return () => sub.remove();
  }, [measure]);

  useFocusEffect(measure);

  return { onLayout, layout };
}

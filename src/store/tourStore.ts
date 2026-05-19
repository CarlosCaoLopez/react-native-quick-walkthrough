import { create } from 'zustand';
import type { Tour, TargetLayout } from '../types';

export type TourStatus = 'idle' | 'running' | 'paused' | 'completed';

interface TourState {
  activeTour: Tour | null;
  currentStepIndex: number;
  status: TourStatus;
  activeLayout: TargetLayout | null;
}

interface TourActions {
  start: (tour: Tour) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  skip: () => void;
  pause: () => void;
  resume: () => void;
  setLayout: (layout: TargetLayout) => void;
}

const initialState: TourState = {
  activeTour: null,
  currentStepIndex: 0,
  status: 'idle',
  activeLayout: null,
};

export const useTourStore = create<TourState & TourActions>((set, get) => ({
  ...initialState,

  start(tour) {
    set({
      activeTour: tour,
      currentStepIndex: 0,
      status: 'running',
      activeLayout: null,
    });
  },

  stop() {
    set({ ...initialState });
  },

  next() {
    const { activeTour, currentStepIndex } = get();
    if (!activeTour) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= activeTour.steps.length) {
      activeTour.onComplete?.();
      set({ ...initialState, status: 'completed' });
    } else {
      set({ currentStepIndex: nextIndex, activeLayout: null });
    }
  },

  prev() {
    const { currentStepIndex } = get();
    if (currentStepIndex <= 0) return;
    set({ currentStepIndex: currentStepIndex - 1, activeLayout: null });
  },

  skip() {
    const { activeTour } = get();
    activeTour?.onSkip?.();
    set({ ...initialState });
  },

  pause() {
    set({ status: 'paused' });
  },

  resume() {
    set({ status: 'running' });
  },

  setLayout(layout) {
    set({ activeLayout: layout });
  },
}));

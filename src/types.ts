export type TargetId = string;
export type TourId = string;

export interface TourLabels {
  skip?: string;
  prev?: string;
  next?: string;
  finish?: string;
  /** `current` is 1-indexed. Default: `${current} / ${total}` */
  counter?: (current: number, total: number) => string;
}

export interface TourStep<T extends TargetId = TargetId> {
  id: string;
  target: T;
  route?: string;
  text: string;
  title?: string;
  scrollTo?: boolean;
  onBeforeShow?: () => Promise<void> | void;
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  hidePrevButton?: boolean;
  hideSkipButton?: boolean;
  hideNextButton?: boolean;
  blockOutsideTouches?: boolean;
  blockInsideTouches?: boolean;
  labels?: TourLabels;
}

export interface Tour {
  id: TourId;
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  blockOutsideTouches?: boolean;
  blockInsideTouches?: boolean;
  labels?: TourLabels;
}

export interface TargetLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

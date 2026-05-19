import type { TargetLayout } from '../types';
import type { EdgeInsets } from './safeArea';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

type Placement = TooltipPlacement;

const GAP = 12;

interface Params {
  target: TargetLayout;
  screen: { width: number; height: number };
  tooltip: { width: number; height: number };
  insets: EdgeInsets;
  placement: 'auto' | Placement;
}

function centeredX(
  target: TargetLayout,
  tooltipWidth: number,
  insets: EdgeInsets,
  screenWidth: number
): number {
  const ideal = target.x + (target.width - tooltipWidth) / 2;
  return Math.max(
    insets.left,
    Math.min(ideal, screenWidth - insets.right - tooltipWidth)
  );
}

function centeredY(
  target: TargetLayout,
  tooltipHeight: number,
  insets: EdgeInsets,
  screenHeight: number
): number {
  const ideal = target.y + (target.height - tooltipHeight) / 2;
  return Math.max(
    insets.top,
    Math.min(ideal, screenHeight - insets.bottom - tooltipHeight)
  );
}

function positionFor(
  placement: Placement,
  target: TargetLayout,
  tooltip: { width: number; height: number },
  insets: EdgeInsets,
  screen: { width: number; height: number }
): { x: number; y: number } {
  switch (placement) {
    case 'bottom':
      return {
        x: centeredX(target, tooltip.width, insets, screen.width),
        y: target.y + target.height + GAP,
      };
    case 'top':
      return {
        x: centeredX(target, tooltip.width, insets, screen.width),
        y: target.y - tooltip.height - GAP,
      };
    case 'left':
      return {
        x: target.x - tooltip.width - GAP,
        y: centeredY(target, tooltip.height, insets, screen.height),
      };
    case 'right':
      return {
        x: target.x + target.width + GAP,
        y: centeredY(target, tooltip.height, insets, screen.height),
      };
  }
}

function fits(
  pos: { x: number; y: number },
  tooltip: { width: number; height: number },
  insets: EdgeInsets,
  screen: { width: number; height: number }
): boolean {
  return (
    pos.x >= insets.left &&
    pos.x + tooltip.width <= screen.width - insets.right &&
    pos.y >= insets.top &&
    pos.y + tooltip.height <= screen.height - insets.bottom
  );
}

function laterals(preferred: Placement): Placement[] {
  if (preferred === 'top' || preferred === 'bottom') return ['left', 'right'];
  return ['top', 'bottom'];
}

function opposite(preferred: Placement): Placement {
  switch (preferred) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
}

export function computeTooltipPosition({
  target,
  screen,
  tooltip,
  insets,
  placement,
}: Params): { x: number; y: number; resolvedPlacement: TooltipPlacement } {
  const preferred: Placement = placement === 'auto' ? 'bottom' : placement;

  const candidates: Placement[] = [
    preferred,
    opposite(preferred),
    ...laterals(preferred),
  ];

  for (const candidate of candidates) {
    const pos = positionFor(candidate, target, tooltip, insets, screen);
    if (fits(pos, tooltip, insets, screen)) {
      return { ...pos, resolvedPlacement: candidate };
    }
  }

  return {
    x: insets.left + GAP,
    y: screen.height - insets.bottom - tooltip.height - GAP,
    resolvedPlacement: 'bottom',
  };
}

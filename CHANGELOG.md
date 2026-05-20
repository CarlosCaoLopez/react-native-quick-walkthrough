# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each entry explains **why** the change was made, not just what files changed.

---

## [Unreleased]

---

## [0.1.0] — 2026-05-20

### Added

- **TourProvider** — root component that injects navigation and persistence adapters, and mounts `TourOverlay` via `@gorhom/portal`. Using a Portal (rather than a root `View` or `Modal`) ensures the overlay survives navigation and works correctly with Reanimated on both platforms.
- **TourTarget** — wraps any UI element to make it a named tour step target. Registers its ref in the global registry on mount and unregisters on unmount, solving the stale-ref problem that breaks other walkthrough libraries when screens are navigated away.
- **TourOverlay** — the overlay rendered above the navigator. Contains `Spotlight` and `Tooltip` as children, and survives screen transitions because it is mounted in a Portal at the root.
- **Spotlight** — Skia `Canvas` with a luminance mask: a white full-screen rect minus a black `RoundedRect` at the target area. `hx`, `hy`, `hw`, `hh` are Reanimated `SharedValue`s animated with `withTiming` directly on the UI thread, so transitions run at 60 fps without touching the JS bridge.
- **Tooltip** — auto-positioned tooltip rendered adjacent to the spotlight hole. Position is computed by `utils/positioning.ts` based on available screen space and safe area insets.
- **`defineTour()`** — declares a tour outside any component as a plain serializable object. Each step carries its own `route`, `target` id, and display text, so tours are testable and navigation-aware by design.
- **Registry** (`store/registry.ts`) — target refs register by string id when mounted. The engine calls `registry.waitFor(id, 3000)` before measuring, resolving the race condition between navigation completing and the ref becoming available.
- **Tour Engine** (`engine/tourEngine.ts`) — three-phase per-step execution: `navigate (if route differs) → waitFor target registered → requestAnimationFrame → measureInWindow`. Measurement happens after the frame to ensure layout is settled.
- **`useTour` hook** — consumer-facing hook to start, stop, advance, and go back in a tour.
- **`createExpoRouterAdapter()`** — navigation adapter for Expo Router. Implements `navigate`, `getCurrentRoute`, and `subscribe` against the Expo Router API.
- **Zustand store** (`store/tourStore.ts`) — holds `activeTour`, `currentStepIndex`, `status`, and `activeLayout`. Selective subscriptions prevent global re-renders during spotlight animations.
- **Persistence adapter interface** — consumers inject AsyncStorage, MMKV, or any key-value store via the `PersistenceAdapter` interface. Omitting it causes tours to reset each session.
- **Example app** — Expo Router example app demonstrating a multi-screen tour with tab navigation, wired to the library source via `react-native-monorepo-config` for fast iteration.

### Why this library exists

Existing React Native walkthrough libraries (e.g. `react-native-copilot`) assume all tour steps are mounted simultaneously. This assumption breaks with modern navigation (Expo Router, React Navigation v7) because refs die when screens unmount and steps can live on different routes. `react-native-walkthrough` solves this structurally: each step knows its route, the engine navigates to it, and the registry waits for the ref to appear before measuring.

[Unreleased]: https://github.com/CarlosCaoLopez/react-native-walkthrough/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/CarlosCaoLopez/react-native-walkthrough/releases/tag/v0.1.0

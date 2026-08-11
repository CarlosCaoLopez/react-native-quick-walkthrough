import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  TourProvider,
  createExpoRouterAdapter,
} from 'react-native-quick-walkthrough';
import { onboardingTour } from '../src/tours/onboarding';

const { adapter, Bridge } = createExpoRouterAdapter();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Bridge />
      <TourProvider
        tours={[onboardingTour]}
        navigationAdapter={adapter}
        labels={{
          skip: 'Omitir',
          prev: 'Atrás',
          next: 'Siguiente',
          finish: 'Listo',
          counter: (current, total) => `Paso ${current} de ${total}`,
        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </TourProvider>
    </SafeAreaProvider>
  );
}

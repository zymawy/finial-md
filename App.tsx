import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StateManagement } from "./StateManagement/StateManagement";
import  { CartManagement } from "./StateManagement/CartManagement";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StateManagement>
			<PaperProvider>
				<CartManagement>
          		<Navigation colorScheme={colorScheme} />
				</CartManagement>
			</PaperProvider>
        </StateManagement>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

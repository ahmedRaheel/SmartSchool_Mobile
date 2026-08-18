import { StatusBar } from "expo-status-bar";
import { AppProvider } from "./src/app/AppProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";
export default function App() {
  return <AppProvider><StatusBar style="auto" /><RootNavigator /></AppProvider>;
}

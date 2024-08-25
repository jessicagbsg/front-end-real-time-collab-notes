import { Toaster } from "./components";
import { AuthProvider } from "./context/AuthProvider";
import { RoutesProvider } from "./routes/Routes";

export function App() {
  return (
    <AuthProvider>
      <RoutesProvider />
      <Toaster />
    </AuthProvider>
  );
}

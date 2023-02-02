import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AlertProvider>
          <RecoilRoot>
            <BrowserRouter>
              <Router />
              <ScrollToTop />
            </BrowserRouter>
          </RecoilRoot>
        </AlertProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

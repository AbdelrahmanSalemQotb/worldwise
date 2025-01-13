import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SmallComponents/SpinnerFullPage";
import PrivateRoute from "./pages/PrivateRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./context/SidebarContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./pages/ErrorFallback";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const SignUp = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<SignUp />} />

              <Route element={<PrivateRoute />}>
                <Route
                  path="/app"
                  element={
                    <SidebarProvider>
                      <AppLayout />
                    </SidebarProvider>
                  }
                >
                  <Route index element={<Navigate to="cities" replace />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="form" element={<Form />} />
                  <Route path="countries" element={<CountryList />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

          <Toaster
            gutter={8}
            toastOptions={{
              style: {
                fontSize: "1.6rem",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

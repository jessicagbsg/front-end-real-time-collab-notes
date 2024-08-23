import { LandingPage } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <div>
              <h1>login</h1>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <h1>sinup</h1>
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={
                <div>
                  <h1>Home</h1>
                </div>
              }
            />
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute
              element={
                <div>
                  <h1>Note</h1>
                </div>
              }
            />
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h1>404 - Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

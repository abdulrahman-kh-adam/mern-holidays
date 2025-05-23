import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Toast from "./components/Toast";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthState } from "./redux/AuthSlice";
import * as apiClient from "./api-client";

function AppRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        await apiClient.validateToken();
        dispatch(setAuthState(true));
      } catch {
        dispatch(setAuthState(false));
      } finally {
        setLoading(false);
        console.log("AuthState changed");
      }
    };

    setLoading(true); // set loading while we check auth
    validate();
  }, [location.pathname, dispatch]); // re-run on every path change

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout headerLoading={loading}>
            <p>Homepage</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout headerLoading={loading}>
            <p>Search Page</p>
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout headerLoading={loading}>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/signin"
        element={
          <Layout headerLoading={loading}>
            <SignIn />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout headerLoading={loading}>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Toast />
      <AppRoutes />
    </Router>
  );
}

export default App;

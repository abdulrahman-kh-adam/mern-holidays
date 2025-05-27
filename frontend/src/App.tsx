import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
// import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Toast from "./components/Toast";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthState } from "./redux/AuthSlice";
import * as apiClient from "./api-client";
import { RootState } from "./redux/Store";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import NotFound from "./components/NotFound";

function AppRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const validate = async () => {
      try {
        await apiClient.validateToken();
        dispatch(setAuthState(true));
      } catch {
        dispatch(setAuthState(false));
      } finally {
        setLoading(false);
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

      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout headerLoading={loading}>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout headerLoading={loading}>
                <MyHotels />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout headerLoading={loading}>
                <EditHotel />
              </Layout>
            }
          />
        </>
      )}

      {!loading && (
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Layout headerLoading={loading}>
                <NotFound />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      )}
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

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthAdminProvider } from "../src/context/AuthContext.jsx";

import NavBar from "./components/NavBar.jsx";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";

function App() {
  return (
    <AuthAdminProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile/" element={<ProfilePage />} />
            <Route path="/admin/" element={<AdminPage />} />
            <Route path="/catalog/" element={<CatalogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthAdminProvider>
  );
}

export default App;

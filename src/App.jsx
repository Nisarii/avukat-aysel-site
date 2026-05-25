import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import ArticlePage from "./ArticlePage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import NewArticle from "./NewArticle";
import ProtectedRoute from "./ProtectedRoute";

import CalismaAlanlariPage from "./CalismaAlanlariPage";
import HakkimdaPage from "./HakkimdaPage";
import MakalelerPage from "./MakalelerPage";
import IletisimPage from "./IletisimPage";

import ChangePassword from "./pages/ChangePassword";
import CalismaAlaniDetayPage from "./CalismaAlaniDetayPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/calisma-alanlari" element={<CalismaAlanlariPage />} />
      <Route path="/calisma-alanlari/:slug" element={<CalismaAlaniDetayPage />} />
      <Route path="/hakkimda" element={<HakkimdaPage />} />
      <Route path="/makaleler" element={<MakalelerPage />} />
      <Route path="/iletisim" element={<IletisimPage />} />

      <Route path="/makale/:id" element={<ArticlePage />} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/new"
        element={
          <ProtectedRoute>
            <NewArticle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/sifre-degistir"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
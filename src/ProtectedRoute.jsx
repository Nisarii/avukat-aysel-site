import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.log("SESSION ERROR:", error);
      }
      setSession(data?.session ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>Yükleniyor...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
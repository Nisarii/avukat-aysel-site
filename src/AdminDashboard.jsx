import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Makaleler alınamadı: " + error.message);
      setArticles([]);
    } else {
      setArticles(data || []);
    }

    setLoading(false);
  }

  async function deleteArticle(id) {
    const confirmDelete = window.confirm("Silmek istediğine emin misin?");
    if (!confirmDelete) return;

    const { data, error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      alert("Silme hatası: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("Silme işlemi yapılmadı.");
      return;
    }

    alert("Makale silindi");
    fetchArticles();
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Çıkış yapılırken hata oluştu: " + error.message);
      return;
    }

    navigate("/admin/login");
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>Yükleniyor...</div>;
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={headerInner}>
          <div>
            <p style={eyebrowStyle}>YÖNETİM PANELİ</p>
            <h1 style={titleStyle}>Makale Yönetimi</h1>
          </div>

          <div style={actionGroup}>
            <Link to="/" style={secondaryLink}>
              Ana Sayfa
            </Link>

            <Link to="/admin/new" style={primaryLink}>
              + Yeni Makale
            </Link>

            <Link to="/admin/sifre-degistir" style={passwordLink}>
              Şifre Değiştir
            </Link>

            <button onClick={handleLogout} style={logoutButton}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main style={mainStyle}>
        {articles.length === 0 ? (
          <div style={emptyState}>
            <h3>Henüz makale yok</h3>
          </div>
        ) : (
          <div style={gridStyle}>
            {articles.map((article) => (
              <div key={article.id} style={cardStyle}>
                <p style={metaStyle}>
                  {article.category || "Genel"} •{" "}
                  {article.created_at
                    ? new Date(article.created_at).toLocaleDateString("tr-TR")
                    : "-"}
                </p>

                <h3 style={cardTitle}>{article.title}</h3>
                <p style={cardExcerpt}>{article.excerpt || "Özet yok."}</p>

                <div style={buttonRow}>
                  <button
                    style={deleteButton}
                    onClick={() => deleteArticle(article.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f2",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  background: "linear-gradient(90deg, #6e4b2a, #b08d57)",
  color: "white",
};

const headerInner = {
  width: "min(1200px, calc(100% - 40px))",
  margin: "0 auto",
  padding: "24px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const eyebrowStyle = {
  margin: "0 0 8px 0",
  fontSize: "12px",
  letterSpacing: "2px",
  fontWeight: "700",
};

const titleStyle = {
  margin: 0,
  fontSize: "34px",
};

const actionGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const primaryLink = {
  background: "white",
  color: "#6e4b2a",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: "700",
};

const secondaryLink = {
  background: "rgba(255,255,255,0.12)",
  color: "white",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  border: "1px solid rgba(255,255,255,0.2)",
};

const passwordLink = {
  background: "#f0e7dc",
  color: "#2b1d14",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: "700",
};

const logoutButton = {
  background: "#2b2118",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const mainStyle = {
  width: "min(1200px, calc(100% - 40px))",
  margin: "0 auto",
  padding: "30px 0 50px 0",
};

const emptyState = {
  background: "white",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "22px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const metaStyle = {
  marginTop: 0,
  marginBottom: "10px",
  color: "#8b6a3f",
  fontSize: "13px",
  fontWeight: "700",
};

const cardTitle = {
  marginTop: 0,
  marginBottom: "10px",
  fontSize: "22px",
};

const cardExcerpt = {
  margin: 0,
  lineHeight: 1.8,
  color: "#5d4d3d",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "16px",
};

const deleteButton = {
  background: "crimson",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};
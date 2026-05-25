import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./lib/supabase";

export default function MakalelerPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Makale çekme hatası:", error);
        setArticles([]);
      } else {
        setArticles(data || []);
      }

      setLoading(false);
    }

    fetchArticles();
  }, []);

  function getReadingTime(article) {
    const text = `${article?.title || ""} ${article?.excerpt || ""}`.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} dk okuma`;
  }

  return (
    <div style={pageStyle}>
      <Link to="/" style={backLink}>← Ana Sayfa</Link>

      <p style={eyebrow}>HUKUKİ YAYINLAR</p>
      <h1 style={title}>Makaleler</h1>
      <p style={intro}>
        Hukukun farklı alanlarına ilişkin bilgilendirici yayınlar ve güncel
        hukuki değerlendirmeler.
      </p>

      {loading ? (
        <p style={centerText}>Makaleler yükleniyor...</p>
      ) : articles.length === 0 ? (
        <p style={centerText}>Henüz yayınlanmış makale bulunmuyor.</p>
      ) : (
        <div style={grid}>
          {articles.map((article) => (
            <div key={article.id} style={card}>
              <div style={topRow}>
                <span style={category}>{article.category || "Genel"}</span>
                <span style={date}>
                  {new Date(article.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>

              <h3 style={cardTitle}>{article.title}</h3>
              <p style={cardText}>{article.excerpt || "-"}</p>

              <div style={bottomRow}>
                
                <Link to={`/makale/${article.id}`} style={button}>
                  Devamını Oku
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f8f4ee 0%, #efe4d5 100%)",
  padding: "50px min(6vw, 80px)",
  fontFamily: "Arial, sans-serif",
  color: "#241b13",
};

const backLink = {
  display: "inline-block",
  marginBottom: "38px",
  color: "#8b6a3f",
  textDecoration: "none",
  fontWeight: "800",
};

const eyebrow = {
  textAlign: "center",
  color: "#8b6a3f",
  fontWeight: "800",
  letterSpacing: "2.2px",
  fontSize: "12px",
};

const title = {
  textAlign: "center",
  fontSize: "44px",
  margin: "10px 0 16px",
};

const intro = {
  maxWidth: "760px",
  margin: "0 auto 42px",
  textAlign: "center",
  color: "#5b4b3d",
  lineHeight: 1.8,
  fontSize: "17px",
};

const centerText = {
  textAlign: "center",
  color: "#5b4b3d",
};

const grid = {
  maxWidth: "1120px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const card = {
  background: "rgba(255,255,255,0.94)",
  border: "1px solid #e3cfb4",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 14px 34px rgba(74,53,33,0.10)",
  minHeight: "280px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  marginBottom: "14px",
};

const category = {
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#f3e7d7",
  color: "#8b6a3f",
  fontSize: "11px",
  fontWeight: "800",
};

const date = {
  color: "#9a8468",
  fontSize: "12px",
};

const cardTitle = {
  margin: "0 0 12px",
  fontSize: "21px",
  lineHeight: 1.3,
};

const cardText = {
  color: "#5b4b3d",
  lineHeight: 1.7,
};

const bottomRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginTop: "20px",
};

const readingTime = {
  color: "#8a7358",
  fontSize: "12px",
  fontWeight: "800",
};

const button = {
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  padding: "9px 14px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "13px",
};
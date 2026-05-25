import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "./lib/supabase";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevArticle, setPrevArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  useEffect(() => {
    fetchArticleAndNeighbors();
  }, [id]);

  async function fetchArticleAndNeighbors() {
    setLoading(true);

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Makale listesi alınamadı:", error);
      setArticle(null);
      setPrevArticle(null);
      setNextArticle(null);
      setLoading(false);
      return;
    }

    const articles = data || [];
    const currentIndex = articles.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (currentIndex === -1) {
      setArticle(null);
      setPrevArticle(null);
      setNextArticle(null);
      setLoading(false);
      return;
    }

    setArticle(articles[currentIndex]);

    setPrevArticle(
      currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
    );

    setNextArticle(currentIndex > 0 ? articles[currentIndex - 1] : null);

    setLoading(false);
  }

  function handleShare() {
    if (!article) return;

    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || article.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Makale linki kopyalandı.");
    }
  }

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <p style={loadingText}>Makale yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>Makale bulunamadı</h1>
            <p style={emptyText}>
              İlgili makale silinmiş olabilir veya bağlantı geçersiz olabilir.
            </p>
            <Link to="/" style={backButton}>
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={topBar}>
          <Link to="/" style={backButton}>
            Ana Sayfa
          </Link>

          <button onClick={handleShare} style={shareButton}>
            Paylaş
          </button>
        </div>

        <article style={cardStyle}>
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={article.title}
              style={coverImageStyle}
            />
          )}

          <p style={categoryStyle}>{article.category || "Genel"}</p>

          <h1 style={titleStyle}>{article.title}</h1>

          <div style={metaRow}>
            <p style={dateStyle}>
              {article.created_at
                ? new Date(article.created_at).toLocaleDateString("tr-TR")
                : ""}
            </p>

            {article.reading_time && (
              <p style={readingTimeStyle}>{article.reading_time} dk okuma</p>
            )}
          </div>

          {article.excerpt && (
            <p style={excerptStyle}>{article.excerpt}</p>
          )}

          <div style={contentStyle}>
            {article.content || "İçerik bulunamadı."}
          </div>
        </article>

        <div style={navCardsWrapper}>
          {prevArticle ? (
            <Link to={`/makale/${prevArticle.id}`} style={navCard}>
              <span style={navLabel}>← Önceki Makale</span>
              <span style={navTitle}>{prevArticle.title}</span>
            </Link>
          ) : (
            <div style={navCardDisabled}>
              <span style={navLabel}>← Önceki Makale</span>
              <span style={navTitle}>Önceki makale yok</span>
            </div>
          )}

          {nextArticle ? (
            <Link to={`/makale/${nextArticle.id}`} style={navCard}>
              <span style={navLabel}>Sonraki Makale →</span>
              <span style={navTitle}>{nextArticle.title}</span>
            </Link>
          ) : (
            <div style={navCardDisabled}>
              <span style={navLabel}>Sonraki Makale →</span>
              <span style={navTitle}>Sonraki makale yok</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f2",
  padding: "40px 20px",
  fontFamily: "Arial, sans-serif",
};

const containerStyle = {
  maxWidth: "950px",
  margin: "0 auto",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const backButton = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "12px",
  background: "#2f1d0f",
  color: "white",
  textDecoration: "none",
  fontWeight: "700",
};

const shareButton = {
  padding: "10px 16px",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  border: "none",
  fontWeight: "700",
  cursor: "pointer",
};

const cardStyle = {
  background: "white",
  borderRadius: "22px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const coverImageStyle = {
  width: "100%",
  maxHeight: "420px",
  objectFit: "cover",
  borderRadius: "18px",
  marginBottom: "24px",
};

const categoryStyle = {
  color: "#9a6f3c",
  fontWeight: "700",
  margin: "0 0 10px 0",
  fontSize: "14px",
  letterSpacing: "0.4px",
};

const titleStyle = {
  fontSize: "42px",
  lineHeight: 1.2,
  margin: "0 0 14px 0",
  color: "#24180f",
};

const metaRow = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: "22px",
};

const dateStyle = {
  color: "#8b7b6c",
  margin: 0,
  fontSize: "14px",
};

const readingTimeStyle = {
  color: "#8b6a3f",
  margin: 0,
  fontSize: "14px",
  fontWeight: "700",
};

const excerptStyle = {
  fontSize: "18px",
  lineHeight: 1.8,
  color: "#4f4033",
  marginBottom: "26px",
  fontWeight: "600",
};

const contentStyle = {
  fontSize: "17px",
  lineHeight: 1.95,
  color: "#2f2419",
  whiteSpace: "pre-wrap",
};

const loadingText = {
  textAlign: "center",
  color: "#5b4b3d",
  fontSize: "18px",
};

const emptyText = {
  color: "#5b4b3d",
  lineHeight: 1.8,
  marginBottom: "20px",
};

const navCardsWrapper = {
  marginTop: "24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};

const navCard = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  textDecoration: "none",
  background: "white",
  borderRadius: "18px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  color: "#2b2118",
  border: "1px solid #eadfce",
};

const navCardDisabled = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: "#f1ece6",
  borderRadius: "18px",
  padding: "20px",
  color: "#8b7b6c",
  border: "1px solid #e3d8cc",
};

const navLabel = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#8b6a3f",
};

const navTitle = {
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: 1.5,
};
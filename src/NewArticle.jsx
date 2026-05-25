import { useState } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  function makeSlug(text) {
    return text
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      alert("Oturum hatası: " + sessionError.message);
      setSaving(false);
      return;
    }

    if (!session || !session.user) {
      alert("Lütfen tekrar giriş yap.");
      setSaving(false);
      navigate("/admin/login");
      return;
    }

    const finalSlug = `${makeSlug(title)}-${Date.now()}`;

    const { error } = await supabase.from("articles").insert([
      {
        title: title.trim(),
        slug: finalSlug,
        category: category.trim() || "Genel",
        excerpt: excerpt.trim(),
        cover_image: coverImage.trim(),
        content: content.trim(),
        published: true,
        author_id: session.user.id,
      },
    ]);

    if (error) {
      alert("Makale kaydedilemedi: " + error.message);
      setSaving(false);
      return;
    }

    alert("Makale başarıyla eklendi");
    setSaving(false);
    navigate("/admin/dashboard");
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={topRow}>
          <div>
            <p style={eyebrowStyle}>YENİ İÇERİK</p>
            <h1 style={titleStyle}>Yeni Makale Ekle</h1>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link to="/admin/dashboard" style={secondaryLink}>
              Yönetici Paneli
            </Link>

            <Link to="/" style={secondaryLink}>
              Ana Sayfa
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formCard}>
          <label style={labelStyle}>Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            placeholder="Makale başlığı"
            required
          />

          <label style={labelStyle}>Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
            placeholder="Örn: Aile Hukuku"
          />

          <label style={labelStyle}>Kısa Özet</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            style={inputStyle}
            placeholder="Makale kısa açıklaması"
          />

          <label style={labelStyle}>Kapak Görseli URL</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            style={inputStyle}
            placeholder="https://..."
          />

          <label style={labelStyle}>Makale İçeriği</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            style={textareaStyle}
            placeholder="Makale içeriğini buraya yazın..."
            required
          />

          <button type="submit" style={primaryButton} disabled={saving}>
            {saving ? "Kaydediliyor..." : "Makaleyi Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f5f2",
  fontFamily: "Arial, sans-serif",
};

const containerStyle = {
  width: "min(1000px, calc(100% - 40px))",
  margin: "0 auto",
  padding: "36px 0 50px 0",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "24px",
};

const eyebrowStyle = {
  margin: "0 0 10px 0",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#8b6a3f",
};

const titleStyle = {
  margin: 0,
  fontSize: "38px",
  color: "#2b2118",
};

const formCard = {
  background: "white",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "14px",
  fontWeight: "700",
  color: "#3a2d22",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d8cdbf",
  boxSizing: "border-box",
  fontSize: "15px",
};

const textareaStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d8cdbf",
  boxSizing: "border-box",
  fontSize: "15px",
  resize: "vertical",
  minHeight: "220px",
};

const primaryButton = {
  marginTop: "20px",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryLink = {
  background: "#2b2118",
  color: "white",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: "700",
  display: "inline-block",
};
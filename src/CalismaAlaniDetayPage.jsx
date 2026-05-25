import { Link, useParams } from "react-router-dom";
import { practiceAreas } from "./CalismaAlanlariPage";

export default function CalismaAlaniDetayPage() {
  const { slug } = useParams();

  const area = practiceAreas.find((item) => item.slug === slug);

  if (!area) {
    return (
      <div style={pageStyle}>
        <Link to="/calisma-alanlari" style={backLink}>
          ← Çalışma Alanlarına Dön
        </Link>

        <div style={contentBox}>
          <h1 style={title}>Çalışma alanı bulunamadı</h1>
          <p style={text}>
            Aradığınız çalışma alanı mevcut değil veya bağlantı hatalı.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Link to="/calisma-alanlari" style={backLink}>
        ← Çalışma Alanlarına Dön
      </Link>

      <p style={eyebrow}>ÇALIŞMA ALANI</p>

      <div style={contentBox}>
        <h1 style={title}>{area.title}</h1>

        <p style={summary}>{area.text}</p>

        <div style={divider}></div>

        <h2 style={subTitle}>{area.title} Hakkında</h2>

        <p style={text}>{area.detail}</p>

        <div style={buttonGroup}>
          <Link to="/iletisim" style={primaryButton}>
            İletişime Geç
          </Link>

          <Link to="/calisma-alanlari" style={secondaryButton}>
            Tüm Çalışma Alanları
          </Link>
        </div>
      </div>
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
  color: "#8b6a3f",
  fontWeight: "800",
  letterSpacing: "2.2px",
  fontSize: "12px",
  marginBottom: "14px",
};

const contentBox = {
  maxWidth: "920px",
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e3cfb4",
  borderRadius: "28px",
  padding: "42px",
  boxShadow: "0 18px 42px rgba(74,53,33,0.12)",
};

const title = {
  fontSize: "44px",
  margin: "0 0 18px",
};

const summary = {
  color: "#5b4b3d",
  fontSize: "18px",
  lineHeight: 1.8,
  margin: 0,
};

const divider = {
  width: "100%",
  height: "1px",
  background: "#e3cfb4",
  margin: "32px 0",
};

const subTitle = {
  fontSize: "26px",
  margin: "0 0 14px",
};

const text = {
  color: "#5b4b3d",
  fontSize: "17px",
  lineHeight: 1.9,
};

const buttonGroup = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "30px",
};

const primaryButton = {
  background: "#8b6a3f",
  color: "white",
  padding: "13px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
};

const secondaryButton = {
  background: "#efe4d5",
  color: "#241b13",
  padding: "13px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  border: "1px solid #d8c1a3",
};
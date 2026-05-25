import { Link } from "react-router-dom";

export default function IletisimPage() {
  return (
    <div style={pageStyle}>
      <Link to="/" style={backLink}>← Ana Sayfa</Link>

      <section style={card}>
        <p style={eyebrow}>İLETİŞİM</p>
        <h1 style={title}>Hukuki destek için iletişime geçin</h1>

        <p style={intro}>
          Ön görüşme, hukuki danışmanlık ve randevu talepleriniz için aşağıdaki
          iletişim bilgilerini kullanabilirsiniz.
        </p>

        <div style={infoGrid}>
          <div style={infoBox}>
            <strong>E-posta</strong>
            <span>ayselkubrasari@gmail.com</span>
          </div>

          <div style={infoBox}>
            <strong>Konum</strong>
            <span>İstanbul / Türkiye</span>
          </div>

          <div style={infoBox}>
            <strong>Çalışma Saatleri</strong>
            <span>Hafta içi 09:00 - 17:00</span>
          </div>
        </div>

        <a
          href="mailto:ayselkubrasari@gmail.com"
          style={button}
        >
          E-posta Gönder
        </a>
      </section>
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

const card = {
  maxWidth: "920px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.9)",
  border: "1px solid #e3cfb4",
  borderRadius: "30px",
  padding: "44px",
  boxShadow: "0 18px 45px rgba(74,53,33,0.12)",
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
  fontSize: "40px",
  margin: "10px 0 18px",
};

const intro = {
  maxWidth: "720px",
  margin: "0 auto 32px",
  textAlign: "center",
  color: "#5b4b3d",
  lineHeight: 1.8,
  fontSize: "17px",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "32px",
};

const infoBox = {
  background: "#fbf7f0",
  border: "1px solid #ead8c2",
  borderRadius: "18px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "#5b4b3d",
};

const button = {
  display: "block",
  width: "fit-content",
  margin: "0 auto",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  padding: "13px 22px",
  borderRadius: "14px",
  fontWeight: "800",
};
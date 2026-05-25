import { Link } from "react-router-dom";

export default function HakkimdaPage() {
  return (
    <div style={pageStyle}>
      <Link to="/" style={backLink}>← Ana Sayfa</Link>

      <section style={card}>
        <p style={eyebrow}>MESLEKİ YAKLAŞIM</p>
        <h1 style={title}>Hakkımda</h1>

        <p style={paragraph}>
          Ben Avukat Aysel Kübra Sarı Çalışkan. 2019 yılında Aydın Üniversitesi
          Hukuk Fakültesi’nden mezun oldum. Mezuniyetimin ardından Türkiye’nin
          önde gelen hukuk bürolarından Pehlivan Hukuk Bürosu’nda stajyer
          avukatlık eğitimimi tamamlayarak mesleki kariyerime güçlü bir
          başlangıç yaptım.
        </p>

        <p style={paragraph}>
          Avukatlık mesleğini yalnızca dava takibi olarak değil; doğru analiz,
          etkili iletişim, stratejik düşünme ve güven ilişkisi üzerine kurulu bir
          süreç olarak görüyorum. Bu nedenle her hukuki konuyu kendi koşulları
          içinde titizlikle değerlendiriyor, müvekkillerimin hak ve menfaatlerini
          en etkin şekilde korumayı amaçlıyorum.
        </p>

        <p style={paragraph}>
          Mesleki çalışmalarımı ara vermeden sürdürüyor; aile hukuku, miras
          hukuku, iş hukuku, gayrimenkul hukuku, icra ve iflas hukuku ile genel
          hukuki danışmanlık alanlarında, somut olayın ihtiyaçlarına uygun
          profesyonel ve çözüm odaklı hukuki destek sunuyorum.
        </p>
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
  fontSize: "44px",
  margin: "10px 0 28px",
};

const paragraph = {
  color: "#4d3e31",
  lineHeight: 1.95,
  fontSize: "18px",
  margin: "0 0 20px",
};
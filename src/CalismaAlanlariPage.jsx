import { Link } from "react-router-dom";

export const practiceAreas = [
  {
    title: "Aile Hukuku",
    slug: "aile-hukuku",
    text: "Boşanma, velayet, nafaka, mal paylaşımı ve aile içi uyuşmazlıklara ilişkin hukuki danışmanlık ve dava takibi.",
    detail:
      "Aile hukuku kapsamında boşanma, velayet, nafaka, mal rejimi, ziynet alacağı, soybağı, aile konutu ve aile içi uyuşmazlıklar gibi konularda hukuki danışmanlık ve dava takibi hizmeti sunulmaktadır. Her dosya tarafların özel durumuna göre değerlendirilir ve süreç boyunca müvekkilin hak kaybı yaşamaması hedeflenir.",
  },
  {
    title: "Miras Hukuku",
    slug: "miras-hukuku",
    text: "Veraset işlemleri, miras paylaşımı, saklı pay, tenkis ve miras kaynaklı uyuşmazlıklarda hukuki destek.",
    detail:
      "Miras hukuku alanında mirasçılık belgesi, tereke tespiti, miras paylaşımı, saklı pay, tenkis davası, vasiyetname, mirastan mal kaçırma ve ortaklığın giderilmesi gibi süreçlerde hukuki destek sağlanmaktadır.",
  },
  {
    title: "İş Hukuku",
    slug: "is-hukuku",
    text: "İşçi ve işveren uyuşmazlıkları, işe iade, kıdem ve ihbar tazminatı ile iş sözleşmelerine ilişkin danışmanlık.",
    detail:
      "İş hukuku kapsamında işçi ve işveren arasındaki uyuşmazlıklar, kıdem tazminatı, ihbar tazminatı, fazla mesai alacakları, işe iade davaları, mobbing iddiaları ve iş sözleşmelerinin hazırlanması gibi konularda danışmanlık ve dava takibi yapılmaktadır.",
  },
  {
    title: "Gayrimenkul Hukuku",
    slug: "gayrimenkul-hukuku",
    text: "Tapu, kira, tahliye, satış vaadi sözleşmeleri ve taşınmazlara ilişkin hukuki süreçlerin yönetimi.",
    detail:
      "Gayrimenkul hukuku alanında tapu iptal ve tescil davaları, kira uyuşmazlıkları, tahliye süreçleri, satış vaadi sözleşmeleri, taşınmaz alım satım işlemleri ve mülkiyet hakkına ilişkin davalarda hukuki hizmet sunulmaktadır.",
  },
  {
    title: "İcra ve İflas Hukuku",
    slug: "icra-iflas-hukuku",
    text: "Alacak takibi, icra işlemleri, itiraz süreçleri ve borç ilişkilerinden doğan ihtilafların takibi.",
    detail:
      "İcra ve iflas hukuku kapsamında alacakların tahsili, icra takiplerinin başlatılması, ödeme emrine itiraz, itirazın iptali, menfi tespit, haciz işlemleri ve borç ilişkilerinden doğan uyuşmazlıkların çözümü için hukuki destek verilmektedir.",
  },
  {
    title: "Hukuki Danışmanlık",
    slug: "hukuki-danismanlik",
    text: "Gerçek ve tüzel kişilere sözleşme, uyuşmazlık önleme ve süreç yönetimi odaklı genel hukuki danışmanlık.",
    detail:
      "Hukuki danışmanlık hizmeti kapsamında gerçek ve tüzel kişilere sözleşme hazırlanması, sözleşme inceleme, uyuşmazlıkların önlenmesi, risk analizi ve hukuki süreç yönetimi konularında profesyonel destek sağlanmaktadır.",
  },
];

export default function CalismaAlanlariPage() {
  return (
    <div style={pageStyle}>
      <Link to="/" style={backLink}>
        ← Ana Sayfa
      </Link>

      <p style={eyebrow}>UZMANLIK ALANLARI</p>
      <h1 style={title}>Çalışma Alanları</h1>
      <p style={intro}>
        Hukuki süreçlerde her dosya kendi koşulları içinde değerlendirilir ve
        ihtiyaca uygun profesyonel destek sunulur.
      </p>

      <div style={grid}>
        {practiceAreas.map((area, index) => (
          <div key={area.slug} style={card}>
            <div style={number}>{index + 1}</div>

            <h3 style={cardTitle}>{area.title}</h3>

            <p style={cardText}>{area.text}</p>

            <Link
              to={`/calisma-alanlari/${area.slug}`}
              style={detailButton}
            >
              Detaya Git →
            </Link>
          </div>
        ))}
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
  padding: "28px",
  boxShadow: "0 14px 34px rgba(74,53,33,0.10)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "310px",
};

const number = {
  width: "46px",
  height: "46px",
  borderRadius: "14px",
  background: "linear-gradient(180deg, #b08d57, #8b6a3f)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  marginBottom: "18px",
};

const cardTitle = {
  margin: "0 0 12px",
  fontSize: "22px",
};

const cardText = {
  margin: 0,
  color: "#5b4b3d",
  lineHeight: 1.8,
};

const detailButton = {
  display: "inline-block",
  marginTop: "22px",
  alignSelf: "flex-start",
  background: "#8b6a3f",
  color: "white",
  padding: "12px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  boxShadow: "0 8px 18px rgba(139,106,63,0.25)",
};
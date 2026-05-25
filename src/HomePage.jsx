import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./lib/supabase";
import aileHukuku from "./assets/aile-hukuku.jpg";
import mirasHukuku from "./assets/miras-hukuku.jpg";
import isHukuku from "./assets/is-hukuku.jpg";
import gayrimenkulHukuku from "./assets/gayrimenkul-hukuku.jpg";
import icraHukuku from "./assets/icra-hukuku.jpg";
import danismanlik from "./assets/danismanlik.jpg";
import hakkimdaFoto from "./assets/hakkimda.jpg";
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const [hoveredNav, setHoveredNav] = useState("");
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [visibleSections, setVisibleSections] = useState({
    hakkimda: false,
    alanlar: false,
    makaleler: false,
    iletisim: false,
  });

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2100);

    fetchArticles();

    function handleScroll() {
      setIsScrolled(window.scrollY > 30);
    }

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setVisibleSections((prev) => ({
                ...prev,
                [id]: true,
              }));
            }
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    const sectionIds = ["hakkimda", "alanlar", "makaleler", "iletisim"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

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

  function handleContactSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `İletişim Formu - ${contactName || "Web Sitesi Ziyaretçisi"}`
    );

    const body = encodeURIComponent(
      `Ad Soyad: ${contactName}\nE-posta: ${contactEmail}\n\nMesaj:\n${contactMessage}`
    );

    window.location.href = `mailto:ayselkubrasari@gmail.com?subject=${subject}&body=${body}`;
  }

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const fullText = `
        ${article.title || ""}
        ${article.excerpt || ""}
        ${article.category || ""}
      `.toLowerCase();

      return fullText.includes(searchTerm.toLowerCase());
    });
  }, [articles, searchTerm]);

  function getReadingTime(article) {
    const text = `${article?.title || ""} ${article?.excerpt || ""}`.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} dk okuma`;
  }

  const practiceAreas = [
    {
      title: "Aile Hukuku",
      text: "Boşanma, velayet, nafaka, mal paylaşımı ve aile içi uyuşmazlıklara ilişkin hukuki danışmanlık ve dava takibi.",
      image: aileHukuku,
    },
    {
      title: "Miras Hukuku",
      text: "Veraset işlemleri, miras paylaşımı, saklı pay, tenkis ve miras kaynaklı uyuşmazlıklarda hukuki destek.",
      image: mirasHukuku,
    },
    {
      title: "İş Hukuku",
      text: "İşçi ve işveren uyuşmazlıkları, işe iade, kıdem ve ihbar tazminatı ile iş sözleşmelerine ilişkin danışmanlık.",
      image: isHukuku,
    },
    {
      title: "Gayrimenkul Hukuku",
      text: "Tapu, kira, tahliye, satış vaadi sözleşmeleri ve taşınmazlara ilişkin hukuki süreçlerin yönetimi.",
      image: gayrimenkulHukuku,
    },
    {
      title: "İcra ve İflas Hukuku",
      text: "Alacak takibi, icra işlemleri, itiraz süreçleri ve borç ilişkilerinden doğan ihtilafların takibi.",
      image: icraHukuku,
    },
    {
      title: "Hukuki Danışmanlık",
      text: "Gerçek ve tüzel kişilere sözleşme, uyuşmazlık önleme ve süreç yönetimi odaklı genel hukuki danışmanlık.",
      image: danismanlik,
    },
  ];

  return (
    <div style={pageStyle}>
    {showIntro && (
      <div style={introOverlay}>
        <div style={introLogoWrap}>
          <img
            src="/logo-icon.png"
            alt="Av. Aysel Sarı Çalışkan"
            style={introLogo}
          />
          <div style={introLine}></div>
          <p style={introText}>Hukuki Danışmanlık ve Avukatlık Hizmetleri</p>
        </div>
      </div>
    )}

    <style>
      {`
        @keyframes introLogoMove {
          0% {
            opacity: 0;
            transform: scale(0.78) translateY(18px);
          }
          45% {
            opacity: 1;
            transform: scale(1.08) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes introFadeOut {
          0% {
            opacity: 1;
            visibility: visible;
          }
          72% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes whatsappPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @keyframes drawerSlide {
          from {
            opacity: 0;
            transform: translateX(36px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}
    </style>

      <div style={bgGlow1}></div>
      <div style={bgGlow2}></div>

      <header style={isScrolled ? scrolledHeaderStyle : headerStyle}>
        <div style={isScrolled ? scrolledHeaderInner : headerInner}>
          <div style={logoContainer}>
            <div style={isScrolled ? scrolledLogoBox : logoBox}>
              <img
                src="/logo-icon.png"
                alt="Av. Aysel Sarı Çalışkan"
                style={isScrolled ? scrolledLogoStyle : logoStyle}
              />
            </div>
          </div>

          <nav style={navStyle}>
            <a
              href="#hakkimda"
              style={{
                ...linkStyle,
                ...(hoveredNav === "hakkimda" ? linkHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredNav("hakkimda")}
              onMouseLeave={() => setHoveredNav("")}
            >
              Hakkımda
            </a>

            <a
              href="#alanlar"
              style={{
                ...linkStyle,
                ...(hoveredNav === "alanlar" ? linkHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredNav("alanlar")}
              onMouseLeave={() => setHoveredNav("")}
            >
              Çalışma Alanları
            </a>

            <a
              href="#makaleler"
              style={{
                ...linkStyle,
                ...(hoveredNav === "makaleler" ? linkHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredNav("makaleler")}
              onMouseLeave={() => setHoveredNav("")}
            >
              Makaleler
            </a>

            <a
              href="#iletisim"
              style={{
                ...linkStyle,
                ...(hoveredNav === "iletisim" ? linkHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredNav("iletisim")}
              onMouseLeave={() => setHoveredNav("")}
            >
              İletişim
            </a>

            <Link
              to="/admin/login"
              style={{
                ...adminButton,
                ...(isAdminHovered ? adminButtonHover : {}),
              }}
              onMouseEnter={() => setIsAdminHovered(true)}
              onMouseLeave={() => setIsAdminHovered(false)}
            >
              Yönetim
            </Link>
          </nav>
          <button
  type="button"
  style={hamburgerButton}
  onClick={() => setIsDrawerOpen(true)}
  aria-label="Menüyü aç"
>
  <span style={hamburgerLine}></span>
  <span style={hamburgerLine}></span>
  <span style={hamburgerLine}></span>
</button>
        </div>
      </header>
      {isDrawerOpen && (
  <div style={drawerOverlay} onClick={() => setIsDrawerOpen(false)}>
    <aside style={drawerPanel} onClick={(e) => e.stopPropagation()}>
      <div style={drawerTop}>
        <div>
          <p style={drawerEyebrow}>MENÜ</p>
          <h3 style={drawerTitle}>Av. Aysel Sarı Çalışkan</h3>
        </div>

        <button
          type="button"
          style={drawerCloseButton}
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Menüyü kapat"
        >
          ×
        </button>
      </div>

      <div style={drawerLinks}>
        <Link
          to="/calisma-alanlari"
          style={drawerLink}
          onClick={() => setIsDrawerOpen(false)}
        >
          <span>Çalışma Alanları</span>
          <span>→</span>
        </Link>

        <Link
          to="/hakkimda"
          style={drawerLink}
          onClick={() => setIsDrawerOpen(false)}
        >
          <span>Hakkımda</span>
          <span>→</span>
        </Link>

        <Link
          to="/makaleler"
          style={drawerLink}
          onClick={() => setIsDrawerOpen(false)}
        >
          <span>Makaleler</span>
          <span>→</span>
        </Link>

        <Link
          to="/iletisim"
          style={drawerLink}
          onClick={() => setIsDrawerOpen(false)}
        >
          <span>İletişim</span>
          <span>→</span>
        </Link>

        <Link
          to="/admin/login"
          style={drawerAdminLink}
          onClick={() => setIsDrawerOpen(false)}
        >
          <span>Yönetim Paneli</span>
          <span>→</span>
        </Link>
      </div>

      <p style={drawerNote}>
        Hukuki danışmanlık ve avukatlık hizmetleri için ilgili sayfaları
        inceleyebilir veya iletişim sayfasından ulaşabilirsiniz.
      </p>
    </aside>
  </div>
)}
<section style={heroStyle}>
  <div style={overlayStyle}></div>
  <div style={heroGlow}></div>

  <div style={heroContentWrapper}>
    <div style={heroGrid}>
      <div style={heroContentStyle}>
        <p style={heroTopText}>HUKUK & DANIŞMANLIK HİZMETLERİ</p>

        <h2 style={heroTitle}>
          Haklarınızı koruyan
          <br />
          güvenilir hukuki destek
        </h2>

        <p style={heroText}>
          Aile hukuku, miras hukuku, iş hukuku, gayrimenkul hukuku, icra ve
          iflas hukuku alanlarında; her dosyaya özel analiz, şeffaf
          bilgilendirme ve çözüm odaklı hukuki yol haritası sunuyorum.
        </p>

        <div style={heroButtonsStyle}>
          <a
            href="#iletisim"
            style={primaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 16px 28px rgba(0,0,0,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 22px rgba(0,0,0,0.18)";
            }}
          >
            Danışmanlık Talep Et
          </a>

          <a
            href="#alanlar"
            style={secondaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255,255,255,0.10)";
            }}
          >
            Faaliyet Alanlarını İncele
          </a>
        </div>

        <div style={statsRow}>
          <div style={statCard}>
            <h3 style={statNumber}>2019</h3>
            <p style={statLabel}>Mesleki Başlangıç</p>
          </div>

          <div style={statCard}>
            <h3 style={statNumber}>6</h3>
            <p style={statLabel}>Faaliyet Alanı</p>
          </div>

        </div>
      </div>

      <div style={heroServicePanel}>
        <div style={heroServiceCard}>
          <span style={heroServiceNumber}>01</span>
          <h3 style={heroServiceTitle}>Hızlı Analiz</h3>
          <p style={heroServiceText}>
            Hukuki süreciniz detaylı şekilde değerlendirilir.
          </p>
        </div>

        <div style={heroServiceCard}>
          <span style={heroServiceNumber}>02</span>
          <h3 style={heroServiceTitle}>Şeffaf Bilgilendirme</h3>
          <p style={heroServiceText}>
            Süreç boyunca açık ve anlaşılır bilgilendirme yapılır.
          </p>
        </div>

        <div style={heroServiceCard}>
          <span style={heroServiceNumber}>03</span>
          <h3 style={heroServiceTitle}>Stratejik Yol Haritası</h3>
          <p style={heroServiceText}>
            Dosyanıza uygun çözüm odaklı hukuki strateji oluşturulur.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



     <section
  id="hakkimda"
  style={{
    ...aboutSectionStyle,
    ...(visibleSections.hakkimda ? sectionVisibleStyle : sectionHiddenStyle),
  }}
>
  <div style={contentContainer}>
    <div style={aboutGrid}>
      <div>
        <p style={sectionEyebrow}>KURUMSAL YAKLAŞIM</p>
        <h3 style={aboutTitle}>Hakkımızda</h3>

        <p style={aboutText}>
          Ben Avukat Aysel Kübra Sarı Çalışkan. 2019 yılında İstanbul Aydın Üniversitesi
          Hukuk Fakültesi’nden mezun oldum. Mezuniyetimin ardından Türkiye’nin
          önde gelen hukuk bürolarından Pehlivan Hukuk Bürosu’nda stajyer
          avukatlık eğitimimi tamamlayarak mesleki kariyerime güçlü bir başlangıç
          yaptım.
        </p>

        <p style={aboutText}>
          Avukatlık mesleğini yalnızca dava takibi olarak değil; doğru analiz,
          etkili iletişim, stratejik düşünme ve güven ilişkisi üzerine kurulu
          bir süreç olarak görüyorum.
        </p>

        <div style={aboutInfoGrid}>
          <div style={aboutInfoCard}>
            <strong>Güvenilir Hizmet</strong>
            <span>Şeffaf ve düzenli bilgilendirme</span>
          </div>

          <div style={aboutInfoCard}>
            <strong>Stratejik Yaklaşım</strong>
            <span>Dosyaya özel hukuki yol haritası</span>
          </div>

          <div style={aboutInfoCard}>
            <strong>Çözüm Odaklılık</strong>
            <span>Hak ve menfaatleri koruyan takip</span>
          </div>
        </div>
      </div>

      <div style={aboutImageBox}>
        <img src={hakkimdaFoto} alt="Hakkımızda" style={aboutImage} />
      </div>
    </div>
  </div>
</section>         


     <section
  id="alanlar"
  style={{
    ...areasSectionStyle,
    ...(visibleSections.alanlar ? sectionVisibleStyle : sectionHiddenStyle),
  }}
>
  <div style={contentContainer}>
    <div style={sectionDivider}></div>
    <p style={sectionEyebrow}>FAALİYET ALANLARIMIZ</p>
    <h3 style={sectionTitle}>Hukuki Hizmetlerimiz</h3>

    <div style={practiceGrid}>
      {practiceAreas.map((area, index) => (
        <article
          key={area.title}
          style={practiceCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 24px 55px rgba(74,53,33,0.16)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 14px 32px rgba(74,53,33,0.09)";
          }}
        >
          <div style={practiceImageWrap}>
            <img src={area.image} alt={area.title} style={practiceImage} />
            <div style={practiceImageOverlay}></div>
          </div>

          <div style={practiceContent}>
            <div style={practiceNumber}>
              {String(index + 1).padStart(2, "0")}
            </div>

            <h4 style={practiceTitle}>{area.title}</h4>
            <p style={practiceText}>{area.text}</p>

            <Link to="/calisma-alanlari" style={practiceLink}>
              Detaylı Bilgi →
            </Link>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

      <section style={trustSectionStyle}>
        <div style={contentContainer}>
          <div style={trustGrid}>
            <div>
              <p style={sectionEyebrow}>HIZLI • ETKİLİ • GÜVENİLİR</p>
      
              <h3 style={trustTitle}>
                Hukuki süreçlerinizi doğru stratejiyle yönetiyoruz
              </h3>
      
              <p style={trustText}>
                Her hukuki süreç kendi içinde farklı riskler ve ihtiyaçlar taşır.
                Bu nedenle müvekkillerimize yalnızca dava takibi değil; doğru analiz,
                açık bilgilendirme ve çözüm odaklı hukuki yol haritası sunuyoruz.
              </p>
      
              <p style={trustText}>
                Aile hukuku, miras hukuku, iş hukuku, gayrimenkul hukuku, icra ve
                iflas hukuku ile genel hukuki danışmanlık alanlarında güvenilir,
                şeffaf ve düzenli hukuki destek sağlıyoruz.
              </p>
      
              <a href="#iletisim" style={trustButton}>
                Danışmanlık Talep Et
              </a>
            </div>
      
            <div style={trustPanel}>
              <div style={progressItem}>
                <div style={progressTop}>
                  <span>Güvenilirlik</span>
                  <strong>100%</strong>
                </div>
                <div style={progressBar}>
                  <div style={{ ...progressFill, width: "100%" }}></div>
                </div>
              </div>
      
              <div style={progressItem}>
                <div style={progressTop}>
                  <span>Şeffaf Bilgilendirme</span>
                  <strong>100%</strong>
                </div>
                <div style={progressBar}>
                  <div style={{ ...progressFill, width: "100%" }}></div>
                </div>
              </div>
      
              <div style={progressItem}>
                <div style={progressTop}>
                  <span>Çözüm Odaklı Yaklaşım</span>
                  <strong>100%</strong>
                </div>
                <div style={progressBar}>
                  <div style={{ ...progressFill, width: "100%" }}></div>
                </div>
              </div>
      
              <div style={trustMiniCards}>
                <div style={trustMiniCard}>
                  <strong>2019</strong>
                  <span>Mesleki Başlangıç</span>
                </div>
      
                <div style={trustMiniCard}>
                  <strong>6</strong>
                  <span>Çalışma Alanı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section
        id="makaleler"
        style={{
          ...articlesSectionStyle,
          ...(visibleSections.makaleler ? sectionVisibleStyle : sectionHiddenStyle),
        }}
      >
        <div style={contentContainer}>
          <div style={sectionDivider}></div>
          <p style={sectionEyebrow}>HUKUKİ YAYINLAR</p>
          <h3 style={sectionTitle}>Makaleler</h3>
          <p style={sectionIntroText}>
            Hukukun farklı alanlarına ilişkin güncel değerlendirmeler, bilgilendirici
            içerikler ve dikkat edilmesi gereken temel hususlar.
          </p>

          <div style={articleSearchWrap}>
            <input
              type="text"
              placeholder="Makale ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>

          {loading ? (
            <div style={articleEmptyState}>
              <span style={articleEmptyIcon}>⌛</span>
              <p style={articleEmptyTitle}>Makaleler yükleniyor...</p>
              <p style={articleEmptyText}>Yayınlanmış hukuki içerikler hazırlanıyor.</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={articleEmptyState}>
              <span style={articleEmptyIcon}>⌕</span>
              <p style={articleEmptyTitle}>Sonuç bulunamadı</p>
              <p style={articleEmptyText}>Aramanıza uygun yayınlanmış makale bulunamadı.</p>
            </div>
          ) : (
            <div style={professionalArticlesWrap}>
              <div style={articleToolbar}>
                <div>
                  <p style={articleToolbarLabel}>YAYINLANMIŞ İÇERİKLER</p>
                  <h4 style={articleToolbarTitle}>Güncel Hukuki Makaleler</h4>
                </div>

                <div style={articleToolbarInfo}>
                  <strong>{filteredArticles.length}</strong>
                  <span>makale listeleniyor</span>
                </div>
              </div>

              <div style={articleGrid}>
                {filteredArticles.map((article, index) => (
                  <article
                    key={article.id}
                    style={articleCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 24px 48px rgba(74,53,33,0.16)";
                      e.currentTarget.style.borderColor = "#d3b98f";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 14px 32px rgba(74,53,33,0.09)";
                      e.currentTarget.style.borderColor = "#eadfce";
                    }}
                  >
                    <div style={articleCardInner}>
                      <div>
                        <div style={articleTopRow}>
                          <span style={articleCategoryBadge}>
                            {article.category || "Genel"}
                          </span>

                          {index === 0 && (
                            <span style={articleFeaturedMiniBadge}>Öne Çıkan</span>
                          )}
                        </div>

                        <h4 style={articleTitle}>{article.title}</h4>

                        <p style={articleText}>
                          {article.excerpt ||
                            "Bu makalede konuya ilişkin temel hukuki değerlendirmeler ve dikkat edilmesi gereken noktalar ele alınmaktadır."}
                        </p>
                      </div>

                      <div>
                        <div style={articleMetaRow}>
                          <span style={articleDate}>
                            {new Date(article.created_at).toLocaleDateString("tr-TR")}
                          </span>
                          <span style={articleMetaDot}>•</span>
                          <span style={articleReadingTime}>
                            {getReadingTime(article)}
                          </span>
                        </div>

                        <Link
                          to={`/makale/${article.id}`}
                          style={articleButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 14px 24px rgba(139,106,63,0.28)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 18px rgba(139,106,63,0.22)";
                          }}
                        >
                          Makaleyi Oku →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="iletisim"
        style={{
          ...contactSectionStyle,
          ...(visibleSections.iletisim ? sectionVisibleStyle : sectionHiddenStyle),
        }}
      >
        <div style={contentContainer}>
          <div style={sectionDividerLight}></div>
          <p style={sectionEyebrowLight}>İLETİŞİM</p>
          <h3 style={contactTitle}>Hukuki destek için iletişime geçin</h3>
          <p style={contactText}>
            Sorularınız, ön görüşme talepleriniz ve hukuki danışmanlık ihtiyaçlarınız
            için aşağıdaki iletişim bilgilerini kullanabilir veya form üzerinden
            doğrudan e-posta oluşturabilirsiniz.
          </p>

          <div style={contactGrid}>
            <div
              style={contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 26px rgba(0,0,0,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
              }}
            >
              <h4 style={contactCardTitle}>İletişim Bilgileri</h4>
              <p style={contactItem}>
                <strong>E-posta:</strong> ayselkubrasari@gmail.com
              </p>
              <p style={contactItem}>
                <strong>WhatsApp:</strong> 
                <a
                  href="https://wa.me/905324282000?text=Merhaba,%20web%20siteniz%20%C3%BCzerinden%20hukuki%20dan%C4%B1%C5%9Fmanl%C4%B1k%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7mek%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={contactWhatsappLink}
                >
                  0532 428 20 00
                </a>
              </p>
              <p style={contactItem}>
                <strong>Adres:</strong> Kocatepe Mahallesi Yağ İskelesi Caddesi Megacenter C 33 Blok Kat: 9 No: 11/60 Bayrampaşa / İstanbul
              </p>
              <p style={contactNote}>
                Hukuki danışmanlık talepleriniz için e-posta üzerinden iletişim
                sağlayabilirsiniz.
              </p>
            </div>

            <div
              style={contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 26px rgba(0,0,0,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
              }}
            >
              <h4 style={contactCardTitle}>İletişim Formu</h4>

              <form onSubmit={handleContactSubmit} style={contactFormStyle}>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  style={contactInputStyle}
                  required
                />

                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={contactInputStyle}
                  required
                />

                <textarea
                  placeholder="Mesajınız"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  style={contactTextareaStyle}
                  rows={6}
                  required
                />

                <button
                  type="submit"
                  style={contactSubmitButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 24px rgba(176,141,87,0.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(176,141,87,0.22)";
                  }}
                >
                  E-posta Oluştur
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <a
        href="https://wa.me/905324282000?text=Merhaba,%20web%20siteniz%20%C3%BCzerinden%20hukuki%20dan%C4%B1%C5%9Fmanl%C4%B1k%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7mek%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        style={whatsappFloatButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.04)";
          e.currentTarget.style.boxShadow =
            "0 18px 34px rgba(37, 211, 102, 0.42)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 14px 28px rgba(37, 211, 102, 0.32)";
        }}
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          style={whatsappSvgIcon}
        >
          <path
            fill="currentColor"
            d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.53 1.75 6.5L3 29l6.68-1.75a12.9 12.9 0 0 0 6.36 1.62c7.16 0 12.98-5.82 12.98-12.98S23.2 3 16.04 3Zm0 23.68c-1.96 0-3.88-.53-5.55-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.42a10.66 10.66 0 0 1-1.64-5.68c0-5.93 4.82-10.75 10.75-10.75s10.75 4.82 10.75 10.75-4.82 10.7-10.75 10.7Zm5.9-8.04c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.49.14-.65.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.34c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.22-.61-.38Z"
          />
        </svg>
        <span style={whatsappButtonText}>WhatsApp</span>
      </a>

      <footer style={footerStyle}>
  <div style={footerTopLine}></div>

  <div style={footerContainer}>
    <div style={footerBrandColumn}>
      <div style={footerLogoRow}>
        <div style={footerLogoBox}>
          <img src="/logo-icon.png" alt="Logo" style={footerLogo} />
        </div>

        <div>
          <h4 style={footerHeading}>Av. Aysel Sarı Çalışkan</h4>
          <p style={footerSmallText}>Hukuki Danışmanlık ve Avukatlık Hizmetleri</p>
        </div>
      </div>

      <p style={footerText}>
        Aile hukuku, miras hukuku, iş hukuku, gayrimenkul hukuku, icra ve
        iflas hukuku ile genel hukuki danışmanlık alanlarında güvenilir,
        düzenli ve çözüm odaklı hizmet sunulmaktadır.
      </p>

      <a href="#iletisim" style={footerCtaButton}>
        Danışmanlık Talep Et
      </a>
    </div>

    <div style={footerColumn}>
      <h4 style={footerHeading}>Hızlı Menü</h4>
      <a href="#hakkimda" style={footerLink}>Hakkımızda</a>
      <a href="#alanlar" style={footerLink}>Faaliyet Alanlarımız</a>
      <a href="#makaleler" style={footerLink}>Makaleler</a>
      <a href="#iletisim" style={footerLink}>İletişim</a>
    </div>

    <div style={footerColumn}>
      <h4 style={footerHeading}>Faaliyet Alanları</h4>
      <a href="#alanlar" style={footerLink}>Aile Hukuku</a>
      <a href="#alanlar" style={footerLink}>Miras Hukuku</a>
      <a href="#alanlar" style={footerLink}>İş Hukuku</a>
      <a href="#alanlar" style={footerLink}>Gayrimenkul Hukuku</a>
      <a href="#alanlar" style={footerLink}>İcra ve İflas Hukuku</a>
    </div>

    <div style={footerColumn}>
      <h4 style={footerHeading}>İletişim</h4>

      <p style={footerContactItem}>
        <strong>E-posta</strong>
        <span>ayselkubrasari@gmail.com</span>
      </p>

      <p style={footerContactItem}>
        <strong>WhatsApp</strong>
        <a
          href="https://wa.me/905324282000?text=Merhaba,%20web%20siteniz%20%C3%BCzerinden%20hukuki%20dan%C4%B1%C5%9Fmanl%C4%B1k%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7mek%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          style={footerWhatsappLink}
        >
          0532 428 20 00
        </a>
      </p>

      <p style={footerContactItem}>
        <strong>Adres</strong>
        <span>Kocatepe Mahallesi Yağ İskelesi Caddesi Megacenter C 33 Blok Kat: 9 No: 11/60 Bayrampaşa / İstanbul</span>
      </p>

    </div>
  </div>

  <div style={footerBottom}>
    <span>© 2026 Av. Aysel Sarı Çalışkan - Tüm hakları saklıdır.</span>
    <span style={footerBottomRight}>Profesyonel Hukuki Danışmanlık</span>
  </div>
</footer>
    </div>
  );

}

const contactWhatsappLink = {
  color: "#d8c2a1",
  textDecoration: "none",
  fontWeight: "800",
};

const footerWhatsappLink = {
  color: "#e9dfd2",
  textDecoration: "none",
  fontSize: "14px",
  lineHeight: 1.6,
  fontWeight: "700",
};

const whatsappFloatButton = {
  position: "fixed",
  right: "24px",
  bottom: "24px",
  zIndex: 3500,
  minWidth: "66px",
  height: "66px",
  padding: "0 18px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
  color: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "15px",
  letterSpacing: "0.2px",
  boxShadow: "0 14px 28px rgba(37, 211, 102, 0.32)",
  border: "1px solid rgba(255,255,255,0.28)",
  transition: "all 0.28s ease",
  animation: "whatsappPulse 2.2s infinite",
};

const whatsappSvgIcon = {
  width: "31px",
  height: "31px",
  display: "block",
  flexShrink: 0,
};

const whatsappButtonText = {
  display: "inline-block",
};

const pageStyle = {
  width: "100%",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  color: "#1f1f1f",
  background:
    "radial-gradient(circle at top left, rgba(176,141,87,0.16), transparent 22%), radial-gradient(circle at bottom right, rgba(125,96,58,0.12), transparent 24%), #f7f5f2",
  position: "relative",
  overflowX: "hidden",
};

const bgGlow1 = {
  position: "fixed",
  top: "-80px",
  left: "-80px",
  width: "260px",
  height: "260px",
  borderRadius: "50%",
  background: "rgba(176,141,87,0.14)",
  filter: "blur(70px)",
  pointerEvents: "none",
};

const bgGlow2 = {
  position: "fixed",
  right: "-80px",
  bottom: "0",
  width: "280px",
  height: "280px",
  borderRadius: "50%",
  background: "rgba(110,75,42,0.10)",
  filter: "blur(70px)",
  pointerEvents: "none",
};

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  background: "rgba(111, 82, 52, 0.72)",
  color: "white",
  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  transition:
    "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
};

const scrolledHeaderStyle = {
  ...headerStyle,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  background: "rgba(74, 53, 33, 0.84)",
  boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
  borderBottom: "1px solid rgba(255,255,255,0.14)",
};

const headerInner = {
  width: "min(1500px, calc(100% - 64px))",
  margin: "0 auto",
  padding: "6px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "28px",
  flexWrap: "nowrap",
  transition: "all 0.3s ease",
};

const scrolledHeaderInner = {
  ...headerInner,
  padding: "6px 0",
};
const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "0",
  minWidth: "fit-content",
};
const logoBox = {
  width: "620px",
  height: "96px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  background: "transparent",
  border: "none",
  boxShadow: "none",
  overflow: "visible",
  transition: "all 0.3s ease",
};

const scrolledLogoBox = {
  ...logoBox,
  width: "500px",
  height: "76px",
};

const logoStyle = {
  width: "590px",
  height: "auto",
  maxHeight: "92px",
  objectFit: "contain",
  objectPosition: "left center",
  display: "block",
  mixBlendMode: "multiply",
  transform: "scale(1.18)",
  transformOrigin: "left center",
  transition: "all 0.3s ease",
};

const scrolledLogoStyle = {
  ...logoStyle,
  width: "470px",
  maxHeight: "72px",
  transform: "scale(1.12)",
};
const logoTitle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0.2px",
  lineHeight: 1.1,
  transition: "all 0.3s ease",
  color: "#ffffff",
};

const scrolledLogoTitle = {
  ...logoTitle,
  fontSize: "17px",
};

const headerMiniLine = {
  width: "68px",
  height: "2px",
  background: "linear-gradient(90deg, rgba(255,255,255,0.78), rgba(255,255,255,0.18))",
  marginTop: "6px",
  borderRadius: "999px",
};
const logoSubtitle = {
  margin: "5px 0 0 0",
  fontSize: "11px",
  opacity: 0.88,
  letterSpacing: "0.2px",
  color: "rgba(255,255,255,0.88)",
};


const navStyle = {
  display: "flex",
  gap: "22px",
  flexWrap: "nowrap",
  alignItems: "center",
  whiteSpace: "nowrap",
};

const linkStyle = {
  color: "rgba(255,255,255,0.94)",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "0.4px",
  paddingBottom: "6px",
  borderBottom: "1px solid transparent",
  transition: "all 0.25s ease",
};

const linkHoverStyle = {
  color: "#f7e3c6",
  borderBottom: "1px solid rgba(247,227,198,0.85)",
  transform: "translateY(-1px)",
};

const adminButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textDecoration: "none",
  padding: "10px 18px",
  borderRadius: "14px",
  fontWeight: "700",
  fontSize: "13px",
  letterSpacing: "0.3px",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.20)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  transition: "all 0.25s ease",
};

const adminButtonHover = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.30)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 22px rgba(0,0,0,0.12)",
  transform: "translateY(-1px)",
};
const heroStyle = {
  position: "relative",
  minHeight: "760px",
  backgroundImage: "url('/hero.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  overflow: "hidden",
};
const overlayStyle = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, rgba(24,17,11,0.86) 0%, rgba(62,46,31,0.68) 48%, rgba(36,27,19,0.42) 100%)",
};

const heroGlow = {
  position: "absolute",
  width: "520px",
  height: "520px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  filter: "blur(80px)",
  top: "-120px",
  left: "-80px",
};
const heroContentWrapper = {
  position: "relative",
  zIndex: 2,
  width: "min(1240px, calc(100% - 56px))",
  margin: "0 auto",
  minHeight: "760px",
  display: "flex",
  alignItems: "center",
};
const heroGrid = {
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: "58px",
  width: "100%",
  alignItems: "center",
};

const heroContentStyle = {
  maxWidth: "780px",
  color: "white",
};

const heroTopText = {
  letterSpacing: "2.6px",
  fontSize: "12px",
  fontWeight: "800",
  marginBottom: "18px",
  opacity: 0.95,
  color: "rgba(255,255,255,0.94)",
};

const heroText = {
  fontSize: "19px",
  lineHeight: 1.95,
  maxWidth: "760px",
  marginBottom: "32px",
  color: "rgba(255,255,255,0.92)",
};

const heroTitle = {
  margin: "0 0 24px 0",
  fontSize: "64px",
  lineHeight: 1.08,
  fontWeight: "800",
  letterSpacing: "-1.6px",
  textShadow: "0 8px 24px rgba(0,0,0,0.22)",
};


const heroButtonsStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "28px",
};

const primaryButton = {
  display: "inline-block",
  background: "linear-gradient(90deg, #b38752, #c49a61)",
  color: "white",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontWeight: "700",
  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
  transition: "all 0.25s ease",
};

const secondaryButton = {
  display: "inline-block",
  background: "rgba(255,255,255,0.10)",
  color: "white",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontWeight: "700",
  border: "1px solid rgba(255,255,255,0.24)",
  backdropFilter: "blur(8px)",
  transition: "all 0.25s ease",
};

const statsRow = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
};

const statCard = {
  minWidth: "145px",
  padding: "18px 20px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.11)",
  border: "1px solid rgba(255,255,255,0.16)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
  transition: "all 0.25s ease",
};

const statNumber = {
  margin: "0 0 6px 0",
  fontSize: "28px",
  fontWeight: "800",
};

const statLabel = {
  margin: 0,
  fontSize: "14px",
  color: "rgba(255,255,255,0.86)",
};

const heroSideCard = {
  borderRadius: "26px",
  padding: "30px",
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  backdropFilter: "blur(14px)",
  boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
  color: "white",
  transition: "all 0.3s ease",
};

const heroCardTag = {
  display: "inline-block",
  margin: "0 0 16px 0",
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  color: "#f5e3ca",
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.14)",
};

const heroCardTitle = {
  margin: "0 0 14px 0",
  fontSize: "30px",
  lineHeight: 1.25,
};

const heroCardText = {
  margin: "0 0 18px 0",
  lineHeight: 1.9,
  color: "rgba(255,255,255,0.9)",
};

const heroCardList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const heroCardListItem = {
  color: "rgba(255,255,255,0.9)",
  fontSize: "15px",
};

const searchSectionStyle = {
  padding: "26px 0 0 0",
};

const searchBoxStyle = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "14px",
  border: "1px solid rgba(176,141,87,0.16)",
  boxShadow: "0 12px 26px rgba(0,0,0,0.06)",
};

const searchInputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "16px",
  color: "#2b2118",
  padding: "8px 10px",
};

const sectionStyle = {
  padding: "88px 0",
  background: "linear-gradient(180deg, #faf6f0 0%, #f5eee4 100%)",
  transition: "all 0.7s ease",
};

const areasSectionStyle = {
  padding: "88px 0",
  background: "linear-gradient(180deg, #ffffff 0%, #fbf8f3 100%)",
  transition: "all 0.7s ease",
};

const articlesSectionStyle = {
  padding: "92px 0",
  background: "linear-gradient(180deg, #f8f4ee 0%, #f4eee5 100%)",
  transition: "all 0.7s ease",
};

const sectionHiddenStyle = {
  opacity: 0,
  transform: "translateY(36px)",
};

const sectionVisibleStyle = {
  opacity: 1,
  transform: "translateY(0)",
};

const sectionDivider = {
  width: "100%",
  maxWidth: "140px",
  height: "1px",
  margin: "0 auto 18px auto",
  background:
    "linear-gradient(90deg, transparent, rgba(176,141,87,0.85), transparent)",
};

const sectionDividerLight = {
  width: "100%",
  maxWidth: "140px",
  height: "1px",
  margin: "0 auto 18px auto",
  background:
    "linear-gradient(90deg, transparent, rgba(216,194,161,0.9), transparent)",
};

const contentContainer = {
  width: "min(1180px, calc(100% - 40px))",
  margin: "0 auto",
};

const sectionEyebrow = {
  textAlign: "center",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2.2px",
  color: "#8b6a3f",
  marginBottom: "12px",
};

const sectionEyebrowLight = {
  textAlign: "center",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2.2px",
  color: "#d8c2a1",
  marginBottom: "12px",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "40px",
  marginTop: 0,
  marginBottom: "24px",
  color: "#2a2119",
};

const sectionIntroText = {
  textAlign: "center",
  maxWidth: "760px",
  margin: "0 auto 38px auto",
  lineHeight: 1.9,
  fontSize: "17px",
  color: "#5a4a3b",
};

const paragraphStyle = {
  maxWidth: "940px",
  margin: "0 auto 18px auto",
  textAlign: "center",
  lineHeight: 1.95,
  fontSize: "18px",
  color: "#43362a",
};

const practiceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px",
  marginTop: "42px",
};

const practiceCard = {
  background: "#ffffff",
  borderRadius: "24px",
  overflow: "hidden",
  border: "1px solid #eadfce",
  boxShadow: "0 14px 32px rgba(74,53,33,0.09)",
  transition: "transform 0.32s ease, box-shadow 0.32s ease",
};

const practiceImageWrap = {
  position: "relative",
  width: "100%",
  height: "230px",
  overflow: "hidden",
};

const practiceImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const practiceImageOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(36,27,19,0.06) 0%, rgba(36,27,19,0.48) 100%)",
};

const practiceContent = {
  position: "relative",
  padding: "0 30px 34px 30px",
};
const practiceNumber = {
  width: "56px",
  height: "56px",
  borderRadius: "16px",
  background: "linear-gradient(180deg, #b08d57, #8b6a3f)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "16px",
  boxShadow: "0 12px 24px rgba(139,106,63,0.32)",
  marginTop: "-28px",
  marginBottom: "22px",
  position: "relative",
  zIndex: 2,
};

const practiceTitle = {
  margin: "0 0 14px 0",
  fontSize: "24px",
  lineHeight: 1.25,
  color: "#241b13",
  fontWeight: "800",
};
const practiceText = {
  margin: "0 0 24px 0",
  fontSize: "16px",
  lineHeight: 1.8,
  color: "#5b4b3d",
};

const practiceLink = {
  display: "inline-flex",
  alignItems: "center",
  color: "#8b6a3f",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "800",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginTop: "34px",
};

const featureCard = {
  background: "rgba(255,255,255,0.96)",
  borderRadius: "22px",
  padding: "28px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
  border: "1px solid #eadfce",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const featureIcon = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  background: "linear-gradient(180deg, #b08d57, #8b6a3f)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  marginBottom: "16px",
  boxShadow: "0 8px 18px rgba(176,141,87,0.28)",
};

const featureTitle = {
  marginTop: 0,
  marginBottom: "12px",
  fontSize: "21px",
  color: "#2f2419",
};

const featureText = {
  margin: 0,
  lineHeight: 1.85,
  color: "#59493a",
};
const professionalArticlesWrap = {
  marginTop: "10px",
};

const articleToolbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  marginBottom: "28px",
  padding: "22px 24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.76)",
  border: "1px solid #e6d7c2",
  boxShadow: "0 14px 34px rgba(74,53,33,0.07)",
};

const articleToolbarLabel = {
  margin: "0 0 7px 0",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.7px",
  color: "#8b6a3f",
};

const articleToolbarTitle = {
  margin: 0,
  fontSize: "25px",
  color: "#241b13",
  fontWeight: "800",
};

const articleToolbarInfo = {
  minWidth: "145px",
  padding: "14px 18px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #8b6a3f, #b08d57)",
  color: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 12px 26px rgba(139,106,63,0.2)",
};

const articleFeaturedMiniBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#fff8ef",
  color: "#8b6a3f",
  fontSize: "11px",
  fontWeight: "800",
  border: "1px solid #e1c8a3",
};

const articleMetaRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  paddingTop: "18px",
  marginTop: "20px",
  marginBottom: "16px",
  borderTop: "1px solid #eadfce",
};

const articleMetaDot = {
  color: "#b08d57",
  fontWeight: "800",
};

const articleEmptyState = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "42px 28px",
  borderRadius: "26px",
  background: "rgba(255,255,255,0.82)",
  border: "1px solid #e6d7c2",
  textAlign: "center",
  boxShadow: "0 14px 34px rgba(74,53,33,0.07)",
};

const articleEmptyIcon = {
  width: "52px",
  height: "52px",
  borderRadius: "16px",
  margin: "0 auto 14px auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f3e7d7",
  color: "#8b6a3f",
  fontSize: "25px",
  fontWeight: "800",
};

const articleEmptyTitle = {
  margin: "0 0 8px 0",
  color: "#241b13",
  fontSize: "22px",
  fontWeight: "800",
};

const articleEmptyText = {
  margin: 0,
  color: "#5b4b3d",
  lineHeight: 1.7,
};

const articlesLayout = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "24px",
  alignItems: "stretch",
  marginBottom: "28px",
};

const latestArticlesPanel = {
  background: "rgba(255,255,255,0.92)",
  border: "1px solid #e6d7c2",
  borderRadius: "24px",
  padding: "22px",
  boxShadow: "0 14px 32px rgba(74,53,33,0.09)",
  boxSizing: "border-box",
};

const latestPanelHeader = {
  marginBottom: "18px",
};

const latestPanelEyebrow = {
  margin: "0 0 8px 0",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.6px",
  color: "#8b6a3f",
};

const latestPanelTitle = {
  margin: 0,
  fontSize: "25px",
  color: "#2b2118",
};

const latestArticleList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const latestArticleItem = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "13px 14px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.72)",
  border: "1px solid #eadfce",
  textDecoration: "none",
  transition: "all 0.25s ease",
};

const latestArticleCategory = {
  width: "fit-content",
  padding: "5px 9px",
  borderRadius: "999px",
  background: "#f3e7d7",
  color: "#8b6a3f",
  fontSize: "10px",
  fontWeight: "800",
};

const latestArticleTitle = {
  color: "#2b2118",
  fontSize: "15px",
  lineHeight: 1.35,
};

const latestArticleDate = {
  color: "#8a7358",
  fontSize: "12px",
  fontWeight: "600",
};
const featuredArticleWrap = {
  marginBottom: "24px",

};
const featuredArticleCard = {
  borderRadius: "24px",
  padding: "28px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,244,235,0.96) 100%)",
  boxShadow: "0 14px 32px rgba(74,53,33,0.09)",
  border: "1px solid #e2cfb5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  boxSizing: "border-box",
};

const featuredArticleGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(220px, 0.55fr)",
  gap: "18px",
  alignItems: "stretch",
  padding: "22px",
};

const featuredArticleContent = {
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};


const featuredTopMeta = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "14px",
};
const featuredBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "7px 12px",
  borderRadius: "999px",
  background: "#f3e7d7",
  border: "1px solid #e3cfb4",
  color: "#8b6a3f",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.8px",
};const featuredCategoryBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "7px 11px",
  borderRadius: "999px",
  background: "#fff8ef",
  border: "1px solid #ead8c2",
  color: "#8b6a3f",
  fontSize: "11px",
  fontWeight: "700",
};

const featuredMetaDivider = {
  color: "#b08d57",
  fontSize: "14px",
};
const featuredArticleTitle = {
  margin: "0 0 12px 0",
  fontSize: "27px",
  lineHeight: 1.25,
  color: "#241b13",
  wordBreak: "break-word",
  fontWeight: "800",
};
const featuredArticleText = {
  margin: "0 0 16px 0",
  maxWidth: "680px",
  lineHeight: 1.65,
  fontSize: "15px",
  color: "#5b4b3d",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
};

const featuredBottomMeta = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "18px",
};
const featuredMetaText = {
  fontSize: "13px",
  color: "#8a7358",
  fontWeight: "700",
};
const featuredArticleButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  padding: "11px 18px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "14px",
  border: "none",
  boxShadow: "0 10px 22px rgba(139,106,63,0.22)",
  transition: "all 0.25s ease",
};

const featuredSidePanel = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
};

const featuredSideBox = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "16px",
  padding: "12px 14px",
  backdropFilter: "blur(8px)",
  transition: "all 0.25s ease",
};

const featuredSideLabel = {
  margin: "0 0 4px 0",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.8px",
  color: "rgba(255,255,255,0.72)",
  textTransform: "uppercase",
};
const featuredSideValue = {
  margin: 0,
  fontSize: "15px",
  fontWeight: "700",
  color: "white",
  lineHeight: 1.3,
};

const featuredMiniNote = {
  marginTop: "2px",
  padding: "12px 14px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "rgba(255,255,255,0.84)",
  lineHeight: 1.6,
  fontSize: "13px",
};
const articleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "26px",
  alignItems: "stretch",
  marginTop: "0",
};
const articleCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(252,248,242,0.96) 100%)",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "0 14px 32px rgba(74,53,33,0.09)",
  border: "1px solid #eadfce",
  transition: "all 0.3s ease",
  minHeight: "330px",
  height: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
};

const articleCardInner = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

const articleTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "18px",
};

const articleCategoryBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#f3e7d7",
  color: "#8b6a3f",
  fontSize: "11px",
  fontWeight: "700",
  border: "1px solid #ead8c2",
};

const articleDate = {
  color: "#9a8468",
  fontSize: "12px",
};

const articleTitle = {
  marginTop: 0,
  marginBottom: "14px",
  fontSize: "22px",
  lineHeight: 1.28,
  color: "#241b13",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minHeight: "56px",
  fontWeight: "800",
};

const articleText = {
  margin: 0,
  lineHeight: 1.75,
  color: "#5b4b3d",
  fontSize: "15px",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  minHeight: "104px",
};

const articleFooterRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const articleReadingTime = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#8a7358",
};

const articleButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "14px",
  fontWeight: "800",
  fontSize: "14px",
  boxShadow: "0 8px 18px rgba(139,106,63,0.22)",
  transition: "all 0.25s ease",
};

const contactSectionStyle = {
  padding: "92px 0",
  background: "linear-gradient(180deg, #2a2119 0%, #1d1712 100%)",
  transition: "all 0.7s ease",
};

const contactTitle = {
  textAlign: "center",
  color: "white",
  fontSize: "40px",
  marginTop: 0,
  marginBottom: "18px",
};

const contactText = {
  textAlign: "center",
  color: "#e8d8c2",
  maxWidth: "860px",
  margin: "0 auto 32px auto",
  lineHeight: 1.9,
  fontSize: "17px",
};

const contactGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginTop: "22px",
};

const contactCard = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "18px",
  padding: "26px",
  boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  transition: "all 0.28s ease",
};

const contactCardTitle = {
  color: "white",
  marginTop: 0,
  marginBottom: "16px",
  fontSize: "20px",
};

const contactItem = {
  color: "#eadfce",
  lineHeight: 1.95,
  margin: "0 0 10px 0",
};

const contactNote = {
  color: "#d8c2a1",
  lineHeight: 1.8,
  marginTop: "12px",
  marginBottom: 0,
};

const contactFormStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const contactInputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  boxSizing: "border-box",
  fontSize: "15px",
  outline: "none",
};

const contactTextareaStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  boxSizing: "border-box",
  fontSize: "15px",
  outline: "none",
  resize: "vertical",
  minHeight: "150px",
};

const contactSubmitButton = {
  marginTop: "6px",
  background: "linear-gradient(90deg, #b08d57, #c79d65)",
  color: "white",
  textDecoration: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(176,141,87,0.22)",
  transition: "all 0.25s ease",
};

const articleSearchWrap = {
  maxWidth: "620px",
  margin: "0 auto 34px auto",
  background: "rgba(255,255,255,0.86)",
  border: "1px solid #e6d7c2",
  borderRadius: "999px",
  padding: "8px 18px",
  boxShadow: "0 12px 28px rgba(74,53,33,0.07)",
};

const aboutActionWrap = {
  display: "flex",
  justifyContent: "center",
  marginTop: "28px",
};

const aboutMoreButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "13px 24px",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "14px",
  boxShadow: "0 12px 24px rgba(139,106,63,0.22)",
};
const footerStyle = {
  background:
    "linear-gradient(180deg, #1d1712 0%, #100c08 100%)",
  color: "white",
  position: "relative",
};

const footerTopLine = {
  width: "100%",
  height: "1px",
  background:
    "linear-gradient(90deg, transparent, rgba(216,194,161,0.55), transparent)",
};

const footerContainer = {
  width: "min(1180px, calc(100% - 40px))",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.35fr 0.8fr 0.9fr 1fr",
  gap: "38px",
  padding: "62px 0 44px 0",
};

const footerBrandColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const footerLogoRow = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const footerLogoBox = {
  width: "58px",
  height: "58px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
};

const footerLogo = {
  width: "40px",
  height: "40px",
  objectFit: "contain",
};

const footerColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const footerHeading = {
  margin: 0,
  color: "#d8c2a1",
  fontSize: "18px",
  fontWeight: "800",
};

const footerSmallText = {
  margin: "6px 0 0 0",
  color: "#cdbca4",
  fontSize: "12px",
  lineHeight: 1.5,
};

const footerText = {
  margin: 0,
  color: "#e9dfd2",
  lineHeight: 1.85,
  fontSize: "15px",
};

const footerLink = {
  color: "#e9dfd2",
  textDecoration: "none",
  fontSize: "15px",
  lineHeight: 1.7,
  transition: "color 0.25s ease, transform 0.25s ease",
};

const footerCtaButton = {
  width: "fit-content",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 20px",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "14px",
  boxShadow: "0 12px 26px rgba(0,0,0,0.24)",
};

const footerContactItem = {
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  color: "#eadfce",
  lineHeight: 1.6,
  fontSize: "14px",
};

const footerBottom = {
  borderTop: "1px solid rgba(255,255,255,0.10)",
  width: "min(1180px, calc(100% - 40px))",
  margin: "0 auto",
  padding: "18px 0",
  color: "#d9cdbf",
  fontSize: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const footerBottomRight = {
  color: "#bfa983",
  fontWeight: "700",
};
const hamburgerButton = {
  width: "46px",
  height: "46px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.12)",
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  cursor: "pointer",
  transition: "all 0.25s ease",
};

const hamburgerLine = {
  width: "21px",
  height: "2px",
  borderRadius: "999px",
  background: "#ffffff",
  display: "block",
};

const drawerOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 4000,
  background: "rgba(18, 14, 10, 0.52)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  display: "flex",
  justifyContent: "flex-end",
};

const drawerPanel = {
  width: "min(420px, 92vw)",
  height: "100vh",
  background:
    "linear-gradient(180deg, rgba(250,246,240,0.98) 0%, rgba(239,230,217,0.98) 100%)",
  boxShadow: "-24px 0 50px rgba(0,0,0,0.25)",
  padding: "32px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  animation: "drawerSlide 0.25s ease",
};

const drawerTop = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "18px",
  marginBottom: "34px",
};

const drawerEyebrow = {
  margin: "0 0 8px 0",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "2px",
  color: "#8b6a3f",
};

const drawerTitle = {
  margin: 0,
  fontSize: "23px",
  lineHeight: 1.25,
  color: "#241b13",
};

const drawerCloseButton = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  border: "1px solid #dfceb6",
  background: "rgba(255,255,255,0.76)",
  color: "#5b3f26",
  fontSize: "30px",
  lineHeight: "1",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(74,53,33,0.08)",
};

const drawerLinks = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const drawerLink = {
  minHeight: "58px",
  padding: "0 18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.78)",
  border: "1px solid #e3cfb4",
  color: "#2b2118",
  textDecoration: "none",
  fontSize: "17px",
  fontWeight: "800",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 10px 22px rgba(74,53,33,0.07)",
};

const drawerAdminLink = {
  ...drawerLink,
  background: "linear-gradient(90deg, #8b6a3f, #b08d57)",
  color: "white",
  border: "none",
};

const drawerNote = {
  marginTop: "auto",
  paddingTop: "22px",
  borderTop: "1px solid #decbb1",
  color: "#6a5540",
  lineHeight: 1.8,
  fontSize: "14px",
};
const aboutSectionStyle = {
  padding: "100px 0",
  background: "linear-gradient(180deg, #f7f1e8 0%, #ffffff 100%)",
  transition: "all 0.7s ease",
};

const aboutGrid = {
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: "54px",
  alignItems: "center",
};

const aboutTitle = {
  fontSize: "44px",
  lineHeight: 1.15,
  color: "#241b13",
  margin: "0 0 24px 0",
  fontWeight: "800",
};

const aboutText = {
  fontSize: "17px",
  lineHeight: 1.9,
  color: "#4d3c2f",
  margin: "0 0 18px 0",
};

const aboutImageBox = {
  borderRadius: "28px",
  overflow: "hidden",
  boxShadow: "0 24px 60px rgba(74,53,33,0.18)",
  border: "1px solid #e4d1b8",
  height: "460px",
};

const aboutImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const aboutInfoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
  marginTop: "30px",
};

const aboutInfoCard = {
  background: "#ffffff",
  border: "1px solid #eadfce",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 12px 28px rgba(74,53,33,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "#241b13",
};
const trustSectionStyle = {
  padding: "105px 0",
  background: "linear-gradient(135deg, #2a2119 0%, #15110d 100%)",
  color: "white",
};

const trustGrid = {
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: "56px",
  alignItems: "center",
};

const trustTitle = {
  margin: "0 0 22px 0",
  fontSize: "44px",
  lineHeight: 1.18,
  color: "#ffffff",
  fontWeight: "800",
};

const trustText = {
  margin: "0 0 18px 0",
  fontSize: "17px",
  lineHeight: 1.9,
  color: "#e8d8c2",
};

const trustButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "18px",
  padding: "14px 24px",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #b08d57, #c79d65)",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "14px",
  boxShadow: "0 14px 30px rgba(176,141,87,0.26)",
};

const trustPanel = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "28px",
  padding: "34px",
  boxShadow: "0 24px 60px rgba(0,0,0,0.26)",
  backdropFilter: "blur(12px)",
};

const progressItem = {
  marginBottom: "26px",
};

const progressTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  color: "#f3e6d2",
  fontSize: "15px",
  fontWeight: "700",
};

const progressBar = {
  width: "100%",
  height: "9px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #b08d57, #e0bf85)",
};

const trustMiniCards = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
  marginTop: "34px",
};

const trustMiniCard = {
  background: "rgba(255,255,255,0.09)",
  border: "1px solid rgba(255,255,255,0.13)",
  borderRadius: "18px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const trustMiniCardStrong = {
  fontSize: "28px",
  color: "#ffffff",
};

const trustMiniCardSpan = {
  fontSize: "13px",
  color: "#e8d8c2",
};
const heroServicePanel = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "18px",
};

const heroServiceCard = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "24px",
  padding: "26px",
  color: "white",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
};

const heroServiceNumber = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "46px",
  height: "46px",
  borderRadius: "14px",
  background: "linear-gradient(180deg, #b08d57, #8b6a3f)",
  color: "white",
  fontSize: "14px",
  fontWeight: "800",
  marginBottom: "16px",
};

const heroServiceTitle = {
  margin: "0 0 10px 0",
  fontSize: "24px",
  lineHeight: 1.25,
  fontWeight: "800",
};

const heroServiceText = {
  margin: 0,
  fontSize: "15.5px",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
};


const introOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background:
    "linear-gradient(135deg, #1d1712 0%, #6f5234 52%, #9b8268 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "introFadeOut 2.1s ease forwards",
};

const introLogoWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  animation: "introLogoMove 1.45s ease forwards",
};

const introLogo = {
  width: "560px",
  maxWidth: "86vw",
  height: "auto",
  objectFit: "contain",
  mixBlendMode: "multiply",
  filter: "drop-shadow(0 20px 38px rgba(0,0,0,0.26))",
};

const introLine = {
  width: "180px",
  height: "1px",
  marginTop: "24px",
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.86), transparent)",
};

const introText = {
  margin: "16px 0 0 0",
  color: "rgba(255,255,255,0.9)",
  fontSize: "14px",
  letterSpacing: "2px",
  fontWeight: "800",
  textAlign: "center",
};

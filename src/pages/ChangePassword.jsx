import { useState } from "react";
import { supabase } from "../lib/supabase";
function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      setError("Şifre değiştirilirken bir hata oluştu.");
      console.error(error);
      return;
    }

    setMessage("Şifreniz başarıyla güncellendi.");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Şifre Değiştir</h2>
        <p className="admin-description">
          Yönetici hesabınız için yeni bir şifre belirleyin.
        </p>

        <form onSubmit={handleChangePassword} className="admin-form">
          <label>Yeni Şifre</label>
          <input
            type="password"
            placeholder="Yeni şifrenizi girin"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Yeni Şifre Tekrar</label>
          <input
            type="password"
            placeholder="Yeni şifrenizi tekrar girin"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
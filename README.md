# 🫒 Likya Gusto — Ege'nin Lezzet Durağı

Likya Gusto, Ege mutfağına odaklanan modern bir restoran tanıtım ve menü sitesidir. Zeytinyağlı mezeler, taze deniz ürünleri ve geleneksel Akdeniz lezzetlerini dijital ortamda sunar.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)

---

## ✨ Özellikler

- **Dijital Menü** — 9 özel Ege yemeği, kendi fotoğraflarıyla birlikte
- **Online Rezervasyon** — Form üzerinden anlık rezervasyon, Supabase'e kayıt
- **E-posta Bildirimi** — n8n webhook entegrasyonu ile yeni rezervasyonlarda otomatik mail
- **Telegram Botu** — Günlük meze menüsü abonelik sistemi ([t.me/Likya_Gusto_Bot](https://t.me/Likya_Gusto_Bot))
- **Fotoğraf Galerisi** — Lightbox destekli restoran ve yemek galerisi
- **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu tasarım
- **Smooth Scroll & Animasyonlar** — Modern kullanıcı deneyimi

## 📂 Proje Yapısı

```
Restaurant_Menu_Tanitim/
├── frontend/               # Statik web sitesi
│   ├── index.html          # Ana sayfa
│   ├── css/
│   │   └── style.css       # Tüm stiller
│   ├── js/
│   │   └── main.js         # Etkileşim ve form mantığı
│   └── images/             # Menü fotoğrafları
│       ├── meze-tabagi.jpg
│       ├── deniz-borulcesi.jpg
│       ├── enginar.jpg
│       ├── levrek.jpg
│       ├── karides-guvec.jpg
│       ├── yaprak-sarma.jpg
│       ├── kabak-tatlisi.jpg
│       ├── turk-kahvesi.jpg
│       └── ayran.jpg
│
├── backend/                # NestJS API sunucusu
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── reservations/   # Rezervasyon modülü
│       │   ├── reservations.controller.ts
│       │   ├── reservations.service.ts
│       │   ├── reservations.module.ts
│       │   └── dto/
│       │       └── create-reservation.dto.ts
│       └── supabase/       # Supabase bağlantı modülü
│           ├── supabase.service.ts
│           └── supabase.module.ts
│
└── supabase_schema.sql     # Veritabanı şeması (reservations + telegram_subscribers)
```

## 🚀 Kurulum

### Gereksinimler

- [Node.js](https://nodejs.org/) v18+
- [Supabase](https://supabase.com/) hesabı (ücretsiz)

### 1. Repoyu klonla

```bash
git clone https://github.com/fekiz12/Restaurant-Menu-ve-Tanitim-Sitesi.git
cd Restaurant-Menu-ve-Tanitim-Sitesi
```

### 2. Supabase veritabanını hazırla

Supabase Dashboard'da **SQL Editor**'e git ve `supabase_schema.sql` dosyasının içeriğini çalıştır. Bu, `reservations` ve `telegram_subscribers` tablolarını oluşturur.

### 3. Backend'i çalıştır

```bash
cd backend
npm install
```

`.env` dosyası oluştur:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOi...
N8N_WEBHOOK_URL=https://your-n8n-webhook-url  # opsiyonel
```

Sunucuyu başlat:

```bash
npm run start:dev
```

Backend `http://localhost:3000` adresinde çalışır ve frontend'i otomatik olarak serve eder.

### 4. Siteyi aç

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresine git.

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | HTML5, CSS3 (custom), Vanilla JavaScript |
| **Backend** | NestJS (Node.js / TypeScript) |
| **Veritabanı** | Supabase (PostgreSQL) |
| **Otomasyon** | n8n (webhook ile e-posta bildirimi) |
| **Bot** | Telegram Bot API |
| **Fontlar** | Playfair Display, Inter (Google Fonts) |
| **İkonlar** | Font Awesome 6 |

## 📸 Menü

| Yemek | Kategori |
|-------|----------|
| Ege Meze Tabağı | Başlangıçlar |
| Deniz Börülcesi Salatası | Başlangıçlar |
| Zeytinyağlı Enginar | Başlangıçlar |
| Izgara Levrek | Ana Yemekler |
| Karidesli Güveç | Ana Yemekler |
| Zeytinyağlı Yaprak Sarma | Ana Yemekler |
| Kabak Tatlısı | Tatlılar & İçecekler |
| Türk Kahvesi | Tatlılar & İçecekler |
| Ayran | Tatlılar & İçecekler |

## 📄 API

### Rezervasyon Oluştur

```
POST /api/reservations
Content-Type: application/json

{
  "name": "Ali Yılmaz",
  "phone": "05551234567",
  "guests": 4,
  "date": "2026-03-15",
  "time": "19:30"
}
```

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

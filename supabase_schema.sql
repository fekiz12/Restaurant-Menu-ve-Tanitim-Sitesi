-- =============================================
-- Likya Gusto — Reservations Tablosu
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın
-- =============================================

CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 20),
  date VARCHAR(10) NOT NULL,
  time VARCHAR(5) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) aktif et
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Anonim kullanıcıların INSERT yapabilmesi için policy
CREATE POLICY "Allow anonymous inserts" ON reservations
  FOR INSERT
  WITH CHECK (true);

-- Anonim kullanıcıların kendi eklediği kayıtları okuyabilmesi (opsiyonel)
CREATE POLICY "Allow anonymous select" ON reservations
  FOR SELECT
  USING (true);


-- =============================================
-- Telegram Subscribers Tablosu
-- Günlük meze menüsü abonelik sistemi
-- =============================================

CREATE TABLE IF NOT EXISTS telegram_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id BIGINT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_telegram_active ON telegram_subscribers (is_active)
  WHERE is_active = true;

ALTER TABLE telegram_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow bot insert subscribers" ON telegram_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow bot update subscribers" ON telegram_subscribers
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow bot read subscribers" ON telegram_subscribers
  FOR SELECT
  USING (true);


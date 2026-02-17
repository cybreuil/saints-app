-- Calendriers (Romain général, France, 1962, etc.)
CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,   -- ex: ROMAN_GENERAL, FRANCE, TRIDENTINE_1962
    name VARCHAR(150) NOT NULL,
    description TEXT
);

-- Saints (entité principale)
CREATE TABLE saints (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,  -- ex: saint-joseph
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    death_date DATE,
    short_description TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fête "abstraite" (indépendante d'un calendrier précis)
CREATE TABLE feasts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,  -- ex: saint-joseph-epoux
    name VARCHAR(255) NOT NULL,
    feast_type VARCHAR(50) NOT NULL,    -- saint, marial, christologique, etc.
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Règles de date d'une fête
-- fixed: month/day (ex: 15/08)
-- movable: base + offset (ex: EASTER + 49)
CREATE TABLE feast_dates (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    date_kind VARCHAR(20) NOT NULL CHECK (date_kind IN ('fixed', 'movable')),
    month SMALLINT CHECK (month BETWEEN 1 AND 12),
    day SMALLINT CHECK (day BETWEEN 1 AND 31),
    movable_base VARCHAR(30),           -- ex: EASTER
    movable_offset_days INTEGER,        -- ex: 49
    CHECK (
        (date_kind = 'fixed' AND month IS NOT NULL AND day IS NOT NULL)
        OR
        (date_kind = 'movable' AND movable_base IS NOT NULL)
    )
);

-- Célébration d'une fête dans un calendrier donné (rang, région, priorité...)
CREATE TABLE calendar_celebrations (
    id SERIAL PRIMARY KEY,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    liturgical_rank VARCHAR(50) NOT NULL, -- solennité, fête, mémoire...
    liturgical_color VARCHAR(30),         -- blanc, rouge, vert...
    region VARCHAR(100),
    is_optional BOOLEAN DEFAULT FALSE,
    notes TEXT,
    UNIQUE (calendar_id, feast_id)
);

-- Liaison n-n fêtes <-> saints
CREATE TABLE feast_saints (
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    role VARCHAR(100),                    -- ex: principal, compagnon, martyrs
    PRIMARY KEY (feast_id, saint_id)
);

-- Métadonnées flexibles pour saints
CREATE TABLE saint_attributes (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    attr_key VARCHAR(100) NOT NULL,       -- ex: patronage, symbole
    attr_value VARCHAR(255) NOT NULL
);

-- Translations
CREATE TABLE locales (
    code VARCHAR(10) PRIMARY KEY,   -- fr, en, it, es
    name VARCHAR(50) NOT NULL
);

CREATE TABLE feast_translations (
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (feast_id, locale_code)
);

CREATE TABLE saint_translations (
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    PRIMARY KEY (saint_id, locale_code)
);


CREATE INDEX idx_feast_dates_fixed ON feast_dates (month, day);
CREATE INDEX idx_calendar_celebrations_calendar ON calendar_celebrations (calendar_id);
CREATE INDEX idx_saints_slug ON saints (slug);
CREATE INDEX idx_feasts_slug ON feasts (slug);

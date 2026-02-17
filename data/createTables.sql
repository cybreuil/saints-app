-- =========================================================
-- SCHÉMA SQL - Site "Fête du jour"
-- Compatible PostgreSQL
-- =========================================================

-- Nettoyage (optionnel en dev)
DROP TABLE IF EXISTS celebration_saints CASCADE;
DROP TABLE IF EXISTS celebrations CASCADE;
DROP TABLE IF EXISTS feast_dates CASCADE;
DROP TABLE IF EXISTS feast_translations CASCADE;
DROP TABLE IF EXISTS saint_translations CASCADE;
DROP TABLE IF EXISTS saint_patronages CASCADE;
DROP TABLE IF EXISTS saint_attributes CASCADE;
DROP TABLE IF EXISTS saints CASCADE;
DROP TABLE IF EXISTS feasts CASCADE;
DROP TABLE IF EXISTS liturgical_ranks CASCADE;
DROP TABLE IF EXISTS calendars CASCADE;
DROP TABLE IF EXISTS locales CASCADE;

-- =========================================================
-- 1) Référentiels
-- =========================================================

-- Langues disponibles
CREATE TABLE locales (
    code VARCHAR(10) PRIMARY KEY,                 -- ex: fr, en, la
    name VARCHAR(50) NOT NULL                     -- ex: Français, English, Latin
);

-- Calendriers liturgiques
CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,             -- ex: ROMAN_GENERAL_1969, TRIDENTINE_1962
    name VARCHAR(150) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Rangs liturgiques dépendants du calendrier
-- IMPORTANT: les rangs changent selon le calendrier / l'époque
CREATE TABLE liturgical_ranks (
    id SERIAL PRIMARY KEY,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    code VARCHAR(40) NOT NULL,                    -- ex: SOLEMNITY, FEAST, MEM_OBL, CLASS_I, CLASS_II
    label_fr VARCHAR(120) NOT NULL,               -- libellé affichable (ou via table de traduction si besoin)
    precedence SMALLINT NOT NULL CHECK (precedence > 0), -- 1 = plus prioritaire
    UNIQUE (calendar_id, code),
    UNIQUE (calendar_id, precedence)
);

-- =========================================================
-- 2) Entités principales
-- =========================================================

-- Saints (entité globale)
CREATE TABLE saints (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(160) UNIQUE NOT NULL,            -- ex: saint-joseph
    default_name VARCHAR(255) NOT NULL,           -- nom fallback
    birth_date DATE,
    death_date DATE,
    short_description TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Traductions des saints
CREATE TABLE saint_translations (
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    full_biography TEXT,
    PRIMARY KEY (saint_id, locale_code)
);

-- Métadonnées de saints (flexibles)
CREATE TABLE saint_attributes (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    attr_key VARCHAR(100) NOT NULL,               -- ex: symbol, title, order
    attr_value VARCHAR(255) NOT NULL
);

-- Patronages de saints
CREATE TABLE saint_patronages (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    patronage VARCHAR(255) NOT NULL               -- ex: "travailleurs", "France", etc.
);

-- Fêtes liturgiques (entité globale)
CREATE TABLE feasts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(160) UNIQUE NOT NULL,            -- ex: assomption, saint-joseph-epoux
    default_name VARCHAR(255) NOT NULL,
    feast_type VARCHAR(50) NOT NULL,              -- ex: saint, marial, christologique, dedicace, autre
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Traductions des fêtes
CREATE TABLE feast_translations (
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (feast_id, locale_code)
);

-- =========================================================
-- 3) Dates des fêtes (règles calendaires)
-- =========================================================
-- Une même fête peut avoir plusieurs règles selon calendrier
-- ex: fixe (15/08) ou mobile (EASTER + 49)

CREATE TABLE feast_dates (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,

    date_kind VARCHAR(20) NOT NULL CHECK (date_kind IN ('fixed', 'movable')),

    -- Pour fixed
    month SMALLINT CHECK (month BETWEEN 1 AND 12),
    day SMALLINT CHECK (day BETWEEN 1 AND 31),

    -- Pour movable
    movable_base VARCHAR(30),                     -- ex: EASTER, CHRISTMAS
    movable_offset_days INTEGER,                  -- ex: +49

    -- Optionnel: période de validité historique de la règle
    valid_from DATE,
    valid_to DATE,

    notes TEXT,

    CHECK (
        (date_kind = 'fixed' AND month IS NOT NULL AND day IS NOT NULL AND movable_base IS NULL)
        OR
        (date_kind = 'movable' AND movable_base IS NOT NULL)
    )
);

-- =========================================================
-- 4) Célébrations concrètes dans un calendrier
-- =========================================================
-- Une célébration = "cette fête, dans ce calendrier, avec ce rang"

CREATE TABLE celebrations (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    rank_id INTEGER NOT NULL REFERENCES liturgical_ranks(id) ON DELETE RESTRICT,

    -- Champs utiles au rendu liturgique
    liturgical_color VARCHAR(30),                 -- blanc, rouge, vert, violet, noir...
    is_optional BOOLEAN NOT NULL DEFAULT FALSE,   -- mémoire facultative etc.
    region VARCHAR(100),                          -- ex: FR, Rome, diocèse X (simple version)
    notes TEXT,

    -- Optionnel: période de validité historique de cette célébration
    valid_from DATE,
    valid_to DATE,

    UNIQUE (feast_id, calendar_id, region)
);

-- Liaison n-n célébrations <-> saints
-- (au niveau célébration pour gérer des différences selon calendrier)
CREATE TABLE celebration_saints (
    celebration_id INTEGER NOT NULL REFERENCES celebrations(id) ON DELETE CASCADE,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    role VARCHAR(100),                            -- ex: principal, compagnon, martyr
    PRIMARY KEY (celebration_id, saint_id)
);

-- =========================================================
-- 5) Index utiles
-- =========================================================

CREATE INDEX idx_saints_slug ON saints(slug);
CREATE INDEX idx_feasts_slug ON feasts(slug);

CREATE INDEX idx_feast_dates_lookup_fixed
    ON feast_dates(calendar_id, month, day)
    WHERE date_kind = 'fixed';

CREATE INDEX idx_feast_dates_lookup_movable
    ON feast_dates(calendar_id, movable_base, movable_offset_days)
    WHERE date_kind = 'movable';

CREATE INDEX idx_celebrations_calendar ON celebrations(calendar_id);
CREATE INDEX idx_celebrations_rank ON celebrations(rank_id);
CREATE INDEX idx_celebrations_region ON celebrations(region);

CREATE INDEX idx_saint_translations_locale ON saint_translations(locale_code);
CREATE INDEX idx_feast_translations_locale ON feast_translations(locale_code);

-- =========================================================
-- 6) Seeds minimaux recommandés (optionnel)
-- =========================================================
-- Tu peux les exécuter après la création des tables.

-- Locales
INSERT INTO locales (code, name) VALUES
('fr', 'Français'),
('en', 'English');

-- Calendriers
INSERT INTO calendars (code, name, description) VALUES
('ROMAN_GENERAL_1969', 'Calendrier romain général (1969+)', 'Forme ordinaire'),
('TRIDENTINE_1962', 'Calendrier traditionnel (1962)', 'Missel de 1962');

-- Exemples de rangs pour ROMAN_GENERAL_1969
INSERT INTO liturgical_ranks (calendar_id, code, label_fr, precedence)
SELECT c.id, x.code, x.label_fr, x.precedence
FROM calendars c
JOIN (VALUES
    ('SOLEMNITY', 'Solennité', 1),
    ('FEAST', 'Fête', 2),
    ('MEM_OBL', 'Mémoire obligatoire', 3),
    ('MEM_OPT', 'Mémoire facultative', 4),
    ('FERIA', 'Férie', 5)
) AS x(code, label_fr, precedence)
ON c.code = 'ROMAN_GENERAL_1969';

-- Exemples de rangs pour TRIDENTINE_1962 (simplifié)
INSERT INTO liturgical_ranks (calendar_id, code, label_fr, precedence)
SELECT c.id, x.code, x.label_fr, x.precedence
FROM calendars c
JOIN (VALUES
    ('CLASS_I', 'Ire classe', 1),
    ('CLASS_II', 'IIe classe', 2),
    ('CLASS_III', 'IIIe classe', 3),
    ('CLASS_IV', 'IVe classe / férie', 4)
) AS x(code, label_fr, precedence)
ON c.code = 'TRIDENTINE_1962';

-- =========================================================
-- SCHÉMA SQL - Site "Fête du jour"
-- Compatible PostgreSQL
-- =========================================================

-- Nettoyage
DROP TABLE IF EXISTS celebration_saints CASCADE;
DROP TABLE IF EXISTS celebrations CASCADE;
DROP TABLE IF EXISTS feast_dates CASCADE;
DROP TABLE IF EXISTS feast_translations CASCADE;
DROP TABLE IF EXISTS saint_translations CASCADE;
DROP TABLE IF EXISTS saint_patronages CASCADE;
DROP TABLE IF EXISTS patronage_translations CASCADE;
DROP TABLE IF EXISTS patronages CASCADE;
DROP TABLE IF EXISTS saint_attributes CASCADE;
DROP TABLE IF EXISTS attribute_translations CASCADE;
DROP TABLE IF EXISTS attributes CASCADE;
DROP TABLE IF EXISTS saints CASCADE;
DROP TABLE IF EXISTS feasts CASCADE;
DROP TABLE IF EXISTS liturgical_color_translations CASCADE;
DROP TABLE IF EXISTS liturgical_colors CASCADE;
DROP TABLE IF EXISTS liturgical_ranks CASCADE;
DROP TABLE IF EXISTS calendars CASCADE;
DROP TABLE IF EXISTS locales CASCADE;

-- =========================================================
-- 1) Référentiels
-- =========================================================

-- Langues disponibles
CREATE TABLE locales (
    code VARCHAR(10) PRIMARY KEY,                 -- ex: fr, en, la
    name VARCHAR(50) NOT NULL
);

-- Calendriers liturgiques (avec héritage hiérarchique)
CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,             -- ex: ROMAN_GENERAL_1969, ROMAN_FRANCE
    name VARCHAR(150) NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES calendars(id) ON DELETE SET NULL,
    date_system VARCHAR(20) NOT NULL DEFAULT 'gregorian',   -- gregorian, julian
    easter_computation VARCHAR(20) NOT NULL DEFAULT 'western', -- western, eastern
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Rangs liturgiques (dépendants du calendrier)
CREATE TABLE liturgical_ranks (
    id SERIAL PRIMARY KEY,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    code VARCHAR(40) NOT NULL,                    -- ex: SOLEMNITY, FEAST, CLASS_I
    label_fr VARCHAR(120) NOT NULL,
    precedence SMALLINT NOT NULL CHECK (precedence > 0),
    UNIQUE (calendar_id, code),
    UNIQUE (calendar_id, precedence)
);

-- Couleurs liturgiques
CREATE TABLE liturgical_colors (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,             -- ex: WHITE, RED, GREEN
    hex_color VARCHAR(7) NOT NULL                 -- ex: #FFFFFF, #FF0000
);

-- Traductions des couleurs liturgiques
CREATE TABLE liturgical_color_translations (
    color_id INTEGER NOT NULL REFERENCES liturgical_colors(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    label VARCHAR(50) NOT NULL,
    PRIMARY KEY (color_id, locale_code)
);

-- =========================================================
-- 2) Saints
-- =========================================================

CREATE TABLE saints (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(160) UNIQUE NOT NULL,            -- ex: saint-joseph
    default_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    death_date DATE,
    short_description TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saint_translations (
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    full_biography TEXT,
    PRIMARY KEY (saint_id, locale_code)
);

-- =========================================================
-- 3) Attributs (normalisés + traduits)
-- =========================================================

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(120) UNIQUE NOT NULL,            -- ex: LILY, SWORD, SKULL, BOOK
    category VARCHAR(50)                          -- ex: symbol, title, order
);

CREATE TABLE attribute_translations (
    attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (attribute_id, locale_code)
);

CREATE TABLE saint_attributes (
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    PRIMARY KEY (saint_id, attribute_id)
);

-- =========================================================
-- 4) Patronages (normalisés + traduits)
-- =========================================================

CREATE TABLE patronages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(120) UNIQUE NOT NULL             -- ex: WORKERS, FRANCE, STUDENTS
);

CREATE TABLE patronage_translations (
    patronage_id INTEGER NOT NULL REFERENCES patronages(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (patronage_id, locale_code)
);

CREATE TABLE saint_patronages (
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    patronage_id INTEGER NOT NULL REFERENCES patronages(id) ON DELETE CASCADE,
    PRIMARY KEY (saint_id, patronage_id)
);

-- =========================================================
-- 5) Fêtes liturgiques
-- =========================================================

CREATE TABLE feasts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(160) UNIQUE NOT NULL,            -- ex: assomption, saint-joseph-epoux
    default_name VARCHAR(255) NOT NULL,
    feast_type VARCHAR(50) NOT NULL,              -- ex: saint, marial, christologique, dedicace, autre
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feast_translations (
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    locale_code VARCHAR(10) NOT NULL REFERENCES locales(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (feast_id, locale_code)
);

-- =========================================================
-- 6) Dates des fêtes (règles calendaires)
-- =========================================================
-- La date peut varier selon le calendrier (héritage pris en compte côté app)

CREATE TABLE feast_dates (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,

    date_kind VARCHAR(20) NOT NULL CHECK (date_kind IN ('fixed', 'movable')),

    -- Pour fixed
    month SMALLINT CHECK (month BETWEEN 1 AND 12),
    day SMALLINT CHECK (day BETWEEN 1 AND 31),

    -- Pour movable (interprété selon calendar.easter_computation)
    movable_base VARCHAR(30),                     -- ex: EASTER, CHRISTMAS
    movable_offset_days INTEGER,

    -- Période de validité historique (optionnel)
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
-- 7) Célébrations (fête + calendrier + rang + couleur)
-- =========================================================
-- Une célébration locale surcharge la célébration parente (résolu côté app)

CREATE TABLE celebrations (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER NOT NULL REFERENCES feasts(id) ON DELETE CASCADE,
    calendar_id INTEGER NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    rank_id INTEGER NOT NULL REFERENCES liturgical_ranks(id) ON DELETE RESTRICT,
    color_id INTEGER REFERENCES liturgical_colors(id) ON DELETE RESTRICT,  -- nullable (certaines traditions)

    is_optional BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,

    valid_from DATE,
    valid_to DATE,

    UNIQUE (feast_id, calendar_id)
);

-- Liaison célébrations <-> saints
CREATE TABLE celebration_saints (
    celebration_id INTEGER NOT NULL REFERENCES celebrations(id) ON DELETE CASCADE,
    saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
    role VARCHAR(100),                            -- ex: principal, compagnon, martyr
    PRIMARY KEY (celebration_id, saint_id)
);

-- =========================================================
-- 8) Index
-- =========================================================

CREATE INDEX idx_calendars_parent ON calendars(parent_id);
CREATE INDEX idx_saints_slug ON saints(slug);
CREATE INDEX idx_feasts_slug ON feasts(slug);

CREATE INDEX idx_feast_dates_fixed
    ON feast_dates(calendar_id, month, day)
    WHERE date_kind = 'fixed';

CREATE INDEX idx_feast_dates_movable
    ON feast_dates(calendar_id, movable_base, movable_offset_days)
    WHERE date_kind = 'movable';

CREATE INDEX idx_celebrations_calendar ON celebrations(calendar_id);
CREATE INDEX idx_celebrations_feast ON celebrations(feast_id);
CREATE INDEX idx_celebrations_rank ON celebrations(rank_id);
CREATE INDEX idx_celebrations_color ON celebrations(color_id);

CREATE INDEX idx_saint_translations_locale ON saint_translations(locale_code);
CREATE INDEX idx_feast_translations_locale ON feast_translations(locale_code);
CREATE INDEX idx_patronage_translations_locale ON patronage_translations(locale_code);
CREATE INDEX idx_attribute_translations_locale ON attribute_translations(locale_code);
CREATE INDEX idx_liturgical_color_translations_locale ON liturgical_color_translations(locale_code);

-- =========================================================
-- 9) Seeds minimaux
-- =========================================================

-- Locales
INSERT INTO locales (code, name) VALUES
('fr', 'Français'),
('en', 'English'),
('la', 'Latin');

-- Calendriers (avec héritage)
INSERT INTO calendars (code, name, description, parent_id, date_system, easter_computation) VALUES
('ROMAN_GENERAL_1969', 'Calendrier romain général (1969+)', 'Forme ordinaire post-Vatican II', NULL, 'gregorian', 'western'),
('TRIDENTINE_1962', 'Calendrier traditionnel (1962)', 'Missel de 1962, forme extraordinaire', NULL, 'gregorian', 'western');

-- Calendriers régionaux (héritage)
INSERT INTO calendars (code, name, description, parent_id, date_system, easter_computation)
SELECT 'ROMAN_FRANCE', 'Calendrier romain - France', 'Propre de France', id, 'gregorian', 'western'
FROM calendars WHERE code = 'ROMAN_GENERAL_1969';

INSERT INTO calendars (code, name, description, parent_id, date_system, easter_computation)
SELECT 'ROMAN_ITALY', 'Calendrier romain - Italie', 'Propre d''Italie', id, 'gregorian', 'western'
FROM calendars WHERE code = 'ROMAN_GENERAL_1969';

-- Exemple orthodoxe
INSERT INTO calendars (code, name, description, parent_id, date_system, easter_computation) VALUES
('ORTHODOX_RUSSIAN', 'Calendrier orthodoxe russe', 'Patriarcat de Moscou', NULL, 'julian', 'eastern'),
('ORTHODOX_GREEK', 'Calendrier orthodoxe grec', 'Nouveau calendrier', NULL, 'gregorian', 'eastern');

-- Rangs pour calendrier romain actuel
INSERT INTO liturgical_ranks (calendar_id, code, label_fr, precedence)
SELECT c.id, x.code, x.label_fr, x.precedence
FROM calendars c
CROSS JOIN (VALUES
    ('SOLEMNITY',  'Solennité',             1),
    ('FEAST',      'Fête',                  2),
    ('MEM_OBL',    'Mémoire obligatoire',   3),
    ('MEM_OPT',    'Mémoire facultative',   4),
    ('FERIA',      'Férie',                 5)
) AS x(code, label_fr, precedence)
WHERE c.code = 'ROMAN_GENERAL_1969';

-- Rangs pour calendrier traditionnel 1962
INSERT INTO liturgical_ranks (calendar_id, code, label_fr, precedence)
SELECT c.id, x.code, x.label_fr, x.precedence
FROM calendars c
CROSS JOIN (VALUES
    ('CLASS_I',    'Ire classe',            1),
    ('CLASS_II',   'IIe classe',            2),
    ('CLASS_III',  'IIIe classe',           3),
    ('CLASS_IV',   'IVe classe / férie',    4)
) AS x(code, label_fr, precedence)
WHERE c.code = 'TRIDENTINE_1962';

-- Couleurs liturgiques
INSERT INTO liturgical_colors (code, hex_color) VALUES
('WHITE',  '#FFFFFF'),
('RED',    '#FF0000'),
('GREEN',  '#008000'),
('PURPLE', '#800080'),
('ROSE',   '#FF007F'),
('BLACK',  '#000000'),
('GOLD',   '#FFD700');

-- Traductions des couleurs (FR)
INSERT INTO liturgical_color_translations (color_id, locale_code, label)
SELECT lc.id, 'fr', x.label
FROM liturgical_colors lc
JOIN (VALUES
    ('WHITE',  'Blanc'),
    ('RED',    'Rouge'),
    ('GREEN',  'Vert'),
    ('PURPLE', 'Violet'),
    ('ROSE',   'Rose'),
    ('BLACK',  'Noir'),
    ('GOLD',   'Or')
) AS x(code, label)
ON lc.code = x.code;

-- Traductions des couleurs (EN)
INSERT INTO liturgical_color_translations (color_id, locale_code, label)
SELECT lc.id, 'en', x.label
FROM liturgical_colors lc
JOIN (VALUES
    ('WHITE',  'White'),
    ('RED',    'Red'),
    ('GREEN',  'Green'),
    ('PURPLE', 'Purple'),
    ('ROSE',   'Rose'),
    ('BLACK',  'Black'),
    ('GOLD',   'Gold')
) AS x(code, label)
ON lc.code = x.code;

-- Traductions des couleurs (LA)
INSERT INTO liturgical_color_translations (color_id, locale_code, label)
SELECT lc.id, 'la', x.label
FROM liturgical_colors lc
JOIN (VALUES
    ('WHITE',  'Album'),
    ('RED',    'Rubrum'),
    ('GREEN',  'Viride'),
    ('PURPLE', 'Violaceum'),
    ('ROSE',   'Rosaceum'),
    ('BLACK',  'Nigrum'),
    ('GOLD',   'Aureum')
) AS x(code, label)
ON lc.code = x.code;

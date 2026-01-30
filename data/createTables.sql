-- Table des saints (fiche biographique)
CREATE TABLE saints (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    death_date DATE,
    description TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des calendriers liturgiques
CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,         -- ex: 'Romain actuel', 'Traditionnel 1962', 'Orthodoxe'
    description TEXT
);

-- Table des fêtes liturgiques
CREATE TABLE feasts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,         -- ex: 'Saint Joseph', 'Assomption', etc.
    feast_date DATE,                    -- date de la fête
    liturgical_rank VARCHAR(50),        -- ex: 'solennité', 'fête', 'mémoire obligatoire', '1ère classe', etc.
    type VARCHAR(50),                   -- ex: 'saint', 'solennité', 'mémoire', etc.
    calendar_id INTEGER REFERENCES calendars(id) ON DELETE SET NULL,
    region VARCHAR(100),                -- ex: 'France', 'Rome', etc.
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison entre fêtes et saints (plusieurs saints par fête, plusieurs fêtes par saint)
CREATE TABLE feast_saints (
    feast_id INTEGER REFERENCES feasts(id) ON DELETE CASCADE,
    saint_id INTEGER REFERENCES saints(id) ON DELETE CASCADE,
    PRIMARY KEY (feast_id, saint_id)
);

-- Table biographie détaillée (plusieurs lignes par saint)
CREATE TABLE saint_biographies (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER REFERENCES saints(id) ON DELETE CASCADE,
    bio_line TEXT
);

-- Table attributs (plusieurs attributs par saint)
CREATE TABLE saint_attributes (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER REFERENCES saints(id) ON DELETE CASCADE,
    attribute VARCHAR(255)
);

-- Table patronages (plusieurs patronages par saint)
CREATE TABLE saint_patronages (
    id SERIAL PRIMARY KEY,
    saint_id INTEGER REFERENCES saints(id) ON DELETE CASCADE,
    patronage VARCHAR(255)
);

-- Table attributs spécifiques à une fête (optionnel, si tu veux des attributs/faits propres à une célébration)
CREATE TABLE feast_attributes (
    id SERIAL PRIMARY KEY,
    feast_id INTEGER REFERENCES feasts(id) ON DELETE CASCADE,
    attribute VARCHAR(255)
);

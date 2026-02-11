# Database Schema and Seed Data

This directory contains PostgreSQL database schema and seed data for the Saints Calendar Application.

## Files

### `createTables.sql`
Schema definition file that creates all necessary PostgreSQL tables for the saints calendar application.

**Tables created:**
- `calendars` - Different liturgical calendars (Roman 1970, Tridentine 1960, Orthodox, etc.)
- `saints` - Biographical information about saints
- `feasts` - Liturgical feast days
- `feast_saints` - Many-to-many relationship between feasts and saints
- `saint_biographies` - Detailed biography lines for each saint
- `saint_attributes` - Iconographic attributes of saints
- `saint_patronages` - What each saint is patron of
- `feast_attributes` - Optional attributes specific to feasts

### `seedData.sql`
Complete seed data file that populates all tables with comprehensive data from the JSON saints database.

**Data included:**
- 4 liturgical calendars:
  - Roman Calendar 1970 (Paul VI) - Post-Vatican II
  - Tridentine Calendar 1960 (John XXIII) - Pre-Vatican II
  - Orthodox Calendar - Eastern Orthodox tradition
  - Bonus Saints and Feasts - Additional local patrons
- 1,463 unique saints with biographies, attributes, and patronages
- 1,465 feast days throughout the liturgical year
- Complete biographical information, attributes, and patronage data

## Usage

### Initial Setup

1. Create a PostgreSQL database:
```bash
createdb saints_calendar
```

2. Run the schema creation script:
```bash
psql saints_calendar < createTables.sql
```

3. Load the seed data:
```bash
psql saints_calendar < seedData.sql
```

### Reset Database

To completely reset the database with fresh data:
```bash
psql saints_calendar < seedData.sql
```
Note: The seedData.sql file includes TRUNCATE statements that will clean all tables before inserting data.

### Verify Installation

```sql
-- Check calendars
SELECT id, name FROM calendars;

-- Count saints
SELECT COUNT(*) FROM saints;

-- Count feasts by calendar
SELECT c.name, COUNT(f.id) as feast_count 
FROM calendars c 
LEFT JOIN feasts f ON c.id = f.calendar_id 
GROUP BY c.name;

-- Sample query: Get feasts for a specific date
SELECT f.name, f.liturgical_rank, c.name as calendar 
FROM feasts f 
JOIN calendars c ON f.calendar_id = c.id 
WHERE feast_date = '2024-01-01' 
ORDER BY c.name;
```

## Database Schema Overview

### Entity Relationships

```
calendars (1) ----< (n) feasts (n) ----< (n) saints
                                            |
                                            +----< saint_biographies
                                            +----< saint_attributes
                                            +----< saint_patronages
```

### Key Fields

**saints table:**
- `id` - Primary key
- `name` - Saint's name
- `birth_date`, `death_date` - Life dates (nullable)
- `description` - Brief description
- `image_url` - Optional image URL

**feasts table:**
- `id` - Primary key
- `name` - Feast name
- `feast_date` - Date in format YYYY-MM-DD
- `liturgical_rank` - Solemnity, Feast, Memorial, Optional Memorial
- `type` - Classification of feast type
- `calendar_id` - Reference to calendar
- `region` - Optional geographic specificity

**calendars table:**
- `id` - Primary key
- `name` - Calendar name
- `description` - Description of the calendar tradition

## Data Source

The seed data is generated from `src/data/saints.json`, which contains comprehensive information about saints and feast days across multiple liturgical traditions.

## Notes

- Dates in the `feasts` table use 2024 as a placeholder year since most liturgical dates recur annually
- Some saints appear in multiple calendars with different feast dates
- Biography, attributes, and patronage information may vary by calendar tradition
- The `feast_saints` junction table allows for multiple saints to be celebrated on the same feast day

## Maintenance

To regenerate the seed data from the JSON source, use the Python script:
```bash
python3 /tmp/generate_seed_sql.py
```

This will create a fresh `seedData.sql` file with all current data from `src/data/saints.json`.

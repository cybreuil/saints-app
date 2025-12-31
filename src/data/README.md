# Saints Database Documentation

This directory contains `saints.json`, a comprehensive database of Catholic and Orthodox saints organized by different liturgical calendars.

## Structure

The database is organized with the following structure:

```json
{
  "calendars": {
    "calendar_id": {
      "name": "Calendar Name",
      "description": "Description of the calendar",
      "saints": {
        "MM-DD": [
          {
            "id": "unique_saint_id",
            "name": "Saint Name",
            "feastDay": "Month Day",
            "description": "Brief description",
            "biography": ["Paragraph 1", "Paragraph 2", ...],
            "attributes": ["Symbol 1", "Symbol 2", ...],
            "patronage": ["Patron of...", ...],
            "image": ""
          }
        ]
      }
    }
  }
}
```

## Available Calendars

### 1. `tridentine_1960` - Roman Calendar 1960 (John XXIII)
The traditional Roman calendar according to the 1960 rubrics, before the Second Vatican Council reforms. This calendar represents the "Tridentine" or traditional Latin Mass calendar.

**Key characteristics:**
- Includes the Feast of the Circumcision of Our Lord (January 1) - commemorating the circumcision of Jesus eight days after His birth
- Traditional feast rankings (Double Major, etc.)
- Pre-Vatican II saint commemorations

### 2. `roman_1970` - Roman Calendar 1970 (Paul VI)
The reformed Roman calendar according to the post-Vatican II liturgical reforms implemented by Pope Paul VI.

**Key characteristics:**
- Solemnity of Mary, Mother of God replaces the Feast of the Circumcision (January 1) after Vatican II reforms
- Simplified rankings (Solemnity, Feast, Memorial)
- Some feast days moved or combined
- Focus on universal Church celebrations

### 3. `orthodox` - Orthodox Calendar
The Eastern Orthodox liturgical calendar, which follows different traditions and sometimes different dates due to the Julian calendar.

**Key characteristics:**
- Theophany (Baptism of Christ) on January 6
- Different emphasis on certain saints
- Unique Orthodox traditions and commemorations

### 4. `bonus` - Bonus Saints and Feasts
Additional saints, local patrons, and lesser-known holy men and women not always in the main calendars.

**Key characteristics:**
- Local and regional saints
- Saints from various religious orders
- Lesser-known martyrs and confessors
- Special commemorations

## Data Fields

### Required Fields

- **id** (string): Unique identifier for the saint entry
- **name** (string): Full name of the saint
- **feastDay** (string): Human-readable feast day (e.g., "December 31")
- **description** (string): Brief description of the saint
- **biography** (array of strings): Detailed biographical information in paragraphs
- **attributes** (array of strings): Symbols, objects, or representations associated with the saint
- **patronage** (array of strings): What the saint is patron of, or invoked for
- **image** (string): URL or path to saint's image (currently empty, ready for local images)

## Usage Examples

### Loading the Database

```typescript
import saintsData from './saints.json';

// Access a specific calendar
const tridentineCalendar = saintsData.calendars.tridentine_1960;

// Get saints for a specific date
const saintOfToday = tridentineCalendar.saints['12-31']; // December 31
```

### Getting Saint of the Day

```typescript
const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateKey = `${month}-${day}`;

const saintsToday = saintsData.calendars.tridentine_1960.saints[dateKey];
```

### Displaying Saint Information

```typescript
const saint = saintsData.calendars.tridentine_1960.saints['12-31'][0];

console.log(saint.name); // "Saint Sylvester I"
console.log(saint.feastDay); // "December 31"
console.log(saint.description); // Brief description
console.log(saint.biography.join('\n\n')); // Full biography
console.log('Patronage:', saint.patronage.join(', '));
console.log('Attributes:', saint.attributes.join(', '));
```

## Coverage

- **Total Calendars:** 4
- **Days Covered:** 366 (including February 29 for leap years)
- **Total Saint Entries:** 1,465+ across all calendars
- **Major Feasts:** All major Catholic and Orthodox feast days included

## Major Feast Days Include

- **Christmas** (December 25) - Nativity of Our Lord
- **Epiphany** (January 6, Western) / **Theophany** (January 6, Orthodox) - Manifestation of Christ to the Gentiles (Western) / Baptism of the Lord (Orthodox emphasis)
- **Easter** (moveable, not date-specific)
- **Assumption** (August 15)
- **All Saints** (November 1)
- **Immaculate Conception** (December 8)
- And many more...

## Notable Saints Included

Some of the major saints with detailed biographical information:

- Saint Sylvester I (December 31)
- Saint Basil the Great (January 2)
- Saint Agnes (January 21)
- Saint Patrick (March 17)
- Saint Joseph (March 19)
- Saint George (April 23)
- Saint Mark the Evangelist (April 25)
- Saint John the Baptist (June 24)
- Saints Peter and Paul (June 29)
- Saint Mary Magdalene (July 22)
- Saint Francis of Assisi (October 4)
- Saint Teresa of Avila (October 15)
- Saint Andrew (November 30)
- Saint Nicholas (December 6)
- And hundreds more...

## Image Field

The `image` field is currently empty (`""`) for all saints. This is intentional to allow you to:
- Add local image paths
- Add URLs to external image resources
- Keep the database lightweight without embedded images

Example of adding images:
```json
{
  "image": "/assets/saints/saint-sylvester.jpg"
}
```

or

```json
{
  "image": "https://example.com/saints/saint-sylvester.jpg"
}
```

## Patronage Examples

Saints are patrons of various causes, professions, and situations:

- **Saint Patrick:** Ireland, Engineers, Against snakes
- **Saint Sylvester I:** Stonemasons, Against plague
- **Saint Francis de Sales:** Writers, Journalists, Deaf people
- **Saint Joseph:** Universal Church, Fathers, Workers, Happy death
- **Saint Nicholas:** Children, Sailors, Students

## Attributes/Symbols

Each saint has traditional symbols used in religious art:

- **Saint Patrick:** Shamrock, Snakes, Crosier
- **Saint Peter:** Keys, Inverted cross
- **Saint Paul:** Sword, Book
- **Saint Agnes:** Lamb, Palm of martyrdom
- **Saint Nicholas:** Three gold balls, Children

## Contributing

To add or update saints:

1. Follow the existing JSON structure
2. Include all required fields
3. Provide detailed biography (3+ paragraphs recommended)
4. Research accurate patronage and attributes
5. Use standard date format (MM-DD)
6. Validate JSON before committing

## Data Sources

The saints database draws from:
- Roman Martyrology
- Orthodox Synaxarion
- Lives of the Saints by various hagiographers
- Catholic Encyclopedia
- Orthodox Church calendars
- Historical ecclesiastical documents

## License

This saints database is compiled for educational and religious purposes. Individual saint stories are based on historical Church documents and traditions.

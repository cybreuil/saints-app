# Saints Calendar

A minimalist React web app to browse the calendar of saints and view detailed profiles, powered by the saints-api backend.

## Features

- **View the saint of the day** - See which saint is celebrated today with their biography
- **Navigate the calendar** - Browse forward and backward through dates to discover saints
- **Interactive calendar view** - Visual monthly calendar showing all feast days
- **Search saints** - Find specific saints by name
- **Detailed profiles** - View comprehensive information about each saint including:
  - Biography and description
  - Feast day and important dates
  - Birth and death information
  - Patronage and symbols
  - Canonization details
- **Clean, responsive, modern interface** - Works beautifully on desktop and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- [saints-api](https://github.com/cybreuil/saints-api) backend running (default: `http://localhost:8080`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cybreuil/saints-app.git
cd saints-app
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure the API URL:
```bash
cp .env.example .env
# Edit .env to set VITE_API_URL if your backend is not on http://localhost:8080
```

## Running the App

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Configuration

The app connects to the saints-api backend. By default, it expects the API to be running at `http://localhost:8080/api`.

To configure a different API URL, create a `.env` file:

```env
VITE_API_URL=http://your-api-url:port/api
```

## Project Structure

```
saints-app/
├── src/
│   ├── components/        # React components
│   │   ├── Calendar.jsx   # Monthly calendar view
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Home.jsx       # Saint of the day view
│   │   ├── SaintDetail.jsx # Detailed saint profile
│   │   └── Search.jsx     # Search functionality
│   ├── services/          # API service layer
│   │   └── api.js         # API communication functions
│   ├── utils/             # Utility functions
│   │   └── dateUtils.js   # Date formatting helpers
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # App-level styles
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with dark/light mode support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Backend API

This app requires the [saints-api](https://github.com/cybreuil/saints-api) backend to be running. Please refer to that repository for backend setup instructions.


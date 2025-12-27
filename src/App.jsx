import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Search from './components/Search';
import SaintDetail from './components/SaintDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/search" element={<Search />} />
            <Route path="/saint/:id" element={<SaintDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

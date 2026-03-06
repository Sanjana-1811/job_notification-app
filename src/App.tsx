import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Proof from './pages/Proof';
import NotFound from './pages/NotFound';
import { ToastProvider } from './context/ToastContext';
import './index.css';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="layout-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Home Route (Landing) */}
              <Route path="/" element={<Landing />} />

              {/* Core Features */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/digest" element={<Digest />} />

              {/* Artifacts / Proof */}
              <Route path="/proof" element={<Proof />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;

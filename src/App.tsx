import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Group from './pages/Group';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 space-y-6">
        <h1 className="text-4xl font-bold mt-4">Tournament Dashboard</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element={<Group />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
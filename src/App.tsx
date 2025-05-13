import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Group from './pages/Group';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full text-gray-800">
        {/* <header className="w-full py-6 px-4 bg-white shadow mb-4">
          <h1 className="text-3xl font-bold text-center">Tournament Dashboard</h1>
        </header> */}

        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group/:id" element={<Group />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
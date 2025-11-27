import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveInspection from './pages/LiveInspection';
import ColorClustering from './pages/ColorClustering';
import DefectGallery from './pages/DefectGallery';
import RollReports from './pages/RollReports';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/live-inspection" element={<Layout><LiveInspection /></Layout>} />
        <Route path="/color-clustering" element={<Layout><ColorClustering /></Layout>} />
        <Route path="/defect-gallery" element={<Layout><DefectGallery /></Layout>} />
        <Route path="/roll-reports" element={<Layout><RollReports /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

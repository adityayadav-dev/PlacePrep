import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import Dashboard from './pages/Dashboard';
import AptitudeList from './pages/AptitudeList';
import AptitudeQuiz from './pages/AptitudeQuiz';
import AptitudeHistory from './pages/AptitudeHistory';
import CodingList from './pages/CodingList';
import CodingDetail from './pages/CodingDetail';
import InterviewList from './pages/InterviewList';
import InterviewDetail from './pages/InterviewDetail';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAptitude from './pages/admin/AdminAptitude';
import AdminCoding from './pages/admin/AdminCoding';
import AdminInterview from './pages/admin/AdminInterview';
import AdminResources from './pages/admin/AdminResources';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Student & Admin) */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aptitude" element={<AptitudeList />} />
            <Route path="/aptitude/quiz/:id" element={<AptitudeQuiz />} />
            <Route path="/aptitude/history" element={<AptitudeHistory />} />
            <Route path="/coding" element={<CodingList />} />
            <Route path="/coding/:id" element={<CodingDetail />} />
            <Route path="/interview" element={<InterviewList />} />
            <Route path="/interview/:id" element={<InterviewDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<MainLayout requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/aptitude" element={<AdminAptitude />} />
            <Route path="/admin/coding" element={<AdminCoding />} />
            <Route path="/admin/interview" element={<AdminInterview />} />
            <Route path="/admin/resources" element={<AdminResources />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

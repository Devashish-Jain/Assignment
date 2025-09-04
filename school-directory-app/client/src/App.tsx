// React import not needed in this file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import AddSchoolPage from './pages/AddSchoolPage';
import ShowSchoolsPage from './pages/ShowSchoolsPage';
import Navigation from './components/layout/Navigation';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  // Initialize smooth scrolling globally
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-dark-950 text-dark-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/schools" replace />} />
              <Route path="/schools" element={<ShowSchoolsPage />} />
              <Route path="/add-school" element={<AddSchoolPage />} />
              <Route path="*" element={<Navigate to="/schools" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

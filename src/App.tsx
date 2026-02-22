import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SkipLink from './components/ui/SkipLink';

// Lazy-load pages (bundle-dynamic-imports rule)
const HomePage = lazy(() => import('./pages/HomePage'));
const CarsPage = lazy(() => import('./pages/CarsPage'));
const CarDetailPage = lazy(() => import('./pages/CarDetailPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const EngineeringPage = lazy(() => import('./pages/EngineeringPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));

// Page loading spinner
const PageLoader = () => (
  <div style={{
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '2px solid rgba(201, 169, 110, 0.2)',
      borderTopColor: '#c9a96e',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Lazy-load global Particle background
const ParticlesCanvas = lazy(() => import('./components/ui/ParticlesCanvas'));

// Separate component needed to consume useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="page-wrapper"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<CarsPage />} />
            <Route path="/vehicles/:carId" element={<CarDetailPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/engineering" element={<EngineeringPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/checkout/success" element={
              <ProtectedRoute><CheckoutSuccessPage /></ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SkipLink />

      {/* Global Background Particles wrapped in their own Suspense boundary */}
      <Suspense fallback={null}>
        <ParticlesCanvas />
      </Suspense>

      <Navbar />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


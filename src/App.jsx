import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import ToastNotification from './components/ToastNotification';

import Home from './pages/Home';
import About from './pages/About';
import OurSeva from './pages/OurSeva';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import UserLogin from './user/UserLogin';
import UserDashboard from './user/UserDashboard';

import { GALLERY_ITEMS } from './data/content';

function App() {
  const [activePage, setActivePage] = useState('home');
  
  // Panel 1: Admin User State
  const [adminUser, setAdminUser] = useState(null);
  
  // Panel 2: Donor User State
  const [donorUser, setDonorUser] = useState(null);
  const [donorToken, setDonorToken] = useState(null);

  const [lightboxData, setLightboxData] = useState({ isOpen: false, item: null, index: 0 });
  const [toastMessage, setToastMessage] = useState('');

  // Restore sessions & handle exact URL paths on mount and route changes
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminUser');
    const adminToken = localStorage.getItem('adminToken');
    if (savedAdmin && adminToken) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
      } catch (e) {
        console.error('Error parsing admin session', e);
      }
    }

    const savedDonor = localStorage.getItem('donorUser');
    const dToken = localStorage.getItem('donorToken');
    if (savedDonor && dToken) {
      try {
        setDonorUser(JSON.parse(savedDonor));
        setDonorToken(dToken);
      } catch (e) {
        console.error('Error parsing donor session', e);
      }
    }

    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      const hasAdminToken = !!localStorage.getItem('adminToken');
      const hasDonorToken = !!localStorage.getItem('donorToken');

      // Exact Industrial Admin Portal Routes: /admin/login & /admin/dashboard
      if (path === '/admin/login' || path.includes('/admin/login') || hash.includes('#admin-login')) {
        if (hasAdminToken) {
          setActivePage('admin-dashboard');
        } else {
          setActivePage('admin-login');
        }
      } else if (path === '/admin' || path.includes('/admin') || hash.includes('#admin')) {
        if (hasAdminToken) {
          setActivePage('admin-dashboard');
        } else {
          setActivePage('admin-login');
        }
      } 
      // Exact Industrial User Portal Routes: /user/login & /user/dashboard
      else if (
        path === '/user/login' || 
        path.includes('/user/login') || 
        path === '/login' || 
        hash.includes('#user-login')
      ) {
        if (hasDonorToken) {
          setActivePage('user-dashboard');
        } else {
          setActivePage('user-login');
        }
      } else if (
        path === '/user/dashboard' || 
        path === '/user' || 
        path.includes('/user') || 
        path.includes('/dashboard') || 
        hash.includes('#dashboard')
      ) {
        if (hasDonorToken) {
          setActivePage('user-dashboard');
        } else {
          setActivePage('user-login');
        }
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Helper to change page and update browser address bar URL cleanly
  const handlePageChange = (pageId, pathUrl = null) => {
    setActivePage(pageId);
    if (pathUrl) {
      window.history.pushState({}, '', pathUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Panel 1: Admin Handlers
  const handleAdminLoginSuccess = (user) => {
    setAdminUser(user);
    handlePageChange('admin-dashboard', '/admin/dashboard');
    showToast(`Welcome back, ${user.role || 'Super Admin'}!`);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    handlePageChange('home', '/');
    showToast('Logged out of Admin Portal.');
  };

  // Panel 2: Donor Handlers
  const handleDonorLoginSuccess = (user, token) => {
    setDonorUser(user);
    setDonorToken(token);
    handlePageChange('user-dashboard', '/user/dashboard');
  };

  const handleDonorLogout = () => {
    localStorage.removeItem('donorToken');
    localStorage.removeItem('donorUser');
    setDonorUser(null);
    setDonorToken(null);
    handlePageChange('home', '/');
    showToast('Logged out of Donor Portal.');
  };

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Lightbox Handlers
  const handleOpenLightbox = (item, index = 0) => {
    setLightboxData({ isOpen: true, item, index });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, item: null, index: 0 });
  };

  const handleNextLightbox = () => {
    const nextIndex = (lightboxData.index + 1) % GALLERY_ITEMS.length;
    setLightboxData({
      isOpen: true,
      item: GALLERY_ITEMS[nextIndex],
      index: nextIndex,
    });
  };

  const handlePrevLightbox = () => {
    const prevIndex = (lightboxData.index - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxData({
      isOpen: true,
      item: GALLERY_ITEMS[prevIndex],
      index: prevIndex,
    });
  };

  // --- PANEL 1: ADMIN PORTAL (FULLSCREEN ROUTE) ---
  if (activePage === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToSite={() => handlePageChange('home', '/')}
      />
    );
  }

  if (activePage === 'admin-dashboard' || activePage === 'admin') {
    if (!adminUser && !localStorage.getItem('adminToken')) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToSite={() => handlePageChange('home', '/')}
        />
      );
    }
    return (
      <AdminDashboard
        currentUser={adminUser || { email: 'superadmin@gousevamaatraseva.com', role: 'Super Admin' }}
        onLogout={handleAdminLogout}
        onBackToSite={() => handlePageChange('home', '/')}
      />
    );
  }

  // --- PANEL 2: USER / DONOR LOGIN (FULLSCREEN ROUTE) ---
  if (activePage === 'user-login') {
    return (
      <UserLogin
        onLoginSuccess={handleDonorLoginSuccess}
        onBackToSite={() => handlePageChange('home', '/')}
        showToast={showToast}
      />
    );
  }

  // --- PUBLIC WEBSITE (WITH HEADER & FOOTER) ---
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917] font-sans selection:bg-[#E06D27]/20 selection:text-[#E06D27]">
      {/* Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={(p) => handlePageChange(p, p === 'home' ? '/' : `/${p}`)}
        onAdminClick={() => {
          if (adminUser || localStorage.getItem('adminToken')) {
            handlePageChange('admin-dashboard', '/admin/dashboard');
          } else {
            handlePageChange('admin-login', '/admin/login');
          }
        }}
        donorUser={donorUser}
        onDonorLoginClick={() => {
          if (donorUser || localStorage.getItem('donorToken')) {
            handlePageChange('user-dashboard', '/user/dashboard');
          } else {
            handlePageChange('user-login', '/user/login');
          }
        }}
        onDonorDashboardClick={() => handlePageChange('user-dashboard', '/user/dashboard')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <Home
            setActivePage={(p) => handlePageChange(p, `/${p}`)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'about' && (
          <About
            setActivePage={(p) => handlePageChange(p, `/${p}`)}
            onDonateClick={() => handlePageChange('donate', '/donate')}
          />
        )}

        {activePage === 'seva' && (
          <OurSeva
            setActivePage={(p) => handlePageChange(p, `/${p}`)}
            onDonateClick={() => handlePageChange('donate', '/donate')}
          />
        )}

        {activePage === 'gallery' && (
          <Gallery
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'donate' && (
          <Donate
            showToast={showToast}
          />
        )}

        {activePage === 'contact' && (
          <Contact
            showToast={showToast}
          />
        )}

        {activePage === 'user-dashboard' && (
          <UserDashboard
            donorUser={donorUser}
            donorToken={donorToken}
            onLogout={handleDonorLogout}
            onNavigateToDonate={() => handlePageChange('donate', '/donate')}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={(p) => handlePageChange(p, `/${p}`)}
        onAdminClick={() => {
          if (adminUser || localStorage.getItem('adminToken')) {
            handlePageChange('admin-dashboard', '/admin/dashboard');
          } else {
            handlePageChange('admin-login', '/admin/login');
          }
        }}
      />

      {/* Lightbox Modal */}
      {lightboxData.isOpen && (
        <LightboxModal
          item={lightboxData.item}
          onClose={handleCloseLightbox}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
          totalCount={GALLERY_ITEMS.length}
          currentIndex={lightboxData.index}
        />
      )}

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}

export default App;

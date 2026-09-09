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
import { GALLERY_ITEMS } from './data/content';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [lightboxData, setLightboxData] = useState({ isOpen: false, item: null, index: 0 });
  const [toastMessage, setToastMessage] = useState('');

  // Show Toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
  };

  // Close Toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Open Lightbox
  const handleOpenLightbox = (item, index = 0) => {
    setLightboxData({ isOpen: true, item, index });
  };

  // Close Lightbox
  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, item: null, index: 0 });
  };

  // Next image in lightbox
  const handleNextLightbox = () => {
    const nextIndex = (lightboxData.index + 1) % GALLERY_ITEMS.length;
    setLightboxData({
      isOpen: true,
      item: GALLERY_ITEMS[nextIndex],
      index: nextIndex,
    });
  };

  // Prev image in lightbox
  const handlePrevLightbox = () => {
    const prevIndex = (lightboxData.index - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxData({
      isOpen: true,
      item: GALLERY_ITEMS[prevIndex],
      index: prevIndex,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917] font-sans selection:bg-[#E06D27]/20 selection:text-[#E06D27]">
      {/* Sticky Top Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'about' && (
          <About
            setActivePage={setActivePage}
            onDonateClick={() => {
              setActivePage('donate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'seva' && (
          <OurSeva
            setActivePage={setActivePage}
            onDonateClick={() => {
              setActivePage('donate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
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

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Heart, CreditCard, Settings, HelpCircle, 
  Menu, LogOut, ChevronRight, ChevronDown
} from 'lucide-react';
import { SITE_INFO } from '../data/content';

import OverviewTab from './tabs/OverviewTab';
import UsersTab from './tabs/UsersTab';
import SevaCatalogTab from './tabs/SevaCatalogTab';
import PaymentsTab from './tabs/PaymentsTab';
import SettingsTab from './tabs/SettingsTab';
import HelpTab from './tabs/HelpTab';

const AdminDashboard = ({ currentUser, onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tabTitle, setTabTitle] = useState('Overview & Real-time Analytics');
  const [expandedSection, setExpandedSection] = useState('dashboard');
  
  // Sidebar collapsed state for desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Mobile drawer open state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // Profile dropdown open state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clean, Essential Industrial Admin Navigation Items
  const mainNavItems = [
    { id: 'dashboard', label: 'ANALYTICS OVERVIEW', icon: LayoutDashboard, title: 'Overview & Real-time Analytics' },
    { id: 'users', label: 'DONORS & USERS', icon: Users, title: 'Registered Mobile App Donors & Profiles' },
    { id: 'sevas', label: 'SEVA CATALOG', icon: Heart, title: 'Seva Packages & Preset Amounts' },
    { id: 'payments', label: 'RAZORPAY PAYMENTS', icon: CreditCard, title: 'Razorpay Gateway Orders & Webhooks' },
    { id: 'settings-nav', label: 'SETTINGS & KEYS', icon: Settings, title: 'Trust Settings & Gateway Credentials' },
    { id: 'help-nav', label: 'HELP & SUPPORT', icon: HelpCircle, title: 'Help & Documentation' },
  ];

  const handleNavClick = (navId, titleText) => {
    setExpandedSection(navId);
    setTabTitle(titleText);
    setMobileDrawerOpen(false);

    if (navId === 'dashboard') {
      setActiveTab('overview');
    } else if (navId === 'users') {
      setActiveTab('users');
    } else if (navId === 'sevas') {
      setActiveTab('sevas');
    } else if (navId === 'payments') {
      setActiveTab('payments');
    } else if (navId === 'settings-nav') {
      setActiveTab('settings');
    } else if (navId === 'help-nav') {
      setActiveTab('help');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1C1917] flex flex-col font-sans">
      
      <div className="flex flex-1 relative min-h-screen">
        
        {/* Mobile Backdrop */}
        {mobileDrawerOpen && (
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          ></div>
        )}

        {/* --- LEFT SIDEBAR --- */}
        <aside
          className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 bg-[#1E3F20] text-white flex flex-col justify-between transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64 sm:w-72'
          } ${
            mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } shadow-2xl h-screen overflow-y-auto shrink-0 select-none border-r border-[#2D5A30]`}
        >
          {/* Top Brand Header */}
          <div>
            <div className={`p-4 border-b border-[#2D5A30] flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs border border-[#D4AF37]/30">
                <img src={SITE_INFO.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>

              {!sidebarCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-extrabold text-base font-heading tracking-wide text-white leading-tight uppercase truncate">
                    Gouseva Maatra
                  </span>
                  <span className="text-[10px] font-semibold text-[#D4AF37] tracking-widest uppercase truncate">
                    Super Admin Control Panel
                  </span>
                </div>
              )}
            </div>

            {/* Main Navigation List */}
            <nav className="p-3 space-y-1.5 text-xs font-bold tracking-wider">
              {mainNavItems.map((item) => {
                const isActive = expandedSection === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, item.title)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-4 py-3'
                    } rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-extrabold border-l-4 border-[#D4AF37]'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-white/70'}`} />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!sidebarCollapsed && (
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'rotate-90 text-[#D4AF37]' : 'text-white/40'}`} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Branding */}
          <div className="p-4 border-t border-[#2D5A30] text-center text-xs text-white/60 font-medium">
            {!sidebarCollapsed && <span>Gouseva Admin v1.0.0</span>}
          </div>

        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          
          {/* TOP NAVBAR */}
          <header className="bg-white border-b border-gray-200 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
            
            {/* Left: Hamburger Toggle & Page Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Desktop Hamburger Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-xl text-[#1E3F20] hover:bg-[#1E3F20]/10 focus:outline-none transition-colors cursor-pointer border border-gray-200"
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                <Menu className="w-5 h-5 text-[#1E3F20]" />
              </button>

              {/* Mobile Drawer Hamburger Toggle */}
              <button
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                className="lg:hidden p-2 rounded-xl text-[#1E3F20] hover:bg-[#1E3F20]/10 focus:outline-none transition-colors cursor-pointer border border-gray-200"
              >
                <Menu className="w-5 h-5 text-[#1E3F20]" />
              </button>

              <h2 className="text-xl font-bold text-[#1E3F20] font-heading tracking-tight">
                {tabTitle}
              </h2>
            </div>

            {/* Right: Admin Profile Dropdown Pill */}
            <div className="relative" ref={dropdownRef}>
              
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-3 text-right cursor-pointer transition-colors focus:outline-none"
              >
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-[#1E3F20] leading-tight">
                    {currentUser?.email || 'superadmin@gousevamaatraseva.com'}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500">
                    {currentUser?.role || 'Super Admin'}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#1E3F20] text-[#D4AF37] flex items-center justify-center font-bold text-xs shadow-xs border border-[#D4AF37]/40">
                  SA
                </div>

                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2.5 border-b border-gray-100 space-y-0.5">
                    <p className="text-[11px] font-bold text-[#1E3F20]">Signed in as</p>
                    <p className="text-xs font-semibold text-gray-600 truncate">
                      {currentUser?.email || 'superadmin@gousevamaatraseva.com'}
                    </p>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </header>

          {/* MAIN DYNAMIC TAB CONTENT */}
          <main className="p-4 sm:p-8 flex-1">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'sevas' && <SevaCatalogTab />}
            {activeTab === 'payments' && <PaymentsTab />}
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'help' && <HelpTab />}
          </main>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

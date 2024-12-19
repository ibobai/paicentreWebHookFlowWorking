import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, Phone, User, CreditCard, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { LogoutConfirmationDialog } from '../auth/LogoutConfirmationDialog';
import toast from 'react-hot-toast';

export function Navbar() {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutConfirmation(false);
    toast.success(t('auth.logoutSuccess'));
    navigate('/login');
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0">
                <Logo />
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
                <NavLink href="/" icon={<Home size={18} />} current={location.pathname}>
                  {t('nav.home')}
                </NavLink>
                {isAuthenticated && (
                  <NavLink href="/payments" icon={<CreditCard size={18} />} current={location.pathname}>
                    {t('nav.payments')}
                  </NavLink>
                )}
                <NavLink href="/about" icon={<Info size={18} />} current={location.pathname}>
                  {t('nav.about')}
                </NavLink>
                <NavLink href="/contact" icon={<Phone size={18} />} current={location.pathname}>
                  {t('nav.contact')}
                </NavLink>
              </div>
            </div>
            
            {/* Desktop Right Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitch />
              {isAuthenticated && (
                <Link
                  to="/settings"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === '/settings'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <SettingsIcon className="h-5 w-5" />
                </Link>
              )}
              <button
                onClick={handleProfileClick}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/profile'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <User className="h-5 w-5" />
              </button>
              {isAuthenticated && (
                <button
                  onClick={handleLogoutClick}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                aria-expanded="false"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/" icon={<Home size={18} />} current={location.pathname} onClick={closeMenu}>
                {t('nav.home')}
              </MobileNavLink>
              {isAuthenticated && (
                <MobileNavLink href="/payments" icon={<CreditCard size={18} />} current={location.pathname} onClick={closeMenu}>
                  {t('nav.payments')}
                </MobileNavLink>
              )}
              <MobileNavLink href="/about" icon={<Info size={18} />} current={location.pathname} onClick={closeMenu}>
                {t('nav.about')}
              </MobileNavLink>
              <MobileNavLink href="/contact" icon={<Phone size={18} />} current={location.pathname} onClick={closeMenu}>
                {t('nav.contact')}
              </MobileNavLink>
              <div className="px-3 py-2">
                <LanguageSwitch />
              </div>
              {isAuthenticated && (
                <MobileNavLink href="/settings" icon={<SettingsIcon size={18} />} current={location.pathname} onClick={closeMenu}>
                  {t('nav.settings')}
                </MobileNavLink>
              )}
              <div
                onClick={() => {
                  handleProfileClick();
                  closeMenu();
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  location.pathname === '/profile'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                {t('nav.profile')}
              </div>
              {isAuthenticated && (
                <div
                  onClick={() => {
                    handleLogoutClick();
                    closeMenu();
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  {t('nav.logout')}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LogoutConfirmationDialog
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  current: string;
}

function NavLink({ href, icon, children, current }: NavLinkProps) {
  const isActive = current === href || 
    (href === '/' && current === '/') ||
    (href === '/profile' && current === '/profile');

  return (
    <Link
      to={href}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      } transition-colors`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, icon, children, current, onClick }: MobileNavLinkProps) {
  const isActive = current === href || 
    (href === '/' && current === '/') ||
    (href === '/profile' && current === '/profile');

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      } transition-colors`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}
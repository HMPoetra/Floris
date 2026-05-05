import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getWhatsAppLink } from '../utils/whatsapp';

/* =========================================================================
   PENGATURAN GAYA NAVBAR MOBILE
   -------------------------------------------------------------------------
   Ubah angka di bawah ini (1, 2, 3, atau 4) untuk langsung mengubah 
   desain Navbar di tampilan Mobile / HP!
   
   1 = Floating Pill (Kapsul mengambang di bawah)
   2 = Bottom App Bar (Gaya menu aplikasi native di bawah)
   3 = Blooming Menu (Layar penuh mekar dari tombol pita 🎀 di kanan atas)
   4 = Cloud Dropdown (Kotak awan gemas turun dari tombol ☁️ di kanan atas)
   5 = Classic (Gaya asli dengan garis tiga dan dropdown)
========================================================================= */
export const MOBILE_NAV_STYLE = 3;


const navLinks = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'About', href: '/about', icon: '✨' },
  { label: 'Katalog', href: '/catalog', icon: '💐' },
  { label: 'Kontak', href: '/contact', icon: '💌' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] shadow-sm transition-all duration-300" style={{ backgroundColor: '#f0e4d3' }}>
        <nav className={`max-w-7xl mx-auto px-6 h-16 flex items-center ${MOBILE_NAV_STYLE === 3 || MOBILE_NAV_STYLE === 4 || MOBILE_NAV_STYLE === 5 ? 'justify-between' : 'md:justify-between justify-center'
          }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Jalé Florist" className="h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav (Tetap sama untuk semua gaya) */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.href} className="group">
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 py-2"
                  >
                    <span
                      className={`text-2xl transition-all duration-300 transform ${isActive
                        ? 'opacity-100 scale-100 translate-x-0'
                        : 'opacity-0 scale-50 -translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0'
                        }`}
                    >
                      🌼
                    </span>
                    <span className="relative">
                      <span
                        className={`text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-rose-brand' : 'text-charcoal group-hover:text-rose-brand'
                          }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`absolute -bottom-1.5 left-0 right-0 h-[2px] bg-rose-brand transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* WA Button Desktop */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-rose-brand hover:bg-rose-dark text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pesan Sekarang
          </a>

          {/* Tombol Menu Mobile Khusus Gaya 3 & 4 */}
          {(MOBILE_NAV_STYLE === 3 || MOBILE_NAV_STYLE === 4) && (
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm transition-transform active:scale-95"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="text-xl">
                {menuOpen ? '✖️' : (MOBILE_NAV_STYLE === 3 ? '🎀' : '☁️')}
              </span>
            </button>
          )}

          {/* Tombol Menu Mobile Khusus Gaya 5 (Classic) */}
          {MOBILE_NAV_STYLE === 5 && (
            <button
              className="md:hidden p-2 rounded-md text-charcoal"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          )}
        </nav>

        {/* ========================================================= */}
        {/* STYLE 5: CLASSIC MENU (Gaya dropdown awal) */}
        {/* ========================================================= */}
        {MOBILE_NAV_STYLE === 5 && (
          <div className={`md:hidden transition-all duration-300 overflow-hidden backdrop-blur-md ${menuOpen ? 'max-h-64' : 'max-h-0'}`} style={{ backgroundColor: 'rgba(253, 246, 235, 0.98)' }}>
            <ul className="px-6 pb-4 pt-2 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-medium transition-colors ${isActive ? 'text-rose-brand' : 'text-charcoal hover:text-rose-brand'}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-rose-brand text-white text-sm font-medium px-5 py-2 rounded-full mt-2"
                >
                  Pesan Sekarang
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* STYLE 1: MOBILE FLOATING PILL (Kapsul Mengambang di Bawah) */}
      {/* ========================================================= */}
      {MOBILE_NAV_STYLE === 1 && (
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full px-2 py-2 flex items-center justify-between gap-1 w-[92%] max-w-[360px]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative flex items-center justify-center transition-all duration-500 rounded-full ${isActive ? 'bg-rose-50 px-4 py-2' : 'p-2 hover:bg-black/5'
                  }`}
              >
                <span className={`text-xl transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-md grayscale-0 opacity-100' : 'grayscale opacity-60 scale-90'}`}>
                  {link.icon}
                </span>
                <div className={`overflow-hidden transition-all duration-500 flex items-center ${isActive ? 'max-w-[80px] ml-2 opacity-100' : 'max-w-0 ml-0 opacity-0'}`}>
                  <span className="text-xs font-bold text-rose-brand whitespace-nowrap">
                    {link.label}
                  </span>
                </div>
              </Link>
            );
          })}
          {/* Pembatas untuk WA */}
          <div className="w-[1px] h-6 bg-gray-200 mx-1 rounded-full"></div>
          {/* WA Button Khusus Mobile Nav */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center p-2 rounded-full transition-colors group"
          >
            <span className="text-xl flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-sm transition-transform group-active:scale-95">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </a>
        </nav>
      )}

      {/* ========================================================= */}
      {/* STYLE 2: MOBILE APP BOTTOM BAR (Gaya Aplikasi Native) */}
      {/* ========================================================= */}
      {MOBILE_NAV_STYLE === 2 && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-2 flex items-center justify-between pb-safe">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href} className="relative flex flex-col items-center justify-center w-14 pt-3 pb-2">
                <span className={`text-2xl transition-all duration-500 z-10 ${isActive ? '-translate-y-5 scale-110 drop-shadow-md' : 'translate-y-0 grayscale opacity-50'}`}>
                  {link.icon}
                </span>
                <span className={`text-[10px] font-bold mt-1 transition-all duration-500 absolute bottom-1 ${isActive ? 'text-rose-brand opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                  {link.label}
                </span>
                {/* Gelembung Penanda Aktif */}
                <div className={`absolute top-0 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-50 to-pink-50 transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
              </Link>
            );
          })}
          {/* Pembatas */}
          <div className="w-[1px] h-8 bg-gray-100 mx-1"></div>
          {/* WA Icon */}
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="relative flex flex-col items-center justify-center w-14 pt-3 pb-2 group">
            <span className="text-2xl transition-all duration-500 z-10 translate-y-0 text-green-500 group-hover:-translate-y-5 group-hover:scale-110 drop-shadow-sm">
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            <span className="text-[10px] font-bold mt-1 text-green-600 transition-all duration-500 absolute bottom-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3">
              Chat
            </span>
          </a>
        </nav>
      )}

      {/* ========================================================= */}
      {/* STYLE 3: BLOOMING MENU (Layar Penuh Mekar dari Kanan Atas) */}
      {/* ========================================================= */}
      {MOBILE_NAV_STYLE === 3 && (
        <div className={`md:hidden fixed inset-0 z-50 pointer-events-none`}>
          {/* Latar Belakang Mekar */}
          <div
            className={`absolute top-4 right-6 w-12 h-12 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-full transition-transform duration-700 ease-in-out origin-center shadow-2xl ${menuOpen ? 'scale-[60]' : 'scale-0'}`}
          />
          {/* Isi Menu */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 delay-100 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <li key={link.href} className={`transition-all duration-700 ease-out ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <Link to={link.href} onClick={() => setMenuOpen(false)} className="group flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{link.icon}</span>
                    </div>
                    <span className="text-2xl font-display font-bold text-rose-brand">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STYLE 4: CLOUD DROPDOWN (Kotak Awan Turun dari Atas) */}
      {/* ========================================================= */}
      {MOBILE_NAV_STYLE === 4 && (
        <div className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-500 origin-top ${menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-10 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-[2.5rem] border border-white/60 p-6 relative overflow-hidden">
            {/* Dekorasi Awan di pojok */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl"></div>

            <ul className="flex flex-col gap-4 relative z-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link to={link.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-rose-50 border border-rose-100 scale-100' : 'bg-transparent border border-transparent active:scale-95'}`}>
                      <span className={`text-2xl flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-white shadow-sm' : ''}`}>{link.icon}</span>
                      <span className={`text-lg font-bold ${isActive ? 'text-rose-brand' : 'text-charcoal'}`}>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

    </>
  );
}

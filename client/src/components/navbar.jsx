import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { HiOutlineMenu } from 'react-icons/hi';

export default function Navbar() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const links = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/events', label: 'Events' },
    { href: '/resources', label: 'Resources' },
    { href: '/forums', label: 'Forums' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        {/* Logo + Name */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Pamoja" className="h-8 w-auto" />
        </a>

        {/* Theme Toggle
        <button onClick={toggleTheme} className="text-gray-800 dark:text-gray-200">
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button> */}

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="text-gray-800 dark:text-gray-200"
        >
          <HiOutlineMenu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <ul className="flex flex-col">
            {links.map(l => (
              <li key={l.href} className="border-b border-gray-200 dark:border-gray-700">
                <a
                  href={l.href}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </li>
            <li>
              <a
                href="/login"
                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/join"
                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Join Now
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Links */}
        <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Pamoja" className="h-8 w-auto" />
            </a>
          <ul className="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-green-500">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Search + Controls */}
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search"
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-white placeholder-white caret-white focus:outline-none focus:ring-2 focus:ring-blue-500 hidden lg:block"
          />
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 text-lg">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button className="text-gray-700 dark:text-gray-300 hover:text-blue-500 text-lg">
            <IoMdNotifications />
          </button>
          <a href="/login" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-500">
            <FaUser />
            <span className="hidden lg:inline text-sm">Login</span>
          </a>
          <a
            href="/join"
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green dark:hover:bg-green-900 transition"
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
}

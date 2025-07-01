import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faTable,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isWindowScrolled, setIsWindowScrolled] = useState(false);
  const [isHomeContentScrolled, setIsHomeContentScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mobileMenuItems = [
    { to: "/", icon: faHome, text: "Home" },
    { to: "/form", icon: faClipboardList, text: "Form Absensi" },
    { to: "/table", icon: faTable, text: "Laporan" },
  ];

  // Effect for window scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      setIsWindowScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Effect for Home.jsx content scroll
  useEffect(() => {
    if (location.pathname === "/") {
      const contentElement = document.getElementById(
        "homePageScrollableContent"
      );

      if (contentElement) {
        const handleHomeContentScroll = () => {
          setIsHomeContentScrolled(contentElement.scrollTop > 10);
        };

        contentElement.addEventListener("scroll", handleHomeContentScroll);
        return () => {
          contentElement.removeEventListener("scroll", handleHomeContentScroll);
          setIsHomeContentScrolled(false);
        };
      } else {
        setIsHomeContentScrolled(false);
      }
    } else {
      setIsHomeContentScrolled(false);
    }
  }, [location.pathname]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const applyTransparency = isWindowScrolled || isHomeContentScrolled;
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        applyTransparency
          ? "bg-white/80 backdrop-blur shadow-md"
          : "bg-white shadow-xl"
      } border-b-black border-1 rounded-bl-lg rounded-br-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">
              Absensi App
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div>
              <Link
                to="/"
                className="hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHome} />
                Home
              </Link>
            </div>
            <span className="text-gray-500">|</span>
            <div>
              <Link
                to="/form"
                className="hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faClipboardList} />
                Form Absensi
              </Link>
            </div>
            <span className="text-gray-500">|</span>
            <div>
              <Link
                to="/table"
                className="hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTable} />
                Laporan
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-4 py-3">
              {mobileMenuItems.map((item) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-indigo-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

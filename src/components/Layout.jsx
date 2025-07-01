import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { isLoading, setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex gap-1">
            <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
              <div className="w-1 h-6 bg-green-500"></div>
              <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-6 bg-green-500"></div>
            </div>
            <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.2s]">
              <div className="w-1 h-6 bg-red-500"></div>
              <div className="w-3 h-12 bg-red-500 rounded-sm"></div>
              <div className="w-1 h-6 bg-red-500"></div>
            </div>
            <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
              <div className="w-1 h-6 bg-green-500"></div>
              <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
              <div className="w-1 h-6 bg-green-500"></div>
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <main className="pt-20 px-4">{children}</main>
    </div>
  );
}

export default Layout;

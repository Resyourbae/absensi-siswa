import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios"; // Impor axios
import { Carousel } from "react-responsive-carousel";
import ClickSpark from "./ClickSpark";
// Import images dari assets
import komputer from "../assets/img/komputer.jpg";
import ibuki from "../assets/img/ibuki.gif";
import farmasi from "../assets/img/farmasi.jpg";
import analis from "../assets/img/analis.jpg";
import kelas1 from "../assets/img/kelas1.jpg";
import kelas2 from "../assets/img/kelas2.jpg";
import shiroko from "../assets/img/shiroko-dance.gif";
import skull from "../assets/img/skull.webp";
import pcKoding from "../assets/img/pcKoding.jpg";
import RotatingText from "./RotatingText";
import {
  faCode,
  faDatabase,
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
  faUser,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(timer);
    };
  }, []);

  const images = [
    {
      url: skull,
      title: "Web Absensi Siswa",
    },
    {
      url: kelas2,
      title: "Absensi Siswa",
    },
    {
      url: pcKoding,
      title: "Ngoding",
    },
  ];
  return (
    <ClickSpark
      sparkColor="#4F46E5"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      extraScale={1.2}
    >
      <div className="min-h-screen bg-gray-100">
        {/* Modals and Notifications with high z-index */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
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
        {!isOnline && (
          <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg z-[60]">
            <p className="text-red-500 font-medium">Jaringan tidak ada</p>
          </div>
        )}
        {/* Main content with adjusted positioning */}
        <div className="w-full min-h-screen">
          <div className="pt-16">
            {" "}
            {/* Space for navbar */}{" "}
            <div
              id="homePageScrollableContent"
              className="h-[calc(100vh-64px)] overflow-y-auto overscroll-none"
              style={{ scrollbarGutter: "stable" }}
            >
              {" "}
              {/* Scrollable area below navbar */}
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl/30 p-4 sm:p-8">
                  {" "}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        {" "}
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
                          Selamat Datang di
                        </h1>
                        <div className="relative min-h-[48px] flex items-center">
                          <RotatingText
                            texts={[
                              "SistemAbsensi",
                              "AbsensiDigital",
                              "ManajemenAbsen",
                              "Data,Real-time",
                            ]}
                            rotationInterval={3000}
                            staggerDuration={0.025}
                            mainClassName="text-2xl sm:text-4xl font-bold inline-flex"
                            splitLevelClassName="font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-full after:h-1 after:bg-indigo-400 after:transform after:-translate-x-1/2 after:rounded-full after:opacity-75"
                            elementLevelClassName=""
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 250,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Carousel Section */}
                    <div className="mb-8">
                      <Carousel
                        autoPlay
                        infiniteLoop
                        interval={3000}
                        showThumbs={false}
                        showStatus={false}
                        className="cursor-pointer"
                      >
                        {images.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className="h-[200px] sm:h-[300px]"
                          >
                            <img
                              src={image.url}
                              alt={image.title}
                              className="object-cover h-full w-full rounded-lg"
                            />
                            <p className="legend">{image.title}</p>
                          </div>
                        ))}
                      </Carousel>
                    </div>

                    <div className="space-y-4 text-left">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Fitur-fitur:
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Pencatatan absensi siswa secara digital</li>
                        <li>Manajemen data absensi yang mudah</li>
                        <li>Pencarian dan filter data absensi</li>
                        <li>Laporan absensi real-time</li>
                      </ul>
                    </div>
                  </div>
                  {/* button Github */}
                  <div className="flex justify-center mt-8">
                    <a
                      href="https://github.com/Resyourbae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 mx-auto max-w-52 whitespace-pre md:flex group relative justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
                    >
                      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 438.549 438.549"
                        >
                          <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
                        </svg>
                        <span className="ml-1 text-white">Dev GitHub</span>
                      </div>
                      <div className="ml-2 flex items-center gap-1 text-sm md:flex">
                        <svg
                          className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                          data-slot="icon"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span className="inline-block tabular-nums tracking-wider font-display font-medium text-white">
                          6
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <br />
                <hr className="bg-gray-600" />

                {/* Cards section */}
                <h1 className="text-2xl sm:text-3xl text-black text-center font-mono">
                  Jurusan:
                </h1>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  <div className="bg-white rounded-xl shadow-xl/30 overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={komputer}
                      alt="PPLG"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        PPLG
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Program keahlian yang mempelajari pemrograman,
                        pengembangan aplikasi, dan pembuatan game.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl/30 overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={analis}
                      alt="Analis Kimia"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Analis Kimia
                      </h3>
                      <p className="text-gray-600 mt-2 text-shadow-2xs">
                        Program keahlian yang fokus pada analisis bahan kimia
                        dan pengujian laboratorium.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-xl/30 overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={farmasi}
                      alt="Farmasi"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Farmasi
                      </h3>
                      <p className="text-gray-600 mt-2 text-shadow-2xs">
                        Program keahlian yang mempelajari tentang obat-obatan
                        dan pelayanan farmasi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technology Cards Section */}
                <div className="mt-12 sm:mt-16 mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                    Teknologi yang Digunakan
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                    {/* React Card */}
                    <div className="bg-white w-[300px] rounded-[30px] shadow-xl/30 border-1 border-b-black flex flex-col justify-center hover:shadow-lg min-h-[280px] items-start relative group">
                      <div className="m-5">
                        <div className="w-12 h-12 flex items-center justify-center absolute inset-x-0 top-0 ml-6 mt-6">
                          <FontAwesomeIcon
                            icon={faCode}
                            className="text-3xl text-blue-500"
                          />
                        </div>
                        <div className="mt-4 text-left w-full mb-3">
                          <h2 className="text-2xl font-mono text-gray-800">
                            React JS
                          </h2>
                          <p className="mt-2 text-sm text-gray-500">
                            Framework JavaScript modern untuk membangun
                            antarmuka pengguna yang interaktif dan responsif
                            dengan pendekatan component-based.
                          </p>
                        </div>
                        <a
                          href="https://react.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="bg-gray-300 w-10 h-10 rounded-full absolute bottom-0 left-0 m-4 flex justify-center items-center hover:ring-4 ring-gray-200 transition duration-700 ease-in-out">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0D1117"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Firebase Card */}
                    <div className="bg-white w-[300px] rounded-[30px] shadow-xl/30 border-1 border-b-black flex flex-col justify-center hover:shadow-lg min-h-[280px] items-start relative group">
                      <div className="m-5">
                        <div className="w-12 h-12 flex items-center justify-center absolute inset-x-0 top-0 ml-6 mt-6">
                          <FontAwesomeIcon
                            icon={faDatabase}
                            className="text-3xl text-yellow-500"
                          />
                        </div>
                        <div className="mt-4 text-left w-full mb-3">
                          <h2 className="text-2xl font-mono text-gray-800">
                            Firebase
                          </h2>
                          <p className="mt-2 text-sm text-gray-500">
                            Platform pengembangan aplikasi yang menyediakan
                            database realtime, autentikasi, dan layanan hosting
                            dalam satu platform terintegrasi.
                          </p>
                        </div>
                        <a
                          href="https://firebase.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="bg-gray-300 w-10 h-10 rounded-full absolute bottom-0 left-0 m-4 flex justify-center items-center hover:ring-4 ring-gray-200 transition duration-700 ease-in-out">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#0D1117"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Google Maps Section */}
                <div className="container mx-auto px-4 py-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                    Lokasi Kami
                  </h2>
                  <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-xl/30">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.784965251676!2d106.74542387498701!3d-6.551390464016768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4c478c593f5%3A0x6b8d234a9b5f5f40!2sSekolah%20Menengah%20Kejuruan%20Negeri%201%20Bogor!5e0!3m2!1sen!2sid!4v1717646698188!5m2!1sen!2sid"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Location"
                    ></iframe>
                  </div>
                </div>
              </div>
              {/* Footer with Comment Section */}
              <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Form Section */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="mr-3 text-blue-500"
                        />
                        Beri Masukan
                      </h3>
                      <form className="space-y-5">
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="absolute left-3 top-3.5 text-gray-400"
                          />
                          <input
                            type="text"
                            placeholder="Nama"
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-700/60 border border-gray-600 text-white text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="absolute left-3 top-3.5 text-gray-400"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-700/60 border border-gray-600 text-white text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faGlobe}
                            className="absolute left-3 top-3.5 text-gray-400"
                          />
                          <textarea
                            placeholder="Komentar"
                            rows="4"
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-700/60 border border-gray-600 text-white text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 rounded-xl shadow-lg"
                        >
                          Kirim
                        </button>
                      </form>
                    </div>

                    {/* Kontak */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="mr-2 text-blue-400"
                        />
                        Kontak
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-2">
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faEnvelope} />
                          resyaanggara98@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faEnvelope} />
                          azzamfaik009@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faPhone} />
                          (+62) 821-1402-8613
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faPhone} />
                          (+62) 859-3026-6131
                        </li>
                      </ul>
                    </div>

                    {/* Lokasi & Media Sosial */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-4 flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-2 text-blue-400"
                          />
                          Lokasi
                        </h4>
                        <div className="text-sm text-gray-400 leading-relaxed">
                          <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} />
                            Jl. Solehiskandar
                          </p>
                          <p className="ml-6">Bogor, JawaBarat, Indonesia</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-4 flex items-center">
                          <FontAwesomeIcon
                            icon={faGlobe}
                            className="mr-2 text-blue-400"
                          />
                          Media Sosial
                        </h4>
                        <div className="flex space-x-4 text-lg">
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <FontAwesomeIcon icon={faFacebook} />
                          </a>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Bottom */}
                  <div className="text-center mt-12 text-sm text-gray-500 border-t border-gray-700 pt-6">
                    <p>&copy; 2025-2026 App Absensi. Version 1.0.0</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
        {/* Image modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}{" "}
      </div>
    </ClickSpark>
  );
}

export default Home;

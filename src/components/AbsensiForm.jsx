// Import React hooks dan library eksternal
import { useState, useEffect } from "react";
import axios from "axios"; // Untuk melakukan request HTTP
import Navbar from "./Navbar"; // Komponen Navbar (navigasi atas)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faClipboardList,
  faCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

// Komponen utama untuk form absensi
function AbsensiForm() {
  // State untuk menyimpan input user
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");

  // State untuk menampilkan modal sukses
  const [showModal, setShowModal] = useState(false);

  // State untuk menyimpan error validasi form
  const [errors, setErrors] = useState({});

  // State untuk menampilkan loading screen saat pertama dibuka
  const [isLoading, setIsLoading] = useState(true);

  // useEffect ini dijalankan hanya sekali saat komponen pertama kali dimount
  // Gunanya untuk menampilkan animasi loading selama 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Setelah 2 detik, loading dimatikan
    }, 2000);
    return () => clearTimeout(timer); // Clear timeout saat komponen unmount
  }, []);

  // Fungsi untuk validasi form sebelum dikirim
  const validateForm = () => {
    const newErrors = {};
    if (!nama) newErrors.nama = "Nama is required"; // Cek nama kosong
    if (!tanggal) newErrors.tanggal = "Tanggal is required"; // Cek tanggal kosong
    if (!keterangan) newErrors.keterangan = "Keterangan is required"; // Cek keterangan kosong

    setErrors(newErrors); // Set error state
    return Object.keys(newErrors).length === 0; // True kalau tidak ada error
  };

  // Fungsi untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refresh halaman

    // Cek validasi form
    if (!validateForm()) return;

    try {
      // Kirim data ke server menggunakan axios POST
      await axios.post("http://localhost:3000/absensi", {
        nama,
        tanggal,
        keterangan,
      });

      // Tampilkan modal sukses
      setShowModal(true);

      // Reset form
      setNama("");
      setTanggal("");
      setKeterangan("");
      setErrors({});

      // Modal otomatis hilang setelah 2 detik
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      // Tampilkan alert jika error saat mengirim data
      alert("Gagal mengirim data!");
    }
  };

  return (
    // Container utama dengan padding top untuk navbar fixed
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Navbar */}
      <Navbar />

      {/* Loading Screen saat isLoading true */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex gap-1">
            {/* Animasi loading bar */}
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

      {/* Modal sukses saat data berhasil disimpan */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 transform transition-all ease-in-out duration-300">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                {/* Icon centang sukses */}
                <svg
                  className="h-8 w-8 text-green-600 animate-[check_0.3s_ease-in-out]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Data Berhasil Tersimpan!
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Container form */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="w-[32rem] aspect-[4/3] p-8 bg-white rounded-lg shadow-xl/30 my-12">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Form{" "}
              <span className="px-3 py-1.5 bg-blue-700 rounded-full text-amber-50">
                Absensi
              </span>
            </h1>

            {/* Form Absensi */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 px-4 max-w-md mx-auto"
            >
              {/* Input Nama */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama"
                  className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {/* Error validasi nama */}
                {errors.nama && (
                  <p className="mt-2 text-sm text-red-600">{errors.nama}</p>
                )}
              </div>

              {/* Input Tanggal */}
              <div>
                <label
                  htmlFor="tanggal"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  Tanggal
                </label>
                <input
                  type="date"
                  id="tanggal"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {/* Error validasi tanggal */}
                {errors.tanggal && (
                  <p className="mt-2 text-sm text-red-600">{errors.tanggal}</p>
                )}
              </div>

              {/* Input Keterangan */}
              <div>
                <label
                  htmlFor="keterangan"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  Keterangan
                </label>
                <select
                  id="keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Pilih Keterangan</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Tanpa Keterangan">Tanpa Keterangan</option>
                </select>
                {/* Error validasi keterangan */}
                {errors.keterangan && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.keterangan}
                  </p>
                )}
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsensiForm;

import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faFileExcel, // Changed from faFileExport to faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

function AbsensiTable() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    nama: "",
    tanggal: "",
    keterangan: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/absensi");
        setData(response.data);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/absensi/${id}`);
      setData(data.filter((item) => item.id !== id));
      setShowDeleteModal(false);
      setSuccessMessage("Data berhasil dihapus!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditData({
      nama: item.nama,
      tanggal: item.tanggal,
      keterangan: item.keterangan,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/absensi/${editId}`, editData);
      setData(
        data.map((item) =>
          item.id === editId ? { ...item, ...editData } : item
        )
      );
      setEditId(null);
      setEditData({ nama: "", tanggal: "", keterangan: "" });
      setSuccessMessage("Data berhasil diperbarui!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // Format data for export
    const exportData = data.map((item, index) => ({
      No: index + 1,
      Nama: item.nama,
      Tanggal: item.tanggal,
      Keterangan: item.keterangan,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataFile = new Blob([excelBuffer], { type: fileType });

    // Download file
    const fileName =
      "Data_Absensi_" + new Date().toLocaleDateString() + fileExtension;
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(dataFile);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Loading Modal */}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-black mb-4">
              Apakah anda yakin ingin menghapus data ini?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-100 rounded-md text-gray-900 hover:text-white hover:bg-green-500"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 transform transition-all duration-300 ease-out animate-modal-popup">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
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
              <p className="text-lg font-medium text-gray-900">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">Data Absensi</h2>
            <button
              onClick={exportToExcel}
              className="group relative bg-fixed inline-flex items-center px-5 py-2.5 rounded-md bg-gradient-to-r
               from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:from-green-600
               hover:to-emerald-700 transition-all duration-200 ease-in-out hover:shadow-xl 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon
                icon={faFileExcel}
                className="mr-2 text-lg group-hover:scale-110 transition-transform"
              />
              <span className="relative">
                Export Excel
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
              </span>
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider w-16 border-r border-gray-600 first:rounded-tl-lg">
                    No
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider w-1/4 border-r border-gray-600">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider w-1/4 border-r border-gray-600">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider w-1/4 border-r border-gray-600">
                    Keterangan
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider last:rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((d, index) => (
                  <tr
                    key={d.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index === data.length - 1
                        ? "last:children:first:rounded-bl-lg last:children:last:rounded-br-lg"
                        : ""
                    }`}
                  >
                    {editId === d.id ? (
                      <>
                        <td className="px-6 py-4 text-center text-sm text-gray-900 border-r">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center border-r">
                          <input
                            type="text"
                            value={editData.nama}
                            onChange={(e) =>
                              setEditData({ ...editData, nama: e.target.value })
                            }
                            className="w-full border rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-center border-r">
                          <input
                            type="date"
                            value={editData.tanggal}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                tanggal: e.target.value,
                              })
                            }
                            className="w-full border rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-center border-r">
                          <select
                            value={editData.keterangan}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                keterangan: e.target.value,
                              })
                            }
                            className="w-full border rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Pilih Keterangan</option>
                            <option value="Hadir">Hadir</option>
                            <option value="Izin">Izin</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Tanpa Keterangan">
                              Tanpa Keterangan
                            </option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={handleUpdate}
                            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-center text-sm text-gray-900 border-r">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900 border-r">
                          {d.nama}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900 border-r">
                          {d.tanggal}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900 border-r">
                          {d.keterangan}
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(d)}
                            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(d.id);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsensiTable;

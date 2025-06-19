import { useState,useEffect } from "react";
import axios from "axios";
import { ClockLoader } from "react-spinners";

export default function Field() {

    // State untuk data
    const [mapel, setMapel] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState("");
    const [isOpenUbah, setIsOpenUbah] = useState(false);
    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [loading, setLoading] = useState(false);


    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_FIELD);
                setMapel(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // tambah field
    const [mapelin, setMapelin] = useState('');

    const validateForm = () => {
        return mapelin;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {mapelin};


        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDFIELD,data);
            setMapelin('');
            if (response.status === 200 || response.status === 201) {
                window.alert('Mapel berhasil ditambahkan.');
                closeModal()
            }
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    // Toggle form/modal ubah
    const toggleFormUbah = (item) => {
        setSelectedItem(item);
        setIsOpenUbah(true);
    };
    const toggleFormTambah = () => {
        setIsOpenTambah(true)
    }
    const closeModal = () => {
        setIsOpenTambah(false);
        setIsOpenUbah(false)
        setSelectedItem(null);
        setValue("");
    };

    const ubah = async () => {
        setLoading(true);
        try {
            const updatedItem = { ...selectedItem };
    
            const response = await axios.put(
                `${import.meta.env.VITE_API_UPDATEFIELD}/${updatedItem.id}`,
                updatedItem
            );
    
            if (response.status === 200 || response.status === 201) {
                window.alert('Perubahan berhasil disimpan.');
                const updatedField = mapel.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                setLoading(false);
                setMapel(updatedField);
                closeModal(); // Menutup modal setelah sukses
            } else {
                window.alert('Gagal menyimpan perubahan.');
            }
        } catch (error) {
            console.error('Error saat menyimpan perubahan:', error);
            window.alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };

    const validateFormUbah = () => {
        return (
            selectedItem.mapel?.trim()
        );
    };

    // hapus kriteria
    const handleDelete = async (item) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETEFIELD}/${item.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
    
                // Hapus item yang dipilih dari state kriteria
                const updatedField = mapel.filter(k => k.id !== item.id);
                setLoading(false);
                setMapel(updatedField);
            }

        } catch (error) {
            alert('Gagal menghapus data')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-100 rounded-md">

                    <div className="flex items-center mb-4 rounded bg-blue-600 p-4">
                        <div className="p-2">
                            <svg className="w-16 h-16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1011 3.05618L10.427 0.239701H10.367C10.1273 0.0799004 9.84769 0 9.52809 0C9.20849 0 8.90886 0.0799004 8.62921 0.239701L0.898876 4.79401C0.619226 4.95381 0.399501 5.17353 0.2397 5.45318C0.0799001 5.73284 0 6.01249 0 6.29214V11.3258C0 11.6454 0.0799001 11.9451 0.2397 12.2247C0.399501 12.5044 0.619226 12.7041 0.898876 12.824L5.57303 15.5805C5.85268 15.7403 6.15231 15.8202 6.47191 15.8202C6.79151 15.8202 7.09114 15.7403 7.37079 15.5805L15.1011 11.0861C15.3808 10.9263 15.6005 10.7066 15.7603 10.427C15.9201 10.1473 16 9.84769 16 9.52809V4.55431C16 4.23471 15.9201 3.95506 15.7603 3.71536C15.6005 3.43571 15.3808 3.21598 15.1011 3.05618ZM2.21723 5.75281L9.40824 1.55805C9.48814 1.5181 9.56804 1.5181 9.64794 1.55805L13.7228 3.95506L6.59176 8.08989C6.51186 8.16979 6.43196 8.16979 6.35206 8.08989L2.21723 5.75281ZM5.69288 13.9625L1.61798 11.5655C1.53808 11.5256 1.49813 11.4457 1.49813 11.3258V7.01124L5.69288 9.46817V13.9625ZM7.25094 9.46817L7.37079 9.40824L14.5019 5.27341V9.58802C14.5019 9.66792 14.4419 9.72784 14.3221 9.76779L7.25094 13.9625V9.46817Z" fill="#ffffff"></path> </g></svg>
                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-white">Mata Pelajaran</h1>
                            <h3 className="text-gray-50">Pembelajaran yang berisi topik atau bidang studi seperti MM, B. Indo, dll. Setiap mapel bertujuan untuk mengembangkan pengetahuan, keterampilan, dan sikap siswa sesuai dengan kompetensi yang telah ditetapkan dalam kurikulum.</h3>
                            <button className="bg-gray-800 text-white text-sm p-2 mt-2 rounded hover:bg-gray-700 transition" onClick={toggleFormTambah}>Tambah Data</button>
                        </div>
                    </div>

                    {loading ? (
                                <div className="flex items-center justify-center">
                                    <ClockLoader/>
                                </div>
                            ):(
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1">No.</th>
                                    <th scope="col" className="px-6 py-3">Mata Pelajaran</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                mapel.length > 0 ? (
                                    mapel.map((item, index) => (
                                        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4 w-1">{index + 1}</td>
                                            <td className="px-6 py-4">{item.mapel}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFormUbah(item)}
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Ubah
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item)}
                                                    className="font-medium text-red-600 hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">Tidak ada data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>

                {isOpenUbah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Mapel</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Mapel
                                </label>
                                <input
                                    type="text"
                                    name="mapel"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Mapel"
                                    value={selectedItem.mapel}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, mapel: e.target.value })
                                    }
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                  onClick={ubah}
                                    type="button"
                                    disabled={!validateFormUbah()}
                                    className={`px-4 py-2 rounded-md text-white ${
                                        validateFormUbah()
                                            ? "bg-blue-600 hover:bg-blue-700"
                                            : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    Ubah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                {isOpenTambah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Tambah Mapel</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Mapel
                                </label>
                                <input
                                    value={mapelin}
                                    type="text"
                                    name="mapelin"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Mata Pelajaran"
                                    onChange={(e) => setMapelin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                   onClick={handleAdd}
                                   type="button"
                                   disabled={!validateForm()}
                                   className={`px-4 py-2 rounded-md text-white ${
                                       validateForm()
                                           ? "bg-blue-600 hover:bg-blue-700"
                                           : "bg-gray-300 cursor-not-allowed"
                                   }`}
                                >
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}

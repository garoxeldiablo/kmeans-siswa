import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClockLoader } from "react-spinners";

export default function Dataset() {

    const [isOpenTambah, setIsOpenTambah] = useState(false);
    const [isOpenUbah, setIsOpenUbah] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dataSet,setDataSet] = useState([])
    const [loading, setLoading] = useState(false);

    //  / Toggle form/modal ubah
    const toggleFormUbah = (alternatif) => {
        setSelectedItem(alternatif);
        setIsOpenUbah(true);
    };
    const toggleFormTambah = () => {
        setIsOpenTambah(true)
    }
    const closeModal = () => {
        setIsOpenTambah(false);
        setIsOpenUbah(false)
        setSelectedItem(null);
    };

    // API
    // GET DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_DATASET);
                setDataSet(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // tambah dataset
    const [nis, setNis] = useState('');
    const [nama, setNama] = useState('');
    const [kelamin, setKelamin] = useState('');
    const [kelas, setKelas] = useState('');
    const [error, setError] = useState(false)

    const validateForm = () => {
        // Validasi: Semua state harus terisi dan valid
        return nis.trim() && nama.trim() && kelamin && kelas.trim();
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            nis,
            nama,
            kelamin,
            kelas,
        };

        if (!validateForm()) {
            setError(true);
            return;
        }
        setError(false);
    
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDDATASET, data);
            setNis('');
            setNama('');
            setKelamin('');
            setKelas('');
            if (response.status === 200 || response.status === 201) {
                setLoading(false);
                window.alert('Data berhasil ditambahkan.');
                closeModal()
            }
            window.location.reload();
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    const validateFormUbah = () => {
        return (
            selectedItem.nama?.trim() &&
            selectedItem.kelamin?.trim() &&
            selectedItem.kelas?.trim()
        );
    };
    
    const handleUpdate = async () => {
        try {
            const updatedItem = { ...selectedItem };
    
            const response = await axios.put(
                `${import.meta.env.VITE_API_UPDATEDATASET}/${updatedItem.id}`,
                updatedItem
            );
    
            if (response.status === 200 || response.status === 201) {
                window.alert('Perubahan berhasil disimpan.');
                const updateData = dataSet.map((dataset) =>
                    dataset.id === updatedItem.id ? updatedItem : dataset
                );
                setLoading(false);
                setDataSet(updateData);
                closeModal(); // Menutup modal setelah sukses
            } else {
                window.alert('Gagal menyimpan perubahan.');
            }
        } catch (error) {
            console.error('Error saat menyimpan perubahan:', error);
            window.alert('Terjadi kesalahan saat menyimpan perubahan.');
        }
    };

    // hapus alternatif
    const handleDelete = async (item) => {
        setLoading(true);
        try {
            // Kirim permintaan DELETE untuk item yang dipilih
            const response = await axios.delete(`${import.meta.env.VITE_API_DELETEDATASET}/${item.id}`);
    
            // Periksa status dari respons
            if (response.status === 200) {
                window.alert(response.data.message);
                // Hapus item yang dipilih dari state kriteria
                const updateData = dataSet.filter(k => k.id !== item.id);
                setDataSet(updateData);
                setLoading(false);
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat menghapus data.', error);
        }
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">

                    <div className="flex items-center mb-4 rounded bg-blue-600 p-4">
                        <div className="p-2">
                        <svg className="w-16 h-16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M702.537143 218.477714c31.085714-10.825143 55.003429-23.113143 69.924571-35.328 10.24-8.338286 13.458286-13.824 13.458286-16.018285s-3.218286-7.68-13.458286-16.091429c-14.921143-12.141714-38.765714-24.429714-69.924571-35.254857C634.368 92.16 540.013714 78.336 438.857143 78.336s-195.510857 13.897143-263.68 37.449143c-31.085714 10.825143-55.003429 23.113143-69.924572 35.328-10.24 8.338286-13.458286 13.750857-13.458285 16.018286 0 2.194286 3.218286 7.68 13.458285 16.091428 14.921143 12.141714 38.765714 24.429714 69.924572 35.254857 68.169143 23.625143 162.523429 37.449143 263.68 37.449143s195.510857-13.897143 263.68-37.449143zM69.485714 464.749714v128.804572c37.961143 40.009143 140.068571 88.722286 264.777143 103.277714 182.857143 21.284571 355.986286-18.651429 473.526857-98.304l0.438857-131.657143C683.008 540.525714 506.733714 571.465143 328.484571 550.619429c-110.372571-12.8-204.361143-46.08-259.072-85.869715z m0-80.457143c38.034286 39.936 140.068571 88.649143 264.777143 103.131429 183.222857 21.357714 356.717714-18.724571 474.258286-98.742857l0.512-145.993143C734.208 286.573714 596.48 315.977143 438.857143 315.977143c-156.964571 0-294.253714-29.257143-369.152-72.777143A132116.333714 132116.333714 0 0 0 69.485714 384.219429z m0.146286 289.865143l0.292571 108.105143-1.097142-7.460571c22.381714 74.020571 165.302857 133.485714 378.148571 133.485714 115.931429 0 206.774857-17.554286 276.626286-52.077714 19.602286-9.728 34.523429-17.92 49.152-28.598857 9.728-7.094857 16.091429-11.410286 26.550857-20.626286 10.825143-9.581714 27.501714-7.241143 37.156571 3.657143 9.581714 10.752 10.825143 28.306286 0 37.961143-11.702857 10.24-17.188571 14.848-28.598857 23.186285-17.042286 12.434286-36.425143 25.380571-58.806857 36.498286-77.092571 38.107429-155.648 60.854857-302.08 60.854857-243.931429 0-405.211429-77.165714-436.077714-179.2l-1.097143-3.657143v-3.803428L9.362286 628.077714a116682.532571 116682.532571 0 0 1 0.365714-455.68 52.662857 52.662857 0 0 1-0.292571-5.266285C9.508571 84.918857 201.728 18.285714 438.857143 18.285714c237.129143 0 429.348571 66.633143 429.348571 148.845715a53.028571 53.028571 0 0 1-0.804571 9.581714 23.405714 23.405714 0 0 1 1.024 7.094857l-1.682286 520.411429c-0.073143 14.482286-13.385143 26.185143-29.769143 26.112-16.384 0-29.622857-11.776-29.549714-26.331429v-27.355429c-125.074286 73.216-301.056 104.082286-478.939429 83.382858-110.226286-12.873143-204.214857-46.08-258.925714-85.869715z m668.525714-290.962285a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.380571 26.038857-25.380571 14.336 0 26.038857 11.337143 26.038857 25.380571 0 14.116571-11.702857 25.453714-26.038857 25.453715z m0 209.408a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453715z m0 212.114285a25.746286 25.746286 0 0 1-25.965714-25.526857c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453714z" fill="#ffffff"></path></g></svg>

                        </div>
                        <div className="p-2">
                            <h1 className="text-3xl font-semibold text-white">Data Siswa</h1>
                            <h3 className="text-gray-50">DATA SISWA SD NEGERI 064987 Jalan SM. Raja KM. 5,5, Kelurahan Harjosari I, Medan Amplas, Kota Medan, Sumatera Utara 20147 </h3>
                            <button className="bg-gray-800 text-white text-sm p-2 mt-2 rounded hover:bg-gray-700 transition" onClick={toggleFormTambah}>Tambah Data</button>
                        </div>
                    </div>

                    {loading ? (
                                <div className="flex items-center justify-center">
                                    <ClockLoader/>
                                </div>
                            ) : (
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">NO</th>
                                    <th scope="col" className="px-6 py-3">NIS</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Kelamin</th>
                                    <th scope="col" className="px-6 py-3">Kelas</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSet.length > 0 ? (
                                dataSet.map((dataset, index) => (
                                    <tr key={dataset.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{dataset.nis}</td>
                                        <td className="px-6 py-4">{dataset.nama}</td>
                                        <td className="px-6 py-4">{dataset.kelamin}</td>
                                        <td className="px-6 py-4">{dataset.kelas}</td>
                                        <td class="px-6 py-4 space-x-2">
                                            <button onClick={() => toggleFormUbah(dataset)} type="button" class="font-medium text-blue-600 hover:underline">Ubah</button>
                                            <button type="button" onClick={()=> handleDelete(dataset)} class="font-medium text-red-600 hover:underline">Hapus</button>
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

                {isOpenTambah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Tambah Data</h2>
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
                                    NIS
                                </label>
                                <input
                                    type="text"
                                    name="nis"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setNis(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Nama Lengkap Calon"
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelamin
                                </label>
                                <select
                                    name="kelamin"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    onChange={(e) => setKelamin(e.target.value)}
                                    required
                                >
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="Laki Laki">Laki Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelas
                                </label>
                                <input
                                    type="text"
                                    name="kelas"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan alamat"
                                    onChange={(e) => setKelas(e.target.value)}
                                    required
                                />
                            </div>


                            <p className="text-red-500 text-sm">* Isi semua data sebelum menambah</p>

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
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                {isOpenUbah && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6 space-y-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Ubah Data</h2>
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
                                    NIS
                                </label>
                                <input
                                    type="text"
                                    name="nis"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.nis}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, nis: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan Nama Lengkap Calon"
                                    value={selectedItem.nama}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, nama: e.target.value })
                                    }
                                    
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelamin
                                </label>
                                <select
                                    name="kelamin"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    value={selectedItem.kelamin}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, kelamin: e.target.value })
                                    }
                                    
                                >
                                    <option value="Laki Laki">Laki Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Kelas
                                </label>
                                <input
                                    type="text"
                                    name="kelas"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    placeholder="Masukkan kelas"
                                    value={selectedItem.kelas}
                                    onChange={(e) =>
                                        setSelectedItem({ ...selectedItem, kelas: e.target.value })
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
                                    onClick={handleUpdate}
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
            </div>
        </>
    );
}

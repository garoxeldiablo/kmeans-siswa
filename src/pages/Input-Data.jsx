import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function InputData() {
    const { siswa_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { nama, nis } = location.state || {};

    console.log("Siswa ID:", siswa_id);

    const [mapel, setMapel] = useState([]);
    const [inputNilai, setInputNilai] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchField = async () => {
            setLoading(true);
            try {
                const fieldRes = await axios.get(import.meta.env.VITE_API_FIELD);
                setMapel(fieldRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchField();
    }, []);

    const handleInputChange = (mapel_id, value) => {
        setInputNilai((prev) => ({ ...prev, [mapel_id]: value}));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = Object.entries(inputNilai).map(([mapel_id, nilai]) => ({
            siswa_id : parseInt(siswa_id),
            mapel_id : parseInt(mapel_id),
            nilai
        }));
        try {
            await axios.post(import.meta.env.VITE_API_INPUTNILAI, data);
            alert("Data berhasil diperbarui.");
            setLoading(false);
            navigate("/persiapandata");
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    };
    
    return (
        <>
        {loading ? (
            <div className="flex items-center justify-center p-40">
                <RingLoader/>
            </div>
        ) : (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-700">
                    Mohon beri penilaian secara objektif dan jujur.
                    </p>
                </div>
                <h1 className="text-xl font-semibold text-gray-700">
                    Input Nilai Siswa: {nama || "Tidak Diketahui"}
                </h1>
                <p className="text-gray-500">NIS : {nis}</p>
                {mapel.length > 0 ? (  
                    <form onSubmit={handleAdd} className="space-y-4">
                    {mapel.map((k) => (
                        <div key={k.id}>
                            <label className="block text-gray-700 font-medium mb-1">
                                {k.mapel}
                            </label>
                                <input
                                    type="number"
                                    value={inputNilai[k.id] || ""}
                                    onChange={(e) => handleInputChange(k.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={() => navigate("/persiapandata")}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                    </form>):(
                        <p className="text-gray-500">Tidak ada kriteria yang tersedia.</p>
                    )}
            </div>
        </div>)}
    </>
    );
}

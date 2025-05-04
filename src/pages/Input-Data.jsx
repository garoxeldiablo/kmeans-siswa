import { useParams, useLocation, useNavigate } from "react-router-dom";
import Infouser from "../components/info-user";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function InputData() {
    const { dataset_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { nama, nis } = location.state || {};

    const [field, setField] = useState([]);
    const [inputNilai, setInputNilai] = useState({});

    const [loading, setLoading] = useState(false);

    console.log(dataset_id)

    useEffect(() => {
        const fetchField = async () => {
            setLoading(true);
            try {
                const fieldRes = await axios.get(import.meta.env.VITE_API_FIELD);
                setField(fieldRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchField();
    }, []);

    const handleInputChange = (field_id, value) => {
        setInputNilai((prev) => ({ ...prev, [field_id]: value}));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = Object.entries(inputNilai).map(([field_id, nilai]) => ({
            dataset_id : parseInt(dataset_id),
            field_id : parseInt(field_id),
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
                <Infouser />
                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-700">
                    Mohon beri penilaian alternatif secara objektif dan jujur.
                    </p>
                </div>
                <h1 className="text-xl font-semibold text-gray-700">
                    Penilaian Kandidat: {nama || "Tidak Diketahui"}
                </h1>
                <p className="text-gray-500">Kode Alternatif: {nis}</p>
                {field.length > 0 ? (  
                    <form onSubmit={handleAdd} className="space-y-4">
                    {field.map((k) => (
                        <div key={k.id}>
                            <label className="block text-gray-700 font-medium mb-1">
                                {k.field}
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

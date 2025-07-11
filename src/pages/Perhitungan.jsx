import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";

export default function Perhitungan(){

    const navigate = useNavigate()

    const [selectedCentroids, setSelectedCentroids] = useState([]);
    const [mapel, setMapel] = useState([])
    const [dataset, setDataset] = useState([])

    const [loading, setLoading] = useState(false)

    const toggleCentroidSelection = (id) => {
        setSelectedCentroids(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };



    // API
    // GET DATA

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [mapelRes, datasetRes, dataNilaiRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_FIELD),
                    axios.get(import.meta.env.VITE_API_DATASET),
                    axios.get(import.meta.env.VITE_API_DATANILAI),
                ]);

                const dataMapel = mapelRes.data;
                const dataDataset = datasetRes.data;
                const dataNilai = dataNilaiRes.data;
    
                // Gabungkan penilaian ke alternatif
                const datasetWithNilai = dataDataset.map((item) => {
                    const nilai = dataMapel.map((k) => {
                        // Cari nilai berdasarkan alternatif_id dan kriteria_id
                        const matchedNilai = dataNilai.find(
                            (p) => p.siswa_id === item.id && p.mapel_id === k.id
                        );
                        return matchedNilai ? matchedNilai.nilai : '-';
                    });
                    return { ...item, nilai }; // Tambahkan nilai ke setiap alternatif
                });

                setMapel(dataMapel);
                setDataset(datasetWithNilai);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);
    
    return(
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="flex items-center mb-4 rounded bg-blue-600 p-4">
                    <div className="p-2">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 100 100" viewBox="0 0 100 100" id="Websitelike">
                            <path d="M92.6 60H74.4l1.6-2c6-8 4-16 4.4-19.2 0-3-2.4-5.4-5.2-5.4-2.2 0-4 1.4-4.8 3.2-1.8 3.4-3.4 13.6-14 18.8L55 56c.2 1 0-1.2 0 37.4 0 .2 0 .2 0 .2 6.4 1.6 10 2.8 16 2.8h14.6c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6H88c2.4 0 4.4-2 4.4-4.6S90.4 78 88 78h2.4c2.4 0 4.4-2 4.4-4.6s-2-4.6-4.4-4.6h2c2.4 0 4.4-2 4.4-4.6C97 62 95 60 92.6 60zM47.2 97.4c2.2 0 4-1.8 4-4V57c0-2.2-1.8-4-4-4h-9.4c-3.2 0-6 2.6-6 6v32.4c0 3.4 2.8 6 6 6H47.2z" fill="#ffffff" class="color000000 svgShape"></path>
                            <path d="M12.8 70.2h14.8V58.8c0-5.6 4.4-10 10-10H47c2.6 0 5 1.4 6.4 3.4l1-.4c9-4.4 10.2-13.2 12-16.6 1.2-2.6 3.2-4.6 5.8-5.4H3v30.6C3 65.8 7.4 70.2 12.8 70.2zM91.6 56V29.8H77.8c3.8 1.2 6.4 4.8 6.4 9-.2 3.8 1 9.6-2.6 17.2H91.6zM91.6 12.4c0-5.4-4.4-9.8-9.8-9.8h-69C7.4 2.6 3 7 3 12.4v13.4h88.6V12.4zM47 17.8H14.8c-1.2 0-2-1-2-2s.8-2 2-2h32.4c1.2 0 2 1 2 2S48.2 17.8 47 17.8zM60.4 17.8h-3.8c-1 0-2-1-2-2s1-2 2-2h3.8c1 0 2 1 2 2S61.4 17.8 60.4 17.8zM70.2 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2h3.8c1.2 0 2 1 2 2S71.2 17.8 70.2 17.8zM80 17.8h-3.8c-1.2 0-2-1-2-2s.8-2 2-2H80c1 0 2 1 2 2S81 17.8 80 17.8z" fill="#ffffff" class="color000000 svgShape"></path>
                        </svg>
                    </div>
                    <div className="p-2">
                        <h1 className="text-3xl font-semibold text-white">Data Nilai Siswa</h1>
                        <h3 className="text-white">Pastikan input data terisi keseluruhan dan sesuai.</h3>
                    </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-screen">
                            <RingLoader/>
                        </div>
                    ):(
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">No</th>
                                    <th className="px-6 py-3">Nomor Induk</th>
                                    <th className="px-6 py-3">Nama</th>
                                    {mapel.length > 0 ? (
                                        mapel.map((item) => (
                                            <th key={item.id} className="px-6 py-3">{item.mapel}</th>
                                        ))
                                    ) : (
                                        <th colSpan="6" className="text-center py-4">Tidak ada data</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                            {dataset.length > 0 ? (
                                dataset.map((item, index) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedCentroids.includes(item.id)}
                                                onChange={() => toggleCentroidSelection(item.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.nis}</td>
                                        <td className="px-6 py-4">{item.nama}</td>
                                        {item.nilai.map((n, index) => (
                                            <td key={index} className="px-6 py-4">
                                                {n}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={mapel.length + 3} className="px-6 py-4 text-center">
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                            </tbody>

                        </table>

                        <div className="flex space-x-2 justify-end m-2">
                            <button
                                onClick={() => navigate("/perhitungan/kmeans")}
                                className="bg-gray-800 text-white text-sm p-2 rounded transition hover:bg-gray-700"
                            >
                                Proses Data Tanpa Centroid
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedCentroids.length === 0) {
                                        alert("Pilih minimal 1 centroid awal");
                                        return;
                                    }
                                    navigate("/perhitungan/kmeans", {
                                        state: { centroids: selectedCentroids }
                                    });
                                }}
                                className="bg-blue-600 text-white text-sm p-2 rounded transition hover:bg-blue-500"
                            >
                                Proses dengan Centroid Awal
                            </button>
                        </div>

                    </div>
                    )}
                </div>
            </div>
        </>
    )
}
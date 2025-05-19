import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Clustering() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [k, setK] = useState(3);
  const [centroidInput, setCentroidInput] = useState("");

  const location = useLocation();
  const centroids = location.state?.centroids || [];
  useEffect(() => {
  if (centroids.length > 0) {
    setCentroidInput(centroids.join(","));
  }
}, [centroids]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const centroid_ids = centroidInput
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    try {
      const res = await axios.post(import.meta.env.VITE_API_CLUSTERING,{
        k,
        centroid_ids,
        });
      setResult(res.data);
    } catch (err) {
      console.error("Gagal mengambil data clustering:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Hasil Clustering</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block mb-1">Jumlah Cluster (k):</label>
            <input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
              className="border p-2 rounded w-full"
              min={1}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Centroid Awal (ID siswa, pisahkan dengan koma):</label>
            <input
              type="text"
              value={centroidInput}
              onChange={(e) => setCentroidInput(e.target.value)}
              placeholder="Contoh: 1,3,5"
              className="border p-2 rounded w-full"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Proses Clustering
          </button>
        </form>

        {loading && <p>Memproses clustering...</p>}

        {result && (
          <div>
            <p className="mb-2 text-gray-700">
              <strong>Jumlah Iterasi:</strong> {result.jumlah_iterasi}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Jumlah Cluster:</strong> {result.jumlah_cluster}
            </p>

            {result.final_centroids && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-800">Centroid Akhir</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(result.final_centroids, null, 2)}
                </pre>
              </div>
            )}

            {result.hasil_pengelompokan.map((cluster, idx) => (
            <div key={idx} className="mb-6">
                <h3 className="font-bold text-md text-blue-700 mb-2">Cluster C{idx + 1}</h3>
                <div className="relative overflow-x-auto sm:rounded-lg border">
                <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">No</th>
                        <th className="px-6 py-3">Nama</th>
                        {result.mapel_labels?.map((label, i) => (
                        <th key={i} className="px-6 py-3">{label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {cluster.map((item, i) => (
                        <tr key={i} className="odd:bg-white even:bg-gray-50 border-b">
                        <td className="px-6 py-4">C{idx + 1}</td>
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4">{item.nama}</td>
                        {item.nilai_mapel.map((nilai, j) => (
                            <td key={j} className="px-6 py-4">{nilai}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

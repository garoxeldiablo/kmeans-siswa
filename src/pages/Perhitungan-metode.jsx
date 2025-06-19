import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";
import { ReferenceLine } from "recharts";

export default function Clustering() {
  const [scatterData, setScatterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [k, setK] = useState(3);
  const [centroidInput, setCentroidInput] = useState("");
  const [xMapelIndex, setXMapelIndex] = useState(0);
  const [yMapelIndex, setYMapelIndex] = useState(1);
  const [centroidPoints, setCentroidPoints] = useState([]);

  const location = useLocation();
  const centroids = location.state?.centroids || [];
      useEffect(() => {
      if (centroids.length > 0) {
        setCentroidInput(centroids.join(","));
      }
    }, [centroids]);

      // visualisasi
      useEffect(() => {
      if (!result) return;

      const updatedScatterData = result.hasil_pengelompokan.map((cluster, clusterIdx) =>
        cluster.map((item) => ({
          x: item.nilai_mapel[xMapelIndex],
          y: item.nilai_mapel[yMapelIndex],
          nama: item.nama,
          cluster: `Cluster ${clusterIdx + 1}`,
        }))
      );

      const updatedCentroidPoints = result.final_centroids.map((c, idx) => ({
        x: c[xMapelIndex],
        y: c[yMapelIndex],
        cluster: `Centroid ${idx + 1}`,
      }));

      setScatterData(updatedScatterData.flat());
      setCentroidPoints(updatedCentroidPoints);
    }, [xMapelIndex, yMapelIndex, result]);


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

    // handle cetak
    const printRef = useRef();
    const handleCetak = async () => {
    if (result && result.hasil_pengelompokan && result.hasil_pengelompokan.length > 0) {
      const element = printRef.current;

      const canvas = await html2canvas(element, {
        scale: 2, // resolusi lebih tinggi
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Halaman pertama
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Tambahkan halaman jika tidak cukup
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("hasil-clustering.pdf");
    } else {
      alert("Tidak ada data yang dapat dicetak.");
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
          <div ref={printRef} class="p-4 border-2 border-gray-200 border-dashed rounded-lg bg-white">
            <div className="mt-10">
            <div className="text-center">
              <h1 className="text-center text-4xl font-semibold text-gray-700">DATA MINING K-MEANS CLUSTERING</h1>
              <h2 className="text-center text-xl text-gray-600">"KLASTERISASI TINGKAT PEMAHAMAN SISWA TERHADAP MATA PELAJARAN"</h2>
              <h3 className="text-center text-lg text-gray-500">Dicetak : {new Date().toLocaleString()}</h3>
            </div>

            <div className="flex justify-center space-x-2">
                <p className="mb-2 text-gray-700">
                  <strong>Jumlah Iterasi:</strong> {result.jumlah_iterasi}
                </p>
                <p className="mb-4 text-gray-700">
                  <strong>Jumlah Cluster:</strong> {result.jumlah_cluster}
                </p>
            </div>

            {result.final_centroids && (
              <div className="mb-6">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Centroid Akhir</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-gray-800 border border-gray-300 text-lg">
                    <tbody>
                      {result.final_centroids.map((centroid, clusterIdx) => (
                        <tr key={clusterIdx}>
                          <td className="px-4 py-2 border font-semibold text-center">Cluster {clusterIdx + 1}</td>
                          {centroid.map((val, idx) => (
                            <td key={idx} className="px-4 py-2 border text-center">{val.toFixed(2)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {scatterData.length > 0 && (
              <div className="my-6 p-4 bg-white shadow rounded">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Visualisasi Cluster Plot</h3>
                <ResponsiveContainer width="100%" height={result.mapel_labels.length * 60}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 100 }}>
                    <CartesianGrid />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={[70, 100]}
                      label={{ value: result?.mapel_labels[xMapelIndex], position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      domain={[70, 100]}
                      label={{ value: result?.mapel_labels[yMapelIndex], angle: -90, position: "insideLeft" }}
                    />
                    {centroidPoints.map((c, idx) => (
                      <React.Fragment key={idx}>
                        <ReferenceLine x={c.x} stroke="#000" strokeDasharray="3 3" />
                        <ReferenceLine y={c.y} stroke="#000" strokeDasharray="3 3" />
                      </React.Fragment>
                    ))}
                    <Scatter
                      name="Centroid"
                      data={centroidPoints}
                      fill="#000000"
                      shape="star"
                      legendType="star"
                    />  
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm">
                              <p><strong>{data.nama}</strong></p>
                              <p>{result?.mapel_labels[xMapelIndex]}: {data.x}</p>
                              <p>{result?.mapel_labels[yMapelIndex]}: {data.y}</p>
                              <p>{data.cluster}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    {[...new Set(scatterData.map(d => d.cluster))].map((cluster, idx) => (
                      <Scatter
                        key={cluster}
                        name={cluster}
                        data={scatterData.filter(d => d.cluster === cluster)}
                        fill={["#EF4444", "#10B981", "#3B82F6", "#F59E0B"][idx % 4]}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">X Axis</label>
                <select
                  value={xMapelIndex}
                  onChange={(e) => setXMapelIndex(parseInt(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                >
                  {result?.mapel_labels.map((label, i) => (
                    <option key={i} value={i}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Y Axis</label>
                <select
                  value={yMapelIndex}
                  onChange={(e) => setYMapelIndex(parseInt(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                >
                  {result?.mapel_labels.map((label, i) => (
                    <option key={i} value={i}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Data Hasil Klasterisasi</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded text-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="border px-3 py-2">No.</th>
                      <th className="border px-3 py-2">Nama</th>
                      {result.final_centroids.map((_, idx) => (
                        <th key={idx} className="border px-3 py-2 text-center">Jarak ke C{idx + 1}</th>
                      ))}
                      <th className="border px-3 py-2 text-center">Cluster</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.hasil_pengelompokan
                      .flatMap((cluster, clusterIdx) =>
                        cluster.map((item, i) => {
                          const distances = result.final_centroids.map(centroid =>
                            Math.sqrt(
                              centroid.reduce(
                                (sum, val, idx) => sum + Math.pow(val - item.nilai_mapel[idx], 2),
                                0
                              )
                            )
                          );
                          const minDistance = Math.min(...distances);

                          return {
                            nama: item.nama,
                            cluster: clusterIdx + 1,
                            distances,
                            minDistance
                          };
                        })
                      )
                      .sort((a, b) => a.nama.localeCompare(b.nama)) 
                      .map((row, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="border px-3 py-2 text-center">{idx + 1}</td>
                          <td className="border px-3 py-2">{row.nama}</td>
                          {row.distances.map((d, i) => (
                            <td
                              key={i}
                              className={`border px-3 py-2 text-center ${
                                d === row.minDistance ? 'bg-green-200 font-semibold' : ''
                              }`}
                            >
                              {d.toFixed(4)}
                            </td>
                          ))}
                          <td className="border px-3 py-2 text-center font-bold text-green-600">
                            {row.cluster}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        )}
        <div className="flex justify-end m-2">
            <button
                type="button"
                onClick={handleCetak}
                className="bg-gray-800 text-white text-sm px-4 py-1 rounded transition hover:bg-gray-700"
            >
            Cetak
            </button>
        </div>
      </div>
    </div>
  );
}

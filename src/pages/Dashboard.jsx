import axios from "axios";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

import ds1 from "../assets/ds1.jpg";
import ds2 from "../assets/ds2.jpg";
import ds3 from "../assets/ds3.jpg";


export default function Dashboard(){

    const [dataset, setDataset] = useState("");
    const [field, setField] = useState("");
    const [dataNilai, setDataNilai] = useState("");

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Fungsi async untuk memanggil API
        const fetchData = async () => {
            setLoading(true);
            try {
                const [fieldRes, datasetRes, dataNilaiRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_FIELD),
                    axios.get(import.meta.env.VITE_API_DATASET),
                    axios.get(import.meta.env.VITE_API_DATANILAI),
                ]);

                // Update state dengan jumlah data
                setField(fieldRes.data.length);
                setDataset(datasetRes.data.length);
                setDataNilai(dataNilaiRes.data.length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Panggil fungsi fetchData
        fetchData();
    }, []); // Hanya dijalankan sekali saat komponen dimuat

    return(
      <>
        <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-100 rounded-md">
            
            <div class="flex items-center mb-4 rounded bg-blue-600 p-4">
                <div className="p-2">
                <svg className="w-7 h-7" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M15.023,15.023 c1.57-1.57,4.102-1.559,5.66,0c1.566,1.57,1.582,4.105,0.012,5.664c-1.559,1.566-4.078,1.582-5.633,0.023l-0.035-0.031 C13.469,19.121,13.469,16.586,15.023,15.023z M8.102,32c0-2.211,1.77-4,3.977-4h0.043c2.207,0,4,1.789,4,4s-1.793,4-4,4 C9.91,36,8.102,34.211,8.102,32z M20.711,48.93l-0.027,0.039c-1.566,1.555-4.094,1.559-5.66,0.008 c-1.57-1.574-1.555-4.105,0.004-5.664c1.566-1.562,4.105-1.578,5.66-0.012C22.258,44.859,22.266,47.375,20.711,48.93z M36,32 c0,2.211-1.789,4-4,4s-4-1.789-4-4V12c0-2.211,1.789-4,4-4s4,1.789,4,4V32z M43.285,15.059l0.031-0.031 c1.559-1.559,4.094-1.562,5.656,0c1.566,1.566,1.559,4.098,0,5.656c-1.566,1.566-4.105,1.578-5.668,0.012 C41.742,19.133,41.727,16.617,43.285,15.059z M48.977,48.977c-1.574,1.566-4.102,1.551-5.66-0.008 c-1.566-1.562-1.582-4.109-0.02-5.664c1.566-1.566,4.078-1.578,5.637-0.02l0.039,0.027C50.523,44.875,50.531,47.406,48.977,48.977z M52,36c-2.211,0-4.02-1.789-4.02-4s1.77-4,3.977-4H52c2.207,0,4,1.789,4,4S54.207,36,52,36z"></path> </g></svg>
                </div>
                <div className="p-2">
                    <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
                    <h3 className="text-gray-50">Dashboard adalah tampilan visual yang menyajikan data penting secara ringkas dan interaktif untuk membantu pemantauan, analisis, dan pengambilan keputusan. Biasanya digunakan dalam bisnis, teknologi, dan sistem manajemen.</h3>
                </div>
            </div>

            <div class="space-y-4 mb-4">

            <div className="relative flex items-center justify-between rounded bg-cover bg-center p-4" style={{ backgroundImage: `url(${ds1})` }}>                    
                <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Mata Pelajaran
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{field}</h1>
                        )}
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-center p-4" style={{ backgroundImage: `url(${ds2})` }}>
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Data Siswa
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{dataset}</h1>
                        )}
                    </div>
                </div>

                <div class="relative flex items-center justify-between rounded bg-cover bg-center p-4" style={{ backgroundImage: `url(${ds3})` }}>
                    <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-black/30 rounded"></div>
                        <div class="relative z-10">
                        <p class="text-lg text-gray-200">
                            Data Nilai
                        </p>
                        {loading ? (
                            <div class="flex itemsc-center justify-center">
                                <RingLoader/>
                            </div>
                        ):(
                            <h1 class="text-4xl font-bold text-white">{dataNilai}</h1>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
      </>
    )
  }
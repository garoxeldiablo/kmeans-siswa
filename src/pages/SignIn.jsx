import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../utility/reducers";
import { useState } from "react";
import axios from "axios";
import { ClockLoader } from "react-spinners";

import image from "../assets/gmb1.jpg";
import logo from "../assets/logo.png";

export default function Signin(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Contoh request ke server API (misalnya, menggunakan fetch atau axios)
        try {
            const response = await axios.post(import.meta.env.VITE_API_AUTH, {
              username,
              password,
            });
          
            // Jika login berhasil
            if (response.status === 200) {

              // Dispatch ke Redux store (hanya data yang dibutuhkan)
              dispatch(
                login({
                    id: response.data.userId,
                    nama: response.data.name,
                    token: response.data.accessToken,
                    jabatan: response.data.jabatan,
                })
              );
            }
            setLoading(false);
            navigate('/dashboard')
          } catch (e) {
            if (e.response && (e.response.status === 400 || e.response.status === 404)) {
              // Jika username atau password salah, tampilkan alert
              window.alert("Username atau password salah.");
              setLoading(false);
            } else {
              // Tangani error lain
              console.log("Terjadi kesalahan", e);
            }
          }
    }
    return(
        <>
            {loading ? ( 
            <div className="flex items-center justify-center h-screen">
                <ClockLoader/>
            </div> ) : (
            <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 40%), url(${image})`}}>
             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
             <div className='w-full max-w-md mx-auto bg-gray-300/70 backdrop-blur-sm p-6 rounded-lg flex flex-col space-y-2'>
                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 <img
                 alt="Your Company"
                 src={logo}
                 className="mx-auto h-10 w-auto"
                 />
                 <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
                 Sistem Klasterisasi Siswa
                 </h2>
                 <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                 Login
                 </h2>
                 </div>
   
                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                     <form className="space-y-6">
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                             Username
                         </label>
                         <div className="mt-2">
                         <input
                             onChange={(e) => setUsername(e.target.value)}
                             id="username"
                             name="username"
                             type="text"
                             required
                             autoComplete="username"
                             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                         />
                         </div>
                     </div>
         
                     <div>
                         <div className="flex items-center justify-between">
                         <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                             Password
                         </label>
                         </div>
                         <div className="mt-2">
                         <input
                             onChange={(e)=> setPassword(e.target.value)}
                             id="password"
                             name="password"
                             type="password"
                             required
                             autoComplete="current-password"
                             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                         />
                         </div>
                     </div>
         
                     <div>
                         <button
                         onClick={handleLogin} type="button"
                         className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transform ease-in-out duration-300"
                         >
                         Login
                         </button>
                     </div>
                     </form>
         
                     <p className="mt-10 text-center text-gray-800">
                      Hubungi <strong>Super Admin</strong> jika anda lupa password atau user baru.
                     </p>
                 </div>
             </div>
         </div>
         </div>
            )}
        </>
    )
}
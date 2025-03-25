import { useNavigate } from "react-router-dom";
// import logo from "../assets/Logo Atas.png";
import image from "../assets/gmb1.jpg";

export default function Home(){
    const navigate = useNavigate();

    return(
        <>
            <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 40%), url(${image})`}}>
                <div className="mx-auto max-w-7xl h-screen px-6 pb-24 pt-10 sm:pb-32 lg:flex items-center lg:px-8 lg:py-12">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
                        
                        <div className="w-full mx-auto bg-gray-300/50 backdrop-blur-sm p-6 rounded-lg flex flex-col space-y-2">

                            <img
                                className="h-11"
                                src=''
                                alt="Your Company"
                            />
                        
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
                                Analisis Siswa
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-700">
                                Analisis terhadap nilai siswa dapat dilakukan secara otomatis untuk memberikan gambaran mengenai pola pemahaman mereka, sehingga strategi pembelajaran dapat disesuaikan dengan lebih efektif.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <button
                                onClick={()=>navigate('/signin')}
                                className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-150 ease-in-out"
                                >
                                Mulai Menganalisa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

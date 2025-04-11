import { useSelector } from 'react-redux'
import logouser from '/src/assets/profile2.png'

export default function Infouser(){
    const user = useSelector((state) => state.nama)
    const role = useSelector((state) => state.jabatan)
    return(
        <>
            <div class="flex items-center justify-between mb-4 rounded">
                <div>
                    <img src={logouser} alt="prf" />
                </div>
                <div>
                    <h1 class="text-xl font-semibold text-gray-50">
                        Hai, {user}
                    </h1>
                    <p className="text-gray-100 italic">{role}</p>
                </div>
            </div>
        </>
    )
}
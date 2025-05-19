import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logocg from "/src/assets/Logo Atas.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utility/reducers";
import Infouser from "./info-user";

export default function Sidenav() {
  // kondisi fitur role
  const role = useSelector((state) => state.jabatan);
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan path saat ini

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fungsi untuk menutup sidebar dari dalam
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Menyembunyikan sidenav di halaman tertentu
  if (location.pathname === '/' || location.pathname === '/signin') {
    return null;
  }

  // Fungsi untuk mengecek apakah path saat ini sesuai dengan menu
  const isActive = (...paths) => paths.some((path) => window.location.pathname.startsWith(path));

  // logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    alert('Sampai Jumpa Lagi :)')
    navigate('/')
  }

  return (
    <>
      {/* Button toggle untuk mobile (hidden di desktop) */}
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed z-50 top-0 left-0 w-64 h-full bg-gray-800 transition-transform sm:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-800">
          <button
            onClick={closeSidebar}
            className="text-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <Infouser/>

          <ul className="space-y-2 font-medium">
            {/* Dashboard menu */}
            <li>
              <button
                className={`w-full flex items-center p-2 rounded-md hover:bg-blue-400 group ${
                  isActive('/dashboard') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={() => navigate('/dashboard')}
              >
                <svg className="w-7 h-7" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M15.023,15.023 c1.57-1.57,4.102-1.559,5.66,0c1.566,1.57,1.582,4.105,0.012,5.664c-1.559,1.566-4.078,1.582-5.633,0.023l-0.035-0.031 C13.469,19.121,13.469,16.586,15.023,15.023z M8.102,32c0-2.211,1.77-4,3.977-4h0.043c2.207,0,4,1.789,4,4s-1.793,4-4,4 C9.91,36,8.102,34.211,8.102,32z M20.711,48.93l-0.027,0.039c-1.566,1.555-4.094,1.559-5.66,0.008 c-1.57-1.574-1.555-4.105,0.004-5.664c1.566-1.562,4.105-1.578,5.66-0.012C22.258,44.859,22.266,47.375,20.711,48.93z M36,32 c0,2.211-1.789,4-4,4s-4-1.789-4-4V12c0-2.211,1.789-4,4-4s4,1.789,4,4V32z M43.285,15.059l0.031-0.031 c1.559-1.559,4.094-1.562,5.656,0c1.566,1.566,1.559,4.098,0,5.656c-1.566,1.566-4.105,1.578-5.668,0.012 C41.742,19.133,41.727,16.617,43.285,15.059z M48.977,48.977c-1.574,1.566-4.102,1.551-5.66-0.008 c-1.566-1.562-1.582-4.109-0.02-5.664c1.566-1.566,4.078-1.578,5.637-0.02l0.039,0.027C50.523,44.875,50.531,47.406,48.977,48.977z M52,36c-2.211,0-4.02-1.789-4.02-4s1.77-4,3.977-4H52c2.207,0,4,1.789,4,4S54.207,36,52,36z"></path> </g></svg>

                <span className="ms-3">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-md hover:bg-blue-400 group ${
                  isActive('/field') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={() => navigate('/field')}
              >
                <svg className="w-7 h-7" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1011 3.05618L10.427 0.239701H10.367C10.1273 0.0799004 9.84769 0 9.52809 0C9.20849 0 8.90886 0.0799004 8.62921 0.239701L0.898876 4.79401C0.619226 4.95381 0.399501 5.17353 0.2397 5.45318C0.0799001 5.73284 0 6.01249 0 6.29214V11.3258C0 11.6454 0.0799001 11.9451 0.2397 12.2247C0.399501 12.5044 0.619226 12.7041 0.898876 12.824L5.57303 15.5805C5.85268 15.7403 6.15231 15.8202 6.47191 15.8202C6.79151 15.8202 7.09114 15.7403 7.37079 15.5805L15.1011 11.0861C15.3808 10.9263 15.6005 10.7066 15.7603 10.427C15.9201 10.1473 16 9.84769 16 9.52809V4.55431C16 4.23471 15.9201 3.95506 15.7603 3.71536C15.6005 3.43571 15.3808 3.21598 15.1011 3.05618ZM2.21723 5.75281L9.40824 1.55805C9.48814 1.5181 9.56804 1.5181 9.64794 1.55805L13.7228 3.95506L6.59176 8.08989C6.51186 8.16979 6.43196 8.16979 6.35206 8.08989L2.21723 5.75281ZM5.69288 13.9625L1.61798 11.5655C1.53808 11.5256 1.49813 11.4457 1.49813 11.3258V7.01124L5.69288 9.46817V13.9625ZM7.25094 9.46817L7.37079 9.40824L14.5019 5.27341V9.58802C14.5019 9.66792 14.4419 9.72784 14.3221 9.76779L7.25094 13.9625V9.46817Z" fill="#ffffff"></path> </g></svg>

                <span className="ms-3">Mata Pelajaran</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-blue-400 group ${
                  isActive('/dataset') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={() => navigate('/dataset')}
              >
                <svg className="w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M702.537143 218.477714c31.085714-10.825143 55.003429-23.113143 69.924571-35.328 10.24-8.338286 13.458286-13.824 13.458286-16.018285s-3.218286-7.68-13.458286-16.091429c-14.921143-12.141714-38.765714-24.429714-69.924571-35.254857C634.368 92.16 540.013714 78.336 438.857143 78.336s-195.510857 13.897143-263.68 37.449143c-31.085714 10.825143-55.003429 23.113143-69.924572 35.328-10.24 8.338286-13.458286 13.750857-13.458285 16.018286 0 2.194286 3.218286 7.68 13.458285 16.091428 14.921143 12.141714 38.765714 24.429714 69.924572 35.254857 68.169143 23.625143 162.523429 37.449143 263.68 37.449143s195.510857-13.897143 263.68-37.449143zM69.485714 464.749714v128.804572c37.961143 40.009143 140.068571 88.722286 264.777143 103.277714 182.857143 21.284571 355.986286-18.651429 473.526857-98.304l0.438857-131.657143C683.008 540.525714 506.733714 571.465143 328.484571 550.619429c-110.372571-12.8-204.361143-46.08-259.072-85.869715z m0-80.457143c38.034286 39.936 140.068571 88.649143 264.777143 103.131429 183.222857 21.357714 356.717714-18.724571 474.258286-98.742857l0.512-145.993143C734.208 286.573714 596.48 315.977143 438.857143 315.977143c-156.964571 0-294.253714-29.257143-369.152-72.777143A132116.333714 132116.333714 0 0 0 69.485714 384.219429z m0.146286 289.865143l0.292571 108.105143-1.097142-7.460571c22.381714 74.020571 165.302857 133.485714 378.148571 133.485714 115.931429 0 206.774857-17.554286 276.626286-52.077714 19.602286-9.728 34.523429-17.92 49.152-28.598857 9.728-7.094857 16.091429-11.410286 26.550857-20.626286 10.825143-9.581714 27.501714-7.241143 37.156571 3.657143 9.581714 10.752 10.825143 28.306286 0 37.961143-11.702857 10.24-17.188571 14.848-28.598857 23.186285-17.042286 12.434286-36.425143 25.380571-58.806857 36.498286-77.092571 38.107429-155.648 60.854857-302.08 60.854857-243.931429 0-405.211429-77.165714-436.077714-179.2l-1.097143-3.657143v-3.803428L9.362286 628.077714a116682.532571 116682.532571 0 0 1 0.365714-455.68 52.662857 52.662857 0 0 1-0.292571-5.266285C9.508571 84.918857 201.728 18.285714 438.857143 18.285714c237.129143 0 429.348571 66.633143 429.348571 148.845715a53.028571 53.028571 0 0 1-0.804571 9.581714 23.405714 23.405714 0 0 1 1.024 7.094857l-1.682286 520.411429c-0.073143 14.482286-13.385143 26.185143-29.769143 26.112-16.384 0-29.622857-11.776-29.549714-26.331429v-27.355429c-125.074286 73.216-301.056 104.082286-478.939429 83.382858-110.226286-12.873143-204.214857-46.08-258.925714-85.869715z m668.525714-290.962285a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.380571 26.038857-25.380571 14.336 0 26.038857 11.337143 26.038857 25.380571 0 14.116571-11.702857 25.453714-26.038857 25.453715z m0 209.408a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453715z m0 212.114285a25.746286 25.746286 0 0 1-25.965714-25.526857c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453714z" fill="#ffffff"></path></g></svg>

                <span className="ms-3">Data Siswa</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-md hover:bg-blue-400 group ${
                  isActive('/persiapandata') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={() => navigate('/persiapandata')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>

                <span className="ms-3">Persiapan Data</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 rounded-md hover:bg-blue-400 group ${
                  isActive('/perhitungan') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={() => navigate('/perhitungan')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="calculation" x="0" y="0" enable-background="new 0 0 70 70" version="1.1" viewBox="0 0 70 70">
                  <path fill="#c5c5c5" d="M35,3v32H3V9.6C3,5.95,5.95,3,9.6,3H35z" class="color8f90fb svgShape"></path>
                  <path fill="#757575" d="M67,9.6V35H35V3h25.39C64.04,3,67,5.95,67,9.6z" class="color54e28e svgShape"></path>
                  <path fill="#afafaf" d="M35,35v32H9.6C5.95,67,3,64.04,3,60.39V35H35z" class="colorfbe063 svgShape"></path>
                  <path fill="#c5c5c5" d="M67,35v25.39c0,3.65-2.96,6.61-6.61,6.61H35V35H67z" class="color8f90fb svgShape"></path>
                  <path fill="#ffffff" d="M28.5 19c0 1.47-1.2 2.67-2.67 2.67h-4.16v4.16c0 1.47-1.2 2.67-2.67 2.67-1.47 0-2.67-1.2-2.67-2.67v-4.16h-4.16c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h4.16v-4.16c0-1.47 1.2-2.67 2.67-2.67.74 0 1.4.3 1.89.78.48.49.78 1.15.78 1.89v4.16h4.16C27.3 16.33 28.5 17.53 28.5 19zM60.5 24.37c0 1.48-1.2 2.67-2.67 2.67H44.17c-1.47 0-2.66-1.19-2.66-2.66 0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66C59.3 21.71 60.5 22.9 60.5 24.37zM41.51 13.63c0-.74.3-1.41.78-1.89.48-.48 1.15-.78 1.88-.78h13.66c1.47 0 2.67 1.19 2.67 2.66 0 1.48-1.2 2.67-2.67 2.67H44.17C42.7 16.29 41.51 15.1 41.51 13.63zM57.72 44.28c1.04 1.04 1.04 2.74 0 3.78L54.78 51l2.94 2.94c1.04 1.04 1.04 2.74 0 3.78-1.04 1.04-2.74 1.04-3.78 0L51 54.78l-2.94 2.94c-1.04 1.04-2.74 1.04-3.78 0-.52-.52-.78-1.2-.79-1.89.01-.69.27-1.37.79-1.89L47.22 51l-2.94-2.94c-1.04-1.04-1.04-2.74 0-3.78.52-.52 1.2-.78 1.89-.78.69.01 1.36.26 1.89.78L51 47.22l2.94-2.94C54.98 43.24 56.68 43.24 57.72 44.28zM28.5 51c-.01 1.47-1.2 2.67-2.67 2.67H12.17c-1.47 0-2.67-1.2-2.67-2.67 0-.73.3-1.4.78-1.89.49-.48 1.16-.78 1.89-.78h13.66C27.3 48.33 28.5 49.53 28.5 51z" class="colorffffff svgShape"></path>
                </svg>
                <span className="ms-3">Proses Data</span>
              </button>
            </li>

            {/* {role === 'Super Admin' && (
            <li>
              <button
                className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                  isActive('/user') ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                }`}
                onClick={() => navigate('/user')}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 92 92" id="User">
                  <path d="M35.4 54.3c11.7 0 21.2-9.5 21.2-21.1 0-11.7-9.5-21.1-21.2-21.1s-21.2 9.5-21.2 21.1c.1 11.6 9.6 21.1 21.2 21.1zm0-34.3c7.3 0 13.2 5.9 13.2 13.1 0 7.2-5.9 13.1-13.2 13.1s-13.2-5.9-13.2-13.1c.1-7.2 6-13.1 13.2-13.1zM45 56.2c-1.1-.3-2.3-.2-3.3.4l-6.3 3.8-6.3-3.8c-1-.6-2.2-.7-3.3-.4C19.7 58.2 0 65.3 0 76c0 2.2 1.8 4 4 4h62.8c2.2 0 4-1.8 4-4 0-10.7-19.7-17.8-25.8-19.8zM11.2 72c3.4-2.6 9.1-5.4 15.3-7.6l6.8 4.1c1.3.8 2.9.8 4.1 0l6.8-4.1c6.2 2.1 11.9 5 15.3 7.6H11.2zM91 69c0 1.7-1.3 3-3 3H74.6c-1.7 0-3-1.3-3-3s1.3-3 3-3h8.9c-1.5-2-3.9-3.6-6.9-5.2-1.5-.8-2-2.6-1.2-4 .8-1.5 2.6-2 4.1-1.2C83.8 57.9 91 62.8 91 69zM74.2 42.6c0-4.4-3.6-7.9-7.9-7.9-1.1 0-2.1.2-3.1.6-1.5.6-3.3-.1-3.9-1.6-.6-1.5.1-3.3 1.6-3.9 1.7-.7 3.5-1.1 5.4-1.1 7.7 0 13.9 6.2 13.9 13.9s-6.3 13.9-13.9 13.9c-4 0-7.8-1.7-10.4-4.7-1.1-1.2-1-3.1.3-4.2 1.2-1.1 3.1-1 4.2.3 1.5 1.7 3.7 2.7 6 2.7 4.2-.1 7.8-3.7 7.8-8z" fill="#757575" class="color000000 svgShape"></path>
                </svg>

                <span className="ms-3">Manajemen User</span>
              </button>
            </li>
            )} */}

            <li>
              <button
                type="button"
                className={`w-full flex items-center p-2 rounded-lg hover:bg-blue-400 group ${
                  isActive('/logout') ? 'bg-blue-700 text-gray-50' : 'text-gray-50'
                }`}
                onClick={handleLogout}
              >
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="Logout">
                  <path d="M53.22 43.92c-1.73 0-3.13 1.41-3.13 3.13l-.07 10.68-36.79-.07.07-51.39 36.79.07v10.6c0 1.73 1.4 3.14 3.13 3.14s3.14-1.41 3.14-3.14V5.85c0-3.23-2.63-5.85-5.85-5.85h-37.7C9.57 0 6.95 2.62 6.95 5.85v52.3c0 3.23 2.62 5.85 5.85 5.85h37.7c3.22 0 5.85-2.62 5.85-5.85V47.06c0-1.73-1.41-3.14-3.13-3.14z" fill="#ffffff" class="color000000 svgShape"></path>
                  <path d="M56.49 30.98 40.44 20.36c-.38-.25-.86-.27-1.26-.05-.4.21-.64.62-.64 1.08v4.24H16.4a.49.49 0 0 0-.49.49v11.76c0 .27.22.49.49.49h22.14v4.25c0 .45.24.86.64 1.08.19.1.39.14.59.14.23 0 .47-.06.67-.2L56.5 33.02c.34-.22.55-.61.55-1.02s-.22-.8-.56-1.02z" fill="#ffffff" class="color000000 svgShape"></path>
                </svg>

                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

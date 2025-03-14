import bgLogin from '../assets/bglogin.jpeg';
export default function Login() {
    return (
      <>
      <div  className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgLogin})`}} >
        <div className='absolute inset-0 bg-black/50'/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className='w-full max-w-md mx-auto bg-gray-300/50 backdrop-blur-sm p-6 rounded-lg flex flex-col space-y-2'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
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
                    <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Username
                        </label>
                        <div className="mt-2">
                        <input
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
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Sign in
                        </button>
                    </div>
                    </form>
        
                    <p className="mt-10 text-center text-sm text-gray-900">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </a>
                    </p>
                </div>
            </div>
        </div>
      </div>
      </>
    )
  }
  
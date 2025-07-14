import { Link } from 'kawkab';

export function meta() {
  return [
    { title: "404 - Page Not Found" }
  ];
}

export default function() {
  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-indigo-950/20 to-purple-950/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">404</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">Page not found</p>
            <Link
              to="/" 
              className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all duration-200 text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 
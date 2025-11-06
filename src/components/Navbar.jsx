import { Home, Star, Users, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-emerald-500 text-white grid place-items-center font-bold">ب</div>
          <span className="font-semibold text-lg tracking-tight">Barakah</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 flex items-center gap-2"><Star size={16}/> Features</a>
          <a href="#community" className="hover:text-gray-900 flex items-center gap-2"><Users size={16}/> Community</a>
          <a href="#support" className="hover:text-gray-900 flex items-center gap-2"><Home size={16}/> Support</a>
          <a href="#donate" className="hover:text-gray-900 flex items-center gap-2"><Heart size={16}/> Donate</a>
        </nav>
        <a href="#download" className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
          Get App
        </a>
      </div>
    </header>
  );
}

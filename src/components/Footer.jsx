import { Heart, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold">ر</div>
            <span className="font-semibold">Rahbar</span>
          </div>
          <p className="mt-3 text-sm text-gray-600">A modern Islamic companion that brings worship, knowledge, and community together.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">About</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900">Our Mission</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li><a href="#support" className="hover:text-gray-900">Help Center</a></li>
            <li><a href="#community" className="hover:text-gray-900">Community</a></li>
            <li><a href="#donate" className="hover:text-gray-900">Donate</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2"><Mail size={16}/> support@rahbar.app</li>
            <li className="flex items-center gap-2"><Phone size={16}/> +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        Built with <Heart size={14} className="inline text-rose-500"/> for the ummah.
      </div>
    </footer>
  );
}

import { Moon, Compass, BookOpen, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-emerald-700 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live now
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Your all-in-one Islamic companion
          </h1>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            40+ features including prayer times, Quran, Qibla, Hadith, Duas, Zakat, Tasbih, AI Scholar, and more — beautifully organized in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#features" className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">Explore Features</a>
            <a href="#download" className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 shadow-sm ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50">Get the App</a>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Moon className="text-emerald-600" size={18}/> Prayer</div>
            <div className="flex items-center gap-2"><BookOpen className="text-emerald-600" size={18}/> Quran</div>
            <div className="flex items-center gap-2"><Compass className="text-emerald-600" size={18}/> Qibla</div>
            <div className="flex items-center gap-2"><MapPin className="text-emerald-600" size={18}/> Places</div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-white p-3 ring-1 ring-emerald-100 shadow-2xl">
            <div className="w-full h-full rounded-2xl bg-white p-4 grid grid-rows-6 gap-3">
              {["Prayer Timings","Al-Quran","Qibla Direction","Hadith Collection","Duas","Zakat Calculator","Tasbih Counter","AI Scholar","Islamic Calendar","Ramadan Guide","Jummah Guide","Islamic Places","Islamic Media","6 Kalmas","Salah Guide","Hajj & Umrah","Islamic Names","Islamic Quotes","About Us","Our Mission","Contact Us","Donation","User Profile","Support","Community","Islamic Quiz","Stories of Prophets","Online Courses","Islamic Terms","Ask a Fatwa","Fatwa Archive"].slice(0,18).map((f, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 bg-gradient-to-b from-white to-gray-50">
                  <span className="text-sm text-gray-700 truncate">{f}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">tap</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-emerald-200 blur-3xl opacity-40"/>
          <div className="pointer-events-none absolute -top-8 -right-6 h-52 w-52 rounded-full bg-emerald-300 blur-3xl opacity-30"/>
        </div>
      </div>
    </section>
  );
}

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <section id="donate" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 text-center">
              <h3 className="text-2xl font-bold">Support the mission</h3>
              <p className="mt-2 text-gray-600">Help us keep these 40+ features free and accessible to everyone.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="#" className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">Donate</a>
                <a href="#community" className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 shadow-sm ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50">Join Community</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

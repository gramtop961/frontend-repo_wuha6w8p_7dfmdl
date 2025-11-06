import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function Section({ id, title, children, description }) {
  return (
    <section id={id} className="py-14 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {description ? (
            <p className="mt-1 text-gray-600">{description}</p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">{children}</div>
      </div>
    </section>
  );
}

function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }
    const watchId = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
    return () => {
      if (typeof navigator.geolocation.clearWatch === "function") {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);
  return { coords, error };
}

function nextPrayer(timings) {
  if (!timings) return null;
  const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = new Date();
  for (let name of order) {
    const t = timings[name];
    if (!t) continue;
    const [h, m] = t.split(":").map(Number);
    const dt = new Date(now);
    dt.setHours(h, m, 0, 0);
    if (dt > now) return { name, time: dt };
  }
  // next day's Fajr as fallback
  const [h, m] = timings["Fajr"].split(":").map(Number);
  const dt = new Date(now);
  dt.setDate(dt.getDate() + 1);
  dt.setHours(h, m, 0, 0);
  return { name: "Fajr", time: dt };
}

function formatCountdown(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function PrayerWidget() {
  const { coords, error } = useGeolocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    async function load() {
      if (!coords) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${coords.lat}&longitude=${coords.lon}&method=2`
        );
        const json = await res.json();
        setData(json.data);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [coords]);

  useEffect(() => {
    let timer;
    if (data?.timings) {
      const np = nextPrayer(data.timings);
      if (np) {
        const tick = () => setCountdown(formatCountdown(np.time));
        tick();
        timer = setInterval(tick, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm text-gray-600">Your location</div>
          <div className="font-medium">{coords ? `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}` : error || "Detecting..."}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Next prayer</div>
          <div className="font-semibold text-emerald-700">
            {data?.timings ? nextPrayer(data.timings)?.name : "Loading..."} {countdown && `in ${countdown}`}
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {data?.timings ? (
          ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].map((k) => (
            <div key={k} className="rounded-xl border p-3 text-center">
              <div className="text-xs text-gray-600">{k}</div>
              <div className="mt-1 font-semibold">{data.timings[k]}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-sm text-gray-600">{loading ? "Fetching prayer times..." : "Allow location to load timings."}</div>
        )}
      </div>
    </div>
  );
}

function QiblaCompass() {
  const { coords } = useGeolocation();
  const [heading, setHeading] = useState(0);
  const kaaba = { lat: 21.4225, lon: 39.8262 };

  const bearing = useMemo(() => {
    if (!coords) return 0;
    const toRad = (d) => (d * Math.PI) / 180;
    const toDeg = (r) => (r * 180) / Math.PI;
    const φ1 = toRad(coords.lat);
    const φ2 = toRad(kaaba.lat);
    const Δλ = toRad(kaaba.lon - coords.lon);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const brng = (toDeg(Math.atan2(y, x)) + 360) % 360;
    return brng;
  }, [coords]);

  useEffect(() => {
    const handler = (e) => {
      const alpha = e.alpha || 0; // 0-360
      setHeading(alpha);
    };
    window.addEventListener("deviceorientation", handler, true);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const arrowRotation = (bearing - heading + 360) % 360;

  return (
    <div className="grid place-items-center">
      <div className="relative h-64 w-64 rounded-full border-8 border-emerald-100 grid place-items-center">
        <div className="absolute inset-4 rounded-full border-4 border-emerald-200" />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="h-28 w-2 bg-emerald-600 origin-bottom rounded"
            style={{ transform: `rotate(${arrowRotation}deg)` }}
          />
        </div>
        <div className="text-sm text-gray-600">Face arrow to align with Qibla</div>
      </div>
      <div className="mt-3 text-sm text-gray-700">Bearing: {bearing.toFixed(0)}°, Heading: {heading.toFixed(0)}°</div>
    </div>
  );
}

function Tasbih() {
  const [count, setCount] = useState(() => Number(localStorage.getItem("tasbih") || 0));
  useEffect(() => localStorage.setItem("tasbih", String(count)), [count]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-5xl font-bold text-emerald-700">{count}</div>
      <div className="flex gap-3">
        <button onClick={() => setCount((c) => c + 1)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">SubhanAllah +1</button>
        <button onClick={() => setCount(0)} className="px-4 py-2 rounded-lg bg-white ring-1 ring-emerald-200 text-emerald-700 hover:bg-emerald-50">Reset</button>
      </div>
    </div>
  );
}

function ZakatCalculator() {
  const [cash, setCash] = useState(0);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [other, setOther] = useState(0);
  const total = cash + gold + silver + other;
  const zakat = Math.max(0, total * 0.025);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-3">
        <label className="text-sm text-gray-700">Cash and Savings</label>
        <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
        <label className="text-sm text-gray-700">Gold (value)</label>
        <input type="number" value={gold} onChange={(e) => setGold(Number(e.target.value))} className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
        <label className="text-sm text-gray-700">Silver (value)</label>
        <input type="number" value={silver} onChange={(e) => setSilver(Number(e.target.value))} className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
        <label className="text-sm text-gray-700">Other Zakatable Assets</label>
        <input type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
      </div>
      <div className="rounded-xl border p-4 bg-emerald-50/40">
        <div className="text-gray-700">Total Assets</div>
        <div className="text-2xl font-bold">${total.toFixed(2)}</div>
        <div className="mt-3 text-gray-700">Zakat (2.5%)</div>
        <div className="text-3xl font-extrabold text-emerald-700">${zakat.toFixed(2)}</div>
        <a href="#donation" className="mt-4 inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Donate Now</a>
      </div>
    </div>
  );
}

function DonationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(25);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name || "Friend"}! A placeholder payment of $${amount} would be processed.`);
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="text-sm text-gray-700">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
      </div>
      <div>
        <label className="text-sm text-gray-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm text-gray-700">Amount (USD)</label>
        <input type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
      </div>
      <button type="submit" className="sm:col-span-2 mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Proceed to Pay</button>
    </form>
  );
}

function QuranReader() {
  const [surahs, setSurahs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.quran.sutanlab.id/surah");
        const json = await res.json();
        setSurahs(json.data || []);
      } catch {}
    })();
  }, []);

  const loadSurah = async (number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.quran.sutanlab.id/surah/${number}`);
      const json = await res.json();
      setSelected(json.data);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1 max-h-96 overflow-auto rounded-xl border p-3">
        <input placeholder="Search Surah..." className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 mb-2" onChange={(e) => {
          const val = e.target.value.toLowerCase();
          const list = document.querySelectorAll("#surah-list button");
          list.forEach((el) => (el.style.display = el.dataset.q.includes(val) ? "" : "none"));
        }} />
        <div id="surah-list" className="grid gap-1">
          {surahs.map((s) => (
            <button key={s.number} data-q={`${s.number}. ${s.name.transliteration.en.toLowerCase()} ${s.name.short.toLowerCase()}`} onClick={() => loadSurah(s.number)} className="text-left px-3 py-2 rounded-md hover:bg-emerald-50">
              {s.number}. {s.name.transliteration.en} <span className="text-gray-500">({s.name.short})</span>
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        {loading && <div className="text-sm text-gray-600">Loading surah...</div>}
        {selected ? (
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold">{selected.name.transliteration.en} <span className="text-gray-500">({selected.name.short})</span></h4>
              <audio controls src={selected.preBismillah?.audio?.primary || selected.verses?.[0]?.audio?.primary} className="h-8" />
            </div>
            <div className="mt-4 space-y-4 max-h-96 overflow-auto pr-2">
              {selected.verses.map((v) => (
                <div key={v.number.inSurah} className="rounded-lg border p-3">
                  <div className="text-right font-arabic text-2xl leading-relaxed">{v.text.arab}</div>
                  <div className="mt-2 text-gray-700 text-sm">{v.translation.en}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Choose a surah from the list.</div>
        )}
      </div>
    </div>
  );
}

function SimpleList({ items }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border p-4 bg-white/60">
          <div className="font-medium">{it.title}</div>
          <div className="text-sm text-gray-600 mt-1">{it.subtitle}</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />

        <Section id="prayer-timings" title="Prayer Timings" description="Accurate times based on your location with next prayer countdown.">
          <PrayerWidget />
        </Section>

        <Section id="qibla-direction" title="Qibla Direction" description="Compass-based Qibla finder using device sensors.">
          <QiblaCompass />
        </Section>

        <Section id="al-quran" title="Al-Quran" description="Read with translation and play audio recitation.">
          <QuranReader />
        </Section>

        <Section id="tasbih-counter" title="Tasbih Counter">
          <Tasbih />
        </Section>

        <Section id="zakat-calculator" title="Zakat Calculator">
          <ZakatCalculator />
        </Section>

        <Section id="donation" title="Donation" description="Support Rahbar and help us keep it free for everyone.">
          <DonationForm />
        </Section>

        <Section id="duas" title="Duas">
          <SimpleList items={[
            { title: "Morning supplications", subtitle: "Adhkar for after Fajr" },
            { title: "Travel dua", subtitle: "Subhanalladhi sakhkhara lana..." },
            { title: "Protection", subtitle: "Ayat al-Kursi and more" },
          ]} />
        </Section>

        <Section id="hadith-collection" title="Hadith Collection">
          <SimpleList items={[
            { title: "Sahih Bukhari", subtitle: "Selected books and chapters" },
            { title: "Sahih Muslim", subtitle: "Search and read" },
            { title: "Jami at-Tirmidhi", subtitle: "Browse narrations" },
          ]} />
        </Section>

        <Section id="islamic-calendar" title="Islamic Calendar">
          <SimpleList items={[
            { title: "Today (Hijri)", subtitle: new Date().toLocaleDateString() },
            { title: "Events", subtitle: "Ramadan, Dhul-Hijjah, Eid" },
            { title: "Navigate months", subtitle: "Previous/Next" },
          ]} />
        </Section>

        {/* Fallback generic sections for linked items so no link is dead */}
        {["salah-guide","6-kalmas","ramadan-guide","jummah-guide","islamic-places","islamic-media","islamic-quotes","islamic-names","stories-of-prophets","online-courses","islamic-terms","ask-a-fatwa","fatwa-archive","ai-scholar","islamic-quiz","community","support","user-profile","about-us","our-mission","contact-us"].map((id) => (
          <Section key={id} id={id} title={id.split("-").map((s)=>s[0].toUpperCase()+s.slice(1)).join(" ")}> 
            <div className="text-sm text-gray-700">Interactive content coming online here. Explore featured tools above in the meantime.</div>
          </Section>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Compass, BookOpen, Clock, Beaker, Calculator, Sparkles, MapPin, Quote, HeartHandshake, GraduationCap, User, HelpCircle, Globe } from "lucide-react";

const featureGroups = [
  {
    title: "Core Worship",
    icon: <Clock className="text-emerald-600" size={18} />,
    items: [
      "Prayer Timings",
      "Al-Quran",
      "Qibla Direction",
      "Hadith Collection",
      "Duas",
      "Tasbih Counter",
      "Salah Guide",
      "6 Kalmas",
    ],
  },
  {
    title: "Life & Community",
    icon: <Globe className="text-emerald-600" size={18} />,
    items: [
      "Islamic Calendar",
      "Ramadan Guide",
      "Jummah Guide",
      "Islamic Places",
      "Islamic Media",
      "Islamic Quotes",
      "Islamic Names",
      "Stories of Prophets",
    ],
  },
  {
    title: "Knowledge & Guidance",
    icon: <BookOpen className="text-emerald-600" size={18} />,
    items: [
      "Online Courses",
      "Islamic Terms",
      "Ask a Fatwa",
      "Fatwa Archive",
      "AI Scholar",
      "Islamic Quiz",
      "Community",
      "Support",
    ],
  },
  {
    title: "Giving & Personal",
    icon: <HeartHandshake className="text-emerald-600" size={18} />,
    items: [
      "Zakat Calculator",
      "Donation",
      "User Profile",
      "About Us",
      "Our Mission",
      "Contact Us",
    ],
  },
];

function FeatureCard({ title, icon, items }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-emerald-50 grid place-items-center border border-emerald-100">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">40+ thoughtfully organized features</h2>
          <p className="mt-3 text-gray-600">All essentials for everyday faith and learning, presented in a clean, modern interface.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureGroups.map((group) => (
            <FeatureCard key={group.title} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
}

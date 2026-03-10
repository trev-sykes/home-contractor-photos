"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { welcome } from "@/lib/auth";
import Image from "next/image";
import BeforeAfterSlider from "./components/sliders/BeforeAfterSlider";

const testimonials = [
  {
    name: "Mike Torrence",
    trade: "General Contractor",
    location: "Phoenix, AZ",
    quote: "I used to lose jobs because I couldn't show my work fast enough. Now I send a link on the spot and close on the first call.",
    initials: "MT",
  },
  {
    name: "Danny Reyes",
    trade: "Kitchen & Bath Remodeler",
    location: "Austin, TX",
    quote: "The before/after slider alone is worth it. Clients share it with their neighbors and I get referrals I never had to ask for.",
    initials: "DR",
  },
  {
    name: "Scott Whaley",
    trade: "Roofing Contractor",
    location: "Nashville, TN",
    quote: "Every job site photo used to disappear into my camera roll. Now everything is organized by customer, by project. Game changer.",
    initials: "SW",
  },
];

const faqs = [
  {
    q: "Do I need any technical skills to use this?",
    a: "None at all. If you can take a photo on your phone and send a text, you can use Home Contractor Photos. It was built specifically for contractors, not tech people.",
  },
  {
    q: "How does the client share link work?",
    a: "Every project gets a unique link you can text or email to your client. They tap it and see a clean page with all your project photos — no app download, no login required on their end.",
  },
  {
    q: "Can I use this on my phone on the job site?",
    a: "Yes. The app is fully mobile-optimized. Upload photos directly from your phone camera the moment you take them.",
  },
  {
    q: "What happens after my 14-day trial?",
    a: "You'll be prompted to subscribe for $15/month to keep access. We don't auto-charge — you choose when you're ready. Your photos are never deleted.",
  },
  {
    q: "Can I add my company logo?",
    a: "Yes. Upload your logo once in Settings and it automatically appears on every client share page you send out.",
  },
  {
    q: "Is there a limit on photos or projects?",
    a: "No limits. Unlimited photos, unlimited projects, unlimited customers — all for one flat monthly price.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-slate-700 py-5 cursor-pointer group"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <p className="font-semibold text-white group-hover:text-amber-400 transition text-base sm:text-lg">{q}</p>
        <span className={`text-amber-400 text-xl flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </div>
      {open && (
        <p className="text-slate-400 mt-3 leading-relaxed text-sm sm:text-base">{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const getMessage = async () => {
      try { await welcome(); } catch { }
    };
    getMessage();
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');`}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-950 font-black text-sm">HC</span>
            </div>
            <span className="font-bold text-sm sm:text-lg text-white truncate">
              <span className="hidden sm:inline">Home Contractor Photos</span>
              <span className="sm:hidden">HC Photos</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link href="/login" className="text-slate-400 hover:text-white transition text-sm font-medium">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-sm transition shadow-lg shadow-amber-900/20 whitespace-nowrap"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-12 sm:pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse flex-shrink-0" />
            Built for contractors, by contractors
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Your work speaks.<br />
            <span className="text-amber-400">Make it visible.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Organize every job photo, create stunning before/afters, and send clients a professional share link — all in under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-5">
            <Link
              href="/register"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl shadow-amber-900/25"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/login"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Log In
            </Link>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">No credit card needed · 14-day free trial · Cancel anytime</p>

          <div className="mt-10 sm:mt-16 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/60 relative w-full h-44 sm:h-72 md:h-[480px] bg-slate-900">
            <Image
              src="/dashboard.png"
              alt="Dashboard"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "2 min", label: "avg. setup time" },
            { stat: "∞", label: "photos & projects" },
            { stat: "$15", label: "flat monthly price" },
            { stat: "0", label: "tech skills needed" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-2xl sm:text-3xl font-black text-amber-400">{stat}</p>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest text-center mb-4">Sound familiar?</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-16"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Photos shouldn't cost you jobs.
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: "📱", title: "Chaotic Camera Roll", body: "Thousands of photos with no organization. Finding that bathroom remodel from 6 months ago takes 20 minutes." },
              { icon: "🤝", title: "Lost Sales", body: "Prospects ask to see your work — you fumble through albums, send blurry screenshots, and lose the bid." },
              { icon: "⏳", title: "Wasted Evenings", body: "Spending hours in editing apps making before/afters instead of bidding new jobs or being home with family." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition">
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 sm:py-24 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest text-center mb-4">How it works</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 sm:mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Simple enough for the job site.
          </h2>
          <p className="text-slate-400 text-center mb-12 sm:mb-20 max-w-2xl mx-auto text-base sm:text-lg">
            No learning curve. No bloated features. Just the tools to organize photos and impress clients in minutes.
          </p>

          <div className="space-y-16 sm:space-y-24">

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 sm:mb-6 uppercase tracking-wider">
                  Step 1
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Organize every job automatically.
                </h3>
                <p className="text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  Create a customer, add a project, upload photos. Everything stays sorted by job and client — forever.
                </p>
                <ul className="space-y-3">
                  {["Upload from your phone on-site", "Search any client or project instantly", "Photos never get buried again"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                      <span className="w-5 h-5 bg-amber-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-xs">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 aspect-video overflow-hidden mt-6 md:mt-0">
                <Image src="/dashboard.png" alt="Organization" width={600} height={400} className="object-cover w-full h-full" />
              </div>
            </div>

            {/* Feature 2 — Before/After Slider */}
            <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 sm:mb-6 uppercase tracking-wider">
                  Step 2
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Let the transformation sell itself.
                </h3>
                <p className="text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  Tag photos as before or after and get an interactive slider clients can drag. No editing software. No extra steps.
                </p>
                <ul className="space-y-3">
                  {["Interactive drag-to-reveal slider", "Your logo on every share page", "Ready to send in seconds"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                      <span className="w-5 h-5 bg-amber-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-xs">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 text-sm mt-6 italic">← Drag to reveal</p>
              </div>
              <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-slate-800 aspect-video shadow-2xl mt-6 md:mt-0">
                <BeforeAfterSlider
                  before="/before.png"
                  after="/after.png"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 sm:mb-6 uppercase tracking-wider">
                  Step 3
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Send one link. Win the trust.
                </h3>
                <p className="text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  Every project has a shareable link. Text it to your client and they see a professional branded page — no app, no login.
                </p>
                <ul className="space-y-3">
                  {["One tap to copy & share", "Clients see live progress updates", "Builds trust, reduces check-in calls"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                      <span className="w-5 h-5 bg-amber-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 text-xs">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 aspect-video flex items-center justify-center mt-6 md:mt-0">
                <div className="text-center px-4 sm:px-8 w-full">
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700 max-w-xs mx-auto">
                    <p className="text-xs text-slate-500 mb-2">Share link copied!</p>
                    <p className="text-slate-300 text-xs sm:text-sm font-mono bg-slate-900 rounded px-3 py-2 border border-slate-700 truncate">
                      hcp.app/share/abc123...
                    </p>
                    <p className="text-xs text-slate-500 mt-3">Client sees your branded project page instantly</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest text-center mb-4">Testimonials</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-16"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Contractors trust it. Clients love it.
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map(({ name, trade, location, quote, initials }) => (
              <div key={name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-amber-400/30 transition">
                <p className="text-amber-400 text-2xl mb-3 sm:mb-4">"</p>
                <p className="text-slate-300 leading-relaxed flex-1 mb-5 sm:mb-6 text-sm sm:text-base">{quote}</p>
                <div className="flex items-center gap-3 border-t border-slate-800 pt-4 sm:pt-5">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-black text-slate-950 text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{name}</p>
                    <p className="text-slate-500 text-xs">{trade} · {location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 sm:py-24 bg-slate-900/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-4">Pricing</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            One plan. Everything included.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-12">No tiers. No gotchas. Just one price that makes sense.</p>

          <div className="bg-slate-900 border border-amber-400/30 rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl shadow-amber-900/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-400/5 blur-3xl rounded-full" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 sm:mb-6 uppercase tracking-wider">
                Pro Plan — Most Popular
              </div>

              <div className="mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl font-black text-white">$15</span>
                <span className="text-xl sm:text-2xl text-slate-400"> / month</span>
              </div>

              <ul className="text-left space-y-3 sm:space-y-4 mb-8 sm:mb-10 max-w-sm mx-auto">
                {[
                  "Unlimited photos & projects",
                  "Unlimited before/after sliders",
                  "Your logo on every share page",
                  "Client progress sharing links",
                  "Mobile-optimized for job sites",
                  "14-day free trial included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                    <span className="w-5 h-5 bg-amber-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl inline-block transition shadow-xl shadow-amber-900/20 w-full sm:w-auto"
              >
                Start 14-Day Free Trial
              </Link>
              <p className="text-slate-600 mt-4 text-sm">No card required · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-widest text-center mb-4">FAQ</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-16"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Questions answered.
          </h2>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 sm:py-24 bg-slate-900/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Your next job is waiting.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl mb-8 sm:mb-10">
            Start organizing your photos today and win more bids tomorrow.
          </p>
          <Link
            href="/register"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl inline-block transition shadow-xl shadow-amber-900/20 w-full sm:w-auto"
          >
            Get Started Free →
          </Link>
          <p className="text-slate-600 mt-4 sm:mt-5 text-sm">14 days free · No credit card needed</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-950 font-black text-sm">HC</span>
                </div>
                <span className="font-bold text-white text-sm sm:text-base">Home Contractor Photos</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Simple photo tools built for contractors who want to close more deals.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><Link href="/features" className="hover:text-amber-400 transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-amber-400 transition">Pricing</Link></li>
                <li><Link href="/register" className="hover:text-amber-400 transition">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><Link href="/about" className="hover:text-amber-400 transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><Link href="/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-amber-400 transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-slate-600 text-xs sm:text-sm">
            © {new Date().getFullYear()} Home Contractor Photos. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
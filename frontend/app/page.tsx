"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { welcome } from "@/lib/auth";
import Image from "next/image";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Optional welcome message fetch (if still needed)
    const getMessage = async () => {
      try {
        const res = await welcome();
        console.log(res); // or handle if you want to display it somewhere
      } catch { }
    };
    getMessage();

    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo + App Name */}
          <Link href="/dashboard" className="flex items-center gap-3">
            {/* App Name */}
            <span className="text-white font-bold text-xl">
              Home Contractor Photos
            </span>
          </Link>

          {/* Auth Links */}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-zinc-400 hover:text-white transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Get Started Free
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      < section className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center" >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Capture Every Job.<br />
          <span className="text-blue-500">Close More Deals.</span>
        </h1>

        <p className="text-xl text-zinc-300 mb-10 max-w-3xl mx-auto">
          The easiest way for contractors to organize project photos, create powerful before/afters, and prove your work to win bigger jobs.
        </p>

        <div className="flex gap-5 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 px-9 py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-blue-900/30"
          >
            Start Free Trial →
          </Link>
          <button className="border border-zinc-700 hover:border-zinc-500 px-9 py-4 rounded-xl font-semibold text-lg transition">
            Watch Demo
          </button>
        </div>

        <p className="text-zinc-500 mt-5 text-sm">
          No credit card needed • 14-day free trial • Cancel anytime
        </p>

        {/* Hero placeholder — dashboard screenshot */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50 relative w-full h-64 md:h-96 bg-gradient-to-br from-zinc-800 to-zinc-950">
          <Image
            src="/dashboard.png"
            alt="Dashboard"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section >

      {/* Problem Section */}
      < section className="bg-zinc-900 border-y border-zinc-800 py-20" >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Tired of Photos Holding You Back?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800/70 p-7 rounded-xl border border-zinc-700 backdrop-blur-sm">
              <div className="text-5xl mb-5">📱</div>
              <h3 className="text-2xl font-semibold mb-3">Chaotic Photo Mess</h3>
              <p className="text-zinc-400">
                Thousands of photos buried in your camera roll. Can't quickly find that perfect bathroom remodel from 6 months ago.
              </p>
            </div>

            <div className="bg-zinc-800/70 p-7 rounded-xl border border-zinc-700 backdrop-blur-sm">
              <div className="text-5xl mb-5">🏠</div>
              <h3 className="text-2xl font-semibold mb-3">No Professional Proof</h3>
              <p className="text-zinc-400">
                Prospects ask to see your work — you fumble through albums and lose the sale.
              </p>
            </div>

            <div className="bg-zinc-800/70 p-7 rounded-xl border border-zinc-700 backdrop-blur-sm">
              <div className="text-5xl mb-5">⏳</div>
              <h3 className="text-2xl font-semibold mb-3">Wasted Hours</h3>
              <p className="text-zinc-400">
                Spending evenings in editing apps to make before/afters instead of bidding new jobs.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Features Section */}
      < section className="py-24" >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            Built for Contractors — Simple & Powerful
          </h2>
          <p className="text-zinc-400 text-center mb-16 max-w-3xl mx-auto text-lg">
            No learning curve. No unnecessary features. Just the tools to organize photos and impress clients fast.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-5">
                  📸 Smart Organization — Zero Effort
                </h3>
                <p className="text-zinc-300 mb-6 text-lg">
                  Snap photos on-site. We sort them automatically by job, customer, and date.
                </p>
                <ul className="space-y-3 text-zinc-200 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Instant mobile uploads
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Search by client name or month
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Photos never get lost again
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800 rounded-2xl p-10 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500 text-xl">Organization Dashboard Screenshot</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-zinc-800 rounded-2xl p-10 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500 text-xl">Before/After Slider Example</p>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-5">
                  🎨 Instant Before/After Magic
                </h3>
                <p className="text-zinc-300 mb-6 text-lg">
                  Turn raw photos into client-winning comparisons in one click.
                </p>
                <ul className="space-y-3 text-zinc-200 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Side-by-side or interactive slider
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Auto-add your logo watermark
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Ready for social media & proposals
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-5">
                  📲 Real-Time Progress Sharing
                </h3>
                <p className="text-zinc-300 mb-6 text-lg">
                  Send clients a private link — they see updates as you upload.
                </p>
                <ul className="space-y-3 text-zinc-200 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    One-tap shareable links
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    No login needed for clients
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✓</span>
                    Builds trust & reduces calls
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800 rounded-2xl p-10 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500 text-xl">Client Share Link Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA / Pricing Section (simplified & punchier) */}
      < section className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950" >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Organized. Win More.
          </h2>
          <p className="text-xl text-zinc-300 mb-10">
            One straightforward plan — unlimited everything.
          </p>

          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-10 md:p-14 border border-blue-600/40 shadow-2xl shadow-blue-950/40">
            <h3 className="text-3xl font-bold mb-4">Pro Plan</h3>
            <div className="mb-8">
              <span className="text-6xl font-extrabold">$15</span>
              <span className="text-2xl text-blue-200"> / month</span>
            </div>

            <ul className="text-left space-y-4 mb-10 max-w-md mx-auto text-lg">
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Unlimited photos & projects
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Unlimited before/afters
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Your logo auto-watermarked
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Client progress sharing links
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                iOS + Android mobile access
              </li>
            </ul>

            <Link
              href="/register"
              className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-5 rounded-xl font-bold text-xl inline-block transition shadow-lg"
            >
              Start 14-Day Free Trial
            </Link>
            <p className="text-blue-200 mt-5 text-base">
              No card required • Cancel anytime
            </p>
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="py-20 text-center" >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Level Up Your Bids?
          </h2>
          <p className="text-xl text-zinc-300 mb-10">
            Join contractors who turn photos into profit.
          </p>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-xl font-bold text-xl inline-block transition shadow-lg shadow-blue-900/30"
          >
            Get Started Free →
          </Link>
          <p className="text-zinc-500 mt-6">
            14 days free • No credit card needed
          </p>
        </div>
      </section >

      {/* Footer */}
      < footer className="border-t border-zinc-800 py-16" >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="text-2xl font-bold mb-4">Home Contractor Photos</div>
              <p className="text-zinc-400 text-sm">
                Simple photo tools built for contractors.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} Home Contractor Photos. All rights reserved.
          </div>
        </div>
      </footer >
    </div >
  );
}
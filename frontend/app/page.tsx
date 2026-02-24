"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { welcome } from "@/lib/auth";

export default function Home() {
  const [welcomeMessage, setWelcome] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getMessage = async () => {
      const res = await welcome();
      setWelcome(res);
    }
    getMessage();
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* Header */}
      <p>{welcomeMessage}</p>
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            📸 ContractorProof
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-zinc-400 hover:text-white transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Show Off Your Work.<br />
          <span className="text-blue-500">Win More Jobs.</span>
        </h1>

        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          The simplest way for contractors to organize project photos,
          create stunning before/after comparisons, and impress customers.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Start Free Trial →
          </Link>
          <button className="border border-zinc-700 hover:border-zinc-500 px-8 py-4 rounded-lg font-semibold text-lg transition">
            Watch Demo
          </button>
        </div>

        <p className="text-zinc-500 mt-4 text-sm">
          No credit card required • 14-day free trial • Cancel anytime
        </p>

        {/* Hero Image / Demo Screenshot */}
        <div className="mt-16 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 aspect-video flex items-center justify-center">
            {/* Replace with actual screenshot when you have it */}
            <p className="text-zinc-500 text-xl">App Screenshot Here</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tired of Losing Jobs Because You Can't Show Your Work?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Photos Are a Mess</h3>
              <p className="text-zinc-400">
                Hundreds of photos scattered across your camera roll.
                Can't find that kitchen remodel from last month.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">No Portfolio</h3>
              <p className="text-zinc-400">
                Customers ask "Can I see your work?" and you scramble
                to find photos. Lost jobs because you couldn't show proof.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Wasted Time</h3>
              <p className="text-zinc-400">
                Spend hours organizing photos, making before/afters in
                photo editors. Time you could spend on actual jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple Photo Management Built for Contractors
          </h2>
          <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            No complicated software. No bloat. Just the features you actually need.
          </p>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  📸 Auto-Organized by Customer & Date
                </h3>
                <p className="text-zinc-400 mb-4">
                  Take photos during the job. We automatically organize them
                  by customer name and project date. No manual sorting needed.
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Upload from phone in seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Search by customer or date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Never lose a photo again</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500">Feature Screenshot</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-zinc-800 rounded-lg p-8 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500">Before/After Example</p>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4">
                  🎨 One-Click Before/After Comparisons
                </h3>
                <p className="text-zinc-400 mb-4">
                  Create professional before/after comparisons instantly.
                  Perfect for showing customers and posting on social media.
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Side-by-side or slider view</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Auto-watermark with your logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Download for Instagram/Facebook</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  📤 Share Progress with Customers
                </h3>
                <p className="text-zinc-400 mb-4">
                  Send customers a link to see real-time progress.
                  Builds trust and keeps them in the loop.
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>One-click share links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>No customer login required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Automatic updates as you add photos</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 aspect-video flex items-center justify-center">
                <p className="text-zinc-500">Share Link Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Contractors Love ContractorProof
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-semibold mb-2">Win More Jobs</h3>
              <p className="text-zinc-400 text-sm">
                Show off your best work when quoting new jobs
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-zinc-400 text-sm">
                Stop wasting hours organizing photos manually
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="font-semibold mb-2">Happy Customers</h3>
              <p className="text-zinc-400 text-sm">
                Keep customers updated with progress photos
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Marketing Ready</h3>
              <p className="text-zinc-400 text-sm">
                Get professional content for social media
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Honest Pricing
          </h2>
          <p className="text-zinc-400 mb-12">
            No hidden fees. No per-photo charges. Just one simple price.
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 border border-blue-500">
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$15</span>
              <span className="text-xl text-blue-200">/month</span>
            </div>

            <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Unlimited photos & projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Unlimited before/after comparisons</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Auto-watermark with your logo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Customer sharing links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Mobile app (iOS & Android)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">✓</span>
                <span>Cancel anytime</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-zinc-100 px-8 py-4 rounded-lg font-bold text-lg inline-block transition"
            >
              Start 14-Day Free Trial
            </Link>
            <p className="text-blue-200 mt-4 text-sm">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials (add later when you have customers) */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for Orange County Contractors
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto">
            We're local to Aliso Viejo and understand what OC contractors need.
            No bloated enterprise software. Just simple tools that work.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Show Off Your Work?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join contractors who are winning more jobs with professional photo portfolios.
          </p>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg inline-block transition"
          >
            Start Free Trial →
          </Link>
          <p className="text-zinc-500 mt-4">
            14 days free • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">📸 ContractorProof</div>
              <p className="text-zinc-400 text-sm">
                Photo management built for contractors in Orange County.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
            © 2026 ContractorProof. Made in Aliso Viejo, CA.
          </div>
        </div>
      </footer>
    </div>
  )
    ;
}
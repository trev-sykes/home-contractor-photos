import Link from "next/link";

export default function TermsPage() {
    const lastUpdated = "March 11, 2026";
    const company = "Home Contractor Photos";
    const email = "support@homecontractorphotos.com";
    const price = "$14.99/month";

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

            <div className="mb-10">
                <p className="section-eyebrow">Legal</p>
                <h1 className="font-display text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
                <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed">

                <section>
                    <p>
                        These Terms of Service ("Terms") govern your use of {company} ("we," "us," or "our") and the services
                        provided through our website and application. By creating an account or using our service, you agree to
                        these Terms. Please read them carefully.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">1. Description of Service</h2>
                    <p>
                        {company} is a photo management platform designed for home contractors. It allows you to organize
                        job site photos, create before-and-after comparisons, and share project updates with clients via
                        shareable links.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">2. Accounts and Registration</h2>
                    <p className="mb-3">
                        To use {company}, you must create an account with a valid email address and password. You are
                        responsible for maintaining the confidentiality of your account credentials and for all activity
                        that occurs under your account.
                    </p>
                    <p>
                        You must be at least 18 years old to use this service. By registering, you represent that all
                        information you provide is accurate and current.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">3. Free Trial and Subscription</h2>
                    <p className="mb-3">
                        New accounts receive a <strong>14-day free trial</strong> with full access to all features.
                        No credit card is required to start your trial.
                    </p>
                    <p className="mb-3">
                        After your trial ends, continued access requires a paid subscription at <strong>{price}</strong>.
                        Subscriptions are billed monthly and renew automatically until cancelled.
                    </p>
                    <p>
                        You may cancel your subscription at any time through the billing portal in your dashboard.
                        Cancellation takes effect at the end of the current billing period — you will not be charged again
                        but will retain access until the period ends. We do not offer refunds for partial months.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">4. Payments</h2>
                    <p className="mb-3">
                        Payments are processed securely by Stripe. We do not store your credit card information.
                        By subscribing, you authorize us to charge your payment method on a recurring monthly basis.
                    </p>
                    <p>
                        If a payment fails, your account may be downgraded or suspended until payment is resolved.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">5. Your Content</h2>
                    <p className="mb-3">
                        You retain full ownership of all photos and content you upload to {company}. By uploading
                        content, you grant us a limited license to store, display, and transmit that content solely
                        for the purpose of providing the service to you.
                    </p>
                    <p>
                        You are solely responsible for ensuring you have the rights to upload and share any content.
                        You may not upload content that is illegal, harmful, or violates the rights of others.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">6. Acceptable Use</h2>
                    <p className="mb-3">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Use the service for any unlawful purpose</li>
                        <li>Upload malicious code, viruses, or harmful files</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Resell or sublicense access to the service</li>
                        <li>Use the service to harass, abuse, or harm others</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">7. Data and Privacy</h2>
                    <p>
                        Your privacy matters to us. Please review our{" "}
                        <Link href="/privacy" className="font-semibold underline" style={{ color: "#f59e0b" }}>
                            Privacy Policy
                        </Link>{" "}
                        to understand how we collect, use, and protect your data.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">8. Account Deletion</h2>
                    <p>
                        You may delete your account at any time from your account settings. Upon deletion, all your
                        data including customers, projects, and photos will be permanently removed. This action cannot
                        be undone. If you have an active subscription, please cancel it before deleting your account
                        to avoid future charges.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">9. Service Availability</h2>
                    <p>
                        We strive to maintain high availability but do not guarantee uninterrupted service. We may
                        perform maintenance, updates, or experience outages from time to time. We are not liable for
                        any losses resulting from service interruptions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">10. Disclaimer of Warranties</h2>
                    <p>
                        The service is provided "as is" and "as available" without warranties of any kind, either
                        express or implied. We do not warrant that the service will be error-free, secure, or meet
                        your specific requirements.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">11. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, {company} shall not be liable for any indirect,
                        incidental, special, or consequential damages arising from your use of the service, including
                        loss of data or business interruption, even if we have been advised of the possibility of
                        such damages. Our total liability shall not exceed the amount you paid us in the 3 months
                        preceding the claim.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">12. Changes to Terms</h2>
                    <p>
                        We may update these Terms from time to time. We will notify you of significant changes by
                        email or by displaying a notice in the application. Continued use of the service after
                        changes constitutes acceptance of the new Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">13. Contact</h2>
                    <p>
                        If you have questions about these Terms, please contact us at{" "}
                        <a href={`mailto:${email}`} className="font-semibold underline" style={{ color: "#f59e0b" }}>
                            {email}
                        </a>.
                    </p>
                </section>

            </div>

            <div className="mt-12 pt-8 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #e2e8f0" }}>
                <Link href="/privacy" className="font-semibold text-slate-500 hover:text-slate-800 transition">
                    Privacy Policy →
                </Link>
                <Link href="/" className="font-semibold text-slate-500 hover:text-slate-800 transition">
                    Back to Home →
                </Link>
            </div>
        </div>
    );
}
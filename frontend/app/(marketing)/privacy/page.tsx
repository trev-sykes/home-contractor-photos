import Link from "next/link";

export default function PrivacyPage() {
    const lastUpdated = "March 11, 2026";
    const company = "Home Contractor Photos";
    const email = "support@homecontractorphotos.com";

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

            <div className="mb-10">
                <p className="section-eyebrow">Legal</p>
                <h1 className="font-display text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
                <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed">

                <section>
                    <p>
                        At {company}, we take your privacy seriously. This Privacy Policy explains what information
                        we collect, how we use it, and your rights regarding your data. By using our service, you
                        agree to the practices described here.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
                    <p className="mb-3"><strong className="text-slate-700">Information you provide:</strong></p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Account information: email address, company name, and password (stored encrypted)</li>
                        <li>Profile content: company logo you upload</li>
                        <li>Business data: customer names, contact details, project names, and addresses you enter</li>
                        <li>Photos and images you upload to the platform</li>
                    </ul>
                    <p className="mb-3"><strong className="text-slate-700">Information collected automatically:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Basic usage data to keep the service running</li>
                        <li>Payment information is handled entirely by Stripe — we never see or store your card details</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
                    <p className="mb-3">We use your information to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide and maintain the service</li>
                        <li>Process payments and manage your subscription</li>
                        <li>Send transactional emails (welcome email, payment confirmations)</li>
                        <li>Respond to support requests</li>
                        <li>Improve and develop new features</li>
                    </ul>
                    <p className="mt-3">
                        We do not sell your personal information to third parties. We do not use your data for
                        advertising purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">3. Your Photos and Content</h2>
                    <p className="mb-3">
                        Photos you upload are stored securely via Cloudinary, a cloud media storage provider.
                        Your photos are only accessible to you and anyone you explicitly share a project link with.
                    </p>
                    <p>
                        We do not use your photos for any purpose other than displaying them to you and your
                        clients through share links you generate. We do not share your photos with third parties.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">4. Third-Party Services</h2>
                    <p className="mb-3">We use the following trusted third-party services to operate:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong className="text-slate-700">Stripe</strong> — payment processing</li>
                        <li><strong className="text-slate-700">Cloudinary</strong> — photo storage and delivery</li>
                        <li><strong className="text-slate-700">Resend</strong> — transactional email delivery</li>
                        <li><strong className="text-slate-700">Render</strong> — backend hosting</li>
                        <li><strong className="text-slate-700">Vercel</strong> — frontend hosting</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">5. Data Retention</h2>
                    <p className="mb-3">
                        We retain your data for as long as your account is active. If you delete your account,
                        all your data — including customers, projects, and photos — is permanently deleted from
                        our database immediately.
                    </p>
                    <p>
                        Note that Cloudinary may retain uploaded files for a short period after deletion.
                        Stripe retains billing records as required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">6. Data Security</h2>
                    <p>
                        We take reasonable measures to protect your data, including encrypted password storage,
                        HTTPS for all data transmission, and secure database hosting. However, no method of
                        transmission over the internet is 100% secure and we cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">7. Your Rights</h2>
                    <p className="mb-3">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong className="text-slate-700">Access</strong> — request a copy of the data we hold about you</li>
                        <li><strong className="text-slate-700">Correction</strong> — update your company name and details in settings</li>
                        <li><strong className="text-slate-700">Deletion</strong> — delete your account and all data at any time</li>
                        <li><strong className="text-slate-700">Portability</strong> — request an export by contacting us</li>
                    </ul>
                    <p className="mt-3">
                        To exercise any of these rights, contact us at{" "}
                        <a href={`mailto:${email}`} className="font-semibold underline" style={{ color: "#f59e0b" }}>
                            {email}
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">8. Cookies</h2>
                    <p>
                        We use minimal cookies and local storage only for authentication purposes (storing your
                        login token). We do not use tracking cookies or advertising cookies.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">9. Children's Privacy</h2>
                    <p>
                        Our service is not directed at children under 18. We do not knowingly collect personal
                        information from children. If you believe a child has provided us with personal information,
                        please contact us and we will delete it promptly.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">10. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of significant
                        changes by email. Continued use of the service after changes constitutes acceptance of
                        the updated policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">11. Contact Us</h2>
                    <p>
                        If you have questions or concerns about this Privacy Policy or how we handle your data,
                        please contact us at{" "}
                        <a href={`mailto:${email}`} className="font-semibold underline" style={{ color: "#f59e0b" }}>
                            {email}
                        </a>.
                    </p>
                </section>

            </div>

            <div className="mt-12 pt-8 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #e2e8f0" }}>
                <Link href="/terms" className="font-semibold text-slate-500 hover:text-slate-800 transition">
                    Terms of Service →
                </Link>
                <Link href="/" className="font-semibold text-slate-500 hover:text-slate-800 transition">
                    Back to Home →
                </Link>
            </div>
        </div>
    );
}
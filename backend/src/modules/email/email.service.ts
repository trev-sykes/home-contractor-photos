import { resend } from "../../config/resend.js";

export const sendWelcomeEmail = async (email: string, companyName: string) => {
    await resend.emails.send({
        from: "Home Contractor Photos <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to Home Contractor Photos 👷",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
                <div style="margin-bottom: 32px;">
                    <div style="display: inline-block; background: #fbbf24; border-radius: 10px; padding: 8px 14px; font-weight: 900; font-size: 14px; color: #020617; letter-spacing: -0.5px;">
                        HC Photos
                    </div>
                </div>

                <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px;">
                    Welcome, ${companyName}! 👋
                </h1>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                    Your account is set up and your <strong>14-day free trial</strong> has started. 
                    Start organizing your job site photos today.
                </p>

                <a href="${process.env.FRONTEND_URL}/dashboard"
                   style="display: inline-block; background: #fbbf24; color: #020617; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 12px; text-decoration: none;">
                    Go to Dashboard →
                </a>

                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 40px 0;" />

                <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                    Home Contractor Photos · You're receiving this because you just signed up.
                </p>
            </div>
        `,
    });
};

export const sendSubscriptionConfirmedEmail = async (email: string, companyName: string) => {
    await resend.emails.send({
        from: "Home Contractor Photos <onboarding@resend.dev>",
        to: email,
        subject: "You're now on Pro ⚡",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
                <div style="margin-bottom: 32px;">
                    <div style="display: inline-block; background: #fbbf24; border-radius: 10px; padding: 8px 14px; font-weight: 900; font-size: 14px; color: #020617; letter-spacing: -0.5px;">
                        HC Photos
                    </div>
                </div>

                <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px;">
                    You're on Pro, ${companyName}! 🎉
                </h1>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
                    Your payment was successful. You now have full access to:
                </p>

                <ul style="color: #64748b; font-size: 15px; line-height: 2; padding-left: 20px; margin: 0 0 28px;">
                    <li>Unlimited photos & projects</li>
                    <li>Client share pages</li>
                    <li>Before & after sliders</li>
                    <li>All future features</li>
                </ul>

                <a href="${process.env.FRONTEND_URL}/dashboard"
                   style="display: inline-block; background: #fbbf24; color: #020617; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 12px; text-decoration: none;">
                    Go to Dashboard →
                </a>

                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 40px 0;" />

                <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                    Home Contractor Photos · Manage your subscription anytime from your dashboard.
                </p>
            </div>
        `,
    });
};
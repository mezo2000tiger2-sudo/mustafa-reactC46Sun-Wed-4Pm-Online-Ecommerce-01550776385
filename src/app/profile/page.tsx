import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'
import Link from 'next/link'

export default async function profile() {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('__Secure-next-auth.session-token')?.value || 
                      cookieStore.get('next-auth.session-token')?.value
    
    const token = await decode({
        token: authToken,
        secret: process.env.NEXTAUTH_SECRET!
    })
    const user = token?.user
    const initial = user?.name?.charAt(0)?.toUpperCase() || 'U'

    return (
        <div className="min-h-screen bg-[#f6f1e8] pt-16 pb-8">
            <div className="max-w-[420px] mx-auto px-4 py-12">
                <div className="bg-[rgba(255,252,247,0.88)] rounded-[18px] border border-[#1c1914]/10 p-6 sm:p-8 text-center shadow-[0_12px_32px_rgba(28,25,20,0.07)]">
                    <div className="w-24 h-24 rounded-full mx-auto mb-3.5 border-[3px] border-[rgba(255,252,247,0.95)] shadow-[0_14px_30px_rgba(28,25,20,0.12)] bg-[radial-gradient(circle_at_30%_30%,#f3e9dc,#c9ddcc)] flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#1c1914]/60">{initial}</span>
                    </div>

                    <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#1c1914]">
                        {user?.name}
                    </h1>

                    <p className="text-[#1c1914]/45 text-sm mt-2 mb-6">
                        {user?.email}
                    </p>

                    <div className="text-left space-y-2.5">
                        <Link
                            href="/addresses"
                            className="flex items-center justify-between p-3 rounded-xl border border-[#1c1914]/10 bg-[rgba(255,252,247,0.75)] font-semibold text-sm text-[#1c1914] no-underline transition-all duration-200 hover:border-[#0e8528]/30 hover:shadow-[0_8px_22px_rgba(14,133,40,0.1)]"
                        >
                            <span>Addresses</span>
                            <span className="text-[#1c1914]/30">→</span>
                        </Link>

                        <Link
                            href="/updatepassword"
                            className="flex items-center justify-between p-3 rounded-xl border border-[#1c1914]/10 bg-[rgba(255,252,247,0.75)] font-semibold text-sm text-[#1c1914] no-underline transition-all duration-200 hover:border-[#0e8528]/30 hover:shadow-[0_8px_22px_rgba(14,133,40,0.1)]"
                        >
                            <span>Update password</span>
                            <span className="text-[#1c1914]/30">→</span>
                        </Link>

                        <Link
                            href="/updateuserdata"
                            className="flex items-center justify-between p-3 rounded-xl border border-[#1c1914]/10 bg-[rgba(255,252,247,0.75)] font-semibold text-sm text-[#1c1914] no-underline transition-all duration-200 hover:border-[#0e8528]/30 hover:shadow-[0_8px_22px_rgba(14,133,40,0.1)]"
                        >
                            <span>Update data</span>
                            <span className="text-[#1c1914]/30">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

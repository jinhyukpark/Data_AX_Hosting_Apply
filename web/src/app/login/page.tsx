'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { login } from '@/lib/auth';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        try {
            // Since login is a server action (simulated here since we are in client component, but usually we'd use server actions)
            // For this demo, let's wrap the logic or call an API. 
            // But wait, the lib/auth.ts I wrote uses 'cookies()' which is server-only.
            // So I need to convert login to a Server Action or API route.
            // Let's refactor this to use a Server Action in a separate file or inline if configured.
            // For now, assume we will call an API route.

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            const result = await response.json();

            if (result.success) {
                if (result.user.role === 'ADMIN') {
                    router.push('/admin');
                } else {
                    router.push('/client');
                }
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        Data-AX 플랫폼
                    </h1>
                    <p className="text-zinc-400 text-sm">서비스 요청 관리를 위해 로그인하세요</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">이메일</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="admin@illunex.com"
                            className="w-full bg-zinc-800/50 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">비밀번호</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-zinc-800/50 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                로그인 <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-zinc-500">
                            계정이 없으신가요? 관리자에게 문의하세요.
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

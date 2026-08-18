import { GlassEffect } from '@/components/LiquidGlass'
import { Zap, Bot, MousePointerClick, LifeBuoy, TrendingUp } from 'lucide-react'

export default function Features() {
    return (
        <section className="relative py-32">
            {/* ASCII/Grid Texture Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='12' y='12' fill='rgba(255,255,255,0.8)' font-size='10' font-family='monospace' text-anchor='middle' dominant-baseline='middle'%3E%2B%3C/text%3E%3C/svg%3E")`, backgroundSize: '32px 32px' }}></div>

            {/* Intense Ambient Glow - Massive opacity increase for blazing orange effect */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                {/* Core blazing hot orange spot */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[1400px]" style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.85) 0%, rgba(255,30,0,0.4) 35%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' }}></div>
                {/* Secondary intense yellow-orange highlight for the light source center */}
                <div className="absolute top-[30%] left-[40%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px]" style={{ background: 'radial-gradient(circle, rgba(255,160,0,0.6) 0%, rgba(255,50,0,0) 60%)', mixBlendMode: 'screen' }}></div>
                {/* Deep red base for richer cinematic color depth */}
                <div className="absolute top-[60%] right-[20%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px]" style={{ background: 'radial-gradient(circle, rgba(220,10,0,0.5) 0%, rgba(150,0,0,0) 60%)', mixBlendMode: 'screen' }}></div>
            </div>

            <div className="mx-auto max-w-6xl px-6 relative z-10">
                
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="block text-sm font-semibold uppercase tracking-widest text-[#ff6333] mb-4">Our Services</span>
                    <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">Everything you need to <br className="hidden md:block" /> dominate your market.</h2>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Top Row: 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1: Automate */}
                        <GlassEffect className="rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center justify-center size-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                                    <Zap className="size-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white/20">01</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-3">Automate</h3>
                                <p className="text-[#96989f] text-base leading-relaxed">Stop doing repetitive work. We set up smart systems that handle the boring stuff so your team can focus on growth.</p>
                            </div>
                        </GlassEffect>

                        {/* Card 2: Build AI */}
                        <GlassEffect className="rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center justify-center size-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                                    <Bot className="size-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white/20">02</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-3">Build AI</h3>
                                <p className="text-[#96989f] text-base leading-relaxed">AI that works 24/7. We build AI assistants that talk to your customers, answer questions, and close sales while you sleep.</p>
                            </div>
                        </GlassEffect>

                        {/* Card 3: Convert */}
                        <GlassEffect className="rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center justify-center size-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                                    <MousePointerClick className="size-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white/20">03</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-3">Convert</h3>
                                <p className="text-[#96989f] text-base leading-relaxed">Websites that actually sell. Fast, modern websites designed to turn every visitor into a paying customer.</p>
                            </div>
                        </GlassEffect>

                    </div>

                    {/* Bottom Row: 2 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Card 4: Support */}
                        <GlassEffect className="rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-center justify-center size-16 shrink-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                                <LifeBuoy className="size-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg font-bold text-white/20">04</span>
                                    <h3 className="text-2xl font-semibold text-white">We stick around</h3>
                                </div>
                                <p className="text-[#96989f] text-base leading-relaxed">We don't disappear after launch. We stay on for constant monitoring, support, and improvements.</p>
                            </div>
                        </GlassEffect>

                        {/* Card 5: Scale */}
                        <GlassEffect className="rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 hover:-translate-y-1 transition-transform duration-500">
                            <div className="flex items-center justify-center size-16 shrink-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                                <TrendingUp className="size-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg font-bold text-white/20">05</span>
                                    <h3 className="text-2xl font-semibold text-white">Built for scale</h3>
                                </div>
                                <p className="text-[#96989f] text-base leading-relaxed">Scalable architecture supporting millions of users. You see updates weekly and results that compound.</p>
                            </div>
                        </GlassEffect>

                    </div>
                </div>
            </div>
        </section>
    )
}

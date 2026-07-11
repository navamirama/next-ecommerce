import Link from "next/link";
import Image from "next/image";

export default function SportsHero() {
    const tags = [
        "Football",
        "Cricket",
        "Schools",
        "Corporate",
        "Tournaments",
    ];

    return (
        <div className="bg-white text-black">
            <section className="overflow-hidden bg-[#F5F3EE]">
                <div className="grid min-h-[720px] lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div className="flex items-center bg-[#F5F3EE] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
                        <div className="max-w-2xl">
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#C96A3D]/30 bg-[#C96A3D]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#9F4E2D]">
                                <span className="h-2 w-2 rounded-full bg-[#C96A3D]" />
                                New Service
                            </span>

                            {/* Heading */}
                            <h1 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.04em] text-[#0A0A0A] sm:text-6xl md:text-7xl xl:text-8xl">
                                SPORTS
                                <br />
                                TEAM
                                <br />
                                PRINTING
                            </h1>

                            {/* Description */}
                            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-700 md:text-lg">
                                Professional jersey name &amp; number printing for football,
                                cricket, volleyball, schools, tournaments and corporate events.
                            </p>

                            {/* Tags */}
                            <div className="mt-9 flex flex-wrap gap-3">
                                {tags.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-zinc-400 bg-white/60 px-5 py-2 text-sm font-medium text-zinc-800 transition hover:border-[#C96A3D] hover:text-[#9F4E2D]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="mt-12 flex flex-wrap items-center gap-4">
                                <Link
                                    href="/list?cat=custom-print"
                                    className="rounded-full bg-[#C96A3D] px-8 py-4 font-bold text-white transition hover:bg-[#A95331]"
                                >
                                    Start Your Order
                                </Link>

                                <Link
                                    href="/list?cat=custom-print"
                                    className="rounded-full border border-[#0A0A0A] bg-transparent px-8 py-4 font-semibold text-[#0A0A0A] transition hover:bg-[#0A0A0A] hover:text-white"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT VIDEO */}
                    <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 h-full w-full object-cover"
                        >
                            <source src="/videos/jersey.mp4" type="video/mp4" />
                        </video>

                        {/* Soft overlays */}
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

                        {/* Floating card */}
                        <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-[#F5F3EE]/85 px-6 py-5 shadow-xl backdrop-blur-md">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9F4E2D]">
                                KULT Store
                            </p>

                            <h3 className="mt-2 text-xl font-black text-[#0A0A0A]">
                                Printed In-House
                            </h3>

                            <p className="mt-1 text-sm text-zinc-700">
                                Premium Heat Press Finish
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-[#F5F3EE]" />
            <section className="w-full bg-zinc-50 py-24">
                <div className="max-w-[1800px] mx-auto px-8 lg:px-12">


                    <div className="grid lg:grid-cols-[2.2fr_1fr] gap-8 mt-12">
                        {/* Large customer/team image */}
                        <div className="lg:col-span-2 overflow-hidden rounded-3xl bg-black">
                            <Image
                                src="/customer.png"
                                alt="Customers wearing KULT printed sports jerseys"
                                width={1600}
                                height={1200}
                                className="block h-auto w-full"
                                priority
                            />
                        </div>

                        {/* Smaller stacked images/content */}
                        <div className="grid gap-6">

                        </div>
                    </div>
                </div>
            </section >
            <section className="px-6 md:px-16 py-24 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-center">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8 mt-16">
                        {[
                            ["01", "Choose Jersey", "Bring your own jersey or choose a blank."],
                            ["02", "Send Details", "Share player names, numbers and sizes."],
                            ["03", "We Print", "We press each jersey professionally."],
                            ["04", "Collect / Deliver", "Collect locally or arrange delivery."],
                        ].map(([step, title, text]) => (
                            <div key={step} className="border rounded-3xl p-8">
                                <p className="text-5xl font-black text-gray-200">{step}</p>
                                <h3 className="font-black text-2xl mt-6">{title}</h3>
                                <p className="text-gray-600 mt-4 leading-7">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* CTA */}
            <section className="px-6 md:px-16 py-24 bg-black text-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
                        Ready for your next match?
                    </p>

                    <h2 className="mt-6 text-4xl md:text-6xl font-black">
                        Get Your Team Jerseys Printed
                    </h2>

                    <p className="mt-6 text-gray-300 text-lg leading-8">
                        Whether it is one jersey or a full squad order, KULT can help with
                        clean, professional name and number printing.
                    </p>

                    <Link
                        href="/list?cat=custom-print"
                        className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-bold"
                    >
                        Start Your Order
                    </Link>
                </div>
            </section>
        </div>
    );
}

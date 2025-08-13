// import { useState } from "react"
// import Image from 'next/image'
// import Link from "next/link"
// const About = () => {

//     //   const [open, setOpen] = useState(false)
//     return (
//         <div className=''>
//             About Page
//         </div>
//     )
// }

// export default About

// components/About.tsx

// components/About.tsx
import Link from "next/link"
export default function About() {
    return (
        <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Image / Visual */}
                <div className="w-full lg:w-1/2">
                    <img
                        src="/about.png"
                        alt="Vela Graphic Wear collection"
                        className="rounded-lg shadow-lg object-cover w-full h-full"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        About Vela Graphic Wear
                    </h2>
                    <p className="text-lg text-gray-600">
                        At <span className="font-semibold">Vela Graphic Wear</span>, we celebrate bold self-expression. From street style to anime, Japanese, Indian desi, and spiritual-themed prints—all on ultra-soft, premium cotton T-shirts and hoodies.
                    </p>
                    <p className="text-gray-700">
                        Each piece blends comfort with culture, designed to feel as good as it looks. Whether you're after edgy streetwear or a mindful spiritual tee, you’ll find your vibe here.
                    </p>

                    {/* Value cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { title: "Premium Soft Cotton", desc: "Comfort that lasts all day." },
                            { title: "Diverse Styles", desc: "From anime to spiritual and beyond." },
                            { title: "Designed for You", desc: "Express yourself in style." },
                        ].map((item) => (
                            <div key={item.title} className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <span
                        className="text-blue-500" style={{ backgroundColor: "black", color: "white" }}><Link href="/" className="md:px-8 lg:px-16">Shop Your Style</Link></span>



                </div>
            </div>
        </section>
    );
}

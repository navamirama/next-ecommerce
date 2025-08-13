// import { useState } from "react"
// import Image from 'next/image'
// import Link from "next/link"
// const Contact = () => {

//     //   const [open, setOpen] = useState(false)
//     return (
//         <div className=''>
//             Contact US
//         </div>
//     )
// }

// export default Contact

export default function Contact() {
    return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Contact Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {`We're always happy to hear from you! Whether you have a question about our products,
  need help with your order, or just want to share your feedback, feel free to reach out.
  Our team at Vela Graphic Wear will get back to you as soon as possible.`}
            </p>
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        <a href="mailto:contact@velagraphicwear.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                            contact@velagraphicwear.com
                        </a>
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        <a href="tel:+1234567890" className="text-blue-600 dark:text-blue-400 hover:underline">
                            +44 7474163199
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
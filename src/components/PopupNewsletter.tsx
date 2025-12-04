// components/PopupNewsletter.tsx
"use client";

import { useState, useEffect } from "react";

export default function PopupNewsletter() {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowPopup(true), 1500);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                console.error("Newsletter API error:", data);
                throw new Error(data.error || "Failed to save email");
            }

            setSuccess(true);
            setEmail("");
            setTimeout(() => setShowPopup(false), 1200);
        } catch (err) {
            console.error("Newsletter submit error:", err);
            alert("Couldn't save your email right now. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] "
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(6px)",   // ✨ magic highlight effect
                WebkitBackdropFilter: "blur(6px)", // safari support
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={() => setShowPopup(false)}
                >
                    ✖
                </button>

                <div
                    style={{
                        textAlign: "center",
                        background: "black",
                        color: "white",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        marginBottom: "20px",
                        width: "100%",
                        maxWidth: "360px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            margin: 0,
                            lineHeight: "1.3",
                        }}
                    >
                        Join Vela Family
                    </h2>

                    <p
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: "17px",
                            margin: "6px 0 0",
                            opacity: 0.9,
                            lineHeight: "1.4",
                            fontWeight: "400",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Unlock VIP perks & early access
                    </p>

                </div>


                {
                    success ? (
                        <p className="text-green-600 text-center">
                            🎉 Thank you! You’re subscribed.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="border w-full p-3 rounded mb-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button
                                type="submit"
                                style={{
                                    width: "100%",
                                    background: "#000",
                                    color: "white",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    border: "none",
                                    marginTop: "8px",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "#000")}
                            >
                                Subscribe
                            </button>
                        </form>
                    )
                }
            </div >
        </div >
    );
}

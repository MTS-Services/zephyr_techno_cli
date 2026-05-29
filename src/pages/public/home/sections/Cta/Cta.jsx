import React from 'react';
import Container from "../../../../../layout/Container";

const Cta = () => {
    return (
        <section className="w-full py-10 md:py-16">
           <Container>
             <div className="bg-[#f2f2f0] rounded-2xl px-8 py-16 text-center">
 
                {/* Heading */}
                <h2 className="title-custom text-[#1a1d2e] mb-4">
                    Get a Newsletter
                </h2>
 
                {/* Subheading */}
                <p className="subtitle-custom max-w-lg mx-auto mb-10 leading-relaxed">
                    Subscribe to receive exclusive offers, new product launches, and
                    technological insights from our design lab.
                </p>
 
                {/* Input + Button Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
                    <input
                        type="email"
                        placeholder="YOUR EMAIL ADDRESS"
                        className="input w-full bg-white border rounded-lg border-[#D1D5DB] focus:outline-none placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-400 text-gray-700"
                    />
                    <button className="btn bg-[#151A2A] rounded-lg text-white w-full sm:w-auto px-8 text-xs tracking-widest font-semibold whitespace-nowrap">
                        Subscribe
                    </button>
                </div>
 
            </div>
           </Container>
        </section>
    );
};
 
export default Cta;
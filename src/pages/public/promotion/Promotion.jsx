import React from "react";
import promotion from "../../../assets/banner/promotions.webp";
import mobileBanner from "../../../assets/banner/sell_your_phone1.webp";
import { Link } from "react-router";
import Container from "../../../layout/Container";

const Promotion = () => {
  return (
    <div className="py-6 md:pb-16">
      <Container>
        {/* Mobile -> up to lg (0 - 1024px): show only the image (no text/buttons) */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={mobileBanner}
              alt="Promotion"
              className="w-full h-52 object-fit rounded-xl"
            />
            {/* <div className="absolute bottom-[12%] left-8">
              <Link
                to="/sell"
                className="inline-flex items-center rounded-lg bg-[#4bb9cf] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 cursor-pointer hover:scale-105 transform transition-all duration-300"
              >
                Sell Your Phone
              </Link>
            </div> */}
            <div className="absolute -right-6  top-1/2 w-[60%] sm:w-[50%] -translate-y-1/2 text-white">
              <h2 className="text-lg sm:text-xl uppercase font-extrabold tracking-wide drop-shadow">
                Sell Your Phone
                <span className="block mt-0.5">In Minutes</span>
              </h2>
              <p className="mt-2 sm:mt-4 text-[12px]  font-semibold text-white/90 leading-relaxed w-[85%]">
                Tired of your old device? Trading it in has never been easier.
                We offer the best market rates and a seamless process.
              </p>
              <Link
                to="/sell"
                className="mt-1 sm:mt-6 hover:scale-105 inline-flex items-center rounded-lg bg-[#4bb9cf] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:brightness-110 cursor-pointer transition-all"
              >
                Sell Your Phone
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop (1024px+) layout */}
        <div className="hidden lg:block relative h-75 lg:h-95 overflow-hidden rounded-xl">
          <img
            src={promotion}
            alt="Promotion"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute right-6 sm:right-10 lg:right-25 2xl:right-70 top-1/2 w-full max-w-lg -translate-y-1/2 text-white">
            <h2 className="text-3xl uppercase sm:text-4xl lg:text-5xl xl:text-[55px] font-extrabold tracking-wide drop-shadow">
              Sell Your Phone
              <span className="block mt-2">In Minutes</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-white/90 leading-relaxed">
              Tired of your old device? Trading it in has never been easier. We
              offer the best market rates and a seamless process.
            </p>
            <Link
              to="/sell"
              className="mt-6 hover:scale-105 inline-flex items-center rounded-lg bg-[#4bb9cf] px-5 py-2.5 text-sm lg:text-base font-semibold text-white hover:brightness-110 cursor-pointer transition-all"
            >
              Sell Your Phone
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Promotion;

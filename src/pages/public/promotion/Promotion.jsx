import promotion from '../../../assets/banner/promotions.webp';
import { Link } from 'react-router';
import Container from '../../../layout/Container';

const Promotion = () => {
    return (
        <div className='py-10 md:pb-16'>
          <Container>
            {/* Mobile stacked card */}
            <div className="sm:hidden">
              <div className="overflow-hidden rounded-xl shadow-lg bg-white">
                <img src={promotion} alt="Promotion" className="w-full h-52 object-cover object-top rounded-t-xl" />
                <div className="p-4 bg-[#101216] text-white">
                  <h2 className="text-2xl font-extrabold leading-tight">
                    Sell Your Phone
                    <span className="block mt-1 text-custom">In Minutes</span>
                  </h2>
                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                    Tired of your old device? Trading it in has never been easier. We offer the best market rates and a seamless process.
                  </p>
                  <Link to="/sell" className="mt-4 block w-full text-center rounded-lg bg-custom px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition">
                    Sell Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop / tablet layout (kept as before) */}
            <div className='hidden sm:block relative h-75 sm:h-95 lg:h-95 overflow-hidden rounded-xl'>
              <img
                src={promotion}
                alt="Promotion"
                className="w-full h-full object-cover object-top"
              />
              <div className='absolute inset-0 bg-black/5' />
              <div className='absolute right-6 sm:right-10 lg:right-25 2xl:right-70 top-1/2 w-full max-w-lg -translate-y-1/2 text-white'>
                <h2 className='text-3xl uppercase sm:text-4xl lg:text-5xl xl:text-[55px] font-extrabold tracking-wide drop-shadow'>
                  Sell Your Phone
                  <span className='block mt-2'>In Minutes</span>
                </h2>
                <p className='mt-4 text-sm sm:text-base lg:text-lg font-semibold text-white/90 leading-relaxed'>
                  Tired of your old device? Trading it in has never been easier.
                  We offer the best market rates and a seamless process.
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
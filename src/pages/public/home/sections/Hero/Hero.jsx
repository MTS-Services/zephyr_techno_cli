import banner from '../../../../../../src/assets/banner/hero.webp'
import mobileBanner from '../../../../../../src/assets/banner/hero.webp'
import { Link } from 'react-router';
import Container from '../../../../../layout/Container';

const Hero = () => {
    return (
        <section className='pt-4 pb-6'>
            <Container>
                <div className='overflow-hidden rounded-2xl'>
                    <div className='sm:hidden'>
                        <div className='rounded-2xl border border-[#2a3a5f] bg-[#14192b]  shadow-[0_24px_60px_rgba(7,12,24,0.35)]'>
                            <div className='rounded-[18px] border border-cyan-400/35 bg-[radial-gradient(circle_at_top,rgba(61,180,204,0.14),rgba(12,17,29,0.96)_58%)] p-4 text-white'>
                                <span className='inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-medium text-slate-200'>
                                    1-2 Years Manufacturer Warranty
                                </span>

                                <h1 className='mt-3 text-[1.55rem] font-semibold leading-tight tracking-tight'>
                                    Buy New & Used
                                    <span className='block text-custom'>Smartphones</span>
                                    <span className='block'>at the Best Prices</span>
                                </h1>

                                <p className='mt-3 max-w-[28ch] text-sm leading-6 text-slate-200/90'>
                                    Shop premium phones with trusted quality and fast delivery. We offer a wide range of devices from top brands at unbeatable prices.
                                </p>

                                <div className='mt-4 flex gap-3'>
                                    <Link
                                        to='/products'
                                        className='inline-flex flex-1 items-center justify-center rounded-lg bg-custom px-4 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]'
                                    >
                                        Shop Now
                                    </Link>
                                    <Link
                                        to='/sell'
                                        className='inline-flex flex-1 items-center justify-center rounded-lg border border-white/45 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/6'
                                    >
                                        Sell Your Phone
                                    </Link>
                                </div>

                                <div className='mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20'>
                                    <img
                                        src={mobileBanner}
                                        className='h-44 w-full object-cover object-right'
                                        alt='Mobile hero banner'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative hidden sm:block'>
                        <img src={banner} className='w-full xl:h-[55vh] h-full xl:object-cover' alt="Hero Banner" />
                        <div className='absolute inset-0 bg-linear-to-r from-black/45 via-black/20 to-transparent' />
                        <div className='absolute inset-0 flex items-center justify-start'>
                            <div className='h-full flex items-center'>
                                <div className='w-full px-6 sm:px-10 lg:pl-12 xl:pl-22 text-white'>
                                    <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-wide drop-shadow leading-tight neon-flicker'>
                                        Buy New & Used
                                        <span className='block mt-2'>Smart Phones</span>
                                        <span className='block mt-3 xl:mt-5 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold'>
                                            At the Best Prices
                                        </span>
                                    </h1>
                                    <div className='mt-6 xl:mt-10 flex flex-wrap gap-3'>
                                        <Link
                                            to='/products'
                                            className='inline-flex items-center rounded-lg bg-custom px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 cursor-pointer hover:scale-105 transform transition-all duration-300'
                                        >
                                            Shop Now
                                        </Link>
                                        <Link
                                            to='/sell'
                                            className='inline-flex items-center rounded-lg border border-white/60 bg-black/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 cursor-pointer hover:scale-105 transform transition-all duration-300'
                                        >
                                            Sell Your Phone
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;

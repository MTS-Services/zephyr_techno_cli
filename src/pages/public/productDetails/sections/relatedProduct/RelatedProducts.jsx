import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../../home/sections/featured/components/Card';

const RelatedProducts = () => {
    const [data, setData] = useState([]);
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    useEffect(() => {
        let mounted = true;

        fetch('/data/featured.json')
            .then((res) => res.json())
            .then((json) => {
                if (mounted) setData(json);
            })
            .catch((err) => console.error('Failed to load featured.json', err));

        return () => {
            mounted = false;
        };
    }, []);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        handleScroll();
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='mt-10 lg:mt-20'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-2xl'>Related Products</h1>
                
                {/* Navigation Arrows - Top Right */}
                <div className='flex gap-2 md:gap-3'>
                    <button
                        onClick={() => scroll('left')}
                        className={`p-2 rounded-lg bg-custom text-white transition-all duration-300
                        hover:scale-110 flex items-center justify-center
                        ${showLeftArrow ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                        disabled={!showLeftArrow}
                        aria-label="Previous products"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className={`p-2 rounded-lg bg-custom text-white transition-all duration-300
                        hover:scale-110 flex items-center justify-center
                        ${showRightArrow ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                        disabled={!showRightArrow}
                        aria-label="Next products"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            
            {/* Carousel Container */}
            <div className='relative'>
                {/* Carousel */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className='flex gap-4 overflow-x-auto scroll-smooth'
                    style={{ 
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {data?.map((item) => (
                        <div key={item.id} className='shrink-0 w-40 sm:w-48 md:w-52'>
                            <Card {...item} />
                        </div>
                    ))}
                </div>
                <style>{`
                    div[style*="scrollBehavior"]::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>

            {/* Mobile Scroll Indicator */}
            <p className='text-xs text-gray-400 mt-3 md:hidden'>← Scroll to view more →</p>
        </div>
    );
};

export default RelatedProducts;
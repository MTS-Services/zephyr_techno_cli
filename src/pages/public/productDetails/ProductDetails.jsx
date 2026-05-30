import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Container from "../../../layout/Container";
import {
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import RelatedProducts from "./sections/relatedProduct/RelatedProducts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${BASE_URL}/api/public/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((json) => {
        const data = json.data;
        setProduct(data);
        setSelectedColor(data.availableColors?.[0]?.id ?? null);
        setSelectedStorage(data.availableStorageOptions?.[0]?.id ?? null);
        setSelectedRam(data.availableRamOptions?.[0]?.id ?? null);
        setSelectedImage(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-custom" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  const images = [...product.images].sort((a, b) => a.displayOrder - b.displayOrder);
  const highlights = [...product.highlights].sort((a, b) => a.displayOrder - b.displayOrder);
  const specifications = [...product.specifications].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 pt-8 md:pt-12 mb-20">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="rounded-xl overflow-hidden mb-3 aspect-4/3 flex items-center justify-center bg-gray-50">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]?.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-4/3 rounded-lg border-2 overflow-hidden transition-all p-0.5 ${
                      selectedImage === idx
                        ? "border-custom"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-contain rounded-md bg-gray-50"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <div className="mb-6">
              <p className="text-sm font-bold tracking-widest text-[#94A3B8] uppercase mb-1">
                {product.series?.name}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-semibold text-[#151A2A] mb-2 tracking-tight">
                {product.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#151A2A]">
                £{Number(product.basePrice).toLocaleString()}
              </p>
              {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                <p className="text-sm text-orange-500 mt-1">
                  Only {product.stockQuantity} left in stock
                </p>
              )}
              {product.stockQuantity === 0 && (
                <p className="text-sm text-red-500 mt-1">Out of stock</p>
              )}
            </div>

            {/* Condition */}
            <div className="mb-6">
              <p className="text-sm font-bold tracking-widest text-[#151A2A] uppercase mb-2">
                Condition
              </p>
              <span className="px-4 py-2 rounded-sm text-[13px] border border-[#151A2A] text-[#151A2A] inline-block">
                {product.condition?.name}
              </span>
            </div>

            {/* Color */}
            {product.availableColors?.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-bold tracking-widest text-[#151A2A] uppercase mb-2">
                  COLOR:{" "}
                  <span className="text-[#9CA3AF] font-normal">
                    {product.availableColors.find((c) => c.id === selectedColor)?.name}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`px-3 py-1.5 rounded-sm text-[12px] border transition-colors ${
                        selectedColor === c.id
                          ? "border-[#151A2A] text-[#151A2A] bg-gray-50"
                          : "border-gray-300 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage */}
            {product.availableStorageOptions?.length > 0 && (
              <div className="mb-4">
                <p className="text-[11px] font-bold tracking-widest text-[#151A2A] uppercase mb-2">
                  Storage
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.availableStorageOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStorage(s.id)}
                      className={`px-4 py-2 rounded-sm text-[13px] border transition-colors ${
                        selectedStorage === s.id
                          ? "bg-custom border-custom text-white"
                          : "border-gray-300 text-gray-500 hover:border-gray-400 bg-white"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RAM */}
            {product.availableRamOptions?.length > 0 && (
              <div className="mb-8">
                <p className="text-[11px] font-bold tracking-widest text-[#151A2A] uppercase mb-2">
                  RAM
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.availableRamOptions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRam(r.id)}
                      className={`px-4 py-2 rounded-sm text-[13px] border transition-colors ${
                        selectedRam === r.id
                          ? "bg-custom border-custom text-white"
                          : "border-gray-300 text-gray-500 hover:border-gray-400 bg-white"
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3 mt-auto">
              <div className="flex items-center border border-gray-300 rounded-sm px-3 py-2 w-full sm:w-24 justify-between shrink-0 h-11">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#151A2A]"
                >
                  <FiMinus size={14} />
                </button>
                <span className="text-sm font-semibold text-[#151A2A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#151A2A]"
                  disabled={product.stockQuantity !== null && quantity >= product.stockQuantity}
                >
                  <FiPlus size={14} />
                </button>
              </div>
              <Link
                to="/cart"
                className="sm:flex-1 bg-[#47B5C9] hover:bg-[#349eab] text-white rounded-sm font-medium text-sm transition-colors h-11 flex items-center justify-center"
              >
                Add to Cart
              </Link>
            </div>
            <Link
              to="/checkout"
              className="w-full border border-gray-800 text-[#151A2A] hover:bg-gray-50 rounded-sm font-medium text-sm transition-colors h-11 flex items-center justify-center"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* ── INTRODUCTION ── */}
        {product.introduction && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="title-custom text-[#151A2A] mb-4">
              About the {product.title}
            </h2>
            <p className="subtitle-custom">{product.introduction}</p>
          </div>
        )}

        {/* ── HIGHLIGHTS ── */}
        {highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {highlights.map((h) => (
              <div key={h.id} className="bg-[#F0F4F6] rounded-2xl p-8">
                {h.iconUrl ? (
                  <img src={h.iconUrl} alt={h.title} className="w-6 h-6 mb-4" />
                ) : (
                  <div className="w-6 h-6 mb-4 rounded-full bg-custom/20" />
                )}
                <h3 className="text-base font-bold text-[#595E71] mb-2">
                  {h.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── TECHNICAL SPECS ── */}
        {specifications.length > 0 && (
          <div className="mb-24">
            <h2 className="text-xl font-bold text-[#151A2A] mb-8">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {specifications.map((spec) => (
                <div
                  key={spec.id}
                  className="bg-[#F0F4F6] px-5 py-3.5 rounded flex justify-between items-center"
                >
                  <span className="text-base text-[#64748B]">{spec.name}</span>
                  <span className="text-base font-medium text-[#171C1E]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WHY CHOOSE & FAQ ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Why Choose */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#151A2A] mb-6">
              Why Choose ZEPHYR?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f6f8] flex items-center justify-center shrink-0 text-custom">
                  <FiCheckCircle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151A2A] mb-1.5">
                    Authentic Products
                  </h3>
                  <p className="text-base text-[#64748B]">
                    We guarantee 100% genuine products sourced directly from
                    authorized channels.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f6f8] flex items-center justify-center shrink-0 text-custom">
                  <FiTruck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151A2A] mb-1.5">
                    Express Delivery
                  </h3>
                  <p className="text-base text-[#64748B]">
                    Get your device within 24-48 hours with our premium
                    logistics partners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ */}
          {product.faqs?.length > 0 && (
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#151A2A] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-base font-medium text-[#151A2A] pr-4">
                        {faq.question}
                      </span>
                      {activeFaq === idx ? (
                        <FiChevronUp className="text-gray-400 shrink-0" />
                      ) : (
                        <FiChevronDown className="text-gray-400 shrink-0" />
                      )}
                    </button>
                    {activeFaq === idx && (
                      <div className="p-4 pt-0 text-base text-[#64748B] leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {product.relatedProducts?.length > 0 && (
          <RelatedProducts products={product.relatedProducts} />
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;

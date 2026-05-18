import { useState } from "react";
import Container from "../../../layout/Container";
import ProductCard from "./components/ProductCard";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import EmptyState from "./components/EmptyState";
import { PRODUCTS } from "./constants";

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Products() {
  const [condition, setCondition] = useState("All");
  const [series, setSeries] = useState("All");
  const [storage, setStorage] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("All");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortOptions = [
    "All",
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
  ];

  const closeFilterPanel = () => setIsFilterOpen(false);

  const filtered = PRODUCTS.filter((p) => {
    if (condition !== "All" && p.condition !== condition) return false;
    if (series !== "All" && p.series !== series) return false;
    if (storage && p.storageOpt !== storage) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Container>
        <div className="py-6 md:py-8 lg:py-10">
          {/* ── Header ── */}
          <div className="flex items-start sm:items-end justify-between mb-6 md:mb-8 lg:mb-10 flex-wrap gap-4">
            <div>
              <h1 className="title-custom ">
                Shop All Phones
              </h1>
              <p className="subtitle-custom mt-1">
                Explore our full collection of new and certified pre-owned
                devices.
              </p>
            </div>
            <div className="w-full sm:w-auto mt-1">
              <div className="lg:hidden space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="inline-flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4h18M6 12h12m-9 8h6"
                      />
                    </svg>
                    Filter
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  >
                    {sortOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <span className="block text-xs text-[#64748B]">
                  Showing{" "}
                  <strong className="text-gray-700">{filtered.length}</strong> of{" "}
                  <strong className="text-gray-700">142</strong> products
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <span className="text-sm text-[#64748B]">
                  Showing{" "}
                  <strong className="text-gray-700">{filtered.length}</strong> of{" "}
                  <strong className="text-gray-700">142</strong> products
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {sortOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
              isFilterOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              type="button"
              aria-label="Close filters"
              onClick={closeFilterPanel}
              className="absolute inset-0 bg-black/30"
            />
            <div
              className={`relative z-10 h-full w-[85%] max-w-xs bg-white shadow-xl overflow-y-auto p-4 transform transition-transform duration-300 ease-out ${
                isFilterOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-[#151A2A]">Filters</h2>
                <button
                  onClick={closeFilterPanel}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close filter sidebar"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Filter
                condition={condition}
                setCondition={setCondition}
                series={series}
                setSeries={setSeries}
                storage={storage}
                setStorage={setStorage}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                onApply={closeFilterPanel}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ── Filter ── */}
            <div className="hidden lg:block">
              <Filter
                condition={condition}
                setCondition={setCondition}
                series={series}
                setSeries={setSeries}
                storage={storage}
                setStorage={setStorage}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />
            </div>

            {/* ── Product Grid ── */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 min-[350px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {/* ── Pagination ── */}
              {filtered.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={8}
                  onPageChange={setPage}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

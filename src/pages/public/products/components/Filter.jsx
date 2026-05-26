import React, { useState } from "react";
import { CONDITIONS, SERIES_LIST, STORAGES, RAM_OPTIONS, COLORS_LIST } from "../constants";

// ── Sidebar Filters ───────────────────────────────────────────────────────────
function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-[14px] font-semibold tracking-widest uppercase text-[#151A2A]">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "" : "-rotate-90"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      {open && children}
    </div>
  );
}

const CustomRadio = ({ label, value, currentValue, onChange, isGroup }) => {
  const selected = currentValue === value;
  return (
    <div 
      className="flex items-center gap-2.5 cursor-pointer group m-0"
      onClick={() => onChange(value)}
    >
      <div className={`w-[16px] h-[16px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 border-custom`}>
        {selected && <div className="w-[8px] h-[8px] bg-custom rounded-full" />}
      </div>
      <span className={`${isGroup ? 'font-semibold text-[#151A2A] text-[11px] tracking-wider uppercase' : 'text-[14px] text-[#4A5565]'}`}>
        {label}
      </span>
    </div>
  );
};

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="flex flex-col gap-3">
    {options.map((opt) => (
      <CustomRadio key={opt} label={opt} value={opt} currentValue={value} onChange={onChange} />
    ))}
  </div>
);

const Filter = ({
  condition,
  setCondition,
  series,
  setSeries,
  storage,
  setStorage,
  ram,
  setRam,
  priceRange,
  setPriceRange,
  activeColor,
  setActiveColor,
  attributes,
  isLoadingAttributes,
  onApply,
}) => {
  const [usedOpen, setUsedOpen] = useState(true);

  const apply = () => {
    if (onApply) onApply();
  };

  // Helper function to map color names to hex values
  const getColorHex = (colorName) => {
    const colorMap = {
      'black': '#1a1a1a',
      'midnight black': '#1a1a1a',
      'white': '#f0ede8',
      'starlight': '#f0ede8',
      'yellow': '#f5d76e',
      'blue': '#6ab0e8',
      'blue titanium': '#4a6fa5',
      'purple': '#6b3fa0',
      'pink': '#e8b4b8',
      'rose gold': '#e8b4b8',
      'natural titanium': '#8b8681',
      'gold': '#f9d77e',
      'silver': '#e5e5e5',
      'green': '#4a7c59',
      'red': '#d32f2f',
      'midnight': '#1a1a2e',
    };
    const normalized = colorName.toLowerCase().trim();
    return colorMap[normalized] || '#000000';
  };

  // Extract data from API or use fallback
  const seriesList = attributes?.series 
    ? ["All", ...attributes.series.map(s => s.name)] 
    : SERIES_LIST;
  
  const storageOptions = attributes?.storageOptions 
    ? attributes.storageOptions.map(s => s.name) 
    : STORAGES;
  
  const ramOptions = attributes?.ramOptions 
    ? attributes.ramOptions.map(r => r.name) 
    : RAM_OPTIONS;
  
  const colorsList = attributes?.colors 
    ? attributes.colors.map(c => ({ label: c.name, hex: getColorHex(c.name) }))
    : COLORS_LIST;

  // Get condition structure
  const conditionsData = attributes?.conditions || CONDITIONS;
  const usedCondition = conditionsData.find(c => c.key === "USED");
  const usedSubItems = usedCondition?.items || [];

  return (
    <div>
      <aside className="w-full lg:w-52 lg:shrink-0">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg lg:text-xl font-semibold text-[#151A2A]">
            Filters
          </h2>
          <button
            onClick={() => {
              setCondition("All");
              setSeries("All");
              setStorage(null);
              setRam(null);
              setActiveColor(null);
              setPriceRange(2000);
              apply();
            }}
            className="text-xs text-custom hover:underline"
          >
            Clear All
          </button>
        </div>

        {isLoadingAttributes && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-custom"></div>
          </div>
        )}

        {!isLoadingAttributes && (
          <>

        {/* Condition */}
        <FilterSection title="Condition">
          <div className="flex flex-col gap-3">
            <CustomRadio label="All" value="All" currentValue={condition} onChange={(v) => { setCondition(v); apply(); }} />
            <CustomRadio label="New" value="New" currentValue={condition} onChange={(v) => { setCondition(v); apply(); }} />
            
            <div>
              <div 
                className="flex items-center justify-between w-full cursor-pointer group py-1 -my-1"
                onClick={() => setUsedOpen(!usedOpen)}
              >
                <CustomRadio label="USED" value="Used" isGroup={true} currentValue={condition} onChange={(v) => { setCondition(v); apply(); }} />
                <div className="pointer-events-none p-1">
                  <svg
                    className={`w-4 h-4 text-[#8A94A6] transition-transform ${usedOpen ? "" : "rotate-180"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              {usedOpen && usedSubItems.length > 0 && (
                <div className="flex flex-col gap-3 pl-7 mt-3">
                  {usedSubItems.map((item) => (
                    <CustomRadio 
                      key={item.id} 
                      label={item.name} 
                      value={item.name} 
                      currentValue={condition} 
                      onChange={(v) => { setCondition(v); apply(); }} 
                    />
                  ))}
                </div>
              )}

              {usedOpen && usedSubItems.length === 0 && (
                <div className="flex flex-col gap-3 pl-7 mt-3">
                  <CustomRadio label="Excellent (Like New)" value="Excellent (Like New)" currentValue={condition} onChange={(v) => { setCondition(v); apply(); }} />
                  <CustomRadio label="Very Good" value="Very Good" currentValue={condition} onChange={(v) => { setCondition(v); apply(); }} />
                </div>
              )}
            </div>
          </div>
        </FilterSection>

        {/* Series */}
        <FilterSection title="Series">
          <RadioGroup
            name="series"
            options={seriesList}
            value={series}
            onChange={(value) => {
              setSeries(value);
              apply();
            }}
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            onMouseUp={apply}
            onTouchEnd={apply}
            className="products-price-range w-full"
          />
          <div className="flex justify-between mt-2 gap-2">
            {[
              { label: "Min", val: "$0" },
              { label: "Max", val: `$${priceRange}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex-1">
                <p className="text-[14px] text-gray-400 mb-1">{label}</p>
                <div className="border border-gray-200 rounded-lg px-2 py-1 text-[14px] text-gray-700 bg-white">
                  {val}
                </div>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Storage */}
        <FilterSection title="Storage">
          <div className="grid grid-cols-2 gap-2">
            {storageOptions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStorage(storage === s ? null : s);
                  apply();
                }}
                className={`py-1.5 rounded-lg text-[14px] leading-5 font-medium border transition-all
                      ${
                        storage === s
                          ? "bg-custom border-custom text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-custom"
                      }`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* RAM */}
        <FilterSection title="RAM">
          <div className="grid grid-cols-2 gap-2">
            {ramOptions.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRam(ram === r ? null : r);
                  apply();
                }}
                className={`py-1.5 rounded-lg text-[14px] leading-5 font-medium border transition-all
                      ${
                        ram === r
                          ? "bg-custom border-custom text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-custom"
                      }`}
              >
                {r}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Color */}
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {colorsList.map((c) => (
              <button
                key={c.hex}
                title={c.label}
                onClick={() => {
                  setActiveColor(activeColor === c.hex ? null : c.hex);
                  apply();
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all
                      ${activeColor === c.hex ? "border-custom scale-110" : "border-transparent hover:scale-105"}`}
                style={{
                  backgroundColor: c.hex,
                  boxShadow:
                    c.hex === "#f0ede8" ? "inset 0 0 0 1px #e5e7eb" : "none",
                }}
              />
            ))}
          </div>
        </FilterSection>
        </>
        )}
      </aside>
    </div>
  );
};

export default Filter;

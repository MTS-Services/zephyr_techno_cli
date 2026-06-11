import React, { useState, useEffect, useCallback, useRef } from "react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://api-zephyr-techno.maktechgroup.tech";

const SaleNotification = () => {
  const [phase, setPhase] = useState("hidden"); // hidden | in | show | out
  const [current, setCurrent] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  };

  const dismiss = useCallback(() => {
    setPhase("out");
    addTimer(() => setPhase("hidden"), 350);
  }, []);

  // ── show() now receives data from the backend instead of picking randomly ──
  const show = useCallback(
    (data) => {
      clearTimers();
      setCurrent(data);
      setPhase("in");
      addTimer(() => setPhase("show"), 50);
      addTimer(dismiss, 6000);
    },
    [dismiss],
  );

  // ── Single SSE connection — backend handles all timing ────────────────────
  useEffect(() => {
    const es = new EventSource(`${API_BASE_URL}/api/sell/activity-stream`);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      show(data); // { name, action, phone } — same shape as before
    };

    es.onerror = () => {
      // EventSource auto-reconnects by itself — no manual retry needed
    };

    return () => {
      es.close();
      clearTimers();
    };
  }, [show]);

  if (phase === "hidden" || !current) return null;

  const hidden = phase === "in" || phase === "out";

  return (
    <div
      className="fixed z-50 top-20 right-4 transition-all duration-350 ease-out"
      style={{
        width: 288,
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateX(20px)" : "translateX(0)",
      }}
    >
      {/* Card */}
      <div
        className="relative bg-white rounded-2xl border border-gray-100 px-4 pt-3.5 pb-5"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}
      >
        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2.5 right-3 text-gray-300 hover:text-gray-500 text-[11px] leading-none transition-colors"
        >
          ✕
        </button>

        {/* Header row */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Recent Activity
          </span>
        </div>

        {/* Body */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 select-none"
            style={{
              background: "linear-gradient(135deg, #3DB4CC 0%, #2a8fa8 100%)",
            }}
          >
            {current.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              {current.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">
              <span
                className="font-semibold"
                style={{
                  color: current.action === "bought" ? "#10b981" : "#3DB4CC",
                }}
              >
                {current.action === "bought" ? "Just bought" : "Just sold"}
              </span>{" "}
              a{" "}
              <span className="font-semibold text-gray-700">
                {current.phone}
              </span>
            </p>
            <p className="text-[11px] text-gray-400 mt-1">just now</p>
          </div>
        </div>

        {/* Speech-bubble tail — bottom-left */}
        <div
          className="absolute bg-white"
          style={{
            bottom: -9,
            left: 26,
            width: 16,
            height: 16,
            borderRight: "1px solid #f3f4f6",
            borderBottom: "1px solid #f3f4f6",
            transform: "rotate(45deg)",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.04)",
          }}
        />
      </div>
    </div>
  );
};

export default SaleNotification;

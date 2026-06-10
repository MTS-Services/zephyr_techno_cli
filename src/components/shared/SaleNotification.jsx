import React, { useState, useEffect, useCallback, useRef } from "react";

const NOTIFICATIONS = [
  
  { name: "James K.", action: "bought", phone: "iPhone 15 Pro Max" },
  { name: "Sarah M.", action: "sold", phone: "Samsung Galaxy S24 Ultra" },
  { name: "Daniel O.", action: "bought", phone: "iPhone 14 Pro" },
  { name: "Emily R.", action: "sold", phone: "iPhone 13 Pro" },
  { name: "Marcus T.", action: "bought", phone: "Samsung Galaxy S23+" },
  { name: "Aisha B.", action: "sold", phone: "iPhone 12 Mini" },
  { name: "Chris P.", action: "bought", phone: "iPhone 15" },
  { name: "Lena W.", action: "sold", phone: "Samsung Galaxy S22 Ultra" },
  { name: "Noah F.", action: "bought", phone: "iPhone 14 Plus" },
  { name: "Fatima H.", action: "sold", phone: "Samsung Galaxy S22" },
  { name: "Tyler G.", action: "bought", phone: "iPhone 13" },
  { name: "Priya S.", action: "sold", phone: "iPhone 15 Pro" },
  { name: "Ahmed L.", action: "bought", phone: "Samsung Galaxy A54" },
  { name: "Sofia B.", action: "sold", phone: "iPhone 11 Pro Max" },
  { name: "Kevin T.", action: "bought", phone: "iPhone 15 Plus" },
  { name: "Amara J.", action: "sold", phone: "Samsung Galaxy S23 FE" },
  { name: "Ryan C.", action: "bought", phone: "iPhone 16 Pro" },
  { name: "Zara N.", action: "sold", phone: "iPhone 14" },
  { name: "Leon A.", action: "bought", phone: "Samsung Galaxy S24+" },
  { name: "Mia D.", action: "sold", phone: "iPhone 16" },
  { name: "Omar Y.", action: "bought", phone: "iPhone 13 Pro Max" },
  { name: "Nina K.", action: "sold", phone: "Samsung Galaxy Z Flip 5" },
  { name: "Ethan W.", action: "bought", phone: "iPhone 12 Pro Max" },
  { name: "Layla S.", action: "sold", phone: "iPhone 15 Pro Max" },
  { name: "Sean V.", action: "bought", phone: "Samsung Galaxy S23 Ultra" },
  { name: "Hana R.", action: "sold", phone: "iPhone 14 Pro Max" },
  { name: "Caleb M.", action: "bought", phone: "iPhone 16 Plus" },
  { name: "Yara F.", action: "sold", phone: "Samsung Galaxy A53" },
  { name: "Ivan B.", action: "bought", phone: "iPhone 11 Pro" },
  { name: "Grace L.", action: "sold", phone: "iPhone 13 Mini" },
  { name: "Malik T.", action: "bought", phone: "Samsung Galaxy S21 Ultra" },
  { name: "Ella C.", action: "sold", phone: "iPhone 16 Pro Max" },
  { name: "Ravi P.", action: "bought", phone: "iPhone 12 Pro" },
  { name: "Chloe N.", action: "sold", phone: "Samsung Galaxy S24" },
  { name: "Joel A.", action: "bought", phone: "iPhone 15 Pro" },
  { name: "Iris D.", action: "sold", phone: "iPhone 14 Plus" },
  { name: "Tariq H.", action: "bought", phone: "Samsung Galaxy Z Fold 5" },
  { name: "Luna W.", action: "sold", phone: "iPhone 13 Pro" },
  { name: "Felix O.", action: "bought", phone: "iPhone 12" },
  { name: "Nadia R.", action: "sold", phone: "Samsung Galaxy S22+" },
  { name: "Blake S.", action: "bought", phone: "iPhone 16 Pro" },
  { name: "Sana M.", action: "sold", phone: "iPhone 11" },
  { name: "Hugo L.", action: "bought", phone: "Samsung Galaxy Note 20 Ultra" },
  { name: "Lila F.", action: "sold", phone: "iPhone 15 Plus" },
  { name: "Andre B.", action: "bought", phone: "iPhone 14 Pro" },
  { name: "Vera C.", action: "sold", phone: "Samsung Galaxy S23" },
  { name: "Kofi T.", action: "bought", phone: "iPhone 13 Pro Max" },
  { name: "Mila P.", action: "sold", phone: "iPhone 16 Plus" },
  { name: "Jared N.", action: "bought", phone: "Samsung Galaxy A34" },
  { name: "Anya K.", action: "sold", phone: "iPhone 12 Mini" },
  { name: "Diego R.", action: "bought", phone: "iPhone 15 Pro Max" },
  { name: "Freya A.", action: "sold", phone: "Samsung Galaxy S24 Ultra" },
  { name: "Noel D.", action: "bought", phone: "iPhone 14" },
  { name: "Zoe H.", action: "sold", phone: "iPhone 13" },
  { name: "Aryan W.", action: "bought", phone: "Samsung Galaxy Z Flip 4" },
  { name: "Isla O.", action: "sold", phone: "iPhone 15" },
  { name: "Miles B.", action: "bought", phone: "iPhone 16 Pro Max" },
  { name: "Leah S.", action: "sold", phone: "Samsung Galaxy S21+" },
  { name: "Owen M.", action: "bought", phone: "iPhone 12 Pro Max" },
  { name: "Jana L.", action: "sold", phone: "iPhone 14 Pro Max" },
  { name: "Eli F.", action: "bought", phone: "Samsung Galaxy S22 Ultra" },
  { name: "Tara C.", action: "sold", phone: "iPhone 13 Mini" },
  { name: "Kai P.", action: "bought", phone: "iPhone 15 Pro" },
  { name: "Rosa N.", action: "sold", phone: "Samsung Galaxy A14" },
  { name: "Liam T.", action: "bought", phone: "iPhone 11 Pro Max" },
  { name: "Hana K.", action: "sold", phone: "iPhone 16" },
  { name: "Sam R.", action: "bought", phone: "Samsung Galaxy S24 FE" },
  { name: "Nia A.", action: "sold", phone: "iPhone 14 Plus" },
  { name: "Theo D.", action: "bought", phone: "iPhone 13 Pro" },
  { name: "Ruba H.", action: "sold", phone: "Samsung Galaxy Z Fold 4" },
  { name: "Max W.", action: "bought", phone: "iPhone 15 Plus" },
  { name: "Alma O.", action: "sold", phone: "iPhone 12 Pro" },
  { name: "Ivan S.", action: "bought", phone: "Samsung Galaxy S23+" },
  { name: "Cora M.", action: "sold", phone: "iPhone 16 Pro" },
  { name: "Rex L.", action: "bought", phone: "iPhone 14 Pro Max" },
  { name: "Yuna F.", action: "sold", phone: "Samsung Galaxy Note 20" },
  { name: "Beck C.", action: "bought", phone: "iPhone 13 Pro Max" },
  { name: "Dina P.", action: "sold", phone: "iPhone 15 Pro Max" },
  { name: "Troy N.", action: "bought", phone: "Samsung Galaxy S21" },
  { name: "Mara T.", action: "sold", phone: "iPhone 12 Mini" },
  { name: "Finn K.", action: "bought", phone: "iPhone 16 Plus" },
  { name: "Sara R.", action: "sold", phone: "Samsung Galaxy S22" },
  { name: "Luke A.", action: "bought", phone: "iPhone 14" },
  { name: "Jade D.", action: "sold", phone: "iPhone 13" },
  { name: "Cyrus H.", action: "bought", phone: "Samsung Galaxy S24+" },
  { name: "Nora W.", action: "sold", phone: "iPhone 15" },
  { name: "Beau O.", action: "bought", phone: "iPhone 11 Pro" },
  { name: "Tia B.", action: "sold", phone: "Samsung Galaxy A53" },
  { name: "Axel S.", action: "bought", phone: "iPhone 16 Pro Max" },
  { name: "Faye M.", action: "sold", phone: "iPhone 14 Plus" },
  { name: "Kurt L.", action: "bought", phone: "Samsung Galaxy Z Flip 5" },
  { name: "Lara F.", action: "sold", phone: "iPhone 15 Pro" },
  { name: "Drew C.", action: "bought", phone: "iPhone 13 Pro" },
  { name: "Sena P.", action: "sold", phone: "Samsung Galaxy S23 Ultra" },
  { name: "Jace N.", action: "bought", phone: "iPhone 12 Pro Max" },
  { name: "Rina T.", action: "sold", phone: "iPhone 16" },
  { name: "Cole K.", action: "bought", phone: "Samsung Galaxy S22+" },
  { name: "Ada R.", action: "sold", phone: "iPhone 14 Pro" },
];

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

  const show = useCallback(() => {
    clearTimers();
    const pick =
      NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
    setCurrent(pick);

    // Trigger enter animation
    setPhase("in");
    addTimer(() => setPhase("show"), 50);

    // Auto-dismiss after 6 seconds
    addTimer(dismiss, 6000);
  }, [dismiss]);

  useEffect(() => {
    // First popup after 3 seconds, then every 30 seconds
    const boot = setTimeout(() => {
      show();
      const interval = setInterval(show, 30000);
      timers.current.push(interval);
    }, 3000);

    return () => {
      clearTimeout(boot);
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

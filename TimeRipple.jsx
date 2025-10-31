import React, { useEffect, useState } from "react";

const getTimeColor = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return ["#FFB347", "#FFCC33"]; // morning
  if (hour >= 12 && hour < 18) return ["#00C9FF", "#92FE9D"]; // afternoon
  if (hour >= 18 && hour < 21) return ["#ff6a00", "#ee0979"]; // evening
  return ["#141E30", "#243B55"]; // night
};

const TimeRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [gradient, setGradient] = useState(getTimeColor());

  useEffect(() => {
    const interval = setInterval(() => setGradient(getTimeColor()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    const ripple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 1000);
  };

  return (
    <div
      onClick={handleClick}
      className="h-screen w-screen relative overflow-hidden cursor-pointer transition-all duration-700"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full opacity-70 pointer-events-none animate-ripple"
          style={{
            top: ripple.y - 25,
            left: ripple.x - 25,
            width: 50,
            height: 50,
            background: "white",
          }}
        ></span>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
        ⏰ {new Date().toLocaleTimeString()}
      </div>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(15);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TimeRipple;

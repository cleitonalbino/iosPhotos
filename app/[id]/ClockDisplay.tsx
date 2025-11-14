"use client";

import { useEffect, useState, memo } from "react";

interface ClockDisplayProps {
  className?: string;
  timeClassName?: string;
  dateClassName?: string;
}

// Componente Clock isolado e memoizado para evitar re-renders do componente pai
const ClockDisplay = memo(function ClockDisplay({
  className = "",
  timeClassName = "",
  dateClassName = "",
}: ClockDisplayProps) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detecta se é a versão mobile (com fontSize grande) ou desktop (com text-[72px])
  const isMobile = !timeClassName.includes("text-[72px]");

  return (
    <div className={className}>
      <div
        className={dateClassName}
        style={{
          textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        {dateTime.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </div>
      <div
        className={timeClassName}
        style={
          isMobile
            ? {
                fontSize: "150px",
                lineHeight: "1",
                textShadow:
                  "0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)",
              }
            : {
                textShadow:
                  "0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)",
              }
        }
      >
        {dateTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
    </div>
  );
});

export default ClockDisplay;

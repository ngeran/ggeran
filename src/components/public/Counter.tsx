"use client";

import { useEffect, useState } from "react";

export default function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(Math.max(0, target - 1000));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let start = Math.max(0, target - 1000);
    const duration = 2000;
    const increment = (target - start) / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  if (!mounted) {
    return (
      <span className="font-display text-6xl md:text-8xl text-machine-white">
        {target.toLocaleString()}
      </span>
    );
  }

  return (
    <span className="font-display text-6xl md:text-8xl text-machine-white">
      {count.toLocaleString()}
    </span>
  );
}

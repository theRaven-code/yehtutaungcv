import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateSparkle = () => ({
  id: Math.random(),
  createdAt: Date.now(),
  color: "white",
  size: Math.random() * 10 + 5,
  style: {
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    zIndex: 2,
  },
});

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    const sparkleCount = 5;
    const newSparkles = Array.from({ length: sparkleCount }, () =>
      generateSparkle()
    );
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute inline-block"
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5,
          }}
          style={sparkle.style}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
};

export default Sparkles;

export const COLORS = {
  canvas: "#FFFFFF",
  ink: "#18181A",
  inkSoft: "#34363A",
  signal: "#FFC629",
  velocity: "#FF4757",
  trust: "#2F6FFF",
};

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1];
export const EASE_BOUNCY = [0.34, 1.56, 0.64, 1];

export const MOTION = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SIGNATURE } },
  },
  popUp: {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_BOUNCY } },
  },
  stagger: {
    show: { transition: { staggerChildren: 0.08 } },
  },
};

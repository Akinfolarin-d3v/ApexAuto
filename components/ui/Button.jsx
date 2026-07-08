import { clsx } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-signal text-ink hover:bg-signal-dim shadow-pop",
  secondary: "bg-trust text-canvas hover:bg-trust-dim shadow-friendly",
  dark: "bg-ink text-canvas hover:bg-ink-soft",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-canvas",
  ghost: "text-ink hover:bg-steel-100",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-body font-bold",
        "transition-all duration-300 ease-bouncy hover:scale-[1.03] active:scale-[0.96]",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

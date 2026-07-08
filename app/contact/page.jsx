import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact — LoisnX",
  description: "Get in touch with the LoisnX team.",
};

const INFO = [
  { icon: Mail, label: "hello@loisnx.com" },
  { icon: Phone, label: "+1 (512) 555-0142" },
  { icon: MapPin, label: "484 Meridian Ave, Austin, TX" },
  { icon: Clock, label: "Mon–Sat, 8am–7pm CT" },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="container-page py-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow bg-trust-tint text-trust-dim">Get in touch</p>
            <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">
              We're here to help.
            </h1>
            <p className="mt-4 max-w-sm text-steel-600">
              Questions about a specific car, financing, or your order? Send
              a message and a real person gets back to you — usually the
              same day.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-steel-600">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-steel-100 text-ink">
                    <item.icon size={16} strokeWidth={1.75} />
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-steel-200 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export const FAQ_GROUPS = [
  {
    category: "Buying",
    questions: [
      {
        q: "Is the price I see the price I pay?",
        a: "Yes. Every listed price is what you'd pay, plus tax and a flat documentation fee shown clearly at checkout. There's no back-and-forth negotiation and no dealer markup added later.",
      },
      {
        q: "Can I actually complete a purchase entirely online?",
        a: "Yes. Trim selection, financing or paying in full, extras, trade-in, and final review all happen in one guided checkout, and you'll get a confirmed order with a real order number at the end.",
      },
      {
        q: "Do you offer test drives?",
        a: "Yes — after checkout, a specialist reaches out within 24 hours to schedule delivery or a test drive at a time that works for you.",
      },
    ],
  },
  {
    category: "Financing",
    questions: [
      {
        q: "How accurate is the payment calculator?",
        a: "It uses a standard amortization formula with the APR and term you select, so the math itself is exact — your final rate is confirmed by a credit check with your lender.",
      },
      {
        q: "Can I finance and still put money down?",
        a: "Yes — the down payment slider in both the checkout flow and the standalone Payment Calculator adjusts your estimated monthly payment in real time.",
      },
      {
        q: "What credit tiers are supported?",
        a: "Excellent, Good, Fair, and Limited, each mapped to a representative APR range so you can see how credit affects your payment before you ever apply.",
      },
    ],
  },
  {
    category: "Trade-In",
    questions: [
      {
        q: "How is my trade-in value calculated?",
        a: "From your car's year, mileage, condition, and accident history, using a transparent formula shown right on the estimate page — not a black-box number.",
      },
      {
        q: "Can I apply my trade-in directly to a purchase?",
        a: "Yes — get an estimate from any car's detail page or the standalone Trade-In page, and it carries into that vehicle's checkout as a credit toward your total.",
      },
    ],
  },
  {
    category: "Account & Admin",
    questions: [
      {
        q: "What does the Admin dashboard do?",
        a: "It's a full inventory manager — add, edit, and delete listings, change availability, toggle featured cars, and upload photos through Cloudinary.",
      },
      {
        q: "Do admin changes show up on the live site immediately?",
        a: "With real Firestore keys configured, yes, everywhere, instantly. Without keys, admin changes are fully functional inside the Admin section itself but stay local to your browser, since there's no live database behind the public pages yet.",
      },
    ],
  },
];

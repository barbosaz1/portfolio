const whatsappNumber = "351914220304";
const whatsappDefaultMessage =
  "Hi Rodrigo, I found your portfolio and I'd like to talk about a project.";

export const siteConfig = {
  name: "Rodrigo Barbosa",
  title: "Rodrigo Barbosa — Software Developer",
  description:
    "Rodrigo Barbosa is a Software Developer building fast, meticulously crafted software — from websites to the developer tools behind them.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://0xbarbosa.dev",
  ogImage: "/og-image.png",
  resumeUrl: "/resume/Rodrigo_Barbosa_Resume.pdf",
  email: "rb6544758@gmail.com",
  location: "Portugal",
  social: {
    github: "https://github.com/barbosaz1",
  },
  whatsapp: {
    number: whatsappNumber,
    href: (message: string = whatsappDefaultMessage) =>
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
  },
  emailHref: (subject = "Project inquiry") =>
    `mailto:rb6544758@gmail.com?subject=${encodeURIComponent(subject)}`,
} as const;

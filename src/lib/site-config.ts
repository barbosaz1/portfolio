const whatsappNumber = "351914220304";
const whatsappDefaultMessage =
  "Hi Rodrigo, I found your portfolio and I'd like to get in touch.";

export const siteConfig = {
  name: "Rodrigo Barbosa",
  firstName: "Rodrigo",
  lastName: "Barbosa",
  initials: "RB",
  role: "Software Developer",
  discipline: "Computer Engineering",
  title: "Rodrigo Barbosa - Software Developer",
  description:
    "Portfolio of Rodrigo Barbosa, a software developer and Computer Engineering student building software where engineering rigor meets design clarity.",
  statement:
    "Building software where engineering rigor meets design clarity - from Spring Boot backends to the interfaces people actually touch.",
  status: "Open to new opportunities",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://0xbarbosa.dev",
  ogImage: "/og-image.png",
  resumeUrl: "/resume/Rodrigo_Barbosa_Resume.pdf",
  resumeFileName: "Rodrigo_Barbosa_Resume.pdf",
  portrait: "/images/rodrigo-barbosa.png",
  email: "rb6544758@gmail.com",
  location: "Portugal",
  relocation: "Open to relocation",
  timezone: "Europe/Lisbon",
  city: "Lisbon time",
  social: {
    github: "https://github.com/barbosaz1",
    githubHandle: "@barbosaz1",
  },
  whatsapp: {
    number: whatsappNumber,
    display: "+351 914 220 304",
    href: (message: string = whatsappDefaultMessage) =>
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
  },
  emailHref: (subject = "Getting in touch") =>
    `mailto:rb6544758@gmail.com?subject=${encodeURIComponent(subject)}`,
} as const;

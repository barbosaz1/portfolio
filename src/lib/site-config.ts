const whatsappNumber = "351914220304";
const whatsappDefaultMessage =
  "Hi Rodrigo, I found your portfolio and I'd like to talk about a website project.";

export const siteConfig = {
  name: "Rodrigo Barbosa",
  title: "Rodrigo Barbosa — Web Development",
  description:
    "Rodrigo Barbosa is a Web Developer & Frontend Engineer building fast, modern, meticulously crafted websites for brands that refuse to look ordinary.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://0xbarbosa.dev",
  ogImage: "/og-image.png",
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
  emailHref: (subject = "Website project inquiry") =>
    `mailto:rb6544758@gmail.com?subject=${encodeURIComponent(subject)}`,
} as const;

// Site-wide settings. Everything here is available in templates as {{ site.x }}.
export default {
  title: "Ant Cooper",
  description:
    "Notes on macOS, iPad, and the tools I use to get things done — by Ant Cooper.",
  url: "https://antcooper.com",
  language: "en-GB",
  author: {
    name: "Ant Cooper",
    email: "antjcooper@gmail.com",
  },
  avatar: "/assets/images/avatar.jpg",
  // Shown as the button at the top right. Set to null to remove it.
  cta: {
    text: "Also on Micro.blog",
    url: "https://micro.blog/antcooper",
  },
  buildYear: new Date().getFullYear(),
};

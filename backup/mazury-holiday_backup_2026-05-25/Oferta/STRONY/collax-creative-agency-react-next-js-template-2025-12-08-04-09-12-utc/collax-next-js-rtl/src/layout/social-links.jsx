import Link from "next/link";

const social_links = [
  { link: "http://facebook.com", target: "_blank", icon: "fab fa-facebook-f" },
  { link: "http://twitter.com", target: "_blank", icon: "fab fa-twitter" },
  { link: "https://www.skype.com/en/", target: "_blank", icon: "fab fa-skype" },
  {
    link: "https://www.youtube.com/",
    target: "_blank",
    icon: "fab fa-youtube",
  },
];

const hero_socials = [
  {
    num: 1,
    link: "http://facebook.com",
    target: "_blank",
    icon: "fab fa-facebook-f social-icon-1",
    title: "Facebook",
  },
  {
    num: 3,
    link: "https://www.youtube.com/",
    target: "_blank",
    icon: "fab fa-youtube social-icon-3",
    title: "Youtube",
  },
  {
    num: 2,
    link: "http://twitter.com",
    target: "_blank",
    icon: "fab fa-twitter social-icon-2",
    title: "Twitter",
  },
];

export const HeroSocials = ({ hide_title = false }) => {
  return (
    <>
      {hero_socials.map((l, i) => (
        <Link
          key={i}
          href={l.link}
          className={`social-icon-${l.num}`}
          target={l.target ? l.target : ""}
        >
          <i className={l.icon}></i>
          {hide_title ? "" : l.title}
        </Link>
      ))}
    </>
  );
};

const SocialLinks = () => {
  return (
    <>
      {social_links.map((l, i) => (
        <Link key={i} href={l.link} target={l.target ? l.target : ""}>
          <i className={l.icon}></i>
        </Link>
      ))}
    </>
  );
};

export default SocialLinks;

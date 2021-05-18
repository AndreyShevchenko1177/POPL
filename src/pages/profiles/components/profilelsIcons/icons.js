import Snapchat from "../../../../assets/snapchat.png";
import Facebook from "../../../../assets/facebook.png";
import Twitter from "../../../../assets/twitter.png";
import Instagram from "../../../../assets/instagram.png";
import Linkedin from "../../../../assets/linkedin.png";
import Venmo from "../../../../assets/venmo.png";
import Whatsapp from "../../../../assets/whatsapp.png";
import Youtube from "../../../../assets/youtube.png";
import Twitch from "../../../../assets/twitch.png";
import Spotify from "../../../../assets/spotify.png";
import TikTok from "../../../../assets/tiktok.png";
import Pinterest from "../../../../assets/pinterest.png";
import NumberIcon from "../../../../assets/number.png";
import MailTo from "../../../../assets/email.png";
import Address from "../../../../assets/address.png";
import FaceTime from "../../../../assets/facetime.png";
import Call from "../../../../assets/call.png";
import ContactCard from "../../../../assets/contactcard.png";
import AppleMusic from "../../../../assets/apple.png";
import SoundCloud from "../../../../assets/soundcloud.png";
import CashApp from "../../../../assets/cashapp.png";
import PayPal from "../../../../assets/paypal.png";
import Safari from "../../../../assets/safari.png";
import Custom from "../../../../assets/customlink.png";
import File from "../../../../assets/file.png";
import LinkTree from "../../../../assets/linktree.png";
import Calendly from "../../../../assets/calendly.png";
import Podcasts from "../../../../assets/podcasts.png";
import OnlyFans from "../../../../assets/onlyfans.png";
import Discord from "../../../../assets/discord.png";
import Yelp from "../../../../assets/yelp.png";
import Ambassador from "../../../../assets/ambassadorIcon.png";
import Clubhouse from "../../../../assets/clubhouse.png";
import EmbeddedVideo from "../../../../assets/embeddedVideo.png";
import PoplPay from "../../../../assets/links/popl_pay.png";

const icons = {
  3: {
    icon: Instagram,
    text: "Instagram",
    placeholder: "Instagram username",
    path: "https://instagram.com/",
  },
  4: {
    icon: Snapchat,
    text: "Snapchat",
    placeholder: "Snapchat username",
    path: "https://www.snapchat.com/add/",
  },
  5: {
    icon: Twitter,
    text: "Twitter",
    placeholder: "Twitter username",
    path: "https://twitter.com/",
  },
  6: {
    icon: Facebook,
    text: "Facebook",
    placeholder: "Facebook profile link",
    path: "",
  },
  7: {
    icon: Linkedin,
    text: "LinkedIn",
    placeholder: "LinkedIn profile link",
    path: "https://linkedin.com/in/",
  },
  8: {
    icon: NumberIcon,
    text: "Text",
    placeholder: "Phone number",
    path: "sms:",
  },
  9: {
    icon: MailTo,
    text: "Email",
    placeholder: "Email address",
    path: "mailto:",
  },
  10: {
    icon: Youtube,
    text: "YouTube",
    placeholder: "Youtube user/channel link",
    path: "http://",
  },
  11: {
    icon: TikTok,
    text: "TikTok",
    placeholder: "TikTok username",
    path: "https://www.tiktok.com/@",
  },
  12: {
    icon: SoundCloud,
    text: "SoundCloud",
    placeholder: "SoundCloud username",
    path: "https://soundcloud.com/",
  },
  13: {
    icon: Spotify,
    text: "Spotify",
    placeholder: "Link to Spotify",
    path: "http://",
  },
  14: {
    icon: AppleMusic,
    text: "Apple Music",
    placeholder: "Link to Apple Music",
    path: "http://",
  },
  15: {
    icon: Venmo,
    text: "Venmo",
    placeholder: "Venmo username",
    path: "https://venmo.com/",
  },
  16: {
    icon: CashApp,
    text: "Cash App",
    placeholder: "Cash App username",
    path: "https://cash.app/$",
  },
  17: {
    icon: PayPal,
    text: "PayPal",
    placeholder: "paypal.me link",
    path: "https://www.paypal.me/",
  },
  18: {
    icon: Whatsapp,
    text: "WhatsApp",
    placeholder: "WhatsApp number",
    path: "https://api.whatsapp.com/send?phone=",
  },
  19: {
    icon: Pinterest,
    text: "Pinterest",
    placeholder: "Pinterest username",
    path: "https://pinterest.com/",
  },
  21: {
    icon: Twitch,
    text: "Twitch",
    placeholder: "Twitch username",
    path: "https://www.twitch.tv/",
  },
  22: {
    icon: ContactCard,
    text: "Contact Card",
    placeholder: "Phone number",
    path: "addtocontacts/",
  },
  23: {
    icon: Custom,
    text: "Custom link",
    placeholder: "Any app or website link",
    path: "http://",
  },
  24: {
    icon: Safari,
    text: "Website",
    placeholder: "Website link",
    path: "http://",
  },
  25: {
    icon: Address,
    text: "Address",
    placeholder: "Business address",
    path: "https://www.google.com/maps/search/?api=1&query=",
  },
  27: {
    icon: FaceTime,
    text: "FaceTime",
    placeholder: "FaceTime number",
    path: "facetime",
  },
  28: {
    icon: Calendly,
    text: "Calendly",
    placeholder: "Calendly link",
    path: "http://",
  },
  29: {
    icon: OnlyFans,
    text: "OnlyFans",
    placeholder: "OnlyFans link",
    path: "http://",
  },
  30: {
    icon: Podcasts,
    text: "Podcasts",
    placeholder: "Apple podcast link",
    path: "http://",
  },
  31: {
    icon: Call,
    text: "Call",
    placeholder: "Phone number",
    path: "tel:",
  },
  33: {
    icon: Discord,
    text: "Discord",
    placeholder: "",
    path: "http://",
  },
  34: {
    icon: Yelp,
    text: "Yelp",
    placeholder: "Yelp link",
    path: "http://",
  },
  35: {
    icon: Ambassador,
    text: "",
    placeholder: "Ambassador referral link",
    path: "http://",
  },
  36: {
    icon: LinkTree,
    text: "Linktree",
    placeholder: "Linktree link",
    path: "http://",
  },
  37: {
    icon: File,
    text: "File",
    placeholder: "Tinder profile link",
    path: "https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/",
  },
  38: {
    icon: Clubhouse,
    text: "Clubhouse",
    placeholder: "Your Clubhouse link",
    path: "http://",
  },
  39: {
    icon: EmbeddedVideo,
    text: "",
    placeholder: "Your video link",
    path: "http://",
  },
  41: {
    icon: PoplPay,
    text: "Popl Pay",
    placeholder: "Name of your product",
    path: "http://",
  },
};

export default icons;

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[var(--color-card)] border-t border-[var(--color-border)] overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            AuctionX
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Experience real-time bidding and win exclusive items at the best prices.
            Built for speed, transparency, and excitement.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Explore</h3>
          <ul className="space-y-3 text-[var(--color-muted)]">
            <li>
              <Link to="/home" className="hover:text-[var(--color-primary)] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/home" className="hover:text-[var(--color-primary)] transition">
                Auctions
              </Link>
            </li>
            <li>
              <Link to="/home" className="hover:text-[var(--color-primary)] transition">
                My Bids
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-3 text-[var(--color-muted)]">
            <li className="hover:text-[var(--color-primary)] transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-[var(--color-primary)] transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-[var(--color-primary)] transition cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect</h3>
          <div className="flex gap-4">

            {[ 
              { icon: <FaFacebookF />, link: "https://www.facebook.com" },
              { icon: <FaInstagram />, link: "https://www.instagram.com" },
              { icon: <FaGithub />, link: "https://github.com/misbah-noor" },
              { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/misbah-noor-9a1b3220b/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-[var(--color-card)] border border-[var(--color-border)] 
                hover:bg-[var(--color-primary)] hover:text-white 
                hover:scale-110 transition duration-300 shadow-md hover:shadow-lg"
              >
                {item.icon}
              </a>
            ))}

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--color-border)] py-6 text-center text-[var(--color-muted)] text-sm">
        © {new Date().getFullYear()} Live Auction House. Built by Misbah Noor 
      </div>
    </footer>
  );
};

export default Footer;
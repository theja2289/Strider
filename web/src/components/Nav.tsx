import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/#m3", label: "M3" },
  { to: "/#exploded", label: "Inside" },
  { to: "/#software", label: "Software" },
  { to: "/#industries", label: "Industries" },
  { to: "/films", label: "Films" },
  { to: "/press", label: "Press kit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled || pathname !== "/" ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" aria-label="Strider Robotics home"><Logo /></Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-primary btn-sm" to="/#pilot">Book a pilot</Link>
        </div>
      </div>
    </header>
  );
}

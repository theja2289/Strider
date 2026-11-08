import { Link } from "react-router-dom";
import { company } from "@shared/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <Logo />
            <p style={{ maxWidth: 420 }}>{company.positioning} A spin-off from IISc's StochLab, supported by Startup @ ARTPARK. {company.city}.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><Link to="/#m3">M3 quadruped</Link></li>
              <li><Link to="/#exploded">Inside the M3</Link></li>
              <li><Link to="/#software">Autonomy software</Link></li>
              <li><Link to="/#configurator">Mission configurator</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/#journey">Journey</Link></li>
              <li><Link to="/films">Films</Link></li>
              <li><Link to="/press">Press kit</Link></li>
              <li><a href={company.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={company.x} target="_blank" rel="noreferrer">X</a></li>
              <li><a href={company.youtube} target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><Link to="/#pilot">Book a pilot</Link></li>
              <li style={{ maxWidth: 260 }}>{company.address}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Strider Robotic India Pvt. Ltd.</span>
          <span className="mono">Reimagine Safety · Re-engineer Efficiency · Re-prioritize Time</span>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">Saka Keja</Link>

        <nav className="site-nav">
          <Link to="/discover" className="site-nav-link">Discover</Link>
          <Link to="/map" className="site-nav-link">Map</Link>
          <Link to="/messages" className="site-nav-link">Messages</Link>
        </nav>

        <div className="site-header-actions">
          <Link to="/home" className="site-header-btn">Find a Home</Link>
          <div className="site-avatar" aria-hidden="true">S</div>
        </div>
      </div>
    </header>
  );
}
// HashLink: navigates with the hash preserved in the URL so ScrollToTop handles scrollIntoView consistently.
import { useNavigate, useLocation } from "react-router-dom";

export default function HashLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (!to || !to.includes("#")) return; // plain links: let default behavior

    e.preventDefault();
    const [path, hash] = to.split("#");
    const targetPath = path || "/";
    const fullTarget = `${targetPath}#${hash}`;

    if (location.pathname !== targetPath) {
      // Cross-route navigation - keep the hash so ScrollToTop sees it on mount
      navigate(fullTarget);
    } else {
      // Same route - just smooth scroll
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash for shareability without triggering re-render
      window.history.replaceState(null, "", fullTarget);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

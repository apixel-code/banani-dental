// HashLink: navigates to / + smoothly scrolls to section. Works from any route.
import { useNavigate, useLocation } from "react-router-dom";

export default function HashLink({ to, children, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 'to' format: "/#section" or "#section" or "/path"
  const handleClick = (e) => {
    if (!to) return;
    const isHash = to.includes("#");
    if (!isHash) return; // let normal Link/<a> handle plain paths

    e.preventDefault();
    const [path, hash] = to.split("#");
    const targetPath = path || "/";

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: false });
      // wait for new page mount
      setTimeout(scrollToHash, 350);
    } else {
      scrollToHash();
    }
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

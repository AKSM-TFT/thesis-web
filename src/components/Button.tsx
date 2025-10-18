interface ButtonProps {
  label: string;
  icon?: string;
  gradientFrom: string;
  gradientTo: string;
  href?: string;
  onClick?: () => void;
}

function Button({ label, icon, gradientFrom, gradientTo, href = "#", onClick }: ButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={href.startsWith("http") ? "_blank" : undefined} // Open external links in new tab
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined} // Security best practice
      className="w-full sm:w-[180px] flex items-center h-[47.61px] justify-center gap-2 !text-white font-medium px-6 py-2 rounded-md shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl no-underline"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        color: "white",
      }}
    >
      {icon && <span className="text-white">{icon}</span>}
      {label}
    </a>
  );
}

export default Button;
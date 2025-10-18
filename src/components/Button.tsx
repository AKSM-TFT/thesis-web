interface ButtonProps {
  label: string;
  icon?: string;
  gradientFrom: string;
  gradientTo: string;
}

function Button({ label, icon, gradientFrom, gradientTo }: ButtonProps) {
  return (
    <a
      href="#"
      className="flex items-center w-[205px] h-[47.61px] justify-center gap-2 text-white font-medium px-6 py-2 rounded-md shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </a>
  );
}

export default Button;

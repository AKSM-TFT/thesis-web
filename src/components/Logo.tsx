import logo from "../assets/logo.png";

function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="Clairity Logo"
        className="w-32 sm:w-40 md:w-48 drop-shadow-lg select-none"
        draggable={false}
      />
    </div>
  );
}

export default Logo;
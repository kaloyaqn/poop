import React from "react";
import Profile from "../../pages/Profile";
import poopLogo from "../../assets/logo-full.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full mb-8 mt-2    ">
      <a href="/profile">
        <div className="rounded-full w-8 h-8 bg-red-900"></div>
      </a>
      <div className="text-lg font-medium">
        <img src={poopLogo} alt="Poop logo" />
      </div>
      <div>
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 8C16.5 6.4087 15.9205 4.88258 14.8891 3.75736C13.8576 2.63214 12.4587 2 11 2C9.54131 2 8.14236 2.63214 7.11091 3.75736C6.07946 4.88258 5.5 6.4087 5.5 8C5.5 15 2.75 17 2.75 17H19.25C19.25 17 16.5 15 16.5 8Z"
            stroke="#151616"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.5858 21C12.4247 21.3031 12.1934 21.5547 11.915 21.7295C11.6367 21.9044 11.3212 21.9965 11 21.9965C10.6788 21.9965 10.3633 21.9044 10.085 21.7295C9.80665 21.5547 9.57533 21.3031 9.41417 21"
            stroke="#151616"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;

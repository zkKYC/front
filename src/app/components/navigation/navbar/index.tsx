import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Панель администратора" },
    { href: "/commit", label: "Обязательство" },
    { href: "/proof", label: "Доказательства" },
    { href: "/verifier", label: "Верификация" },
    { href: "/domain", label: "Домены" },
    { href: "/offers", label: "Биржа доменов" },
    { href: "/transfer", label: "Переводы" },
  ];

  return (
    <div className="w-full bg-white sticky top-0 z-10">
      <br />
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Logo />
        <div className="md:hidden">
          <button className="text-black" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex gap-x-6 text-black flex-col md:flex-row`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} legacyBehavior>
                <a className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md">
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <Button />
        </div>
      )}
    </div>
  );
};

export default Navbar;

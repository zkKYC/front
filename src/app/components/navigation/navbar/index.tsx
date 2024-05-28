import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-white sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-black">
              <li>
                <Link
                  href="/registration"
                  className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md"
                >
                  <p>Регистрация</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/sbts"
                  className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md"
                >
                  <p>SBTs</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/commit"
                  className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md"
                >
                  <p>Комит</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/proof"
                  className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md"
                >
                  <p>Доказателства</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/domain"
                  className="px-3 py-2 hover:bg-gray-200 hover:text-black block rounded-md"
                >
                  <p>Домены</p>
                </Link>
              </li>
            </ul>
            <Button />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

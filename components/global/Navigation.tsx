"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleHBGmenu = () => setIsOpen(!isOpen);

  const tempUserId: string = "Anthony";
  console.log(path);

  return (
    <nav className="flex items-center">
      <button
        className="block ml-4"
        onClick={toggleHBGmenu}
        aria-label="Toggle menu"
      >
        <svg
          className="h-10 w-10 fill-current text-logo-pumpkin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ul
        className={`absolute left-1 top-1 w-1/3 bg-white border border-gray-200 shadow-lg rounded-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button onClick={toggleHBGmenu}>
          <svg
            className="mt-3 h-10 w-10 fill-current text-logo-pumpkin"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>

        <Link href={`/user/${tempUserId}`}>
          <li
            className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
              path === `/user/${tempUserId}`
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            User
          </li>
        </Link>
        <Link href="/plan/diet">
          <li
            className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
              path === "/plan/diet"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            Diet Plan
          </li>
        </Link>

        <Link href="/plan/workout">
          <li
            className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
              path === "/plan/workout"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            Workout Plan
          </li>
        </Link>
        <Link href="/summary/diet">
          <li
            className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
              path === "/summary/diet"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            Diet Summary
          </li>
        </Link>
        <Link href="/summary/workout">
          <li
            className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
              path === "/summary/workout"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            Workout Summary
          </li>
        </Link>
      </ul>

      <div className="flex justify-center items-center">
        <Link href="/">
          <img
            src="/my_body_buddy_logo_transparent.png"
            alt="logo"
            className="h-20 w-20"
          />
        </Link>
      </div>
    </nav>
  );
}

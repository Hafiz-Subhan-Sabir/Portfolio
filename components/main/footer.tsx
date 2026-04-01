import Link from "next/link";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent text-gray-700 dark:text-gray-200 shadow-lg px-4 py-4 sm:px-6">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="h-auto flex flex-col items-center sm:items-start justify-start"
            >
              <h3 className="font-bold text-[16px] text-gray-900 dark:text-white">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target={link.startsWith("/") || link.startsWith("#") ? undefined : "_blank"}
                  rel={link.startsWith("/") || link.startsWith("#") ? undefined : "noreferrer noopener"}
                  className="flex flex-row items-center my-[15px] text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-[15px] ml-[6px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[15px] text-center text-gray-600 dark:text-gray-400">
          &copy; 2026 Hafiz Subhan | All Rights Reserved.
        </div>
      </div>
    </div>
  );
};


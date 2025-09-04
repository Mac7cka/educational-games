import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-end text-gray-600 text-sm">
        
        <p className="text-end md:text-right">
          Copyright ⓒ {year} All rights reserved. Design by{" "}
          <a
            href="https://portfolio-mh-psi.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Marcela Huťanová
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

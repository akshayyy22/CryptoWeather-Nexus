import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 mt-10 flex flex-col justify-center items-center gap-4">
      <p className="text-sm">Follow me on:</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/akshayyy22"
          target="_blank"
          rel="noreferrer"
          aria-label="akshayyy22 on GitHub"
        >
          <Github className="h-5 w-5 stroke-[0.75]" />
        </a>
        <a
          href="https://www.linkedin.com/in/akshay-esackimuthu/"
          target="_blank"
          rel="noreferrer"
          aria-label="Akshay Esackimuthu on LinkedIn"
        >
          <Linkedin className="h-5 w-5 stroke-[0.75]" />
        </a>
        {/* <a
          href=""
          target="_blank"
          rel="noreferrer"
          aria-label="AakashSharma on X/Twitter"
        >
          <Twitter className="h-5 w-5 stroke-[0.75]" />
        </a> */}
      </div>
      <a
        href="https://personal-portfolio-two-neon-53.vercel.app/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit my Portfolio"
        className="group"
      >
        Created By{" "}
        <span className="font-semibold transition-all ease-in-out group-hover:text-blue-500 decoration-wavy decoration-1 group-hover:underline underline-offset-[6px]">
          Akshay Esackimuthu
        </span>
      </a>
    </footer>
  );
}

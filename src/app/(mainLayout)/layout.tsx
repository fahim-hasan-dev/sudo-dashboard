"use client";

import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#07080a] text-white flex flex-col justify-center items-center relative overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-10 select-none">
      {/* Premium Background Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#2ac5f4]/8 blur-[120px] md:blur-[180px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#ff8f23]/5 blur-[120px] md:blur-[180px] pointer-events-none select-none z-0" />
      <div className="absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-[#3b82f6]/5 blur-[150px] md:blur-[200px] pointer-events-none select-none z-0" />

      {/* Main Container */}
      <div className="w-full max-w-[500px] z-10 flex flex-col items-center gap-6 my-auto">
        {/* Logo Container */}
        <div className="flex flex-col items-center gap-3 md:gap-4 mb-1 select-none pointer-events-none">
          <Image
            src="/logo-image.png"
            alt="Sudo Logo Icon"
            width={150}
            height={76}
            priority
            className="h-16 md:h-[76px] w-auto object-contain"
          />
          <Image
            src="/logo-text.png"
            alt="Sudo Logo Text"
            width={110}
            height={22}
            priority
            className="h-5 md:h-[22px] w-auto object-contain"
          />
        </div>

        {/* Auth Content Card */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

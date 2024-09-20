import React, { useRef } from "react";
import x from "@/assets/x.svg";
import Image from "next/image";
import logo from "@/assets/logoside.png";
import Link from "next/link";

export default function Sidebar({ handleSide, isSideOpen }) {
  const sidebarRef = useRef(null);

  const handleClickOutside = (e) => {
    // Verifica si el clic ocurrió fuera del sidebar
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      handleSide(); // Cierra el sidebar si el clic fue afuera
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 transform transition-transform duration-500 ease-in-out  ${
        isSideOpen ? "" : "pointer-events-none" // Solo permite clics cuando el sidebar está abierto
      }`}
      onClick={handleClickOutside}
    >
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`absolute top-0 right-0 h-[100vh] w-[250px] bg-custom-gradient rounded-tl-[50px] transform transition-transform duration-500 ease-in-out ${
          isSideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleSide}>
          <Image
            className="absolute right-4 top-6 w-[30px] hover:scale-105 transition-all hover:bg-blue-400 rounded-lg"
            src={x}
            alt="exit"
          />
        </button>
        <div>
          <h2 className="font-poppins text-white text-2xl ml-8 ">Menu</h2>
        </div>

        <div className="mt-8">
          <Link href="/">
            <div className="sider flex h-[40px] cursor-pointer items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-3"
              >
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
              </svg>
              <p className="ml-2">Home</p>
            </div>
          </Link>

          <Link href="/patologia">
            <div className="sider flex h-[40px] mt-2 cursor-pointer items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-3"
              >
                <path d="M15.794 11.09c.332-.263.648-.542.947-.84l.136-.142c.283-.293.552-.598.801-.919l.062-.075c.255-.335.486-.688.702-1.049l.128-.22c.205-.364.395-.737.559-1.123.02-.047.035-.095.055-.142.147-.361.274-.731.383-1.109.021-.07.044-.14.063-.211.107-.402.189-.813.251-1.229.013-.087.021-.175.032-.263.051-.432.087-.869.087-1.311V2h-2v.457c0 .184-.031.361-.042.543H6.022C6.012 2.819 6 2.64 6 2.457V2H4v.457c0 4.876 3.269 9.218 7.952 10.569l.028.009c2.881.823 5.056 3.146 5.769 5.965H6.251l.799-2h7.607a7.416 7.416 0 0 0-2.063-2h-4c.445-.424.956-.774 1.491-1.09a9.922 9.922 0 0 1-2.08-1.014C5.55 14.812 4 17.779 4 21.015V23h2v-1.985L6.001 21h11.998l.001.015V23h2v-1.985c0-3.83-2.159-7.303-5.443-9.07a11.1 11.1 0 0 0 1.072-.729c.055-.042.11-.082.165-.126zm-1.19-1.604a8.945 8.945 0 0 1-2.325 1.348c-.092.036-.185.068-.278.102A8.95 8.95 0 0 1 8.836 9h6.292c-.171.161-.332.333-.517.48l-.007.006zM17.619 5c-.005.016-.007.033-.012.049l-.044.151a9.089 9.089 0 0 1-.513 1.252c-.096.19-.213.365-.321.548h-9.48a9.066 9.066 0 0 1-.871-2h11.241z"></path>
              </svg>
              <p className="ml-2">Patologia</p>
            </div>
          </Link>

          <div className="sider flex h-[40px] mt-2 cursor-pointer items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-3"
            >
              <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
              <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
            </svg>
            <p className="ml-2">Citas</p>
          </div>

          <div className="sider flex h-[40px] mt-2 cursor-pointer items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-3"
            >
              <path d="M21 4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V4zM5 4h14v7H5V4zm0 16v-7h14.001v7H5z"></path>
              <path d="M14 7h-4V6H8v3h8V6h-2zm0 8v1h-4v-1H8v3h8v-3z"></path>
            </svg>
            <p className="ml-2">Expedientes</p>
          </div>

          <Link href="/cortes">
            <div className="sider flex h-[40px] mt-2 cursor-pointer items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-3"
              >
                <path d="M21 5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5zM5 19V5h14l.002 14H5z"></path>
                <path d="M7 7h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6zm-4 4h1.998v2H7zm4 0h6v2h-6z"></path>
              </svg>
              <p className="ml-2">Cortes</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-center">
          <Image
            className="absolute bottom-1 w-[240px] "
            src={logo}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import authority from "../vectors/favicon.ico";

const Header = props => {
  const [language, setLanguage] = useState(false);
  useEffect(() => {
    setLanguage(localStorage.getItem("language"));
  }, [language]);

  return (
    <header class="body-font bg-white text-gray-600">
      <div class="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <nav class="flex flex-wrap items-center text-base md:ml-auto lg:w-2/5">
          <button
            class="mr-5 font-bold text-gray-900 hover:text-gray-900"
            onClick={props.item1Click}
          >
            {props.item1}
          </button>
          <button
            class="mr-5 font-bold text-gray-900 hover:text-gray-900"
            onClick={props.item2Click}
          >
            {props.item2}
          </button>
        </nav>
        <button class="title-font order-first mb-4 flex items-center font-medium text-gray-900 md:mb-0 lg:order-none lg:w-1/5 lg:items-center lg:justify-center">
          <img src={authority} class="w-10 rounded-lg" alt="Avatar" />
          <span class="ml-3 text-xl font-bold">{props.waterauthority}</span>
        </button>
        <div class="ml-5 inline-flex lg:ml-0 lg:w-2/5 lg:justify-end">
          <button
            class="mr-5 font-bold text-gray-900 hover:text-gray-900"
            onClick={props.item3Click}
          >
            {props.item3}
          </button>
          <button
            class="mr-5 font-bold text-gray-900 hover:text-gray-900"
            onClick={props.item4Click}
          >
            {props.item4}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React,{useState,useEffect} from 'react';
import authority from '../vectors/favicon.ico';


const Header=(props)=>{

//getting language attribute
const [language,setLanguage]=useState(false)
useEffect(()=>{
    setLanguage(localStorage.getItem("language"));
   },[language]);


    return (
      <header class="text-gray-600 body-font bg-white">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <button
              class="mr-5 text-gray-900 hover:text-gray-900 font-bold"
              onClick={props.item1Click}
            >
              {props.item1}
            </button>
            <button
              class="mr-5 text-gray-900 hover:text-gray-900 font-bold"
              onClick={props.item2Click}
            >
              {props.item2}
            </button>
          </nav>
          <button class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <img src={authority} class="rounded-lg w-10" alt="Avatar" />
            <span class="ml-3 text-xl font-bold">{props.waterauthority}</span>
          </button>
          <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button
              class="mr-5 text-gray-900 hover:text-gray-900 font-bold"
              onClick={props.item3Click}
            >
              {props.item3}
            </button>
            <button
              class="mr-5 text-gray-900 hover:text-gray-900 font-bold"
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
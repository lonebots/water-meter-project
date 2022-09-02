import React, { useState,useEffect } from 'react';
import axios from 'axios';
import url from '../axios/url';
import { useNavigate } from "react-router";
import Header from "../components/Header";


const ChangePassword=()=>{

    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [token,setToken]=useState();
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setToken(localStorage.getItem("dataToken"));
       },[]);

    const changePassword=()=>{
        if(token){
            setLoading(true);
            const data={
                oldPassword:oldPassword,
                newPassword:newPassword
            }
            axios.post(url+"/user/changepassword",data,{
                headers: {
                    Authorization: "Bearers " + token,
                  },
            }).then(res=>{
                console.log(res);
                alert("Password Updated")
                setLoading(false);
            }).catch(err=>{
                alert("Error occured");
                setLoading(false)
            })
        }
      }
        
const navigateHome=()=>{
    navigate("/home");
}       
    

    return (
      <div>
        <Header
          item1="ഹോം"
          item1Click={navigateHome}
          item4=""
          item4Click=""
          waterauthority="കേരള വാട്ടർ അതോറിറ്റി"
        />

        <div class="h-screen bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800">
          <div class="relative top-10 mx-auto p-5 border w-6/12 shadow-lg rounded-md bg-white">
            <div class="mt-3">
              <div class="block p-6 rounded-lg  bg-white max-w-sm">
                <form>
                  <div class="form-group mb-6">
                    <label
                      for="exampleInputEmail1"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      പഴയ പാസ്സ്‌വേർഡ്
                    </label>
                    <input
                      required
                      type="password"
                      class="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-full
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="പഴയ പാസ്സ്‌വേർഡ്"
                      value={oldPassword}
                      onChange={(event) => {
                        setOldPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div class="form-group mb-6">
                    <label
                      for="exampleInputPassword1"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      പുതിയ പാസ്സ്‌വേർഡ്
                    </label>
                    <input
                      required
                      type="password"
                      class="form-control block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-full
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleInputPassword1"
                      placeholder="പുതിയ പാസ്സ്‌വേർഡ് ചേർക്കുക"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    class="
                px-6
                py-2.5
                bg-gray-900
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded-full
                shadow-md
                hover:bg-gray-700 hover:shadow-lg
                focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-gray-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                    id="addcustomer"
                    disabled={loading}
                    onClick={changePassword}
                  >
                    {loading ? "മാറ്റുന്നു..." : "മാറ്റുക"}
                  </button>
                  <button
                    type="reset"
                    class="
                px-6
                py-2.5
                bg-gray-900
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded-full
                shadow-md
                hover:bg-gray-700 hover:shadow-lg
                focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-gray-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                  >
                    കളയുക
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ChangePassword;
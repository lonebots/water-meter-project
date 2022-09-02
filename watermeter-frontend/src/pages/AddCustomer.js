import React, { useState } from "react";
import axios from "axios";
import url from "../axios/url";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [consumer, setConsumer] = useState(0);
  const [phone, setPhoneNumber] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [token, ] = useState();

  const handleRegister = () => {
    setLoading(true);
    const data = {
      name: name,
      consumerNumber: consumer,
      role: "admin",
      password: "hellohello",
      currentThreshold: threshold,
      phoneNumber: phone,
    };

    axios
      .post(url + "/user/register/", data)
      .then((res) => {
        setLoading(false);
        alert("User have successfully registered");
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("An error occured");
      });
  };

       const signOut = () => {
         axios
           .get(url + "/user/logout", {
             headers: {
               Authorization: "Bearers " + token,
             },
           })
           .then((res) => {
             navigate("/login");
             alert("You have successfully logged out");
           })
           .catch((err) => {
             console.log(err);
           });
       };

       const navigateCustomer = () => {
         navigate("/admin-home/addcustomer");
       };
       const navigatePrice = () => {
         navigate("/admin-home/updateprice");
       };

       const navigateHome=()=>{
        navigate("/admin-home")
      }
return (
  <div class="h-screen bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800">
    <Header
      item1="ഹോം"
      item1Click={navigateHome}
        item2="പുതിയ ഉപഭോക്താവ് "
        item2Click={navigateCustomer}
        item3="തുക പുതുക്കുക"
        item3Click={navigatePrice}
        item4="സൈൻ ഔട്ട്"
        item4Click={signOut}
        waterauthority="കേരള വാട്ടർ അതോറിറ്റി"
      />

      <div class="relative top-10 mx-auto p-5 border w-6/12 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="block p-6 rounded-lg  bg-white max-w-sm">
            <form>
              <div class="form-group mb-6">
                <label
                  for="exampleInputEmail1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  പേര്
                </label>
                <input
                  required
                  type="text"
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
                  placeholder="പേര് "
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  ഉപഭോക്ത നമ്പർ
                </label>
                <input
                  required
                  type="number"
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
                  placeholder="CustomerId"
                  value={consumer}
                  onChange={(event) => {
                    setConsumer(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  നിലവിലെ റീഡിങ്
                </label>
                <input
                  type="text"
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
                  placeholder="Current Threshhold"
                  value={threshold}
                  onChange={(event) => {
                    setThreshold(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  ഫോൺ നമ്പർ:
                </label>
                <input
                  type="number"
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
                  placeholder="+91"
                  value={phone}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
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
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "സമർപ്പിക്കുന്നു..." : "സമർപ്പിക്കുക "}
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
  );
};

export default AddCustomer;

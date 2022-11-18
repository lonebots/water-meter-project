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
  const [token] = useState();

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
      .then(res => {
        setLoading(false);
        alert("User have successfully registered");
        console.log(res.data);
      })
      .catch(err => {
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
      .then(res => {
        navigate("/login");
        alert("You have successfully logged out");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigateCustomer = () => {
    navigate("/admin-home/addcustomer");
  };
  const navigatePrice = () => {
    navigate("/admin-home/updateprice");
  };

  const navigateHome = () => {
    navigate("/admin-home");
  };
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

      <div class="relative top-10 mx-auto w-6/12 rounded-md border bg-white p-5 shadow-lg">
        <div class="mt-3">
          <div class="block max-w-sm rounded-lg  bg-white p-6">
            <form>
              <div class="form-group mb-6">
                <label
                  for="exampleInputEmail1"
                  class="form-label mb-2 inline-block text-gray-700"
                >
                  പേര്
                </label>
                <input
                  required
                  type="text"
                  class="form-control
                  m-0
                  block
                  w-full
                  rounded-full
                  border
                  border-solid
                  border-gray-300
                  bg-white bg-clip-padding
                  px-3 py-1.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="പേര് "
                  value={name}
                  onChange={event => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label mb-2 inline-block text-gray-700"
                >
                  ഉപഭോക്ത നമ്പർ
                </label>
                <input
                  required
                  type="number"
                  class="form-control m-0
                  block
                  w-full
                  rounded-full
                  border
                  border-solid
                  border-gray-300
                  bg-white bg-clip-padding
                  px-3 py-1.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="CustomerId"
                  value={consumer}
                  onChange={event => {
                    setConsumer(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label mb-2 inline-block text-gray-700"
                >
                  നിലവിലെ റീഡിങ്
                </label>
                <input
                  type="text"
                  class="form-control m-0
                  block
                  w-full
                  rounded-full
                  border
                  border-solid
                  border-gray-300
                  bg-white bg-clip-padding
                  px-3 py-1.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="Current Threshhold"
                  value={threshold}
                  onChange={event => {
                    setThreshold(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label mb-2 inline-block text-gray-700"
                >
                  ഫോൺ നമ്പർ:
                </label>
                <input
                  type="number"
                  class="form-control m-0
                  block
                  w-full
                  rounded-full
                  border
                  border-solid
                  border-gray-300
                  bg-white bg-clip-padding
                  px-3 py-1.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="+91"
                  value={phone}
                  onChange={event => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                class="
                rounded-full
                bg-gray-900
                px-6
                py-2.5
                text-xs
                font-medium
                uppercase
                leading-tight
                text-white
                shadow-md
                transition duration-150
                ease-in-out hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700
                focus:shadow-lg focus:outline-none
                focus:ring-0
                active:bg-gray-800
                active:shadow-lg"
                id="addcustomer"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "സമർപ്പിക്കുന്നു..." : "സമർപ്പിക്കുക "}
              </button>
              <button
                type="reset"
                class="
                rounded-full
                bg-gray-900
                px-6
                py-2.5
                text-xs
                font-medium
                uppercase
                leading-tight
                text-white
                shadow-md
                transition duration-150
                ease-in-out hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700
                focus:shadow-lg focus:outline-none
                focus:ring-0
                active:bg-gray-800
                active:shadow-lg"
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../axios/url";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const UpdatePrice = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("dataToken"));
  }, []);

  const updatePrice = () => {
    setLoading(true);
    const data = {
      role: "admin",
      currentPrice: price,
      quantity: quantity,
    };
    axios
      .post(url + "/user/changerate", data, {
        headers: {
          Authorization: "Bearers " + token,
        },
      })
      .then(res => {
        setLoading(false);
        alert("Price Updated");
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
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
                  അളവ് (KL)
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
                  placeholder="Select Quantity..."
                  value={quantity}
                  onChange={event => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label mb-2 inline-block text-gray-700"
                >
                  പുതിയ തുക
                </label>
                <input
                  required
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
                  placeholder="Select price..."
                  value={price}
                  onChange={event => {
                    setPrice(event.target.value);
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
                disabled={loading}
                onClick={updatePrice}
              >
                {loading ? "സമർപ്പിക്കുന്നു..." : "സമർപ്പിക്കുക"}
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

export default UpdatePrice;

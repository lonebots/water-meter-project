import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Tile from "../components/Tile";
import url from "../axios/url";
import { useNavigate } from "react-router";

const AdminHome = () => {
  const [consumerData, setConsumerData] = useState([]);
  const [token, setToken] = useState();
  const [search, setSearch] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("dataToken"));
    console.log(token);
  }, []);

  useEffect(() => {
    if (token) {
      const data = {
        role: "admin",
      };
      axios
        .get(url + "/munci/getAllConsumer", data, {
          headers: {
            Authorization: "Bearers " + token,
          },
        })
        .then(res => {
          console.log(res);
          setConsumerData(res.data.consumer);
          console.log(consumerData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [token]);

  const searchSingle = () => {
    const data = { consumer: search };
    console.log(data.consumer);
    axios
      .post(url + "/munci/getSingleConsumer", data)
      .then(res => {
        setConsumerData(res.data.result);
        console.log(consumerData);
      })
      .catch(err => {
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
        navigate("/admin-login");
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

  return (
    <div class="h-screen bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800">
      <Header
        item2="പുതിയ ഉപഭോക്താവ് "
        item2Click={navigateCustomer}
        item3="തുക പുതുക്കുക"
        item3Click={navigatePrice}
        item4="സൈൻ ഔട്ട്"
        item4Click={signOut}
      />

      <div class="mt-20 flex appearance-none items-center justify-center">
        <div class="border-white-400 flex rounded-full border-2 px-3 text-white">
          <input
            type="number"
            class="w-80 appearance-none bg-transparent px-5 py-1 text-white"
            placeholder="Search..."
            onChange={event => {
              setSearch(event.target.value);
            }}
          />
          <button
            class="flex appearance-none items-center justify-center px-4"
            type="button"
            onClick={searchSingle}
          >
            <svg
              class="h-6 w-6 appearance-none text-gray-600"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mx-10 my-10 flex flex-col py-20 px-10">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border bg-gray-300 text-center">
                <thead class="border-b-0">
                  <tr>
                    <th
                      scope="col"
                      class="border-r-4 px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h2 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        ക്രമ. നമ്പർ
                      </h2>
                    </th>
                    <th
                      scope="col"
                      class="border-r-4 px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h3 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        ഉപഭോക്ത നമ്പർ
                      </h3>
                    </th>
                    <th
                      scope="col"
                      class="border-r-4 px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h3 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        നിലവിലെ ഉപഭോഗം (L)
                      </h3>
                    </th>
                    <th
                      scope="col"
                      class="border-r-4 px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h3 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        മീറ്റർ റീഡിങ്
                      </h3>
                    </th>
                    <th
                      scope="col"
                      class="border-r-4 px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h3 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        തുക
                      </h3>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-base font-medium text-gray-900"
                    >
                      <h3 class="border-1 rounded-full border-gray-900 bg-white py-2 px-2">
                        അവസാന അപ്ഡേഷൻ
                      </h3>
                    </th>
                  </tr>
                </thead>

                {consumerData.map(each => (
                  <Tile
                    key={each["id"]}
                    id={each["id"]}
                    consumerId={each["fk_consumerId"]}
                    currentConsumption={each["currentWaterConsumption"]}
                    reading={each["currentMonthlyPrice"]}
                    currentPrice={each["currentMeterReading"]}
                    updatedAt={each["lastUpdate"]}
                  />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

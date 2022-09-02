import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../axios/url";
import PrevTile from "../components/Prevtile";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const PreviousBill = (props) => {
  const [token, setToken] = useState("");
  const [billData, setBillData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("dataToken"));
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(url + "/user/getmyallbill", {
          headers: {
            Authorization: "Bearers " + token,
          },
        })
        .then((res) => {
          console.log(res.data.bill);
          setBillData(res.data.bill);
          console.log(billData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

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

  return (
    <div class="bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800 h-screen">
      <Header
        item1=""
        item2=""
        item3=""
        item3Click=""
        item4="സൈൻ ഔട്ട്"
        item4Click={signOut}
        waterauthority="കേരള വാട്ടർ അതോറിറ്റി"
      />
      ;
      <div class="flex flex-col mx-10 mb-10 mt-5 py-10 px-10 ">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-base font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      ക്ര. നമ്പർ
                    </th>
                    <th
                      scope="col"
                      class="text-base font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      മാസം/വർഷം
                    </th>
                    <th
                      scope="col"
                      class="text-base font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      തുക (&#8377;)
                    </th>
                    <th
                      scope="col"
                      class="text-base font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      സ്റ്റാറ്റസ്
                    </th>
                  </tr>
                </thead>

                {billData.map((each) => (
                  <PrevTile
                    key={each["id"]}
                    id={each["id"]}
                    monthYear={each["monthYear"]}
                    totalCost={each["totalCost"]}
                    status={each["status"]}
                    consumedPrice={each["consumedPrice"]}
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

export default PreviousBill;

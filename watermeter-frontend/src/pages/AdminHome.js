import React from 'react';
import { useEffect,useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Tile from '../components/Tile';
import url from '../axios/url';
import { useNavigate } from "react-router";

const AdminHome = (props) => {

    //State variable
    const [consumerData,setConsumerData]=useState([]);
    const [token,setToken]=useState();
    const [search,setSearch]=useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        setToken(localStorage.getItem("dataToken"));
        console.log(token);
       },[]);

    useEffect(()=>{
        if(token)
        {
         const data={
            role: "admin"
         }
          axios
            .get(url+"/munci/getAllConsumer", data,{
              headers: {
                Authorization: "Bearers " + token,
              },
            })
            .then((res) => {
                console.log(res)
              setConsumerData(res.data.consumer);
              console.log(consumerData);
            })
            .catch((err) => {
              console.log(err);
            });
  
  
        }
       
      },[token]);

      const searchSingle=()=>{
        const data={consumer:search}
        console.log(data.consumer)
        axios.post(url+'/munci/getSingleConsumer',data).then(res=>{
            setConsumerData(res.data.result);
            console.log(consumerData)
        })
        .catch(err=>{
            console.log(err)
        })
      }

      const signOut = () => {
        axios
          .get(url + "/user/logout", {
            headers: {
              Authorization: "Bearers " + token,
            },
          })
          .then((res) => {
            navigate("/admin-login");
            alert("You have successfully logged out");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const navigateCustomer=()=>{
        navigate("/admin-home/addcustomer")
      }
      const navigatePrice=()=>{
        navigate("/admin-home/updateprice")
      }
   

    return (
      <div class="bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800 h-screen">
        <Header
          item2="പുതിയ ഉപഭോക്താവ് "
          item2Click={navigateCustomer}
          item3="തുക പുതുക്കുക"
          item3Click={navigatePrice}
          item4="സൈൻ ഔട്ട്"
          item4Click={signOut}
        />

        <div class="flex items-center justify-center mt-20 appearance-none">
          <div class="flex border-2 rounded-full border-white-400 text-white px-3">
            <input
              type="number"
              class="px-5 py-1 w-80 bg-transparent text-white appearance-none"
              placeholder="Search..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button
              class="flex items-center justify-center px-4 appearance-none"
              type="button"
              onClick={searchSingle}
            >
              <svg
                class="w-6 h-6 text-gray-600 appearance-none"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-col mx-10 my-10 py-20 px-10">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full border text-center bg-gray-300">
                  <thead class="border-b-0">
                    <tr>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4 border-r-4"
                      >
                        <h2 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          ക്രമ. നമ്പർ
                        </h2>
                      </th>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4 border-r-4"
                      >
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          ഉപഭോക്ത നമ്പർ
                        </h3>
                      </th>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4 border-r-4"
                      >
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          നിലവിലെ ഉപഭോഗം (L)
                        </h3>
                      </th>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4 border-r-4"
                      >
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          മീറ്റർ റീഡിങ്
                        </h3>
                      </th>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4 border-r-4"
                      >
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          തുക
                        </h3>
                      </th>
                      <th
                        scope="col"
                        class="text-base font-medium text-gray-900 px-6 py-4"
                      >
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">
                          അവസാന അപ്ഡേഷൻ
                        </h3>
                      </th>
                    </tr>
                  </thead>

                  {consumerData.map((each) => (
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

export default AdminHome

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import url from "../axios/url";

const Home = props => {
  const [screen, setScreen] = useState(0);
  const [token, setToken] = useState("");
  const [payment, setPayment] = useState(false);
  const [price, setPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [lastupdate, setLastupdate] = useState("");
  const [water, setWater] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("dataToken"));
    setUsername(localStorage.getItem("dataUser"));
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(url + "/user/getmybill", {
          headers: {
            Authorization: "Bearers " + token,
          },
        })
        .then(res => {
          if (res.data.bill.status === "unpaid") {
            console.log(res);
            setMonth(res.data.bill.monthYear);
            setPrice(res.data.bill.consumedPrice);
            console.log(res.data.bill.consumedPrice);
          }
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(url + "/user/mydata", {
          headers: {
            Authorization: "Bearers " + token,
          },
        })
        .then(res => {
          console.log(res);
          setWater(res.data.currentWaterConsumption);
          setMonthlyPrice(res.data.currentMonthlyPrice);
          setLastupdate(res.data.lastUpdate);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [token]);

  const handlePayment = () => {
    setPayment(true);
    console.log(token);
    const data = { consumerNumber: localStorage.getItem("dataConsumer") };
    axios
      .post(url + "/user/paybill", data, {})
      .then(res => {
        console.log(res.data);
        alert("Payment Updated");
        setPayment(false);
        setPrice(0);
      })
      .catch(err => {
        console.log(err);
        setPayment(false);
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

  const navigatePassword = () => {
    navigate("/home/changepassword");
  };

  const navigatePrev = () => {
    navigate("/home/prevbill");
  };
  return (
    <div class="h-screen bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800">
      <Header
        item1="പാസ്സ്‌വേർഡ് മാറ്റുക"
        item1Click={navigatePassword}
        item2=""
        item3="മുൻകാല ബിൽ"
        item3Click={navigatePrev}
        item4="സൈൻ ഔട്ട് "
        item4Click={signOut}
        waterauthority="കേരള വാട്ടർ അതോറിറ്റി"
      />
      <div className="flex flex-1 flex-col items-center justify-center py-5 px-5 pb-20 md:px-10 lg:px-20">
        <h1 className="font-Poppins text-4xl font-medium text-white">
          സ്വാഗതം {username}
        </h1>

        <div className="mt-10 w-full rounded bg-white p-10">
          <div className="font-Poppins flex justify-center gap-x-5 text-lg">
            <button
              type="submit"
              className={`w-56 rounded-lg border-black py-1 px-1 font-semibold ${
                screen === 0
                  ? "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
                  : "border"
              }`}
              onClick={() => {
                setScreen(0);
              }}
            >
              കുടിശിക
            </button>
            <button
              className={`w-56 rounded-lg border-black py-3 px-2 font-semibold ${
                screen === 1
                  ? "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
                  : "border"
              }`}
              onClick={() => {
                setScreen(1);
              }}
            >
              നിലവിലെ ഉപഭോഗം
            </button>
          </div>

          <div className="font-Poppins mt-10 text-center">
            {screen === 0 ? (
              <div className="flex flex-col items-center">
                <h2 className="max-w-md text-xl">
                  {month + "  ൽ നിങ്ങൾ അടക്കേണ്ട തുക"}
                </h2>

                <h3 className="mt-5 text-5xl font-medium">
                  <span className="font-sans">₹</span>
                  {price}
                </h3>

                <button
                  className="mt-10 w-56 rounded-full bg-black py-3 text-lg font-bold text-white"
                  onClick={handlePayment}
                  type="button"
                >
                  {payment ? "അടക്കുന്നു..." : "അടക്കുക "}
                </button>
              </div>
            ) : (
              <></>
            )}

            {screen === 1 ? (
              <div className="flex flex-col items-center">
                <h2 className="text-xl">പ്രസ്തുത മാസത്തിലെ ജലോപഭോഗം</h2>
                <h2 className="text-xl">({lastupdate})</h2>

                <h3 className="mt-3 text-5xl font-medium">{water}L</h3>

                <h2 className="mt-10 text-xl">അതായത് </h2>

                <h3 className="mt-3 text-5xl font-medium">
                  <span className="font-sans">₹</span>
                  {monthlyPrice}
                </h3>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

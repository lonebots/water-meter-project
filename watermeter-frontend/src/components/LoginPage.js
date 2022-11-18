import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../axios/url";

const LoginPage = props => {
  const [consumer, setConsumer] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setIsError] = useState(false);
  const [, setData] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      consumerNumber: consumer,
      password: password,
    };
    axios
      .post(url + "/user/login", data)
      .then(res => {
        setData(res.data);
        setConsumer("");
        setPassword("");
        setLoading(false);
        localStorage.setItem("dataToken", res.data.token);
        localStorage.setItem("dataConsumer", res.data.user.consumerNumber);
        localStorage.setItem("dataUser", res.data.user.name);
        navigate(props.page);
      })
      .catch(err => {
        setLoading(false);
        setIsError(true);
        alert("Unauthorized Access");
        console.log(err);
      });
  };

  return (
    <section class="body-font bg-gradient-to-r from-zinc-900 via-sky-900 to-zinc-800 text-gray-600">
      <div class="container mx-auto flex flex-col items-center px-5 py-0 md:flex-row">
        <div class="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <h1 class="title-font mb-4 text-3xl font-medium text-white sm:text-4xl">
            കേരള വാട്ടർ അതോറിറ്റി നിങ്ങളെ സ്വാഗതം ചെയ്യുന്നു..
          </h1>
          <p class="text-white">
            ഗുണനിലവാരമുള്ള ശുദ്ധജലം നൽകാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ് ശുദ്ധജല
            ഉത്പാദനം, വിതരണം, മലിന ജല ശേഖരണം, സംസ്കരണം എന്നിവയുടെ വികസനത്തിനും
            നിയന്ത്രണത്തിനും വേണ്ടി 1984 ലെ കേരള വാട്ടർ ആൻഡ് വേസ്റ്റ് വാട്ടർ
            ഓർഡിനൻസ് പ്രകാരം 1984 ഏപ്രിൽ 1 ന് കേരള വാട്ടർ അതോറിറ്റി സ്ഥാപിതമായി.
          </p>
          <div class="flex justify-center py-10">
            <button class="inline-flex rounded-full border-0 bg-gradient-to-r from-teal-400 via-teal-500  to-teal-600 py-2 px-10 text-lg text-white hover:bg-red-600 focus:outline-none">
              ബന്ധപെടുക!
            </button>
          </div>
        </div>

        <div class="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
          <div class="flex min-h-screen items-center justify-center">
            <div class="mt-4 rounded bg-white px-8 py-20 text-left shadow-lg">
              <h3 class="text-center text-2xl font-bold">{props.logText}</h3>
              <form action="">
                <div class="mt-4">
                  <div>
                    <label class="block" for="email">
                      ലോഗിൻ ഐ. ഡി
                    </label>
                    <input
                      type="text"
                      placeholder={props.admId}
                      value={consumer}
                      class="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      required
                      name="consumer"
                      onChange={event => {
                        setConsumer(event.target.value);
                      }}
                    />
                  </div>
                  <div class="mt-4">
                    <label class="block">പാസ്സ്‌വേർഡ്</label>
                    <input
                      type="password"
                      placeholder="പാസ്സ്‌വേർഡ്"
                      value={password}
                      class="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      required
                      name="password"
                      onChange={event => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div class="flex items-baseline justify-between">
                    <button
                      class="mt-4 rounded-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-8 py-2 text-white hover:bg-gray-200"
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "ലോഡിങ്..." : "ലോഗിൻ"}
                    </button>
                    {/* <a href="#" class="text-sm text-gray-600 hover:underline">
                        Forgot password?
                      </a> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { movieApi } from "../services/MovieApi";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../services/cookie";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (getCookie("token")) {
      navigate(-1);
    }
  }, []);
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await movieApi.get("/authentication/token/new");
      console.log(token);
      if (!token?.data?.request_token) {
        toast.error("something went wrong");
        setLoading(false);
        return;
      }
      const { username, password } = userData;
      movieApi("/authentication/token/validate_with_login", {
        method: "POST",
        data: {
          username,
          password,
          request_token: token?.data?.request_token,
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            toast.success("Login Successfully");
            console.log(res.data);
            setCookie("token", res?.data?.request_token, res?.data?.expires_at);
            navigate("/");
            // clear login history
            window.history.replaceState("", undefined, "/");
          } else {
            toast.error("Login Failed");
          }
          setLoading(false);
        })
        .catch((err) => {
          if (err?.response?.data) {
            toast.error(err.response.data.status_message);
          } else {
            toast.error("something went wrong");
          }
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section className="grid place-items-center md:px-auto px-6 min-h-screen">
      <div className="bg-white p-5 text-gray-900 w-full max-w-md rounded-lg">
        <h4 className="text-3xl mb-2">Sign In</h4>
        <p className="text-sm text-[#505050]">
          Sign in to your self service portal
        </p>
        <form onSubmit={onLogin} className="flex flex-col w-full gap-3 mt-7">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={userData.username}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            value={userData.password}
            onChange={onChange}
          />
          <button className="uppercase text-white rounded-md bg-secondary flex justify-center items-center gap-1 hover:bg-orange-400  py-2 text-lg font-semibold w-full ">
            {loading && <CgSpinner className="animate-spin" />}
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

import { onAuthStateChanged } from "firebase/auth";
import { auth, login, loginWithGoogle, logout, signup } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import streamFiLogo from "../assets/streamfi-logo-white.png";
import googleIcon from "../assets/google-g-icon.png";
import IOSSwitch from "./IOSSwitch";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Log In");
  const [showPassword, setShowPassword] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/");
      }
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
    console.log("Sign Up Success!");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("Sign In Success!");
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
    console.log("Sign In Success!");
  };

  const labelClasses = "text-white text-sm font-semibold mb-2 mt-[12px]";

  return (
    <div className="flex flex-col items-center h-[100vh] w-[100vw] bg-[url('./assets/background-post-malone.png')] bg-cover bg-center">
      <div className="flex flex-col items-center mt-[40px] mb-[80px] md:mb-[120px] lg:mb-[160px]">
        <img src={streamFiLogo} alt="" className="h-[30px] w-auto" />
      </div>
      <div>
        <div className="flex flex-col w-[350px] md:w-[390px] h-auto bg-black bg-opacity-70 backdrop-filter backdrop-blur-md rounded-lg py-2 px-6 mb-6">
          <form className="flex flex-col mb-4">
            <p className="text-[28px] text-white font-semibold mt-4 mb-2">
              Sign Up
            </p>
            <p className={labelClasses}>Username</p>
            <input
              className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={labelClasses}>Email</p>
            <input
              className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={labelClasses}>Password</p>
            <input
              className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-[12px] mb-[24px]">
              <IOSSwitch />
              <label className="text-white text-[12px] font-normal ml-2">
                Remember Me
              </label>
            </div>
            <button
              onClick={(e) => handleSignup(e)}
              className="bg-[#0032ff] hover:bg-[#0033ffb2] rounded-full py-3 text-lg font-semibold text-white"
            >
              Sign Up
            </button>
            <div className="flex justify-center my-4">
              <p className="text-white text-sm font-semibold">OR</p>
            </div>
            <button
              onClick={(e) => handleGoogleSignIn(e)}
              type="submit"
              className="flex items-center justify-center border-[2px] border-[#616161] hover:border-[#ffffff] bg-[#000000] rounded-full py-3 text-lg font-semibold text-[#ffffff] mb-2"
            >
              <img
                src={googleIcon}
                alt="Google icon"
                className="h-6 w-6 mr-2"
              />
              Continue with Google
            </button>
            <div className="flex justify-center mt-6">
              <p className="text-[#999999] text-xs font-normal">
                Don&apos;t have an account?{" "}
                <span className="cursor-pointer font-semibold text-[#ffffff] hover:text-[#0032ff] pl-1">
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <form onSubmit={(e) => handleSignIn(e)}>
          <input
            className="bg-red-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-red-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        <button
          onClick={() => loginWithGoogle()}
          className="p-2 bg-slate-400 text-white mr-4"
        >
          Login with Google
        </button>
        <button
          onClick={() => logout()}
          className="p-2 bg-slate-400 text-white"
        >
          Sign Out
        </button> */
}

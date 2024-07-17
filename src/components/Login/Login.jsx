import { onAuthStateChanged } from "firebase/auth";
import { auth, signUp, login, loginWithGoogle } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import streamFiLogo from "../../assets/streamfi-logo-white.png";
import googleIcon from "../../assets/google-g-icon.png";
import MuiSwitch from "./MuiSwitch";
import eyeShow from "../../assets/icon-password-show.png";
import eyeHide from "../../assets/icon-password-hide.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginPage, setLoginPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
        // window.location.reload();
      }
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signUp(username, email, password);
    console.log("User sign up successfully!");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("User login successfully!");
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
    console.log("Google login successfully!");
  };

  const labelClasses = "text-white text-sm font-semibold mb-2 mt-[12px]";

  return (
    <div className="flex flex-col items-center h-[100vh] w-[100vw] bg-[url('./assets/background-post-malone.png')] bg-cover bg-center">
      <div className="flex flex-col items-center mt-[40px] mb-[80px] md:mb-[120px] lg:mb-[160px]">
        <img src={streamFiLogo} alt="" className="h-[30px] w-auto" />
      </div>
      <div>
        <div className="flex flex-col w-[350px] md:w-[390px] h-auto bg-[#000000a1] backdrop-blur-lg rounded-xl py-2 px-6 mb-6">
          <form className="flex flex-col mb-4">
            <p className="text-[28px] text-white font-semibold mt-4 mb-2">
              {loginPage ? "Login" : "Sign Up"}
            </p>
            {!loginPage && <p className={labelClasses}>Username</p>}
            {!loginPage && (
              <input
                className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <p className={labelClasses}>Email</p>
            <input
              className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={labelClasses}>Password</p>
            <div className="relative flex items-center">
              <input
                className="border-[1px] border-[#616161] focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-4 opacity-25 hover:opacity-50 cursor-pointer z-10 "
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <img src={eyeHide} alt="" className="h-4 w-auto" />
                ) : (
                  <img src={eyeShow} alt="" className="h-4 w-auto" />
                )}
              </span>
            </div>
            <div className="mt-[12px] mb-[24px]">
              <MuiSwitch />
              <label className="text-white text-[12px] font-normal ml-2">
                Remember Me
              </label>
            </div>
            {loginPage ? (
              <button
                onClick={(e) => handleLogIn(e)}
                className="bg-[#0032ff] hover:bg-[#0033ffb2] rounded-full py-3 text-base font-semibold text-white"
              >
                Login
              </button>
            ) : (
              <button
                onClick={(e) => handleSignup(e)}
                className="bg-[#0032ff] hover:bg-[#0033ffb2] rounded-full py-3 text-base font-semibold text-white"
              >
                Sign Up
              </button>
            )}
            <div className="flex justify-center my-4">
              <p className="text-white text-sm font-semibold">OR</p>
            </div>
            <button
              onClick={(e) => handleGoogleSignIn(e)}
              type="submit"
              className="flex items-center justify-center border-[2px] border-[#616161] hover:border-[#ffffff] bg-[#000000] rounded-full py-3 text-base font-semibold text-[#ffffff] mb-2"
            >
              <img
                src={googleIcon}
                alt="Google icon"
                className="h-5 w-5 mr-2"
              />
              Continue with Google
            </button>
            <div className="flex justify-center mt-6">
              <p className="text-[#999999] text-xs font-normal">
                {loginPage
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  onClick={() => setLoginPage((prev) => !prev)}
                  className="cursor-pointer font-semibold text-[#ffffff] hover:text-[#0032ff] pl-1"
                >
                  {loginPage ? "Sign Up" : "Login"}
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

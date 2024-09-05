import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import barcadly from "../../assets/dark.png";
import config from "../../config/default.json";
import { handleSetUser } from "@/store/reducerSlice/authSlice";
import { useLoginUserMutation } from "@/store/apiSlice/authApi";
import { ClipLoader } from "react-spinners";
import { showToastMessage } from "@/utils/showToastNavigate";
import BtnLoader from "@/common/BtnLoader";

// import { Button } from "@/components/ui/button";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const [loginUser,{isLoading, error:loginError}] = useLoginUserMutation();

  useEffect(()=>{
    if(loginError){
      showToastMessage(loginError?.data);
    }
  },[loginError])
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@barcadlyservices\.in$/;

    if (!value) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!regex.test(value)) {
      setError((prev) => ({ ...prev, email: "Invalid Email" }));
    } else {
      setError("");
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    validateEmail(email);
    

    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    }
    const regex = /^[a-zA-Z0-9._%+-]+@barcadlyservices\.in$/;

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    if (
      formData.email &&
      formData.password &&
      regex.test(formData.email) &&
      !!error.password === false
    ) {
      try {
        const response = await loginUser(userData);
        if (response?.data?.success) {
          // Dispatch(handleSetUser(response?.data?.data?.user));
          showToastMessage(response?.data);
          if (response.data.data.user.roleIds[0].roleTag === "TEAM_LEAD") {
            navigate("/dashboard");
            // eslint-disable-next-line no-dupe-else-if
          } else if (
            response.data.data.user.roleIds[0].roleTag === "GRAPHIC_DESIGNER"
          ) {
            navigate("/gd/newTemplates");
          } else if (
            response.data.data.user.roleIds[0].roleTag === "VIDEO_EDITOR"
          ) {
            navigate("/vd/newTemplates");
          }
        }
      } catch (err) {
        showToastMessage(err?.response?.data);
      }
    }
  };
  return (
    <div className="w-full font-custom h-full bg-zinc-50 text-foreground lg:grid  lg:grid-cols-2 ">
      <div className="flex flex-col relative items-center justify-center  py-12">
        <div className="mx-auto grid bg-background p-8 shadow-xl rounded-2xl  w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-relway font-extrabold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              className='bg-background'
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="m@example.com"
                required
              />
              {error?.email && (
                <div className="text-red-600 text-sm">{error?.email}</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  type={showPass ? "text" : "password"}
                  placeholder="******"
                />
                {error?.password && (
                  <div className="text-red-600 text-sm">{error?.password}</div>
                )}
                <div className="absolute z-100 top-2 right-3 ">
                  {showPass ? (
                    <svg
                      onClick={() => setShowPass(!showPass)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowPass(!showPass)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-xs underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button onClick={handleLogin} type="submit" className="w-full">
              {isLoading ? <BtnLoader/>:"Log In"}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden   lg:flex items-center justify-center">
        <img src={barcadly} className="w-[80%]" />
      </div>
    </div>
  );
}

export default Login;

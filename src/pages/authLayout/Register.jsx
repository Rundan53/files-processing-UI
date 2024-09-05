import { Input } from "@/components/ui/input";
// import barcadly from "../../assets/barcadly_no_bg.png";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Button } from "@/components/ui/button";
import config from "../../config/default.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const uuid = searchParams.get("uuid");
    console.log(uuid);
    const checkValidInvite = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/validate-invitation/${uuid}`
        );
        if (!response.data.success) {
          console.log(response.data);
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        navigate("/");
        toast.error(err.response.data.message);
      }
    };
    checkValidInvite();
  }, []);

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleValidation = () => {
    const passwordInputValue = formData.password.trim();
    const passwordInputFieldName = "password";
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.?[#?!@$%^&-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }
      setFormErrors((prev) => ({ ...prev, password: errMsg }));
    }
    // for confirm password
    if (formData.password !== formData.confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is not matched",
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username?.trim()) {
      newErrors.username = "Name is required";
    }

    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Confirm password does not match";
    }
    setFormErrors(newErrors);
    handleValidation();
    console.log(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${config.API_URL}/auth/signup`,
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          navigate("/");
        } else {
          setFormErrors(response.data.error);
        }
      } catch (error) {
        console.error("Registration failed:", error.response.data);

        // const errorMessage = error.response.data.error;
        // setFormErrors({ ...formErrors, email: errorMessage });
      }
    }
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@barcadlyservices\.in$/;
    console.log(value);
    if (!value) {
      setFormErrors({
        ...formErrors,
        email: "Email is required",
      });
    } else if (!regex.test(value)) {
      setFormErrors({
        ...formErrors,
        email: "Invalid Email",
      });
    } else {
      setFormErrors("");
    }
  };

  const handlenameBlur = () => {
    if (/[\d]/.test(formData.username)) {
      setFormErrors({
        ...formErrors,
        username: "Numbers are not allowed",
      });
    } else {
      setFormErrors({
        ...formErrors,
        username: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-zinc-100">
      <Card className="mx-auto shadow-xl h-fit max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  onBlur={handlenameBlur}
                  id="username"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onBlur={() => validateEmail(formData.email)}
                  onChange={handleInputChange}
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                {formErrors.name && (
                  <p className="text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                {formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                onChange={handleInputChange}
                placeholder="*****"
                type="password"
              />
              {formErrors.password && (
                <p className="text-red-500">{formErrors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="*****"
                onChange={handleInputChange}
                type="password"
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500">{formErrors.confirmPassword} </p>
              )}
            </div>
            <Button onClick={handleRegister} type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;

import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const checkForValidMail = async (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse);
    const { email } = userObject;

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: email,
          password: userObject.sub,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-2xl mb-2">Login</h1>
          <p className="text-gray-500">
            Enter your email and password to login to your account
          </p>
          <div className="mb-2 mt-5">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="rachit@kiet.edu"
            />
          </div>
          <div className="mt-2 mb-5">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
            />
          </div>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              checkForValidMail(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <div className="flex flex-col items-center justify-center mt-5">
            <span className="text-sm">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-blue-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600">
                Privacy Policy
              </Link>
            </span>
            <br />
            <span className="text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

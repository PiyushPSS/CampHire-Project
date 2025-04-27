import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Brain, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import SearchComponent from "../SearchComponent";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const isHome = window.location.pathname === "/";

  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={isHome ? "bg-[#cbcfff] pb-6" : "bg-[#fcfcfc] pb-6"}>
      <div className="flex items-center justify-between mx-auto max-w-7xl pt-10">
        <div>
          <Link to="/">
            <h1 className="font-canvaSans font-bold text-[35px]">CampHire.</h1>
          </Link>
        </div>
        <div className="flex items-center gap-12 justify-center">
          <ul className="flex font-canvaSans font-bold text-[18px] items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                {/* {!isHome && <li><Link to="/">home</Link></li>}
                                    <li><Link to="/jobs">jobs</Link></li>
                                    <li><Link to="/browse">browse</Link></li> */}

                <li>
                  {/* <div className="relative">
                    <input
                      type="text"
                      className="rounded-full border-2 border-gray-300 py-2 px-4 w-[500px] focus:outline-none focus:ring-2 font-canvaSans font-normal focus:ring-indigo-500 hover:shadow-md"
                      placeholder="Search jobs..."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          navigate("/browse", { state: searchQuery });
                        }
                      }}
                      value={searchQuery}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      autoFocus={false}
                      required={false}
                      disabled={false}
                      readOnly={false}

                    />


                    <button className="absolute right-2 top-1/2 transform pr-2 -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => {
                      navigate("/browse", { state: searchQuery });
                      setSearchQuery("");
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div> */}
                  <div className="flex justify-center">
                    <SearchComponent navigate={navigate} />
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="rounded-xl text-[16px] py-2 font-semibold font-canvaSans px-6">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-xl text-[16px] py-2 font-semibold font-canvaSans px-6 bg-white border-2 border-black text-black hover:text-white hover:bg-black">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <Brain />
                      <Button variant="link">
                        {" "}
                        <Link
                          to="https://kiet698.examly.io/login"
                          target="_blank"
                        >
                          Take Test
                        </Link>
                      </Button>
                    </div>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

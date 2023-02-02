import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUser } from "../../services/database";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = getUser();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {    
    auth.login(data);
  };

  useEffect(() => {
    if (auth?.error) {
      setError("email", { message: auth?.error });
    }

    if (auth?.error?.message) {
      setError("email", { message: auth?.error?.message });
    }

    if (auth?.error?.response) {
      setError("email", { message: auth?.error?.response?.data?.message });
    }

    if (user) {
      navigate(redirectPath, { replace: true });
    }
    return () => {};
  }, [user, auth.error]);

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  return (
    <>
      <div>
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-12"
                  src={logoUrl}
                />
                <span className="text-white text-xl ml-3"> Cahaya Emas </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign In
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your
                  accounts in one place
                </div>
                <form
                  className="validate-form"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="intro-x mt-8">
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Email"
                      {...register("email")}
                    />
                     {errors.email && (
                      <small className="text-danger mt-2 capitalize font-semibold">
                        {errors.email.message}
                      </small>
                    )}
                    <input
                      type="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <small className="text-danger mt-2 capitalize font-semibold">
                        {errors.password.message}
                      </small>
                    )}
                  </div>

                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      disabled={auth?.isLoading}
                      type="submit"
                      className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                    >
                      { auth?.isLoading ? "Loading..." : "Login"}
                    </button>
                    {/* <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                    Register
                  </button> */}
                  </div>
                </form>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

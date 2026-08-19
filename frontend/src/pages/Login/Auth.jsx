import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    userName: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "student",
  });

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSignUpChange(event) {
    const { name, value } = event.target;
    setSignUpFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(event, formType) {
    event.preventDefault();
    const isLogin = formType === "login";
    const formData = isLogin ? loginFormData : signUpFormData;

    try {
      const res = await fetch(
        isLogin ? "login endpoint" : "sign up endpoint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      )
      if (!res.ok) {
        throw new Error(r.message || "Something went wrong. Please try again.");
      }
      data = res.json()

      if (data.user_type === "admin") {
        navigate("/admin-dash");
      } else if (data.user_type === "student") {
        navigate("/home");
      }
    } catch (err)
    {
      console.error(err)
    }
  }
    

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="relative  w-full max-w-5xl min-h-screen overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* =========================
            LOGIN FORM
        ========================== */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2
            flex items-center justify-center p-12
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-full" : "translate-x-0"}
          `}
        >
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-blue-950">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-500">
              Sign in to continue finding your perfect home.
            </p>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-8 space-y-5" onSubmit={(event) => handleSubmit(event, "login")}>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  placeholder="Your username"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  onChange={handleLoginChange}
                  value={loginFormData.userName}
                />
              </div>            

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                  onClick={()=>{alert("Sorry, we don't have password recovery at this moment")}}
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={handleLoginChange}
                    value={loginFormData.password}
                />
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3.5
                  font-semibold text-white
                  transition hover:bg-blue-700
                  active:scale-[0.98]"
              >
                Login
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-gray-200 py-3
                font-medium text-gray-700
                transition hover:bg-gray-50"
            >
              Continue with Google
            </button>
          </div>
        </div>

        {/* =========================
            SIGNUP FORM
        ========================== */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2
            flex items-center justify-center p-12
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-blue-950">
              Create Account
            </h1>

            <p className="mt-3 text-gray-500">
              Create an account and start your search today.
            </p>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-8 space-y-4" onSubmit={(event) => handleSubmit(event, "signup")}>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={handleSignUpChange}
                    value={signUpFormData.name}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={handleSignUpChange}
                    value={signUpFormData.email}
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={handleSignUpChange}
                    value={signUpFormData.password}
                />
              </div>

              {/* Account type */}
              <div>
                <select
                  className="w-full rounded-xl border border-gray-200
                    bg-white px-4 py-3 text-gray-700
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    name="accountType"
                    value={signUpFormData.accountType}
                    onChange={handleSignUpChange}
                >
                  <option value="">Select account type</option>
                  <option value="student">Student</option>
                  <option value="owner">Property Owner</option>
                </select>
              </div>

              {/* Signup button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3.5
                  font-semibold text-white
                  transition hover:bg-blue-700
                  active:scale-[0.98]"
              >
                Sign up
              </button>
            </form>
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-gray-200 py-3
                font-medium text-gray-700
                transition hover:bg-gray-50"
            >
              Continue with Google
            </button>
          </div>
        </div>

        {/* =========================
            INFORMATION PANEL
        ========================== */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2
            flex items-center justify-center
            bg-blue-600 p-12 text-white
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-0" : "translate-x-0"}
          `}
        >
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-white-600 mb-4">SAKA KEJA</h1>
            {isSignup ? (
              <>
                <h2 className="text-4xl font-bold">
                  Already a member?
                </h2>

                <p className="mt-5 leading-7 text-blue-100">
                  Welcome back! Sign in to continue discovering
                  great student-friendly properties near you.
                </p>

                <button
                  onClick={() => setIsSignup(false)}
                  className="mt-10 rounded-xl border-2 border-white
                    px-10 py-3 font-semibold
                    transition hover:bg-white hover:text-blue-600"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold">
                  Find Your Next Home
                </h2>

                <p className="mt-5 leading-7 text-blue-100">
                  Discover student-friendly accommodation,
                  explore properties near your campus, and
                  find a place that feels like home.
                </p>

                <button
                  onClick={() => setIsSignup(true)}
                  className="mt-10 rounded-xl border-2 border-white
                    px-10 py-3 font-semibold
                    transition hover:bg-white hover:text-blue-600"
                >
                  Create Account
                </button>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

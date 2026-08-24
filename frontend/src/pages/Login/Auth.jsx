import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getLocation from "../../utils/GetLocation"

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
    user_type: "student",
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
          body: JSON.stringify(formData.user_type==="property_manager"? {...formData, ...getLocation}: formData),
        },
      )
      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }
      const data = await res.json()

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
    <div className="flex min-h-screen items-center justify-center bg-surface-container-low p-4 text-on-surface sm:p-6">
      <div className="relative min-h-[680px] w-full max-w-5xl overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-2xl">

        {/* =========================
            LOGIN FORM
        ========================== */}
        <div
          className={`absolute left-0 top-0 flex h-full w-full items-center justify-center p-6 sm:p-10 md:w-1/2 md:p-12
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-full" : "translate-x-0"}
          `}
        >
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-primary">
              Welcome Back
            </h1>

            <p className="mt-3 text-on-surface-variant">
              Sign in to continue finding your perfect home.
            </p>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-8 space-y-5" onSubmit={(event) => handleSubmit(event, "login")}>

              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface-variant">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  placeholder="Your username"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  onChange={handleLoginChange}
                  value={loginFormData.userName}
                />
              </div>            

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-on-surface-variant">
                    Password
                  </label>

                  <button
                  onClick={()=>{alert("Sorry, we don't have password recovery at this moment")}}
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary-container"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition placeholder:text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleLoginChange}
                    value={loginFormData.password}
                />
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3.5
                  font-semibold text-white
                  transition hover:bg-primary-container
                  active:scale-[0.98]"
              >
                Login
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant" />
              <span className="text-sm text-on-surface-variant">OR</span>
              <div className="h-px flex-1 bg-outline-variant" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-outline-variant py-3
                font-medium text-on-surface-variant
                transition hover:bg-surface-container-low"
            >
              Continue with Google
            </button>
          </div>
        </div>

        {/* =========================
            SIGNUP FORM
        ========================== */}
        <div
          className={`absolute left-0 top-0 flex h-full w-full items-center justify-center p-6 sm:p-10 md:w-1/2 md:p-12
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-primary">
              Create Account
            </h1>

            <p className="mt-3 text-on-surface-variant">
              Create an account and start your search today.
            </p>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-8 space-y-4" onSubmit={(event) => handleSubmit(event, "signup")}>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface-variant">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition placeholder:text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleSignUpChange}
                    value={signUpFormData.name}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface-variant">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition placeholder:text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleSignUpChange}
                    value={signUpFormData.email}
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-on-surface-variant">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition placeholder:text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleSignUpChange}
                    value={signUpFormData.password}
                />
              </div>

              {/* Account type */}
              <div>
                <select
                    className="w-full rounded-xl border border-outline-variant
                    bg-surface-container-low px-4 py-3 text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    name="accountType"
                    value={signUpFormData.accountType}
                    onChange={handleSignUpChange}
                >
                  <option value="">Select account type</option>
                  <option value="student">Student</option>
                  <option value="property_manager">Property Manager</option>
                </select>
              </div>

              {/* Signup button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3.5
                  font-semibold text-white
                  transition hover:bg-primary-container
                  active:scale-[0.98]"
              >
                Sign up
              </button>
            </form>
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant" />
              <span className="text-sm text-on-surface-variant">OR</span>
              <div className="h-px flex-1 bg-outline-variant" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-outline-variant py-3
                font-medium text-on-surface-variant
                transition hover:bg-surface-container-low"
            >
              Continue with Google
            </button>
          </div>
        </div>

        {/* =========================
            INFORMATION PANEL
        ========================== */}
        <div
          className={`absolute right-0 top-0 hidden h-full w-1/2
            flex items-center justify-center
            bg-gradient-to-br from-primary to-primary-container p-12 text-white md:flex
            transition-transform duration-700 ease-in-out
            ${isSignup ? "translate-x-0" : "translate-x-0"}
          `}
        >
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold text-tertiary-container">SAKA KEJA</h1>
            {isSignup ? (
              <>
                <h2 className="text-4xl font-bold">
                  Already a member?
                </h2>

                <p className="mt-5 leading-7 text-on-primary-container">
                  Welcome back! Sign in to continue discovering
                  great student-friendly properties near you.
                </p>

                <button
                  onClick={() => setIsSignup(false)}
                  className="mt-10 rounded-xl border-2 border-white
                    px-10 py-3 font-semibold
                    transition hover:bg-white hover:text-primary"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold">
                  Find Your Next Home
                </h2>

                <p className="mt-5 leading-7 text-on-primary-container">
                  Discover student-friendly accommodation,
                  explore properties near your campus, and
                  find a place that feels like home.
                </p>

                <button
                  onClick={() => setIsSignup(true)}
                  className="mt-10 rounded-xl border-2 border-white
                    px-10 py-3 font-semibold
                    transition hover:bg-white hover:text-primary"
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

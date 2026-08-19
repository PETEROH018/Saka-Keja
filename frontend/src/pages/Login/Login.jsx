import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [accountType, setAccountType] = useState("student")

  function handleChange(e) {
    setAccountType(e.target.value)
  }

  function handleSubmit(e) {
    
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
            <form className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                Sign In
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
            <form className="mt-8 space-y-4">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Account type */}
              <div>
                <select
                  className="w-full rounded-xl border border-gray-200
                    bg-white px-4 py-3 text-gray-700
                    outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={(e)=> {handleChange(e)}}
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
                Create Account
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
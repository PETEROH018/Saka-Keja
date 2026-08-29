import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import getLocation from "../../utils/GetLocation";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import CheckPassword, { isPasswordStrong } from "../../utils/CheckPassword";
import validatePhoneNumber from "../../utils/ValidateNumber";
import { useAuth } from "../../context/useAuth"


export function AuthPage() {
  const { user,setUser } = useAuth()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false);
  const [userRole, setUserRole] = useState("student");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+254");
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    user_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "student",
  });

  const [loginFormData, setLoginFormData] = useState({
    userName: "",
    password: "",
  });
  const phoneStatus = validatePhoneNumber(signUpFormData.phone_number, countryCode);

  // const loginAsStudent = () => {
  //       if(loginFormData['userName'] === 'ben' && loginFormData['password'] === '1234'){
  //         setUser({
  //             id: 1,
  //             name: "Ben",
  //             role: "student",
  //             profile: "student",
  //         });
  //         navigate('/')
  //       }
  //       else{
  //         alert("Wrong username or password!")
  //       }
  //     };

  // const loginAsOwner = () => {
  //     if(loginFormData['userName'] === 'ann' && loginFormData['password'] === '1234'){
  //         setUser({
  //             id: 2,
  //             name: "Ann",
  //             role: "owner",
  //             profile: "owner"
  //         });
  //         navigate('/admin-dash')
  //       }
  //     else{
  //         alert("Wrong username or password!")
  //       }
  //     };
  

  // function handleLoginSimulation(event){
  //   if (userRole == 'student'){
  //     loginAsStudent()
  //   }
  //   else{
  //     loginAsOwner()
  //   }
  // }

  // function handleLoginChange(event) {
  //   const { name, value } = event.target;
  //   setLoginFormData((currentData) => ({ ...currentData, [name]: value }));
  // }

  // function handleSignUpChange(event) {
  //   const { name, value } = event.target;
  //   setSignUpFormData((currentData) => ({ ...currentData, [name]: value }));
  // }

  // Login 
  async function login(userName, password, userRole) {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, userRole }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Student login error:", err);
      alert(err.message);
      return { success: false, message: err.message };
    }
  }

  
  async function handleSubmit(event, formType) {
    event.preventDefault();
    const isLogin = formType === "login";

    if (!isLogin) {
      const phoneCheck = validatePhoneNumber(signUpFormData.phone_number, countryCode);
      if (!phoneCheck.isValid) {
        alert("Please enter a valid phone number.");
        return;
      }
      if (!isPasswordStrong(signUpFormData.password)) {
        alert("Please ensure your password is at least 8 characters long and contains mixed characters (uppercase, lowercase, number, and special character).");
        return;
      }
      if (signUpFormData.password !== signUpFormData.confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
    }

    // Handle login submission: route to the correct endpoint based on selected role
    if (isLogin) {
      if (!loginFormData.userName || !loginFormData.password) {
        alert("Please enter both your username and password to log in.");
        return;
      }
      const data = await login(loginFormData.userName, loginFormData.password, userRole)
      setUser(data.token)
      if (data.user_type === "manager") {
        navigate("/admin-dash");
      } else if (data.user_type === "student") {
        navigate("/student-dash");
      }      
    }

    const { confirmPassword, ...signUpPayload } = signUpFormData;
    const cleanPhone = signUpFormData.phone_number.replace(/\D/g, "");
    const formattedPhone = countryCode + (cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone);
    const finalSignUpPayload = {
      ...signUpPayload,
      phone_number: formattedPhone,
    };
    const formData = isLogin ? loginFormData : finalSignUpPayload;

    try {
      const res = await fetch(
        data.user_type === "admin"? "/owners": "/students",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...formData, location: await getLocation()}),
        },
      )
      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }
      const data = await res.json()
      setUser(data.token)
      if (data.user_type === "manager") {
        navigate("/admin-dash");
      } else if (data.user_type === "student") {
        navigate("/student-dash");
      }
    } catch (err)
    {
      console.error(err)
    }
  }
    

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-container-low p-3 sm:p-6 text-on-surface">
      <div className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[680px] w-full max-w-5xl overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-2xl">

        {/* =========================
            LOGIN FORM
        ========================== */}
        <div
          className={`absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-y-auto p-5 sm:p-8 md:w-1/2 md:p-12
            transition-all duration-700 ease-in-out
            ${isSignup
              ? "translate-x-full opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100"
              : "translate-x-0 opacity-100 pointer-events-auto"
            }
          `}
        >
          <div className="w-full max-w-md my-auto">
            {/* Mobile Brand Logo */}
            <div className="mb-4 text-center md:hidden">
              <span className="text-xl font-extrabold tracking-wider text-primary">
                SAKA KEJA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Welcome Back
            </h1>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-on-surface-variant">
              Sign in to continue finding your perfect home.
            </p>
{/* Role Selector */}
            <div className="mb-6 mt-4 flex items-center gap-3">
              <label className="text-sm font-medium text-on-surface-variant">
                Login as:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUserRole("student")}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition
                    ${
                      userRole === "student"
                        ? "border-primary bg-primary text-white"
                        : "border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("manager")}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition
                    ${
                      userRole === "manager"
                        ? "border-primary bg-primary text-white"
                        : "border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                >
                  Manager
                </button>
              </div>
            </div>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={(event) => handleSubmit(event, "login")}>

              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  placeholder="Your username"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  onChange={handleLoginChange}
                  value={loginFormData.userName}
                />
              </div>            

              {/* Password */}
              <div>
                <div className="mb-1.5 sm:mb-2 flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium text-on-surface-variant">
                    Password
                  </label>

                  <button
                  onClick={()=>{alert("Sorry, we don't have password recovery at this moment")}}
                    type="button"
                    className="text-xs sm:text-sm font-medium text-primary hover:text-primary-container"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleLoginChange}
                    value={loginFormData.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none"
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 sm:py-3.5
                  text-sm sm:text-base font-semibold text-white
                  transition hover:bg-primary-container
                  active:scale-[0.98]"
                onClick={()=>{handleLoginSimulation()}}
              >
                Login
              </button>
            </form>

            <div className="my-5 sm:my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant" />
              <span className="text-xs sm:text-sm text-on-surface-variant">OR</span>
              <div className="h-px flex-1 bg-outline-variant" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-outline-variant py-2.5 sm:py-3
                text-sm sm:text-base font-medium text-on-surface-variant
                transition hover:bg-surface-container-low"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Mobile Switch to Signup */}
            <p className="mt-5 text-center text-sm text-on-surface-variant md:hidden">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="font-semibold text-primary hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* =========================
            SIGNUP FORM
        ========================== */}
        <div
          className={`absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-y-auto p-5 sm:p-8 md:w-1/2 md:p-12
            transition-all duration-700 ease-in-out
            ${isSignup
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "-translate-x-full opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100"
            }
          `}
        >
          <div className="w-full max-w-md my-auto">
            {/* Mobile Brand Logo */}
            <div className="mb-4 text-center md:hidden">
              <span className="text-xl font-extrabold tracking-wider text-primary">
                SAKA KEJA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Create Account
            </h1>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-on-surface-variant">
              Create an account and start your search today.
            </p>
            {/* ===============
            FORM
            ===================
             */}
            <form className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4" onSubmit={(event) => handleSubmit(event, "signup")}>

              {/* Name */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  onChange={handleSignUpChange}
                  value={signUpFormData.name}
                />
              </div>

              {/* Username */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Username
                </label>

                <input
                  type="text"
                  name="user_name"
                  placeholder="username123"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  onChange={handleSignUpChange}
                  value={signUpFormData.user_name}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  onChange={handleSignUpChange}
                  value={signUpFormData.email}
                />
              </div>

              {/* Phone number */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Phone number
                </label>

                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="rounded-xl border border-outline-variant bg-surface-container-low px-2.5 py-2.5 sm:px-3 sm:py-3 text-xs sm:text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  >
                    <option value="+254">🇰🇪 +254 (KE)</option>
                    <option value="+256">🇺🇬 +256 (UG)</option>
                    <option value="+255">🇹ℤ +255 (TZ)</option>
                    <option value="+250">🇷🇼 +250 (RW)</option>
                    <option value="+234">🇳🇬 +234 (NG)</option>
                    <option value="+27">🇿🇦 +27 (ZA)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                    <option value="+1">🇨🇦 +1 (CA)</option>
                    <option value="+91">🇮🇳 +91 (IN)</option>
                  </select>

                  <div className="relative flex-1">
                    <input
                      type="tel"
                      name="phone_number"
                      placeholder="712 345 678"
                      className={`w-full rounded-xl border bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:ring-2 ${
                        signUpFormData.phone_number
                          ? phoneStatus.isValid
                            ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                            : "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-outline-variant focus:border-primary focus:ring-secondary-container"
                      }`}
                      onChange={handleSignUpChange}
                      value={signUpFormData.phone_number}
                    />
                    {signUpFormData.phone_number && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        {phoneStatus.isValid ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {signUpFormData.phone_number && (
                  <p className={`mt-1 text-xs ${phoneStatus.isValid ? "text-green-600 font-medium" : "text-red-500"}`}>
                    {phoneStatus.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showSignUpPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleSignUpChange}
                    value={signUpFormData.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none"
                    aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                  >
                    {showSignUpPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <CheckPassword password={signUpFormData.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-secondary-container"
                    onChange={handleSignUpChange}
                    value={signUpFormData.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {signUpFormData.confirmPassword && signUpFormData.password !== signUpFormData.confirmPassword ? (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                ): signUpFormData.confirmPassword ? (
                  <p className="mt-1 text-xs text-green-500">Passwords match</p>
                ) : null}
              </div>

              {/* Account type */}
              <div>
                <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-on-surface-variant">
                  Account Type
                </label>
                <select
                  className="w-full rounded-xl border border-outline-variant
                    bg-surface-container-low px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-on-surface-variant
                    outline-none transition
                    focus:border-primary focus:ring-2 focus:ring-secondary-container"
                  name="user_type"
                  value={signUpFormData.user_type}
                  onChange={handleSignUpChange}
                >
                  <option value="student">Student</option>
                  <option value="property_manager">Property Manager</option>
                </select>
              </div>

              {/* Signup button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 sm:py-3.5
                  text-sm sm:text-base font-semibold text-white
                  transition hover:bg-primary-container
                  active:scale-[0.98]"
              >
                Sign up
              </button>
            </form>
            <div className="my-4 sm:my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant" />
              <span className="text-xs sm:text-sm text-on-surface-variant">OR</span>
              <div className="h-px flex-1 bg-outline-variant" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3
                rounded-xl border border-outline-variant py-2.5 sm:py-3
                text-sm sm:text-base font-medium text-on-surface-variant
                transition hover:bg-surface-container-low"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Mobile Switch to Sign In */}
            <p className="mt-5 text-center text-sm text-on-surface-variant md:hidden">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="font-semibold text-primary hover:underline focus:outline-none"
              >
                Sign in
              </button>
            </p>
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

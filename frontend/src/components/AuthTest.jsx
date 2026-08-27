import { useAuth } from "../context/useAuth"

export default function AuthTest() {
  const {
    loginAsStudent,
    loginAsOwner,
    logout,
    user
  } = useAuth()

  return (
    <div className="fixed bottom-5 right-5 flex gap-2 rounded-lg bg-white p-4 shadow-lg">

      <button
        onClick={loginAsStudent}
        className="rounded bg-blue-600 px-3 py-2 text-white"
      >
        Student Login
      </button>

      <button
        onClick={loginAsOwner}
        className="rounded bg-green-600 px-3 py-2 text-white"
      >
        Owner Login
      </button>

      <button
        onClick={logout}
        className="rounded bg-red-600 px-3 py-2 text-white"
      >
        Logout
      </button>

      <span className="px-2">
        {user ? user.role : "Guest"}
      </span>

    </div>
  )
}
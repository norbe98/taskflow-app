import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signUp, message, changeMessage, loading, changeLoading } = useAuth()

    useEffect(() => {
      changeMessage("")
    }, [])

  async function handleSignUp() {
    changeLoading(true)
    try {
      const content = await signUp({ email, password })
      changeMessage(content.message)
    } catch (error) {
      if (error instanceof Error) {
      changeMessage(error.message)
      }
    } finally {
      changeLoading(false)
    }
  }

return (
  <div className="flex items-center justify-center p-15">
    <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden border">
      
      <div className="hidden md:flex flex-col justify-between bg-slate-900 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">TaskFlow</h1>
          <p className="text-slate-300">
            Organize your projects, track your tasks, and keep your workflow clear.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <p>✓ Create project boards</p>
          <p>✓ Manage tasks by status</p>
          <p>✓ Track your progress</p>
        </div>
      </div>

      <form
        className="p-8 md:p-10"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignUp()
        }}>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Create your account
        </h2>

        <p className="text-slate-500 mb-8">
          Start managing your projects in one place.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
              value={email}
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
              value={password}
              type="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <button
            className="mt-2 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition disabled:opacity-70"
            disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-5 text-sm ${
              message === "You registered successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  </div>
)
}
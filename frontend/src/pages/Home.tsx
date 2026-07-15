import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center">
      <div className="w-full grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
            Simple project management
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Keep your projects and tasks moving forward.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Create projects, organize tasks by status, and follow your progress
            in one simple workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700">
              View projects
            </Link>

            <Link 
              to="/signup"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
              Create account
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current project</p>
              <h2 className="text-xl font-semibold text-slate-900">
                TaskFlow App
              </h2>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              6 tasks
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="mb-3 text-sm font-medium text-slate-600">
                Not started
              </p>
              <div className="rounded-xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                Create project page
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="mb-3 text-sm font-medium text-slate-600">
                Ongoing
              </p>
              <div className="rounded-xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                Build task board
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="mb-3 text-sm font-medium text-slate-600">
                Finished
              </p>
              <div className="rounded-xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                Add authentication
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
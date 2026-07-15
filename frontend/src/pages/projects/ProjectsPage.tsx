import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProjectForm from "../../components/project/ProjectForm"
import { useProject } from "../../contexts/ProjectContext"
import { toast } from "sonner"

export default function ProjectsPage() {
  const [name, setName] = useState("")

  const { project, createProject } = useProject()

  const navigate = useNavigate()

  async function handleSubmit() {
    if (!name.trim()) return

    try {
      await createProject(name)
      setName("")
      toast.success("You successfully created a project!")
    } catch (error) {
      if (error instanceof Error) {
          toast.error(error.message)
      }
    }
  }

  function changeName(name: string) {
    setName(name)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="text-slate-500">
              {project.length} project{project.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {project.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 py-16 text-center">
            <h2 className="text-lg font-semibold text-slate-700">
              No projects yet
            </h2>

            <p className="mt-2 text-slate-500">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.map((project) => (
              <button
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-slate-400 hover:bg-slate-100">
                <h2 className="font-semibold text-slate-800">
                  {project.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Manage tasks →
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">
          New Project
        </h2>

        <ProjectForm
          handleSubmit={handleSubmit}
          name={name}
          changeName={changeName}/>
      </div>

    </div>
  )
}
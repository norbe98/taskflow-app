import { useEffect, useState } from "react"
import type { Project } from "../../types/types"
import { useProject } from "../../contexts/ProjectContext"
import { useNavigate, useParams } from "react-router-dom"
import TaskForm from "../../components/project/task/TaskForm"
import TaskGrid from "../../components/project/task/TaskGrid"
import { toast } from "sonner"

export default function ProjectPage() {

    const { loadProject, createTask, deleteProject } = useProject()
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState<Project | null>(null)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        async function load() {
            const project = await loadProject(Number(id))
            setProject(project)
        }

        load()
    }, [id, project])

    async function handleSubmit() {
        try {
            await createTask(Number(id), name, description)
            setName("")
            setDescription("")
            toast.success("You successfully created a task!")
        } catch (error) {
            if(error instanceof Error) {    
                toast.error(error.message)
            }
        }
    }

    function changeDescription(desc: string) {
        setDescription(desc)
    }

    function changeName(name: string) {
        setName(name)
    }

    async function handleDelete() {
        try {
            await deleteProject(Number(id))
            navigate("/projects")
            toast.success("You deleted the project successfully!")
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <header className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Project workspace
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900">
                            {project?.name}
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage your tasks and track their current status.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                        Delete project
                    </button>
                </header>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-800">
                                Tasks
                            </h2>

                            <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-500 shadow-sm">
                                {project?.tasks.length ?? 0} tasks
                            </span>
                        </div>

                        <TaskGrid project={project} />
                    </section>

                    <aside>
                        <div className="sticky top-8">
                            <TaskForm
                                handleSubmit={handleSubmit}
                                name={name}
                                changeName={changeName}
                                description={description}
                                changeDescription={changeDescription}/>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    )
}
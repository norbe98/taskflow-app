import { useState } from "react"
import type { TaskGridProps } from "../../../types/types"
import { useProject } from "../../../contexts/ProjectContext"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

export default function TaskGrid({ project }: TaskGridProps) {

    const [selected, setSelected] = useState<number | null>(null)
    const { changeTaskStatus, deleteTask } = useProject()
    const { id } = useParams()

    async function handleStatusChange(status: string, taskId: number) {
        try {
            await changeTaskStatus(Number(id), status, taskId)
            toast.success("")
        } catch (error) {
            
        }
    }

    async function handleDelete(taskId: number) {
        try {
            await deleteTask(Number(id), taskId)
            toast.success("You deleted the task successfully!")
        } catch (error) {
            
        }
    }

    return (
        <div className="grid gap-5 md:grid-cols-3">

            <div className="flex min-h-96 flex-col rounded-xl border border-slate-200 bg-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold text-slate-700">
                        Not Started
                    </p>

                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                        {project?.tasks.filter(
                            task => task.status === "TODO"
                        ).length ?? 0}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {project?.tasks.map(task =>
                        <div key={task.id}>
                            {task.status === "TODO" &&
                                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <h3 className="font-semibold text-slate-800">
                                        {task.name}
                                    </h3>

                                    <h4 className="mt-1 text-sm leading-5 text-slate-500">
                                        {task.description}
                                    </h4>

                                    {selected === task.id ?
                                        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                                            <button type="button" onClick={() => handleStatusChange("IN_PROGRESS",selected)}
                                                className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                                                Set In Progress
                                            </button>

                                            <button type="button" onClick={() => handleStatusChange("FINISHED", selected)}
                                                className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
                                                Set Finished
                                            </button>

                                            <button onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDelete(task.id)}}
                                                type="button"
                                                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
                                                Delete
                                            </button>
                                        </div>
                                        :
                                        <button type="button" onClick={() => setSelected(task.id)}
                                            className="mt-4 w-full rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                                            Manage task
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

            <div className="flex min-h-96 flex-col rounded-xl border border-slate-200 bg-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold text-slate-700">
                        In Progress
                    </p>

                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                        {project?.tasks.filter(
                            task => task.status === "IN_PROGRESS"
                        ).length ?? 0}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {project?.tasks.map(task =>
                        <div key={task.id}>
                            {task.status === "IN_PROGRESS" &&
                                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <h3 className="font-semibold text-slate-800">
                                        {task.name}
                                    </h3>

                                    <h4 className="mt-1 text-sm leading-5 text-slate-500">
                                        {task.description}
                                    </h4>

                                    {selected === task.id ?
                                        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                                            <button type="button" onClick={() => handleStatusChange("TODO", selected)}
                                                className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                                Set Not Started
                                            </button>

                                            <button type="button"
                                                onClick={() => handleStatusChange("FINISHED", selected)}
                                                className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
                                                Set Finished
                                            </button>

                                            <button onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDelete(task.id)
                                                }}
                                                type="button"
                                                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
                                                Delete
                                            </button>
                                        </div>
                                        :
                                        <button type="button"
                                            onClick={() => setSelected(task.id)}
                                            className="mt-4 w-full rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                                            Manage task
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

            <div className="flex min-h-96 flex-col rounded-xl border border-slate-200 bg-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold text-slate-700">
                        Finished
                    </p>

                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                        {project?.tasks.filter(
                            task => task.status === "FINISHED"
                        ).length ?? 0}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {project?.tasks.map(task =>
                        <div key={task.id}>
                            {task.status === "FINISHED" &&
                                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <h3 className="font-semibold text-slate-800">
                                        {task.name}
                                    </h3>

                                    <h4 className="mt-1 text-sm leading-5 text-slate-500">
                                        {task.description}
                                    </h4>

                                    {selected === task.id ?
                                        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                                            <button type="button" onClick={() => handleStatusChange("TODO", selected)}
                                                className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                                Set Not Started
                                            </button>

                                            <button type="button"
                                                onClick={() => handleStatusChange("IN_PROGRESS", selected)}
                                                className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                                                Set In Progress
                                            </button>

                                            <button onClick={() => handleDelete(task.id)}
                                                type="button"
                                                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
                                                Delete
                                            </button>
                                        </div>
                                        :
                                        <button type="button"
                                            onClick={() => setSelected(task.id)}
                                            className="mt-4 w-full rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                                            Manage task
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
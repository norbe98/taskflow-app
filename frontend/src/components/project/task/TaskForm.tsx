import type { TaskFormProps } from "../../../types/types"

export default function TaskForm({ handleSubmit, name, changeName, description, changeDescription }: TaskFormProps) {

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                    Create task
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Add a new task to this project.
                </p>
            </div>

            <div className="mb-4 flex flex-col gap-2">
                <label
                    htmlFor="task-name"
                    className="text-sm font-medium text-slate-700">
                    Name
                </label>

                <input
                    id="task-name"
                    value={name}
                    onChange={(e) => changeName(e.target.value)}
                    placeholder="Enter task name"
                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
            </div>

            <div className="mb-5 flex flex-col gap-2">
                <label
                    htmlFor="task-description"
                    className="text-sm font-medium text-slate-700">
                    Description
                </label>

                <textarea
                    id="task-description"
                    value={description}
                    onChange={(e) => changeDescription(e.target.value)}
                    placeholder="Describe the task"
                    rows={5}
                    className="resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]">
                Create task
            </button>
        </form>
    )
}
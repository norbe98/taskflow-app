import type { ProjectFormProps } from "../../types/types"

export default function ProjectForm({ handleSubmit, name, changeName }: ProjectFormProps) {
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Create Project
      </h2>

      <p className="mt-1 mb-6 text-sm text-slate-500">
        Give your project a name to get started.
      </p>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Project name
          </label>

          <input
            value={name}
            onChange={(e) => changeName(e.target.value)}
            placeholder="My awesome project"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"/>
        </div>

        <button disabled={!name.trim()} className="rounded-xl bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 cursor-pointer">
          Create Project
        </button>
      </form>
    </div>
  )
}
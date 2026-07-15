export type AuthUser = {
    email: string,
    password: string
}

export type User = {
    id: number,
    email: string
}

export type AuthContext = {
    user: User | null,
    signUp: (data: AuthUser) => Promise<any>,
    signIn: (data: AuthUser) => Promise<any>,
    message: string,
    logOut: () => void,
    changeMessage: (message: string) => void,
    loading: boolean,
    changeLoading: (boolean: boolean) => void,
    handleExpiredToken: () => void
}

export type Project = {
    id: number,
    name: string,
    tasks: Task[]
}

export type ProjectContext = {
    project: Project[],
    loadProject: (projectId: number) => Promise<Project>,
    createProject: (name: string) => Promise<void>,
    deleteProject: (projectId: number) => Promise<void>,
    createTask: (projectId: number, name: string, description: string) => Promise<Task>,
    changeTaskStatus: (projectId: number, status: string, taskId: number) => Promise<Task>,
    deleteTask: (projectId: number, taskId: number) => Promise<void>
}

export type ProjectFormProps = {
    handleSubmit: () => void,
    name: string,
    changeName: (name: string) => void
}

export type Task = {
    id: number,
    name: string,
    description: string,
    status: "TODO" | "IN_PROGRESS" | "FINISHED"
}

export type TaskFormProps = {
    handleSubmit: () => void,
    name: string,
    changeName: (name: string) => void,
    description: string,
    changeDescription: (description: string) => void
}

export type TaskGridProps = {
    project: Project | null
}
import { createContext, useContext, useEffect, useState } from "react";
import type { ProjectContext, Project } from "../types/types";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext<ProjectContext | null>(null)

export default function ProjectProvider({ children }: {children: React.ReactNode}) {

    const [project, setProject] = useState<Project[]>([])
    const { user } = useAuth()

useEffect(() => {
  if (user) {
    loadProjects()
  } else {
    setProject([])
  }
}, [user])


    async function loadProjects() {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json()
        
        setProject(data)
    }

    async function loadProject(projectId: number) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })        

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const project = await res.json()

        return project
    }

    async function createProject(name: string) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json()
        
        setProject(prev => [...prev, data])
    }

    async function createTask(projectId: number, name: string, description: string) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, description })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const task = await res.json()
        return task
    }

    async function changeTaskStatus(projectId: number, status: string, taskId: number) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status, taskId })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }
        
        const updatedTask = await res.json()
        return updatedTask
    }

    async function deleteProject(projectId: number) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        setProject(prev => prev.filter(project => project.id !== projectId))
    }

    async function deleteTask(projectId: number, taskId: number) {
        const token = localStorage.getItem("token")
        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/task/${taskId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        setProject(prev => prev.map(project => 
            projectId === project.id ? {
                ...project,
                tasks: project.tasks.filter(task => task.id !== taskId)
            } : project
        ))
    }

    return (
        <ProjectContext.Provider value={{ project, createProject, loadProject, createTask, changeTaskStatus, deleteProject, deleteTask }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject() {
    const ctx = useContext(ProjectContext)
    if(!ctx) throw new Error("ProjectContext error!");
    return ctx
}
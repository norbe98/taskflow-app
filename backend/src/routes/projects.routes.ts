import express, { type Response } from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import type { AuthRequest } from '../types/types.js'
import { prisma } from '../prisma.js'
import { TaskStatus } from '../../generated/prisma/enums.js'

export const projectRouter = express.Router()

projectRouter.get("/projects", authMiddleware, async (req: AuthRequest, res: Response) => {

    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    const projects = await prisma.project.findMany({
        where: {
            userId: user.id
        },
        include: {
            tasks: true
        }
    })

    res.status(200).json(projects)


})

projectRouter.post("/projects", authMiddleware, async (req: AuthRequest, res: Response) => {

    const { name } = req.body
    
    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            projects: true
        }
    })

    const isProjectExist = await prisma.project.findUnique({
        where: {
            name: name
        }
    })

    if(isProjectExist) return res.status(401).json({ message: "This project already exists!" })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    const project = await prisma.project.create({
        data: {
            name: name,
            userId: user.id
        },
        include: {
            tasks: true
        }
    })

    res.status(201).json(project)
    
})


projectRouter.get("/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    
    const projectId = Number(req.params.id)
    
    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })
    
    if(!user) return res.status(401).json({ message: "You have to be logged in!" })
        
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
        },
        include: {
            tasks: true
        }
    })

    res.status(200).json(project)
})

projectRouter.delete("/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {

    const projectId = Number(req.params.id)

    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    await prisma.project.delete({
        where: {
            id: projectId
        }
    })

    res.status(200).json({
        message: "You deleted the project successfully!"
    })

})

projectRouter.post("/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {

    const projectId = Number(req.params.id)
    const { name, description } = req.body

    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    const task = await prisma.task.create({
        data: {
            name: name,
            projectId: projectId,
            description: description,
            status: TaskStatus.TODO
        }
    })

    res.status(201).json({
        message: "You created a task successfully!",
        task: task
    })
})

projectRouter.patch("/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {

    const { status, taskId } = req.body
    
    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    const updatedTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            status: status
        }
    })

    res.status(200).json(
        {
        message: "You successfully updated the task!",
        updatedTask: updatedTask
    })

})

projectRouter.delete("/projects/:id/task/:taskId", authMiddleware, async (req: AuthRequest, res: Response) => {

    const taskId = Number(req.params.taskId)

    if (!req.user) {
        return res.status(401).json({ message: "You have to be logged in!" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if(!user) return res.status(401).json({ message: "You have to be logged in!" })

    await prisma.task.delete({
        where: {
            id: taskId
        }
    })

    res.status(200).json({
        message: "You deleted the task successfully!"
    })

})

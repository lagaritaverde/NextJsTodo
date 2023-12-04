export type TodoItem = {
    id: string
    toodId: string
    title: string
    done: boolean
}

export type Todo = {
    id: string
    title: string
    ownerid: string
    description: string
    items: TodoItem[]
}

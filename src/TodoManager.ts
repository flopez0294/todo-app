import type { Todo } from "./types";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";

export class TodoManager {
    private todos: Todo[] = [];
    private readonly FILE_PATH = path.resolve(__dirname, "..", "todos.json");

    constructor() {
        this.todos = this.loadTodos();
    }

    private loadTodos(): Todo[] {
        if (!fs.existsSync(this.FILE_PATH)) {
            fs.writeFileSync(this.FILE_PATH, "[]");
            return [];
        }
        try {
            const data = fs.readFileSync(
                this.FILE_PATH,
                "utf-8"
            );

            return JSON.parse(data);
        } catch (error) {
            console.error("Failed to parse todos.json");
            console.error(error);
            process.exit(1);
        }
    }

    private saveTodos(): void {
        fs.writeFileSync(
            this.FILE_PATH,
            JSON.stringify(this.todos, null, 2)
        );
    }

    add(text: string): string{
        const todo: Todo = {
            id: randomUUID(),
            text: text,
            complete: false
        };
        this.todos.push(todo);
        this.saveTodos();
        return todo.id;
    }

    complete(id: string): void {
        const todo = this.todos.find(t => t.id == id);

        if (!todo) {
            console.warn(`Warning: Todo with id ${id} not found`);
            return;
        }

        todo.complete = true;
        console.log(`✔ Todo ${id} marked as complete`);
        this.saveTodos();
    }

    delete(id: string): void {
        const beforeLength = this.todos.length;

        this.todos = this.todos.filter(t => t.id !== id);

        if (this.todos.length === beforeLength) {
            console.warn(`⚠️ Warning: Todo with id ${id} not found`);
            return;
        }

        this.saveTodos();
    }

    list(): Todo[]{
        return this.todos;
    }
}
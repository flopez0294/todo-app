#!/usr/bin/env node

import { TodoManager } from "./TodoManager";

const manager = new TodoManager();

const [, , command, ...args] = process.argv;

const commands: Record<string, (args: string[]) => void> = {
    add: (args) => {
        const text = args.join(" ");

        if (!text) {
            console.warn("⚠️ Please provide a todo text");
            return;
        }

        const id = manager.add(text);
        console.log(`Added todo: "${text}" (id: ${id})`);
    },

    list: () => {
        const todos = manager.list();

        if (todos.length === 0) {
            console.log("No todos found.");
            return;
        }

        todos.forEach(t => {
            const status = t.complete ? "☑" : "☐";
            console.log(`${status} ${t.text} (id: ${t.id})`);
        });
    },

    complete: (args) => {
        const id = Number(args[0]);

        if (!id) {
            console.warn("⚠️ Please provide a valid todo id");
            return;
        }

        manager.complete(id);
    },

    delete: (args) => {
        const id = Number(args[0]);

        if (!id) {
            console.warn("⚠️ Please provide a valid todo id");
            return;
        }

        manager.delete(id);
    }
};

if (!command || !commands[command]) {
    console.error(`❌ Unknown command: ${command ?? ""}`);
    console.log("Available commands: add, list, complete, delete");
    process.exit(1);
}

commands[command](args);
import { describe, it, expect, beforeEach, } from "vitest";
import { TodoManager } from "../src/TodoManager";

describe("TodoManager", () => {
    let manager: TodoManager;

    beforeEach(() => {
        manager = new TodoManager();

        // Clear existing todos before each test
        const todos = manager.list();
        todos.forEach(todo => manager.delete(todo.id));
    });

    it("should add a todo", () => {
        const id = manager.add("Learn Vitest");

        const todos = manager.list();

        expect(todos).toHaveLength(1);
        expect(todos[0].id).toBe(id);
        expect(todos[0].text).toBe("Learn Vitest");
        expect(todos[0].complete).toBe(false);
    });

    it("should complete a todo", () => {
        const id = manager.add("Finish project");

        manager.complete(id);

        const todo = manager.list().find(t => t.id === id);

        expect(todo).toBeDefined();
        expect(todo?.complete).toBe(true);
    });

    it("should delete a todo", () => {
        const id = manager.add("Delete me");

        manager.delete(id);

        const todos = manager.list();

        expect(todos).toHaveLength(0);
    });

    it("should return all todos", () => {
        manager.add("Task 1");
        manager.add("Task 2");

        const todos = manager.list();

        expect(todos).toHaveLength(2);
        expect(todos.map(t => t.text)).toContain("Task 1");
        expect(todos.map(t => t.text)).toContain("Task 2");
    });

    it("should not change anything when completing a non-existent todo", () => {
        manager.add("Existing Todo");

        manager.complete("999999");

        const todos = manager.list();

        expect(todos).toHaveLength(1);
        expect(todos[0].complete).toBe(false);
    });

    it("should not delete anything when id does not exist", () => {
        manager.add("Existing Todo");

        manager.delete("999999");

        const todos = manager.list();

        expect(todos).toHaveLength(1);
    });

    it("should create unique ids", () => {
        const id1 = manager.add("Todo 1");

        // Small delay isn't necessary but helps avoid Date.now collisions
        const id2 = manager.add("Todo 2");

        expect(id1).not.toBe(id2);
    });
});
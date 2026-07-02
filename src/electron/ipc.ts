import { ipcMain } from "electron";
import { TodoManager } from "../core/TodoManager";

const manager = new TodoManager();

export function registerIpcHandlers() {
    ipcMain.handle("todos:list", () => {
        return manager.list();
    });

    ipcMain.handle("todos:add", (_, title: string) => {
        manager.add(title);
        return manager.list();
    });

    ipcMain.handle("todos:complete", (_, id: string) => {
        manager.complete(id);
        return manager.list();
    });

    ipcMain.handle("todos:delete", (_, id: string) => {
        manager.delete(id);
        return manager.list();
    });
}
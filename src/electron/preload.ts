import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getTodos: () => ipcRenderer.invoke("todos:list"),
  addTodo: (title: string) => ipcRenderer.invoke("todos:add", title),
  completeTodo: (id: string) => ipcRenderer.invoke("todos:complete", id),
  deleteTodo: (id: string) => ipcRenderer.invoke("todos:delete", id),
});
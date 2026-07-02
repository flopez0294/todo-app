import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn } from "child_process";
import kill from "tree-kill";
import { registerIpcHandlers } from "./ipc";

let viteProcess: any;

async function waitForVite(url: string) {
    while (true) {
        try {
            const res = await fetch(url);

            if (res.ok) {
                return;
            }
        } catch {
            // Vite isn't ready yet

        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

function startVite() {
    viteProcess = spawn("npm", ["run", "dev:renderer"], {
        shell: true,
        stdio: "inherit"
    });
}

async function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (app.isPackaged) {
        await win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
        await win.loadURL("http://localhost:5173");
    }

    win.show();
}

app.whenReady().then(async () => {
    registerIpcHandlers();

    if (!app.isPackaged) {
        startVite();
        await waitForVite("http://localhost:5173");
    }

    await createWindow();
});

app.on("window-all-closed", () => {
    if (viteProcess?.pid) {
        kill(viteProcess.pid);
    }
    app.quit();
});
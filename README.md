<div align="center">

# Todo App

A simple cross-platform CLI todo application built with TypeScript and Node.js.

It uses local JSON file storage for persistence and is structured to support a future desktop application (Electron/Tauri).

</div>

---

## Overview

This project is a lightweight command-line todo manager designed to practice TypeScript, Node.js, and file system persistence.

It focuses on clean architecture and is intentionally structured so it can later be expanded into a desktop application.

### Goals

- Build a functional CLI todo manager
- Practice TypeScript project structure and OOP design
- Use persistent local storage via JSON
- Design for future desktop app expansion

---

## Features

- [x] Add todos
- [x] List todos
- [x] Mark todos as complete
- [x] Delete todos
- [x] Persistent JSON storage
- [ ] Due dates
- [ ] Priorities
- [ ] Desktop app (Electron/Tauri)

## Future Plans

- [ ] Desktop app (Electron/Tauri)
- [ ] Cloud sync

---

## Usage

### Install

```bash
npm install
```

### Development

```bash
npm run dev add "Buy milk"
npm run dev list
npm run dev complete <id>
npm run dev delete <id>
```

### Build

```bash
npm run build

# to use the built version
todo add "Something"
todo list
todo complete <id>
todo delete <id>
```

---

## Storage

The storage of this application can be in the root folder under `todos.json`.

---

## Tech Stack

- TypeScript
- Node.js



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


TO create start the project setup - 

Step 1:
npm create vite@latest my-electron-app --template react
cd my-electron-app
npm install

Step 2:
npm install electron vite-plugin-electron electron-builder concurrently cross-env --save-dev


Step 3:
Create a folder named electron 
  In that folder create two files
- main.js
- preloader.js

add the code same as in the files

**main.js**
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

**preloader.js**
window.addEventListener("DOMContentLoaded", () => {
    console.log("Preload script loaded");
  });


Step 4:
**- initialize this in the package.json**
"name": "second",
  "private": true,
  "version": "0.0.0",
  "main": "electron/main.js",

- add this scripts
  "scripts": {
    "dev": "cross-env VITE_DEV_SERVER_URL=http://localhost:5173 concurrently \"vite\" \"wait-on http://localhost:5173 && electron electron/main.js\"",
    "build": "vite build",
    "electron:start": "electron electron/main.js",
    "electron:build": "vite build && electron electron/main.js",
    "dist": "vite build && electron-builder"
  },


Step 5:
replace the
**vite.config.js**
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main.js",
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});


**Finally**

npm run dev
npm run dist
  

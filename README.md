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
{
  "name": "second",
  "private": true,
  "version": "0.0.0",
  "main": "electron/main.js",
  "scripts": {
    "dev": "cross-env VITE_DEV_SERVER_URL=http://localhost:5173 concurrently \"vite\" \"wait-on http://localhost:5173 && electron electron/main.js\"",
    "build": "vite build",
    "electron:start": "electron electron/main.js",
    "electron:build": "vite build && electron electron/main.js",
    "dist": "vite build && electron-builder"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.1.2",
    "@tailwindcss/vite": "^4.0.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "concurrently": "^9.1.2",
    "cross-env": "^7.0.3",
    "electron": "^34.1.1",
    "electron-builder": "^25.1.8",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "vite": "^6.1.0",
    "vite-plugin-electron": "^0.29.0"
  },
  "build": {
    "appId": "com.yourcompany.app",
    "productName": "MyElectronApp",
    "directories": {
      "output": "dist-electron",
      "buildResources": "assets"
    },
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "asar": true,
    "extraResources": [
      {
        "from": "electron",
        "to": "app"
      }
    ],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    }
  }
}


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
  

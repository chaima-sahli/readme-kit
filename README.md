<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Shadcn-UI-000000?style=for-the-badge&logo=shadcnui" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  
  <br />
  <br />
  
  <h1>📝 README Kit</h1>
  <p><strong>Build beautiful docs.</strong></p>
  <p>A visual README builder with live preview, templates, and smart formatting tools.</p>
  
  <br />
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-author">Author</a>
  
  
  <br />
  <br />
  
<img width="1924" height="1084" alt="Image" src="https://github.com/user-attachments/assets/2c86f671-0735-4d52-bde4-aeca0068a513" />
</div>

---

## 📖 About

> **README Builder** is a visual tool that helps developers create beautiful README files without memorizing Markdown syntax. Built with React and Vite, it features a split-pane editor with live preview, a powerful toolbar, and smart formatting tools.

---

## 🎯 Live Demo

Try it here!: https://readme-kit-orpin.vercel.app

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Visual Editor** | Click buttons to format (no more guessing Markdown syntax) |
| **Live Preview** | Real-time rendering with GitHub Flavored Markdown |
| **Dracula Theme** | Eye-friendly dark theme that developers love |
| **Split View** | Editor on the left, preview on the right |
| **Auto-save** | Your content is automatically saved to localStorage |
| **Export** | Download as `.md` or copy to clipboard |

### 🛠️ Toolbar Features

| Feature | Description |
|---------|-------------|
| **Headings** | H1, H2, H3 with one click |
| **Text Formatting** | Bold, Italic, Inline Code |
| **Lists** | Bullet and numbered lists |
| **Code Blocks** | Syntax-highlighted code blocks |
| **Table Builder** | Build tables visually with alignment controls |
| **Link Dialog** | Add hyperlinks with custom text |
| **Image Dialog** | Add images with alt text and size controls |

### 🪄 Magic Button

| Feature | Description |
|---------|-------------|
| **Auto-format** | Fix spacing and structure with one click |
| **Templates** | Insert complete README templates (Complete, Minimal, API, Library, CLI) |
| **Badge Generator** | Search and add shields.io badges with a beautiful modal |
| **Greeting** | Add a friendly welcome message |

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save README |
| `Ctrl + Shift + E` | Focus Editor |
| `Ctrl + Shift + P` | Focus Preview |
| `Ctrl + Shift + S` | Switch to Split view |
| `Ctrl + Shift + V` | Toggle Split/Preview |

---

## 💻 Tech Stack

### Frontend
```
├── React 18
├── Vite
├── Tailwind CSS
├── Shadcn/ui
├── CodeMirror (Editor)
├── ReactMarkdown
├── Framer Motion
└── Lucide React (Icons)

```

### Libraries

```
├── @uiw/react-codemirror
├── @codemirror/lang-markdown
├── @codemirror/theme-one-dark
├── remark-gfm
├── rehype-raw
├── react-syntax-highlighter
├── sonner (Toast notifications)
└── clsx + tailwind-merge

```
## 📁 Project Structure

```
readme-kit/
├── src/
│ ├── components/
│ │ ├── magic/ # Magic Button & related components
│ │ │ ├── actions/ # Auto-format, templates, greetings
│ │ │ ├── data/ # Badges, templates data
│ │ │ ├── BadgeModal.jsx
│ │ │ ├── TemplateModal.jsx
│ │ │ ├── MagicButton.jsx
│ │ │ └── MagicMenu.jsx
│ │ ├── ui/ # Table Builder, Link Dialog, Image Dialog
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ ├── Toolbar.jsx
│ │ ├── Preview.jsx
│ │ └── Editor.jsx
│ ├── hooks/ # useLocalStorage
│ ├── styles/ # Global CSS
│ └── App.jsx
├── public/
├── index.html
├── package.json
└── README.md
```
---


## 🚀 Quick Start

### 1. Clone it


```bash
git clone https://github.com/chaima-sahli/readme-kit.git
cd readme-kit
```
### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

---

##  Usage
1. **Write** in the editor on the left
2. **Preview** your README on the right
3. **Format** with the toolbar buttons (H1, Bold, Lists, Tables, etc.)
4. **Insert** badges, templates, links, or images
5. **Export** as `.md` or copy to clipboard

---



## ✦ Author ✦

**Chaima Sahli**

- GitHub: [@chaima-sahli](https://github.com/chaima-sahli)
- LinkedIn: [chaima-sahli](https://linkedin.com/in/chaima-sahli)


<div align="center">
  <pre>
    ═══════════════════════════════════════════════════
    ██████╗ ███████╗ █████╗ ██████╗ ███╗   ███╗███████╗
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝
    ██████╔╝█████╗  ███████║██║  ██║██╔████╔██║█████╗  
    ██╔══██╗██╔══╝  ██╔══██║██║  ██║██║╚██╔╝██║██╔══╝  
    ██║  ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║███████╗
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝
    ═══════════════════════════════════════════════════
        Build beautiful docs. 
    ═══════════════════════════════════════════════════

  </pre>
  </div>  






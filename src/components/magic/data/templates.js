export const TEMPLATES = {
  'complete': {
    id: 'complete',
    label: '📋 Complete README',
    description: 'Full project documentation with all sections',
    icon: '📋',
    content: `# Project Name

> A brief, catchy description of what your project does. One sentence that hooks the reader.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🚀 **Feature 1** - Brief description of what it does
- 🎨 **Feature 2** - Brief description of what it does
- ⚡ **Feature 3** - Brief description of what it does
- 🔒 **Feature 4** - Brief description of what it does

## 📦 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State Management:** Zustand / Redux Toolkit
- **Routing:** React Router v6

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/your-project.git

# Navigate to the project
cd your-project

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── styles/         # Global styles
├── lib/            # Library configurations
└── assets/         # Static assets
\`\`\`

## 🎯 Usage

\`\`\`javascript
import { useState } from 'react';

function Example() {
  const [data, setData] = useState(null);
  
  // Your code here
  return <div>Hello World</div>;
}
\`\`\`

## 📚 API Reference

### GET /api/endpoint

Returns a list of items.

**Response:**
\`\`\`json
{
  "data": [],
  "status": 200
}
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📬 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/your-project](https://github.com/yourusername/your-project)`
  },
  'minimal': {
    id: 'minimal',
    label: '📝 Minimal README',
    description: 'Clean and simple, just the essentials',
    icon: '📝',
    content: `# Project Name

Short description of your project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`javascript
// Your code here
\`\`\`

## License

MIT`
  },
  'api': {
    id: 'api',
    label: '🔌 API README',
    description: 'Complete API documentation template',
    icon: '🔌',
    content: `# API Name

> RESTful API for [purpose of your API]

![Node](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)

## 🚀 Getting Started

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/your-api.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev

# Run tests
npm test
\`\`\`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/auth/register\` | Register a new user |
| POST | \`/api/auth/login\` | Login user |
| POST | \`/api/auth/logout\` | Logout user |
| GET | \`/api/auth/me\` | Get current user |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/users\` | Get all users |
| GET | \`/api/users/:id\` | Get user by ID |
| PUT | \`/api/users/:id\` | Update user |
| DELETE | \`/api/users/:id\` | Delete user |

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

\`\`\`javascript
// Example: Making an authenticated request
fetch('/api/users', {
  headers: {
    'Authorization': 'Bearer <your-token>'
  }
});
\`\`\`

## 📦 Environment Variables

\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yourdb
JWT_SECRET=your-secret-key
NODE_ENV=development
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── services/       # Business logic
└── tests/          # Test files
\`\`\`

## 🐛 Error Handling

The API uses standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## 📄 License

MIT © Your Name`
  },
  'library': {
    id: 'library',
    label: '📦 Library README',
    description: 'For npm packages and reusable components',
    icon: '📦',
    content: `# Component/ Library Name

> A [description] component/library for React applications.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-blue)
![npm](https://img.shields.io/badge/npm-9.x-blue)

## ✨ Features

- ✅ **Feature 1** - What it does
- ✅ **Feature 2** - What it does
- ✅ **Feature 3** - What it does
- ✅ **TypeScript Support** - Full type definitions included

## 📦 Installation

\`\`\`bash
npm install your-package-name
# or
yarn add your-package-name
\`\`\`

## 🚀 Usage

\`\`\`jsx
import { ComponentName } from 'your-package-name';

function App() {
  return (
    <ComponentName
      prop1="value"
      prop2={true}
      onAction={(data) => console.log(data)}
    />
  );
}
\`\`\`

## 📚 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`prop1\` | \`string\` | \`''\` | Description of prop1 |
| \`prop2\` | \`boolean\` | \`false\` | Description of prop2 |
| \`onAction\` | \`function\` | \`undefined\` | Callback when action occurs |

## 🎨 Examples

### Basic Example

\`\`\`jsx
import { ComponentName } from 'your-package-name';

function BasicExample() {
  return <ComponentName />;
}
\`\`\`

### Advanced Example

\`\`\`jsx
import { ComponentName } from 'your-package-name';

function AdvancedExample() {
  const handleAction = (data) => {
    // Handle the action
  };
  
  return (
    <ComponentName
      prop1="value"
      onAction={handleAction}
    />
  );
}
\`\`\`

## 🧪 Development

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/your-component.git

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT © Your Name

## 🌟 Support

⭐️ Star this repository if you find it helpful!
🐛 Report issues on [GitHub Issues](https://github.com/yourusername/your-component/issues)
💬 Join our [Discord Community](https://discord.gg/your-invite)`
  },
  'cli': {
    id: 'cli',
    label: '💻 CLI Tool README',
    description: 'For command-line tools and utilities',
    icon: '💻',
    content: `# CLI Tool Name

> A powerful command-line tool for [purpose of your CLI]

![Node](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9.x-blue)
![MIT](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- ⚡ **Fast** - Blazingly fast execution
- 🎯 **Simple** - Easy to use commands
- 🔧 **Flexible** - Many configuration options
- 📦 **Zero Dependencies** - Minimal footprint

## 📦 Installation

\`\`\`bash
# Install globally
npm install -g your-cli-tool

# Or run without installing
npx your-cli-tool --help
\`\`\`

## 🚀 Usage

\`\`\`bash
# Basic usage
your-cli-tool command [options]

# Example: Generate a new project
your-cli-tool init my-project

# Example: Build project
your-cli-tool build

# Example: Run development server
your-cli-tool dev
\`\`\`

## 📚 Commands

### \`init\`

Initialize a new project.

\`\`\`bash
your-cli-tool init <project-name> [options]
\`\`\`

**Options:**
- \`-t, --template\` - Template to use (react, vue, node)
- \`-g, --git\` - Initialize git repository
- \`-i, --install\` - Install dependencies

### \`build\`

Build the project for production.

\`\`\`bash
your-cli-tool build [options]
\`\`\`

**Options:**
- \`-o, --output\` - Output directory
- \`-m, --minify\` - Minify output

### \`dev\`

Start development server.

\`\`\`bash
your-cli-tool dev [options]
\`\`\`

**Options:**
- \`-p, --port\` - Port to run on (default: 3000)
- \`-o, --open\` - Open in browser

## 🔧 Configuration

Create a \`cli-config.json\` file in your project root:

\`\`\`json
{
  "entry": "src/index.js",
  "output": "dist",
  "port": 3000,
  "plugins": []
}
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── commands/       # CLI commands
├── utils/          # Utility functions
├── templates/      # Project templates
├── config/         # Configuration
└── index.js        # Entry point
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

MIT © Your Name`
  }
};
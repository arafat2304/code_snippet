# 🧠 Code Snippet by Arafat

A full-stack **Code Snippet Organizer** web app built using **React**, **Express**, **MongoDB**, and **Tailwind CSS**. It allows users to create, edit, share, and organize code snippets with powerful features like favorites, version history, boilerplate suggestions, public links, and dark mode.

---

## 🚀 Features

* ✏️ Create, edit, and delete code snippets
* 🧠 Monaco Editor with syntax highlighting
* 🗂️ Tag and language support with filtering
* ❤️ Mark snippets as favorite
* 🗑️ Soft delete (trash) and restore
* 🌗 Dark/Light mode toggle
* 📜 Version history + revert to old versions
* 🔓 Public/private snippets with shareable links
* 📊 Analytics dashboard (total, favorites, language stats)
* ⌨️ Keyboard shortcuts (Ctrl+S to save, Esc to reset)

---

## 🧱 Tech Stack

| Tech          | Description                      |
| ------------- | -------------------------------- |
| React         | Frontend library                 |
| Vite          | Fast bundler for React           |
| Tailwind CSS  | Utility-first styling            |
| Monaco Editor | Code editing with syntax support |
| Node.js       | Backend runtime                  |
| Express.js    | API and server logic             |
| MongoDB       | Database                         |
| JWT + Cookie  | Authentication and sessions      |

---

## 🛠️ Setup Instructions

### 📁 Folder Structure

```
code_snippet/
├── code-snippet-by-arafat/    (React Frontend)
├── server/    (Express Backend)
```

---

### 1. 🔧 Clone the Repository

```bash
git clone https://github.com/arafat2304/code_snippet.git
cd code_snippet
```

---

### 2. ⚙️ Backend Setup (server/)

```bash
cd server
npm install

# Create .env file
MONGO_URL=your_mongo_db_url
JWT_SECRET=your_jwt_secret

# Start server
node index.js
```

Server runs at: `http://localhost:5000`

### 3. 💻 Frontend Setup (client/)

```bash
cd code-snippet-by-arafat
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 📹 Demo Video

Watch the walkthrough: [📺 Demo Link](https://your-demo-link.com)


## 🌐 Live Deployment (optional)

Frontend (Netlify): [https://your-netlify-link](https://your-netlify-link)
Backend (Render): [https://your-backend-api.onrender.com](https://your-backend-api.onrender.com)


## 📄 License

This project is for educational and portfolio use only.


## ✍️ Author

**Arafat Malek**

Feel free to contribute, suggest improvements, or fork the project. Happy Coding! 🧠💻

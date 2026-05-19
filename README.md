# 🔗 URL Shortener — Full Stack MERN Application

A modern and responsive URL Shortener application built using the MERN stack.
This project allows users to convert long URLs into short, shareable links instantly with real-time redirection and click tracking analytics.

---

## 🚀 Live Features

✨ Shorten long URLs instantly
✨ Redirect users to original URLs
✨ Generate unique short IDs using NanoID
✨ Store URLs securely in MongoDB
✨ Track total clicks on every shortened URL
✨ Responsive React frontend UI
✨ RESTful API architecture
✨ Fast and lightweight backend using Express.js

---

# 🛠️ Tech Stack

## Frontend

* React.js
* CSS3
* Fetch API

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Other Tools & Libraries

* NanoID
* CORS
* dotenv

---

# 📂 Project Structure

```bash
URL-Shortener/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-link>
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
BASE_URL=http://localhost:3000
```

Start backend server:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔥 API Endpoints

## Create Short URL

```http
POST /api/url/Shoorten
```

### Request Body

```json
{
  "originalUrl": "https://google.com"
}
```

### Response

```json
{
  "message": "Url Created Successfully",
  "url": "http://localhost:3000/api/url/abc123"
}
```

---

## Redirect URL

```http
GET /api/url/:shortId
```

This endpoint redirects users to the original long URL.

---

# 🧠 How It Works

1. User enters a long URL in the frontend.
2. Frontend sends request to backend API.
3. Backend generates a unique NanoID.
4. URL mapping gets stored in MongoDB.
5. Short URL is returned to the frontend.
6. When user opens short URL:

   * Backend searches database
   * Finds original URL
   * Redirects user automatically

---

# 📸 Screenshots
<img width="1836" height="954" alt="image" src="https://github.com/user-attachments/assets/600d8f2f-9363-45c3-91fa-fabb998bf523" />




---

# 🌍 Future Improvements

* User Authentication
* Custom Short URLs
* QR Code Generation
* URL Expiration
* Advanced Analytics Dashboard
* Copy to Clipboard Feature

---

# 👨‍💻 Author

Akshat Soni

---

# ⭐ Support

If you liked this project, give it a ⭐ on GitHub!

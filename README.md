
# 🚀 CodeYatra – Coding Profile Tracker

A responsive full-stack web application built to track and display coding statistics from popular competitive programming platforms like **LeetCode**, **CodeChef**, and **Codeforces** in real-time.

## 🌐 Live Demo

👉 [Live Website](https://code-yatra-9bdu.vercel.app)  
👉 [GitHub Repository](https://github.com/rajeevroy21/CodeYatra)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **APIs:** LeetCode, CodeChef, Codeforces (public/external APIs)

---

## ✨ Features

- 📊 **Real-time Coding Stats** – Fetch and display live data including ratings, number of problems solved, and contest performance.
- 🧠 **Multi-Platform Support** – Supports LeetCode, CodeChef, and Codeforces profile tracking.
- 🏆 **Leaderboard & Ranks** – Showcases global and platform-wise ranks and leaderboards.
- 🎯 **Clean UI/UX** – Minimalistic and intuitive interface designed with Tailwind CSS.
- 📱 **Responsive Design** – Fully responsive layout optimized for all devices.

---

## 📸 Screenshots

> ![image](https://github.com/user-attachments/assets/995b0b84-9ef6-4f69-bd4b-4dfa130a0fd6)
> ![Screenshot 2025-04-22 235016](https://github.com/user-attachments/assets/7be8f10e-1b62-4a8b-bc20-114bad6eac74)



---

## 🧑‍💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/rajeevroy21/CodeYatra.git
cd codeyatra
```

### 2. Install dependencies for both frontend and backend
```bash
# Frontend
cd Frontend
npm install

# Backend
cd ../Backend
npm install
```

### 3. Start the development servers
```bash
# Start backend server
cd backend
node server.js

# Start frontend server
cd ../frontend
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory and add the following (as needed):
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 📬 API Integration

The app utilizes public APIs or web-scraped endpoints to fetch coding stats. Proper error handling and fallback strategies are implemented to ensure robustness.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve this project or add new features, feel free to fork the repository and submit a PR.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Platforms: [LeetCode](https://leetcode.com), [CodeChef](https://codechef.com), [Codeforces](https://codeforces.com)
- Thanks to all the contributors and open-source packages that made this project possible.

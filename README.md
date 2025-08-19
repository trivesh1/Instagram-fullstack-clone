📸 InstaClone

A fully functional Instagram clone built with React, Firebase, and Chakra UI.
Features authentication, post creation, likes, comments, and responsive design.

🔗 Live Demo: https://instaclonebytrivesh.netlify.app/ <br>
🚀 Tech Stack<br>
	•	⚛️ React – Frontend library<br>
	•	🎨 Chakra UI – Component library for styling<br>
	•	🔥 Firebase – Authentication, Firestore database, Storage<br>
	•	🌐 Netlify – Hosting & deployment<br>

 ✨ Features <br>
	•	🔑 User Authentication (Sign up / Log in with Firebase Auth)<br>
	•	📸 Upload & Share Posts with images<br>
	•	❤️ Like & Comment System<br>
	•	👤 User Profiles with followers/following<br>
	•	🌓 Dark Mode UI (via Chakra UI)<br>
	•	📱 Responsive Design (mobile-first)<br>

 📂 Project Structure

instaclone/<br>
 ┣ 📂 public/          # Static assets<br>
 ┣ 📂 src/<br>
 ┃ ┣ 📂 components/    # Reusable UI components<br>
 ┃ ┣ 📂 hooks/         # Custom React hooks<br>
 ┃ ┣ 📂 pages/         # App pages (Feed, Profile, Auth, etc.)<br>
 ┃ ┣ 📂 store/         # Global state management<br>
 ┃ ┣ 📂 firebase/      # Firebase config & services<br>
 ┃ ┣ App.jsx           # Root component<br>
 ┃ ┗ index.js          # Entry point<br>
 ┣ .gitignore<br>
 ┣ package.json<br>
 ┗ README.md<br>
🛠️ Installation & Setup<br>
	1.	Clone the repo<br>
git clone https://github.com/trivesh1/Instagram-fullstack-clone<br>
cd instaclone<br>
	2.	Install dependencies<br>
npm install<br>
	3.	Create a Firebase project and set up:<br>
	•	Authentication (Email/Password, Google)<br>
	•	Firestore Database<br>
	•	Storage<br>
 	4.	Add your Firebase config in src/firebase/firebase.js:<br>
  //.js file<br>
  const firebaseConfig = {<br>
  apiKey: "YOUR_API_KEY",<br>
  authDomain: "YOUR_AUTH_DOMAIN",<br>
  projectId: "YOUR_PROJECT_ID",<br>
  storageBucket: "YOUR_STORAGE_BUCKET",<br>

  messagingSenderId: "YOUR_SENDER_ID",<br>
  appId: "YOUR_APP_ID"<br>
};<br>
	5.	Start development server<br>
 npm start<br>


 📸 Screenshots<br>
 Home Feed<br>
 <img width="1440" height="811" alt="Screenshot 2025-08-19 at 8 31 09 AM" src="https://github.com/user-attachments/assets/e3f16bcb-e95c-4506-96a9-360d128c4a84" />
 
Profile<br>
<img width="1439" height="803" alt="Screenshot 2025-08-19 at 8 33 15 AM" src="https://github.com/user-attachments/assets/1aafae67-0da0-4038-bcac-702f8be00168" />
Upload Post<br>
<img width="1440" height="796" alt="Screenshot 2025-08-19 at 8 34 58 AM" src="https://github.com/user-attachments/assets/1421ff14-7060-4c36-848a-fa0237ae1118" />





 📌 Future Improvements<br>
	•	🔔 Real-time notifications<br>
	•	💬 Direct messaging<br>
	•	🏷️ Hashtags & Search system<br>
🤝 Contributing<br>

Pull requests are welcome! Feel free to fork this repo and improve the project.<br>
📜 License<br>

This project is licensed under the MIT License.<br>


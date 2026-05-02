# 🌌 Harry Potter Character Galaxy
### AI-Powered NLP & 3D Character Similarity Visualization
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Threejs](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
---
## ✨ Project Overview
**Harry Potter Character Galaxy** is an immersive, AI-driven visualization platform that explores the intricate web of relationships in the wizarding world. By analyzing thousands of lines of character dialogues using state-of-the-art **Natural Language Processing (NLP)**, the system maps characters into a dynamic 3D star-field where spatial distance represents semantic and emotional similarity.
> "Words are, in my not-so-humble opinion, our most inexhaustible source of magic." — *Albus Dumbledore*
---
## 🚀 Key Features
*   **🌌 Interactive 3D Galaxy**: Explore a living universe where characters are represented as glowing celestial nodes. Similar speaking styles and emotional arcs result in closer spatial proximity.
*   **🧠 Advanced NLP Engine**: Deep analysis of vocabulary usage, sentence structure, and dialogue patterns using **Sentence Transformers** and **OpenAI/Groq Embeddings**.
*   **🎭 Emotion & Trait Mapping**: Characters are profiled based on core traits such as Intelligence, Aggression, Loyalty, and Humor.
*   **🔍 Real-Time Neural Search**: Instantly locate any wizard or witch and see their nearest neighbors in the vector space.
*   **🛡️ House-Based Clustering**: Visual grouping of characters by Hogwarts Houses (Gryffindor, Slytherin, etc.) powered by AI-driven semantic similarity.
---
## 🛠️ Tech Stack
### Frontend
- **React.js & Vite**: Modern, high-performance web framework.
- **Three.js / React Three Fiber**: Immersive 3D graphics and animations.
- **Tailwind CSS 4**: Premium utility-first styling with a custom magical theme.
- **Framer Motion**: Cinematic UI transitions and micro-animations.
### Backend
- **FastAPI**: Ultra-fast Python web framework for character intelligence.
- **Scikit-learn**: For dimensionality reduction (t-SNE/UMAP) and clustering.
- **Sentence Transformers**: To convert raw text into high-dimensional vectors.
- **Vector DB Concept**: Mapping character similarities in a spatial coordinate system.
---
## 📂 System Architecture
mermaid
graph TD
    A[Raw Character Dialogues] --> B[NLP Preprocessing]
    B --> C[Feature Extraction & Embeddings]
    C --> D[Similarity Matrix Computation]
    D --> E[Dimensionality Reduction - t-SNE]
    E --> F[3D Coordinate Mapping]
    F --> G[React Three Fiber Scene]
    G --> H[User Interface]

---
## 📥 Installation & Setup
### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Git
### 1. Clone the Repository
bash
git clone https://github.com/khushalkks/Harry_Porter.git
cd Harry_Porter

### 2. Frontend Setup
bash
cd frontend
npm install
npm run dev

### 3. Backend Setup
bash
cd ../backend
pip install -r requirements.txt
python app/[main.py](http://main.py)

---
## 📖 Methodology
The project follows a rigorous NLP pipeline to ensure accuracy:
1.  **Dialogue Aggregation**: Consolidating dialogue from scripts and books.
2.  **Neural Encoding**: Converting text into 1536-dimensional vectors.
3.  **Spatial Reduction**: Using UMAP/t-SNE to squash 1536 dimensions into 3D coordinates.
4.  **Visual Mapping**: Rendering the final coordinates into a real-time interactive Three.js scene.
---
## 📜 License
Distributed under the MIT License. See LICENSE for more information.
---
**Developed with ⚡ and Magic for the Wizarding World.**

# Strategy Pack Generator

A single-page web application that generates a complete Strategy Pack for a given company using a two-step AI pipeline. The app reads two uploaded documents and produces:
- Strategy-On-A-Page (SOAP)
- 3-Horizon Model (3HM)
- Balanced Scorecard (BSC)

All outputs are rendered directly on the website in a professional, boardroom-ready format.

---

## Features
- **Step 1:** Upload two documents (company overview & strategy reference) and generate SOAP + 3HM.
- **Step 2:** Generate a Balanced Scorecard (BSC) using only the Step 1 output.
- **No downloads or exports:** All results are displayed on the page.
- **Modern UI:** Designed for clarity and professional presentation.

---

## Local Setup & Run Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.9+
- (Optional) [pnpm](https://pnpm.io/) or npm/yarn for frontend

### 1. Clone the repository
```bash
git clone https://github.com/jhetjhet/stratint.git
cd stratint
```

### 2. Backend (FastAPI)

#### a. (Optional) Create a Python virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### b. Install dependencies
```bash
cd fastapi
pip install -r requirements.txt
```

#### c. Configure environment variables
Create a `.env` file in the `fastapi` folder with:
```
DEEPSEEK_API_KEY=your-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com
MODEL_NAME=deepseek-chat
```

#### d. Run the FastAPI server
```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

---

### 3. Frontend (React)

```bash
cd ../core-strategy-lab
pnpm install # or npm install or yarn
pnpm run dev # or npm run dev or yarn dev
```
The app will be available at `http://localhost:5173` (or as shown in your terminal).

---
### Docker Setup (Development)

To run both backend and frontend with Docker Compose for development:

```bash
docker compose up --build
```
This will start both services with hot reload and live updates.

---
### 4. Usage
1. Open the frontend in your browser.
2. Upload the required documents and run Step 1.
3. Review the generated SOAP and 3HM.
4. Run Step 2 to generate the BSC.
5. All results are displayed on the page.

---

## Project Structure
- `fastapi/` — FastAPI backend (document parsing, LLM calls, validation)
- `core-strategy-lab/` — React frontend (UI, API integration)

---
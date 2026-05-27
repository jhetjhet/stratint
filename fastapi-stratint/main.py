
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.strategy import router as strategy_router


app = FastAPI(title="Strategy Pack Generator")

# Allow all CORS (for dev; restrict in prod)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(strategy_router)

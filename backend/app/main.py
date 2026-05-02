from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import characters

app = FastAPI(
    title="Harry Potter Character Galaxy API",
    description="Backend API for the Harry Potter Character Galaxy",
    version="1.0.0"
)

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the Harry Potter Character Galaxy API"}

app.include_router(characters.router, prefix="/characters", tags=["Characters"])

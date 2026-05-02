from fastapi import APIRouter
from app.api.routes.characters import router as character_router

api_router = APIRouter()

api_router.include_router(character_router)
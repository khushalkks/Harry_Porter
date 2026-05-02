from fastapi import APIRouter
from app.services.character_service import get_character_galaxy

router = APIRouter()

@router.get("/")
def characters():
    return get_character_galaxy()

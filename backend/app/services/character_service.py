import pandas as pd
from sklearn.neighbors import NearestNeighbors
import os
from textblob import TextBlob

from app.nlp.preprocessing import clean_text
from app.nlp.embeddings import generate_embeddings
from app.nlp.dimensionality import reduce_dimensions

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CSV_PATH = os.path.join(BASE_DIR, "app", "data", "raw", "dialogues.csv")

def get_character_galaxy():
    if not os.path.exists(CSV_PATH):
        return []

    # Read CSV
    df = pd.read_csv(CSV_PATH)

    # Clean text
    df["dialogue"] = df["dialogue"].apply(clean_text)

    # Group dialogues by character
    grouped = (
        df.groupby("character")["dialogue"]
        .apply(" ".join)
        .reset_index()
    )

    characters = grouped["character"].tolist()
    dialogues = grouped["dialogue"].tolist()

    # Generate embeddings
    embeddings = generate_embeddings(dialogues)

    # Similarity using K-Nearest Neighbors
    knn = NearestNeighbors(n_neighbors=min(5, len(characters)), metric='cosine')
    knn.fit(embeddings)
    distances, indices = knn.kneighbors(embeddings)

    # Reduce to 3D coordinates (using t-SNE in dimensionality.py)
    coordinates = reduce_dimensions(embeddings)

    result = []

    for idx, character in enumerate(characters):
        similar_characters = []

        # indices[idx] contains the indices of the nearest neighbors
        for i in range(len(indices[idx])):
            sim_idx = indices[idx][i]
            if idx != sim_idx:
                # distance is cosine distance, so similarity is 1 - distance
                score = 1.0 - distances[idx][i]
                similar_characters.append({
                    "name": characters[sim_idx],
                    "score": float(score)
                })

        # Calculate sentiment using TextBlob
        blob = TextBlob(dialogues[idx])
        polarity = blob.sentiment.polarity
        
        if polarity < -0.05:
            sentiment_label = "Dark / Aggressive"
        elif polarity > 0.1:
            sentiment_label = "Light / Harmonious"
        else:
            sentiment_label = "Neutral / Balanced"

        result.append({
            "name": character,
            "x": float(coordinates[idx][0]),
            "y": float(coordinates[idx][1]),
            "z": float(coordinates[idx][2]),
            "similar": similar_characters,
            "sentiment_score": round(polarity, 2),
            "sentiment_label": sentiment_label
        })

    return result

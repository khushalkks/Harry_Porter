from sklearn.feature_extraction.text import TfidfVectorizer

def generate_embeddings(texts: list) -> list:
    if not texts:
        return []
    
    # Use character n-grams so that even very short, distinct quotes have > 0% similarity
    vectorizer = TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4), max_features=500)
    # Fit and transform the texts
    embeddings = vectorizer.fit_transform(texts).toarray()
    return embeddings.tolist()

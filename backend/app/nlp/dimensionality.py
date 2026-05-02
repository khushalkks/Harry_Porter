from sklearn.manifold import TSNE
import numpy as np

def reduce_dimensions(embeddings: list, n_components: int = 3) -> list:
    if not embeddings:
        return []
        
    arr = np.array(embeddings)
    n_samples = arr.shape[0]
    
    # If we have < 4 samples, we can't really do t-SNE properly, fallback to random
    if n_samples < 4:
        return [[float(np.random.rand()*50), float(np.random.rand()*50), float(np.random.rand()*50)] for _ in range(n_samples)]
        
    # Perplexity must be less than n_samples
    perplexity = min(5, n_samples - 1)
    
    tsne = TSNE(n_components=n_components, perplexity=perplexity, random_state=42, init='pca', learning_rate='auto')
    coords = tsne.fit_transform(arr)
    
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler(feature_range=(-20, 20))
    coords = scaler.fit_transform(coords)
    
    result = []
    for coord in coords:
        padded = [float(c) for c in coord] 
        while len(padded) < 3:
            padded.append(0.0)
        result.append(padded)
        
    return result

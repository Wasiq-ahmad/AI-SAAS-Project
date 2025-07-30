import faiss
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
embedding = model.encode(["hello world"])

index = faiss.IndexFlatL2(len(embedding[0]))
index.add(embedding)
print("FAISS works ✅")

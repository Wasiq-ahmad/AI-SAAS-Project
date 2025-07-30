import faiss
from embedding import get_embedding

# In-memory storage
memory_data = []  # [{user_input: ..., llm_output: ...}]
dimension = 384
index = faiss.IndexFlatL2(dimension)

def add_to_memory(user_input: str, llm_output: str):
    entry = {"user_input": user_input, "llm_output": llm_output}
    memory_data.append(entry)

    combined_text = f"User: {user_input}\nAssistant: {llm_output}"
    vector = get_embedding(combined_text)
    index.add(vector.reshape(1, -1))

def search_memory(query: str, k=2):
    if len(memory_data) == 0:
        return []

    vector = get_embedding(query)
    D, I = index.search(vector.reshape(1, -1), k)
    results = []

    for i in I[0]:
        if i < len(memory_data):
            results.append(memory_data[i])

    return results

def get_full_memory():
    return memory_data

def get_latest_topic_from_memory():
    # Find the last user query that looks like a topic (heuristic or pattern match)
    for entry in reversed(memory_data):
        if "generate" in entry["user_input"].lower() and "title" in entry["user_input"].lower():
            return entry["user_input"]
    return None


def get_latest_blog_topic():
    for entry in reversed(memory_data):
        if "generate" in entry["user_input"].lower() and "title" in entry["user_input"].lower():
            parts = entry["user_input"].split(" on ")
            if len(parts) > 1:
                return parts[1].strip()
    return None

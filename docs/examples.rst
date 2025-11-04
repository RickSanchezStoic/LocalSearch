Advanced Usage / Custom Components
==================================

This page shows how to use custom components with LocalSearch.

Custom Embeddings
-----------------

You can provide a custom embedding class by subclassing :class:`LocalSearch.backend.embeddings.BaseEmbeddings`.


.. code-block:: python

    from LocalSearch.backend.embeddings import BaseEmbeddings
    from LocalSearch.backend.engine import SearchEngine
    from LocalSearch.backend.llms import GroqLLM

    class MyEmbeddings(BaseEmbeddings):
        def embed_documents(self, docs):
            # custom embedding logic
            return [[0.1, 0.2]] * len(docs)

    llm = GroqLLM(api_key='gsk_********************************')
    engine = SearchEngine(directory_path=r"C:\docs", llm=llm, embedder=MyEmbeddings())
    result = engine.search("custom embedding test")

Custom Text Extractor
--------------------

.. code-block:: python

    from LocalSearch.backend.textExtractor import BaseTextExtractor

    class MyTextExtractor(BaseTextExtractor):
        def extract_text(self, filepath):
            # custom extraction logic
            return "text from " + filepath

    engine = SearchEngine(directory_path=r"C:\docs", llm=llm, text_extractor=MyTextExtractor())

Custom Vector Store
------------------

.. code-block:: python

    import numpy as np
    from LocalSearch.backend.vector_store import BaseVectorStore
    from typing import List, Set
    from LocalSearch.backend.engine import SearchEngine

    class MyVectorStore(BaseVectorStore):
        def __init__(self):
            self.store = {}
            self.current_id = 0

        def add(self, vectors: np.ndarray, ids: np.ndarray, metadata: List[dict]):
            for v, i, m in zip(vectors, ids, metadata):
                self.store[i] = {'vector': v, 'metadata': m}

        def search(self, query_vector: np.ndarray, top_k: int):
            # simple placeholder: return first top_k items
            return list(self.store.items())[:top_k]

        def remove_by_id(self, vector_id: int) -> None:
            self.store.pop(vector_id, None)

        def save(self, path: str):
            pass  # implement saving logic

        def load(self, path: str):
            pass  # implement loading logic

        def dimension(self) -> int:
            return len(next(iter(self.store.values()))['vector'])

        def get_all_ids(self) -> Set[int]:
            return set(self.store.keys())

        def prepare_index(self, directory_path: str, recursive: bool = True):
            return {'index': None, 'current_files': set(), 'used_ids': set()}

    engine = SearchEngine(directory_path=r"C:\docs", llm=llm, vector_store=MyVectorStore())

Custom Metadata Store
---------------------

.. code-block:: python

    from LocalSearch.backend.metadata_store import BaseMetadataStore
    from typing import Dict, List
    from LocalSearch.backend.engine import SearchEngine

    class MyMetadataStore(BaseMetadataStore):
        def __init__(self):
            self.metadata = {}
            self.chunk_mapping = []

        def load_metadata(self) -> Dict:
            return self.metadata

        def save_metadata(self, metadata: Dict) -> None:
            self.metadata = metadata

        def get_file_info(self, file_path: str):
            return self.metadata.get(file_path, {})

        def is_modified(self, file_path: str, current_info: Dict) -> bool:
            return self.metadata.get(file_path) != current_info

        def update(self, file_path: str, file_info: Dict) -> None:
            self.metadata[file_path] = file_info

        def load_chunk_mapping(self) -> List:
            return self.chunk_mapping

        def save_chunk_mapping(self, chunk_mapping: List) -> None:
            self.chunk_mapping = chunk_mapping

    engine = SearchEngine(directory_path=r"C:\docs", llm=llm, metadata_store=MyMetadataStore())

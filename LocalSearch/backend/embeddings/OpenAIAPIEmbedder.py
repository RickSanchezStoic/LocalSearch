import numpy as np
from openai import OpenAI
from typing import List, Union

from LocalSearch.backend.embeddings.BaseEmbeddings import BaseEmbedder


class OpenAIAPIEmbedder(BaseEmbedder):
    """
    Embedder using an OpenAI-compatible API endpoint.

    Supports remote embedding services like:
    - Text Embeddings Inference (TEI)
    - vLLM
    - Ollama (with OpenAI compatibility)
    - Custom embedding servers
    """

    def __init__(
            self,
            base_url: str,
            model_name: str,
            api_key: str = "dummy",
            dimension: int = None,
            timeout: int = 30
    ):
        """
        Initialize the OpenAI-compatible embedder.

        Args:
            base_url: Base URL of the API endpoint (e.g., "http://192.168.1.100:8080/v1")
            model_name: Model name to use (e.g., "nomic-ai/modernbert-embed-base")
            api_key: API key (use "dummy" or any string for local servers)
            dimension: Embedding dimension (if None, will auto-detect on first call)
            timeout: Request timeout in seconds
        """
        self.model_name = model_name
        self.api_key = api_key
        self.timeout = timeout
        self._dim = dimension

        # Initialize OpenAI client
        self.client = OpenAI(api_key=api_key, base_url=base_url, timeout=timeout)

        # Test connection and auto-detect dimension if needed
        if self._dim is None:
            test_embedding = self._get_embedding("test")
            self._dim = len(test_embedding)

    def _get_embedding(self, text: str) -> np.ndarray:
        """
        Get embedding from the API endpoint.

        Args:
            text: Input text to embed

        Returns:
            np.ndarray: Embedding vector
        """
        try:
            response = self.client.embeddings.create(
                model=self.model_name,
                input=text
            )
            embedding = response.data[0].embedding
            return np.array(embedding, dtype=np.float32)

        except Exception as e:
            raise RuntimeError(f"Failed to get embedding: {e}")

    def _get_embeddings_batch(self, texts: List[str]) -> List[np.ndarray]:
        """
        Get embeddings for multiple texts in a single API call.

        Args:
            texts: List of input texts

        Returns:
            List[np.ndarray]: List of embedding vectors
        """
        try:
            response = self.client.embeddings.create(
                model=self.model_name,
                input=texts
            )
            embeddings = [
                np.array(item.embedding, dtype=np.float32)
                for item in sorted(response.data, key=lambda x: x.index)
            ]
            return embeddings

        except Exception as e:
            raise RuntimeError(f"Failed to get embeddings: {e}")

    def encode(self, text: Union[str, List[str]]) -> Union[np.ndarray, List[np.ndarray]]:
        """
        Encode text(s) into vector embedding(s).

        Args:
            text: Input string or list of strings to encode.

        Returns:
            np.ndarray or List[np.ndarray]: Embedding vector(s) as float32 array(s).
        """
        if isinstance(text, str):
            return self._get_embedding(text)
        elif isinstance(text, list):
            return self._get_embeddings_batch(text)
        else:
            raise TypeError("text must be a string or list of strings")

    def dimension(self) -> int:
        """
        Return the dimensionality of the embedding vectors.

        Returns:
            int: Embedding dimension.
        """
        return self._dim
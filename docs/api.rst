API Reference
=============

Embeddings
----------

This section contains classes for generating vector embeddings from documents.
Users can extend :class:`LocalSearch.backend.embeddings.BaseEmbeddings` to implement custom embedding strategies.

.. automodule:: LocalSearch.backend.embeddings.BaseEmbeddings
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: LocalSearch.backend.embeddings.SentenceTransformerEmbedder
   :members:
   :undoc-members:
   :show-inheritance:

LLMs
----

This section contains classes for interacting with Large Language Models (LLMs).
Users can subclass :class:`LocalSearch.backend.llms.BaseLLM` to provide custom LLM implementations.

.. automodule:: LocalSearch.backend.llms.BaseLLM
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: LocalSearch.backend.llms.GroqLLM
   :members:
   :undoc-members:
   :show-inheritance:

Vector Stores
-------------

This section contains classes for storing and querying document vectors.
Users can implement :class:`LocalSearch.backend.vector_store.BaseVectorStore` to define a custom vector storage backend.

.. automodule:: LocalSearch.backend.vector_store.BaseVectorStore
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: LocalSearch.backend.vector_store.FaissVectorStore
   :members:
   :undoc-members:
   :show-inheritance:

Metadata Stores
---------------

This section contains classes for storing metadata about documents and vector chunks.
Users can subclass :class:`LocalSearch.backend.metadata_store.BaseMetaDataStore` to implement custom metadata handling.

.. automodule:: LocalSearch.backend.metadata_store.BaseMetaDataStore
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: LocalSearch.backend.metadata_store.JsonMetadataStore
   :members:
   :undoc-members:
   :show-inheritance:

Text Extractors
---------------

This section contains classes for extracting text from files.
Users can implement :class:`LocalSearch.backend.text_extractor.BaseTextExtractor` to define custom extraction strategies.

.. automodule:: LocalSearch.backend.text_extractor.BaseTextExtractor
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: LocalSearch.backend.text_extractor.DefaultTextExtractor
   :members:
   :undoc-members:
   :show-inheritance:

Engine
------

This class provides the main interface for searching documents and querying LLMs.
Use :class:`LocalSearch.backend.engine.SearchEngine` to initialize and run searches or start the web interface.

.. autoclass:: LocalSearch.backend.engine.SearchEngine
   :members:
   :undoc-members:
   :show-inheritance:

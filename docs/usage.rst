Usage / Quickstart
=================

This page shows how to quickly get started with LocalSearch.

Quickstart Example
-----------------

First, import the LLM and engine:

.. code-block:: python

    from LocalSearch.backend.llms.GroqLLM import GroqLLM
    from LocalSearch.backend.engine import SearchEngine

Initialize the LLM and the search engine:

.. code-block:: python

    llm = GroqLLM(api_key='gsk_********************************')
    engine = SearchEngine(directory_path=r"C:\your\documents\folder", llm=llm)

Perform a search:

Use :meth:`LocalSearch.backend.engine.SearchEngine.search` to query documents.

.. code-block:: python

    result = engine.search("what is the most important thing in life?", top_k=20)

Start the chat interface:

Use :meth:`LocalSearch.backend.engine.SearchEngine.web` to launch a server with a specified address and port that
hosts the engine for you to query in an interactive chat-like interface.

.. code-block:: python

    engine.web()

Notes
-----

- Replace `directory_path` with the path to your documents folder.
- `GroqLLM` requires a valid `api_key`.
- `search()` returns a list of top `k` results.
- `web()` launches a local browser-based chat interface.

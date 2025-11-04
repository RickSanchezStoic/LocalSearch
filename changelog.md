# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2025-11-03

### 🎉 Initial Release

First public release of **LocalSearch** — a lightweight, privacy-first local semantic search engine powered by embeddings and LLMs.

#### ✨ Core Features
- **Semantic Search** — meaning-based file retrieval using vector embeddings.
- **Modular Components** — easily swap LLMs, embedders, vector stores, and metadata backends.
- **Auto Re-Embedding** — automatically detects modified files and re-embeds them.
- **Context-Aware Q&A** — LLM answers questions using only local context.
- **FastAPI Web Interface** — intuitive local web app for file browsing and querying.
- **Fully Typed and Tested** — includes type hints and unit tests for core modules.

#### 🧩 Architecture Overview
- `backend/engine.py` — main entry point for the `SearchEngine` class.
- Pluggable submodules for embeddings, LLMs, vector stores, and metadata.
- `frontend/` — simple web interface for search and visualization.

#### 🧠 Extensibility
- Custom components supported via:
  - `BaseEmbedder`
  - `BaseLLM`
  - `BaseVectorStore`
  - `BaseMetadataStore`

#### 🧰 Developer Notes
- Initial docs published at [https://localsearch.readthedocs.io](https://localsearch.readthedocs.io)
- Supports installation via PyPI (`pip install localsearch`) or local editable mode.
- Licensed under MIT © 2025 [Rick Sanchez].

---

## [Unreleased]

### 🚧 Planned
- Plugin API for third-party embedders and LLMs.
- Improved web UI with file previews and search highlighting.
- Optional local database for metadata indexing.
- Incremental embedding cache and parallel chunking support.

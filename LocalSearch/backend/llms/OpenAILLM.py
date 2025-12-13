from openai import OpenAI

from LocalSearch.backend.llms.BaseLLM import BaseLLM


class OpenAILLM(BaseLLM):
    """
    OpenAI LLM client wrapper.

    Supports both OpenAI and OpenAI-compatible endpoints (e.g., LM Studio).
    Uses the /v1/chat/completions endpoint with streaming support.
    """

    def __init__(
        self,
        api_key: str = "your-api-key",
        model: str = "gpt-3.5-turbo",
        base_url: str = None,
        temperature: float = 0.7,
        max_tokens: int = 10000,
    ):
        """
        Initialize the OpenAI LLM client.

        Args:
            api_key: API key for OpenAI. For local endpoints like LM Studio,
                     use any string (default: "not-needed").
            model: Model name to use (default: "gpt-3.5-turbo").
            base_url: Base URL for OpenAI-compatible endpoints.
                      For LM Studio: "http://localhost:1234/v1"
                      For OpenAI: None (uses default).
            temperature: Sampling temperature (default: 0.7).
            max_tokens: Maximum tokens to generate (default: 10000).
        """
        self.api_key = api_key
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens

        if base_url:
            self.client = OpenAI(api_key=api_key, base_url=base_url)
        else:
            self.client = OpenAI(api_key=api_key)

    def generate(self, prompt: str) -> str:
        """
        Generate text for the given prompt.

        Args:
            prompt: Input string to generate a response for.

        Returns:
            Generated text as a string.
        """
        messages = [{"role": "user", "content": prompt}]

        completion = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            stream=True,
        )

        response_text = ""
        for chunk in completion:
            if chunk.choices[0].delta.content:
                response_text += chunk.choices[0].delta.content

        return response_text

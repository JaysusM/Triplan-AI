import sys
import os
from llama_cpp import Llama

def generate_response(user_message, system_message="You are an expert in tourism and you are a helping a user plan to a trip.", model_path="./src/ai-models/Llama-3.2-1B-Instruct-Q6_K.gguf", max_tokens=250):
    """
    Generates a response from the Llama model based on the provided system and user messages.

    Parameters:
    - user_message (str): The user message to generate a response for.
    - system_message (str): The system message to set the context.
    - model_path (str): Path to the GGUF model.
    - max_tokens (int): Maximum number of tokens for the response.

    Returns:
    - str: The generated response from the model.
    """
    if max_tokens > 2048:
        print("WARNING: Max tokens greater than 2048 may cause the model to generate unsafe content.")

    # Suppress stdout and stderr
    original_stdout = sys.stdout
    original_stderr = sys.stderr
    sys.stdout = open(os.devnull, 'w')
    sys.stderr = open(os.devnull, 'w')

    try:
        # Create a llama model
        model = Llama(model_path=model_path)
    finally:
        # Restore stdout and stderr
        sys.stdout.close()
        sys.stderr.close()
        sys.stdout = original_stdout
        sys.stderr = original_stderr

    # Prompt creation
    prompt = (
        f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>"
        f"{system_message}<|eot_id|><|start_header_id|>user<|end_header_id|>"
        f"{user_message}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
    )

    # Run the model
    response = model(prompt, max_tokens=max_tokens, echo=False)

    # Extract the generated text from the response
    generated_text = response['choices'][0]['text']

    # Trim the prompt from the response if necessary
    if generated_text.startswith(prompt):
        generated_text = generated_text[len(prompt):].strip()

    if response['choices'][0]['finish_reason'] != 'stop':
        user_message = f"Continue from: {generated_text}"
        response = generate_response(user_message, max_tokens=2048)
        generated_text += response

    return generated_text

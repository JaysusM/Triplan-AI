# Triplan AI

## Overview

This project is a work in progress web application that provides suggestions for places and activities in various cities. It consists of a Flask-based API and a React frontend. The API leverages the Llama model for generating responses. The Llama model needs to be added to the `ai-models` folder.

The main goal of this project is to create a schedule of places you would like to visit in a given city. Additionally, it serves as a learning experience for working with Large Language Models (LLMs) and AI.

## Prerequisites

- Python 3.6 or higher
- Node.js and npm
- Flask
- Llama model files

## Installation

ℹ️ This will be moved to a docker-compose once the project is complete.

### Backend (Flask API)

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jaysusm/triplan.git
   cd triplan-ai
   ```

2. **Create and activate a virtual environment:**

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required Python packages:**

   ```sh
   pip install -r requirements.txt
   ```

4. **Add the Llama model:**

Download the Llama model (you can use [HuggingFace](https://huggingface.co/models)) and place it in the ai-models folder. Ensure the model file is named appropriately, for example, Llama-3.2-1B-Instruct-Q6_K.gguf.

5. Start the Flask application:

   ```sh
   python .
   ```

### Frontend (React)

1. **Navigate to the `frontend` directory:**

   ```sh
   cd frontend
   ```

2. **Install the required npm packages:**

   ```sh
   npm install
   ```

3. **Start the React application:**

   ```sh
   npm start
   ```

4. Access the application:

Open your web browser and navigate to http://localhost:3000.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

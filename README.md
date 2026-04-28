# CivicGuide: Election Process Education

An interactive web application designed to help users understand the democratic election process, timelines, and important steps, built for the PromptWars Challenge.

## Vertical Chosen
**Election Process Education**

## Approach and Logic
The goal was to create a "smart, dynamic assistant" that breaks down complex civic information into easily digestible, interactive pieces.
The application consists of two main modules working side-by-side:

1.  **Interactive Timeline (`Timeline.jsx`)**: A visually engaging stepper that outlines the general phases of an election (from Voter Registration to Inauguration Day). Users can click on steps to expand them for more detailed information. This provides the structured, predictable foundation of the educational content.
2.  **Smart Election Assistant (`AssistantChat.jsx`)**: An AI-powered chat interface using the **Google Gemini API** (`gemini-2.5-flash` via `@google/genai`). This allows users to ask specific, nuanced questions that might not be covered in the static timeline (e.g., "What is a swing state?", "How do I register in Texas?").

## How It Works
-   **Security & Setup**: To ensure the safety of API keys, the application does not hardcode them. Instead, it features an `ApiConfig` component where the user securely enters their own Gemini API key for the current session. The key is held in memory and never sent anywhere other than Google's secure API endpoint.
-   **Contextual AI**: The Gemini model is prompted with a specific system instruction to act as a "helpful, neutral, and educational assistant designed to explain the election process."
-   **Design**: Built with React and Vite, utilizing a modern dark-mode aesthetic with glassmorphism effects and CSS variables for a premium feel.

## Assumptions Made
-   **Generalized Process**: Since election processes vary wildly by country (and even state-by-state within the US), the timeline focuses on a generalized US Presidential Election framework as a recognizable example of a complex democratic process. The AI assistant can bridge the gap for localized questions.
-   **API Key Access**: It is assumed the user running the application locally has access to a Google Gemini API Key to test the dynamic capabilities. If not, the application gracefully handles the error and provides offline context.

## Prerequisites
-   Node.js installed

## How to Run Locally

1.  Clone this repository.
2.  Navigate into the project directory:
    ```bash
    cd election-process-education
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser to the local URL provided (usually `http://localhost:5173/`).
6.  (Optional but recommended) Enter a valid Gemini API key in the configuration panel to unlock the chat assistant.

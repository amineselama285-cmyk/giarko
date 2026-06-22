import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import EditorHeader from './EditorHeader';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';

// تعريف TypeScript لدعم import.meta.env في Vite
// يمكنك نقل هذا إلى ملف types.d.ts في المشروع إذا أردت
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// This would be securely managed in a real environment
// const API_KEY = process.env.API_KEY;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface FileData {
    path: string;
    content: string;
}

export type GenerationStatus = 'idle' | 'planning' | 'building' | 'done' | 'error';

const generationPrompt = (prompt: string) => `
You are an expert AI developer. Your task is to generate the code for a complete, self-contained web application based on the user's request.

**Instructions:**
1.  **Structure:** Generate a standard project structure. For React, this includes \`index.html\`, \`src/App.tsx\`, \`src/index.tsx\`, and other components inside \`src/components/\`.
2.  **Code Quality:** The code must be production-ready, well-commented, and functional. Use modern best practices.
3.  **Styling:** Use Tailwind CSS for styling. You can include it via a CDN in \`index.html\`.
4.  **Dependencies:** For React, load dependencies (like react, react-dom) from a CDN (e.g., esm.sh) using an import map in \`index.html\`.
5.  **Imports:** Use relative paths for local file imports (e.g., \`import MyComponent from './components/MyComponent.tsx'\`). My system will handle resolving them. Include file extensions in all imports.

**Output Format:**
Your entire output must be a single JSON object. The JSON should have a single key, "files", which is an array of objects, where each object has a "path" and "content" string.

**Example JSON Output:**
\`\`\`json
{
  "files": [
    {
      "path": "index.html",
      "content": "<!DOCTYPE html>..."
    },
    {
      "path": "src/App.tsx",
      "content": "import React from 'react';\\n..."
    }
  ]
}
\`\`\`

**User Prompt:** "${prompt}"
`;

const Editor: React.FC = () => {
    const [status, setStatus] = useState<GenerationStatus>('idle');
    const [files, setFiles] = useState<FileData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [thought, setThought] = useState<string | null>(null);
    const [generationTime, setGenerationTime] = useState<number | null>(null);

    const handleSendPrompt = useCallback(async (prompt: string) => {
        if (!API_KEY) {
            setError("API key is not configured.");
            setStatus("error");
            console.error("API_KEY is missing.");
            return;
        }

        setStatus('building');
        setError(null);
        setFiles([]);
        setThought(null);
        setGenerationTime(null);
        const startTime = Date.now();

        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            
            const responseStream = await ai.models.generateContentStream({
                model: "gemini-2.5-pro",
                contents: generationPrompt(prompt),
                config: {
                    // `thinkingConfig` is removed as it's not supported by 'gemini-2.5-pro'.
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            files: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        path: {
                                            type: Type.STRING,
                                            description: "The full path of the file, e.g., 'src/App.tsx'."
                                        },
                                        content: {
                                            type: Type.STRING,
                                            description: "The complete content of the file."
                                        }
                                    },
                                    required: ['path', 'content']
                                }
                            }
                        },
                        required: ['files']
                    },
                    maxOutputTokens: 32000,
                },
            });
            
            let accumulatedJson = '';
            
            for await (const chunk of responseStream) {
                // Simplified stream processing. We no longer get `thought` parts.
                accumulatedJson += chunk.text;
            }

            const endTime = Date.now();
            const sanitizedText = accumulatedJson.trim().replace(/^```json\s*|```\s*$/g, '');
            
            if (!sanitizedText) {
                 throw new Error("The AI response was empty.");
            }

            const generated = JSON.parse(sanitizedText);

            if (generated.files && generated.files.length > 0) {
                setFiles(generated.files);
                setGenerationTime((endTime - startTime) / 1000);
                setStatus('done');
            } else {
                throw new Error("The AI response was missing the required 'files' property.");
            }

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during generation.";
            setError(`Failed to generate the application. ${errorMessage}`);
            setStatus('error');
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-[#111113] text-gray-300 font-sans">
            <EditorHeader />
            <div className="flex flex-1 overflow-hidden">
                <LeftSidebar 
                    status={status} 
                    onSendPrompt={handleSendPrompt} 
                    error={error} 
                    thought={thought}
                    generationTime={generationTime}
                />
                <MainContent files={files} status={status} />
            </div>
        </div>
    );
};

export default Editor;

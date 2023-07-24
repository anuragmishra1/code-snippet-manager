import React, { useState, useEffect } from 'react';
import { Snippet } from '../@types/Snippet';
import hljs from 'highlight.js';

interface SnippetFormProps {
  onCreateSnippet: (snippet: Snippet) => void;
  onUpdateSnippet: (snippet: Snippet) => void;
  selectedSnippet: Snippet | null;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

const defaultSnippet: Snippet = {
  id: 0,
  title: '',
  description: '',
  code: '',
  language: 'javascript',
};

const SnippetForm: React.FC<SnippetFormProps> = ({
  onCreateSnippet,
  onUpdateSnippet,
  selectedSnippet,
  setSelectedSnippet
}) => {
  const [newSnippet, setNewSnippet] = useState<Snippet>({ ...defaultSnippet });

  useEffect(() => {
    // Update the form fields when selectedSnippet changes (when editing a snippet)
    if (selectedSnippet) {
      setNewSnippet(selectedSnippet);
    }
  }, [selectedSnippet]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewSnippet((prevSnippet) => ({ ...prevSnippet, [name]: value }));
  };

  const handleCreateSnippet = () => {
    if (newSnippet.title && newSnippet.description && newSnippet.code) {
      const detectedLanguage = hljs.highlightAuto(newSnippet.code).language || 'javascript';
      newSnippet.language = detectedLanguage;

      onCreateSnippet({ ...newSnippet, id: Date.now() });

      setNewSnippet({ ...defaultSnippet });
    }
  };

  const handleUpdateSnippet = () => {
    if (selectedSnippet) {
      onUpdateSnippet(newSnippet);
      setSelectedSnippet(null);
      setNewSnippet({ ...defaultSnippet });
    }
  };

  return (
    <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 p-6 shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-4">Create Snippet</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newSnippet.title}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg mb-4"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newSnippet.description}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg mb-4"
      />
      <textarea
        name="code"
        placeholder="Code"
        value={newSnippet.code}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg mb-4 h-40 resize-none"
      />
      <div className="flex justify-end">
        {
          selectedSnippet === null && <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleCreateSnippet}
          >
            Create
          </button>
        }
        {
          selectedSnippet && <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdateSnippet}
          >
            Update
          </button>
        }
      </div>
    </div>
  );
};

export default SnippetForm;

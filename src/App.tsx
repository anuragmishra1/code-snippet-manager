import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import { Snippet } from './@types/Snippet';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';
import Search from './components/Search';

const App: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [searchResults, setSearchResults] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedSnippets = localStorage.getItem('snippets');
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);

  useEffect(() => {
    if (snippets.length) {
      localStorage.setItem('snippets', JSON.stringify(snippets));
    }
  }, [snippets]);

  const handleCreateSnippet = (newSnippet: Snippet) => {
    setSnippets((prevSnippets) => [
      ...prevSnippets,
      { ...newSnippet, id: Date.now() },
    ]);
  };

  const handleEditSnippet = (id: number) => {
    const snippetToEdit = snippets.find((snippet) => snippet.id === id);
    if (snippetToEdit) {
      setSelectedSnippet(snippetToEdit);
    }
  };

  const handleUpdateSnippet = (updatedSnippet: Snippet) => {
    if (updatedSnippet && updatedSnippet.id && updatedSnippet.description && updatedSnippet.title && updatedSnippet.code) {
      const detectedLanguage = hljs.highlightAuto(updatedSnippet.code).language || 'javascript';

      setSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet.id === updatedSnippet.id
            ? { ...updatedSnippet, language: detectedLanguage }
            : snippet
        )
      );
    }
  };

  const handleDeleteSnippet = (id: number) => {
    setSnippets((prevSnippets) =>
      prevSnippets.filter((snippet) => snippet.id !== id)
    );
  };

  const handleSearch = (query: string) => {
    const filteredSnippets = snippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(query.toLowerCase()) ||
        snippet.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchQuery(query);
    setSearchResults(filteredSnippets);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Code Snippet Manager</h1>
        <SnippetForm
          onCreateSnippet={handleCreateSnippet}
          onUpdateSnippet={handleUpdateSnippet}
          selectedSnippet={selectedSnippet}
          setSelectedSnippet={setSelectedSnippet}
        />

        <Search onSearch={handleSearch} />

        <SnippetList
          snippets={searchResults.length > 0 || searchQuery ? searchResults : snippets}
          onEditSnippet={handleEditSnippet}
          onDeleteSnippet={handleDeleteSnippet}
        />
      </div>
    </div>
  );
};

export default App;

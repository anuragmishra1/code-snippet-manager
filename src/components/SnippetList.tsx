import React from 'react';
import { Snippet } from '../@types/Snippet';
import SnippetItem from './SnippetItem';

interface SnippetListProps {
  snippets: Snippet[];
  onEditSnippet: (id: number) => void;
  onDeleteSnippet: (id: number) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  onEditSnippet,
  onDeleteSnippet,
}) => {
  return (
    <div className="my-5">
      <h2 className="text-xl font-bold mb-4">Snippets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {snippets.map((snippet) => (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
            onEditSnippet={onEditSnippet}
            onDeleteSnippet={onDeleteSnippet}
          />
        ))}
      </div>
    </div>
  );
};

export default SnippetList;

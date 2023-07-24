import React from 'react';
import { Snippet } from '../@types/Snippet';
import CodeHighlight from './CodeHighlight';

interface SnippetItemProps {
  snippet: Snippet;
  onEditSnippet: (id: number) => void;
  onDeleteSnippet: (id: number) => void;
}

const SnippetItem: React.FC<SnippetItemProps> = ({
  snippet,
  onEditSnippet,
  onDeleteSnippet,
}) => {
  return (
    <div
      key={snippet.id}
      className="rounded-lg bg-white shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="bg-indigo-600 text-white py-2 px-4">
        <h3 className="text-lg font-bold">{snippet.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4">{snippet.description}</p>
        {/* <div className="flex flex-wrap mb-2">
          <p className="text-gray-600 mb-4">
            The Code Syntax is: { }
            <span className="text-white text-sm px-2 py-1 mr-2 rounded" style={{ backgroundColor: '#555' }}>
              {snippet.language}
            </span>
          </p>
        </div> */}
        <code className="block overflow-y-auto max-h-40 p-2 bg-gray-100 rounded-lg" style={{ minHeight: '10rem' }}>
          <CodeHighlight language={snippet.language} code={snippet.code} />
        </code>
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => onEditSnippet(snippet.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => onDeleteSnippet(snippet.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div >
  );
};

export default SnippetItem;

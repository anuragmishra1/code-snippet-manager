import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center mb-4 my-5">
      <input
        type="text"
        placeholder="Search by title or description"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-l-lg border border-gray-400"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;

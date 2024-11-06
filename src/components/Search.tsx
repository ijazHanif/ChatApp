import React from 'react';

const Search = () => {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search here..."
        className="p-2 pl-10 rounded-xl shadow-2xl border text-black outline-gray-200 w-full"
      />
      <svg
        className="absolute left-3 top-3 w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 4a6 6 0 100 12 6 6 0 000-12zm4.586 10.586l4.828 4.828m-4.828-4.828l-4.828-4.828"
        />
      </svg>
    </div>
  );
};

export default Search;

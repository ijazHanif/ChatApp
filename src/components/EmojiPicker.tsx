import React from 'react';

const emojis = ["😀", "😂", "😍", "😎", "😭", "👍", "🎉", "💡"];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void; // Define the type for onSelect
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  return (
    <div className="absolute bottom-16 left-4 bg-white border rounded-lg p-2 shadow-lg">
      {emojis.map((emoji, index) => (
        <button key={index} onClick={() => onSelect(emoji)} className="text-xl m-1">
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;

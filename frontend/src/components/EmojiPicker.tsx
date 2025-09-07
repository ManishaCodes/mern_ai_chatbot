import React from "react";

const emojis = ["😀", "😂", "😍", "😎", "👍", "🎉", "🤖", "❤️"];

interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  return (
    <div className="emoji-picker">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className="emoji"
          onClick={() => onEmojiClick(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;

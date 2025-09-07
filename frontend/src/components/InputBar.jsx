import React, { useState, useRef } from "react";

const InputBar = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // Audio input
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setMessage(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  // File upload
  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setMessage(event.target.result);
    reader.readAsText(file);
  };

  // Send message
  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="input-bar">
      <img src="/icons/emoji.png" alt="emoji" className="icon" />
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".txt"
      />
      <img src="/icons/upload.png" alt="upload" className="icon" onClick={handleUploadClick} />
      <img src="/icons/mic.png" alt="mic" className="icon" onClick={handleMicClick} />
      <img src="/icons/send.png" alt="send" className="icon send-icon" onClick={handleSend} />
    </div>
  );
};

export default InputBar;

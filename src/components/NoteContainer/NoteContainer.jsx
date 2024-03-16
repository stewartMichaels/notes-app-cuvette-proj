import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// asset imports
import SendCheck from "../../assets/send-icon.svg";
import SendConfirm from "../../assets/send-ok-icon.svg";
import Back from "../../assets/back-icon.svg";
import DOT from "../../assets/dot-icon.svg";

// css import
import "./NoteContainer.css";

function NoteContainer({
  rightDetails,
  selectedKey,
  setRightDetails,
  isMobile,
  mobileToggle,
  setMobileToggle,
}) {
  const [innerText, setInnerText] = useState("");

  useEffect(() => {
    // Retrieve data from local storage when the component mounts or selectedKey changes
    const savedData = localStorage.getItem(selectedKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setRightDetails({ ...rightDetails, [selectedKey]: parsedData });
    }
  }, [selectedKey]); // Only run this effect when selectedKey changes

  // Function to handle adding text
  function addText() {
    if (!innerText.trim()) return; // Do nothing if text is empty or only whitespace

    const updatedRightDetails = { ...rightDetails };

    // Check if selectedKey exists in updatedRightDetails and initialize details array if it doesn't
    if (!updatedRightDetails[selectedKey]) {
      updatedRightDetails[selectedKey] = { details: [] };
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    // Ensure that details array exists before pushing data
    if (!updatedRightDetails[selectedKey].details) {
      updatedRightDetails[selectedKey].details = [];
    }

    updatedRightDetails[selectedKey].details.push({
      text: innerText,
      date: formattedDate,
      time: formattedTime,
    });

    setRightDetails(updatedRightDetails); // Update state with new details

    // Update local storage
    localStorage.setItem(
      selectedKey,
      JSON.stringify(updatedRightDetails[selectedKey])
    );

    setInnerText(""); // Clear textarea after adding text
  }

  // Function to handle textarea change
  function handleTextareaChange(e) {
    setInnerText(e.target.value);
  }

  // Function to shorten the group name
  function toShort(key) {
    const letters = key.split("");
    let shortForm = "";

    // If the key has only one character, capitalize it
    if (letters.length === 1) {
      shortForm = letters[0].toUpperCase();
    } else {
      // If the key has more than one character, capitalize the first character of each word
      letters.forEach((letter, index) => {
        if (index === 0 || letters[index - 1] === " ") {
          shortForm += letter.toUpperCase();
        }
      });
    }

    return shortForm;
  }

  const shortForm = toShort(selectedKey);

  return (
    <div
      className="note-container"
      style={{ display: `${mobileToggle ? "none" : "flex"}` }}
    >
      <div className="nav">
        {isMobile && (
          <img
            src={Back}
            alt="Go Back Button"
            onClick={() => setMobileToggle(true)}
          />
        )}
        <div
          style={{ backgroundColor: rightDetails[selectedKey].color }}
          className="note-icon"
        >
          <h1>{shortForm}</h1>
        </div>
        <h3 className="note-title">{selectedKey}</h3>
      </div>

      {/* BUG HERE!! */}
      <div className="note-content">
        {rightDetails[selectedKey] &&
          rightDetails[selectedKey].details &&
          rightDetails[selectedKey].details.map((data) => (
            <div key={nanoid()} className="note-item">
              <div className="note-text">{data.text}</div>
              <div className="note-date-time">
                {data.date}
                <img src={DOT} alt="Dot between date and time" />
                {data.time}
              </div>
            </div>
          ))}
      </div>

      <div className="text-area">
        <textarea
          name="UserNotes"
          id="TextNotes"
          value={innerText}
          placeholder="Enter your text here..........."
          rows="10"
          onChange={handleTextareaChange}
        ></textarea>
      </div>
      <img
        src={innerText.trim() ? SendConfirm : SendCheck}
        alt="Send Button"
        className="send-button"
        onClick={addText}
      />
    </div>
  );
}

export default NoteContainer;

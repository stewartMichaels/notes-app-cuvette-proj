import React, { useEffect, useState } from "react";

// css import
import "./NoteModal.css";

function NoteModal({ notes, setNotes, menuRef, onClose }) {
  const [hasError, setHasError] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState();

  function handleGroupNameChange(e) {
    setGroupName(e.target.value);
  }

  // Creating New Groups; each group contains
  function createNewGroup(groupName) {
    let isGroupNameExisting = notes.filter((note) => {
      return Object.keys(note)[0] === groupName;
    }).length;
    if (isGroupNameExisting === 0) {
      if (groupName.trim() && selectedColor) {
        let newNote = {
          [groupName]: { color: selectedColor, details: [] },
        };
        let updatedNotes = [...notes, newNote];
        localStorage.setItem(groupName, JSON.stringify(newNote));
        setNotes(updatedNotes);
        onClose(false);
        setHasError(false);
      }
    } else {
      setHasError(true);
    }
  }

  return (
    <>
      <div className="note-modal" ref={menuRef}>
        <div className="create-group-tab">
          <div className="tab-container">
            <h1>Create New Group</h1>
            <div className="group-name">
              <h2>Group Name</h2>
              <input
                type="text"
                placeholder="Enter group name"
                onChange={(e) => handleGroupNameChange(e)}
              />
            </div>
            <div className="color-section">
              <h2>Choose color</h2>
              <div className="color-options">
                <div
                  className="color-palette"
                  onClick={() => setSelectedColor("var(--card-color-1)")}
                  style={{
                    backgroundColor: "var(--card-color-1)",
                    border: `${
                      selectedColor === "var(--card-color-1)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>

                <div
                  className="color-palette"
                  onClick={() => {
                    setSelectedColor("var(--card-color-2)");
                  }}
                  style={{
                    backgroundColor: "var(--card-color-2)",
                    border: `${
                      selectedColor == "var(--card-color-2)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>
                <div
                  className="color-palette"
                  onClick={() => {
                    setSelectedColor("var(--card-color-3)");
                  }}
                  style={{
                    backgroundColor: "var(--card-color-3)",
                    border: `${
                      selectedColor == "var(--card-color-3)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>
                <div
                  className="color-palette"
                  onClick={() => {
                    setSelectedColor("var(--card-color-4)");
                  }}
                  style={{
                    backgroundColor: "var(--card-color-4)",
                    border: `${
                      selectedColor == "var(--card-color-4)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>
                <div
                  className="color-palette"
                  onClick={() => {
                    setSelectedColor("var(--card-color-5)");
                  }}
                  style={{
                    backgroundColor: "var(--card-color-5)",
                    border: `${
                      selectedColor == "var(--card-color-5)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>
                <div
                  className="color-palette"
                  onClick={() => {
                    setSelectedColor("var(--card-color-6)");
                  }}
                  style={{
                    backgroundColor: "var(--card-color-6)",
                    border: `${
                      selectedColor == "var(--card-color-6)"
                        ? "2px solid black"
                        : "none"
                    }`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="create-button">
            {hasError ? (
              <h2 style={{ color: "red", alignSelf: "center" }}>
                This name already exists!
              </h2>
            ) : null}
            <button onClick={() => createNewGroup(groupName)}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteModal;

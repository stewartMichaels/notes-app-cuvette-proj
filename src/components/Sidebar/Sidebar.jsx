import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// css import
import "./Sidebar.css";

function Sidebar({
  notes,
  setNotes,
  setRightDetails,
  setKey,
  selectedKey,
  setMobile,
  setMobileToggle,
}) {
  const [innerSize, setSize] = useState();
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    addEventListener("resize", handleResize);
    handleResize();

    return removeEventListener("resize", handleResize);
  }, [notes]);

  // getting the title logo
  function getShortForm(key) {
    let words = key.split(" ");
    let shortForm = "";

    for (let word of words) {
      shortForm += word.charAt(0).toUpperCase();
    }

    return shortForm;
  }

  // rendering right side
  function showRight(e, note) {
    setKey(Object.keys(note)[0]);
    setRightDetails(note);
    if (innerSize <= 500) {
      setMobile(true);
      setMobileToggle(false);
    }
  }

  return (
    <>
      <div className="sidebar">
        {notes
          ? notes.map((note) => {
              let key = Object.keys(note);

              let shortForm = getShortForm(key[0]);

              return (
                <div
                  key={nanoid()}
                  id={Object.keys(note)[0]}
                  style={{
                    backgroundColor: `${
                      key[0] == selectedKey ? "#2f2f2f1a" : null
                    }`,
                  }}
                  onClick={(e) => {
                    showRight(e, note);
                  }}
                  className="sidebar-item"
                >
                  <div
                    style={{ backgroundColor: note[key[0]].color }}
                    className="notes-dp"
                  >
                    <h1>{shortForm}</h1>
                  </div>
                  <h3 className="notes-name">{key[0]}</h3>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default Sidebar;

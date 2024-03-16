import React, { useEffect, useRef, useState } from "react";

// image import
import heroImage from "../assets/main-image.svg";
import lock from "../assets/lock-icon.svg";
import add from "../assets/add-icon.svg";

// components import
import Sidebar from "../components/Sidebar/Sidebar";
import NoteContainer from "../components/NoteContainer/NoteContainer";
import NoteModal from "../components/NoteModal/NoteModal";

// css import
import "./Home.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteDetails, setSelectedNoteDetails] = useState();

  // !! PULLING ALL ITEMS FROM LOCAL STORAGE
  let Get_Storage_Items = () => {
    let StorageItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      try {
        const ParsedItem = JSON.parse(value);
        StorageItems.push(ParsedItem);
      } catch (err) {
        console.error(`Error Parsing Item with Key: ${key}`);
      }
    }
    return StorageItems;
  };
  let Items = Get_Storage_Items();
  const [notes, setNotes] = useState([...Items]);
  const [selectedNoteKey, setSelectedNoteKey] = useState();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let modalRef = useRef();
  useEffect(() => {
    const handleOuterClick = (e) => {
      if (modalRef.current === e.target) {
        setIsModalOpen(false);
      }
    };
    addEventListener("mousedown", handleOuterClick);
    return () => {
      removeEventListener("mousedown", handleOuterClick);
    };
  }, []);

  // Define the toggleModal function
  const toggleModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <>
      <div className="home-container">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h1>Pocket Notes</h1>
          </div>
          <Sidebar
            notes={notes}
            setNotes={setNotes}
            selectedKey={selectedNoteKey}
            setRightDetails={setSelectedNoteDetails}
            setKey={setSelectedNoteKey}
            setMobile={setIsMobileDevice}
            setMobileToggle={setIsSidebarOpen}
          />
          <div
            className="add-button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img src={add} alt="Add Notes Button" />
          </div>
        </div>

        {selectedNoteDetails ? (
          <NoteContainer
            rightDetails={selectedNoteDetails}
            selectedKey={selectedNoteKey}
            setRightDetails={setSelectedNoteDetails}
            isMobile={isMobileDevice}
            mobileToggle={isSidebarOpen}
            setMobileToggle={setIsSidebarOpen}
          />
        ) : (
          <HeroSection />
        )}
      </div>
      {isModalOpen && (
        <NoteModal
          menuRef={modalRef}
          notes={notes}
          setNotes={setNotes}
          onClose={toggleModal} // Pass toggleModal function
        />
      )}
    </>
  );
};

export const HeroSection = () => {
  return (
    <>
      {/* Hero */}
      <div className="content-container">
        <div className="content-body">
          <img src={heroImage} alt="People Making Notes" />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <div className="content-footer">
          <img src={lock} alt="Lock Icon" />
          <h2>end-to-end encrypted</h2>
        </div>
      </div>
    </>
  );
};

export default Home;

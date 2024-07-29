import { useState } from "react";
import "./Detail.css";
import { auth, db } from "../../Lib/firebase";
import { useChatSotre } from "../../Lib/chatStore";
import { useUserSotre } from "../../Lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = ({ setDetail }) => {
  const [click, setClick] = useState(false);
  const { user, isCurrUserBlocked, isReceiverBlocked, changeBlock } =
    useChatSotre();

  const { currUser } = useUserSotre();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Detail">
      <div className="user">
        <img src={user?.avatar || "./blocked.png"} alt="User Image" />
        <h2 className="user-name">{user?.name}</h2>
        <div className="info">
          <p>
            Hi <span className="you">{currUser?.name}</span>, I am{" "}
            <span className="friend">{user?.name}</span> and this chating
            website is created by Abdullah A.A by using React for best frontend
            components and firebase for authentication, cloud sotrage and
            Database. BTW if you want to chat with me click on above button!
          </p>
          <span className="btn" onClick={() => setDetail(false)}>
            &#x2190;
          </span>
        </div>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chats Setting</span>
            <img src="./arrowUp.png" alt="Arrow Up Icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="Arrow Up Icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photo</span>
            <img
              src={click ? "./arrowDown.png" : "./arrowUp.png"}
              alt="Arrow Up Icon"
              onClick={() => setClick((prev) => !prev)}
            />
          </div>

          <div
            className="photos"
            style={{ display: `${click ? "block" : "none"}` }}
          >
            <div className="photo-item">
              <div className="photo-details">
                <img src="./bg.jpg" alt="Image" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="Download Icon" className="icon" />
            </div>
            <div className="photo-item">
              <div className="photo-details">
                <img src="./bg.jpg" alt="Image" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="Download Icon" className="icon" />
            </div>
            <div className="photo-item">
              <div className="photo-details">
                <img src="./bg.jpg" alt="Image" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="Download Icon" className="icon" />
            </div>
            <div className="photo-item">
              <div className="photo-details">
                <img src="./bg.jpg" alt="Image" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="Download Icon" className="icon" />
            </div>
            <div className="photo-item">
              <div className="photo-details">
                <img src="./bg.jpg" alt="Image" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="Download Icon" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="Arrow Up Icon" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "Unblock User"
            : "Block User!"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
      <div className="author">
        <h4>Created By:</h4>
        <h3 className="author-name">Abdullah A.A</h3>
      </div>
    </div>
  );
};
export default Detail;

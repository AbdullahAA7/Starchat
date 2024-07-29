import { useEffect, useState } from "react";
import Chat from "./components/Chat/Chat";

import List from "./components/List/List";
import Login from "./components/Login/Login";
import Notify from "./components/Notification/Notify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Lib/firebase";
import { useUserSotre } from "./Lib/userStore";
import { useChatSotre } from "./Lib/chatStore";

function App() {
  const { currUser, isLoading, fetchUserInfo } = useUserSotre();
  const { chatId } = useChatSotre();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="Loading">Loading...</div>;

  return (
    <div className="container">
      {currUser ? (
        <>
          <List show={show} setShow={setShow} />
          {chatId && <Chat show={show} setShow={setShow} />}
        </>
      ) : (
        <Login />
      )}

      <Notify />
    </div>
  );
}

export default App;

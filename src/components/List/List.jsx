import ChatList from "./chatList/ChatList";
import "./List.css";
import UserInfo from "./userInfo/UserInfo";

const List = ({ show, setShow }) => {
  return (
    <div className={`List ${show ? "" : "hidden"}`}>
      <UserInfo />
      <ChatList setShow={setShow} />
    </div>
  );
};
export default List;

import '../styles/message.css';

const Message = (props) => {
  const { name } = props;
  const check = name === null;
  return (
    <div className="message">
      {check ? (
        <p className="message-failure">You missed!</p>
      ) : (
        <p className="message-success">
          You found {name[0].toUpperCase() + name.slice(1)}!
        </p>
      )}
    </div>
  );
};

export default Message;

interface Notification {
    title: string;
    body: string;
    image?: string;
  }
  
  interface MessageProps {
    notification: Notification;
  }
  
  const Message: React.FC<MessageProps> = ({ notification }) => {
    return (
      <>
       <div className="absolute top-0 right-0 mt-4 mr-4">
       <div id="notificationHeader" className="flex items-center text-2xl font-bold">
    {notification.image && (
      <div id="imageContainer" className="flex items-center h-24 object-contain mr-2">
        <img src={notification.image} alt="Notification" width={100} />
      </div>
    )}
    <span className="text-left">{notification.title}</span>
  </div> 
  <div id="notificationBody" className="text-left mt-2.5">{notification.body}</div>
</div>
      </>
    );
  };
  
  export default Message;
  
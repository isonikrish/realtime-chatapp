const room = {};

export const handleConnection = (socket, io) => {
  socket.on("join-room", (username, roomId) => {
    socket.join(roomId);
    
    // Initialize the room if it doesn't exist
    if (!room[roomId]) {
      room[roomId] = {}; // Use an object for storing usernames and their socket IDs
    }
    
    // Store the username and socket ID in the room object
    room[roomId][username] = socket.id;
    socket.username = username; // Set username on socket
    socket.roomId = roomId; // Set roomId on socket
    
    io.to(roomId).emit("user-joined", username);

    // Send the updated list of users in the room to the client
    const usersArray = Object.keys(room[roomId]); // Get the list of usernames
    io.to(socket.id).emit("room-users", usersArray);
  });

  socket.on("send-message", ({ message, username, roomId }) => {
    io.to(roomId).emit("receive-message", message, username);
  });

  socket.on("send-private-message", ({ message, username, recipient, roomId }) => {
    const recipientSocketId = room[roomId][recipient]; // Get the socket.id of the recipient
    if (recipientSocketId) {
      // Send the private message to the recipient only
      io.to(recipientSocketId).emit("receive-private-message", message, username);

      // Send the private message to the sender as well
      socket.emit("receive-private-message", message, username);
    }
  });

  socket.on("disconnect", () => {
    const { roomId, username } = socket; // Access username and roomId from the socket

    if (room[roomId]) {
      delete room[roomId][username]; // Remove the username from the room object

      // Notify other users in the room that the user has left
      io.to(roomId).emit("user-left", username);

      // If the room is empty, delete it
      if (Object.keys(room[roomId]).length === 0) {
        delete room[roomId];
      }
    }
  });
};

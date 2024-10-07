const room = {};

export const handleConnection = (socket, io) => {
  socket.on("join-room", (username, roomId) => {
    socket.join(roomId);

    // Initialize the room if it doesn't exist
    if (!room[roomId]) {
      room[roomId] = new Set(); // Use a Set for unique usernames
    }

    // Add username to the room if it doesn't exist
    if (!room[roomId].has(username)) {
      room[roomId].add(username); // Add to the Set
      io.to(roomId).emit("user-joined", username);
    }

    // Convert Set to Array for emitting
    const usersArray = Array.from(room[roomId]);
    io.to(socket.id).emit("room-users", usersArray);
  });
  socket.on("send-message", ({message, username, roomId}) => {
    io.to(roomId).emit('receive-message', message, username);
  });
  socket.on("disconnect", () => {
    const roomId = socket.roomId;

    if (room[roomId]) {
      room[roomId].delete(socket.username); // Remove the username from the Set

      // Notify other users in the room that the user has left
      io.to(roomId).emit("user-left", socket.username);

      // If the room is empty, delete it
      if (room[roomId].size === 0) {
        delete room[roomId];
      }
    }
  });
};

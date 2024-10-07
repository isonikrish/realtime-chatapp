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
    io.to(socket.id).emit('room-users', usersArray);
  });

  socket.on("disconnect", () => {
    for (const roomId in room) {
      if (room[roomId].has(socket.username)) {
        room[roomId].delete(socket.username); // Remove the username from the Set
        io.to(roomId).emit("user-left", socket.username); // Notify others if needed
      }
    }
  });
};

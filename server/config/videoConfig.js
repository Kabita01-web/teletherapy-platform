// config/videoConfig.js

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

// Initialize Twilio client
const client = twilio(apiKey, apiSecret, { accountSid });

// Generate access token
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Create video token
const createVideoToken = (identity, roomName) => {
  const token = new AccessToken(accountSid, apiKey, apiSecret, {
    identity: identity,
  });

  const videoGrant = new VideoGrant({
    room: roomName,
  });

  token.addGrant(videoGrant);
  return token.toJwt();
};

// Create a room - USE 'go' FOR TRIAL ACCOUNTS
const createRoom = async (roomName, type = "go") => {
  try {
    const room = await client.video.rooms.create({
      uniqueName: roomName,
      type: type, // 'go' for P2P (trial), 'group' for paid
      statusCallback: process.env.VIDEO_STATUS_CALLBACK || null,
      recordParticipantsOnConnect: false,
    });
    return room;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

// Get room by name
const getRoom = async (roomName) => {
  try {
    const rooms = await client.video.rooms.list({
      uniqueName: roomName,
      status: "in-progress",
    });
    return rooms.length > 0 ? rooms[0] : null;
  } catch (error) {
    console.error("Error getting room:", error);
    return null; // Don't throw, just return null
  }
};

// End room
const endRoom = async (roomSid) => {
  try {
    const room = await client.video.rooms(roomSid).update({
      status: "completed",
    });
    return room;
  } catch (error) {
    console.error("Error ending room:", error);
    throw error;
  }
};

// Get room participants
const getParticipants = async (roomSid) => {
  try {
    const participants = await client.video.rooms(roomSid).participants.list();
    return participants;
  } catch (error) {
    console.error("Error getting participants:", error);
    return [];
  }
};

module.exports = {
  createVideoToken,
  createRoom,
  getRoom,
  endRoom,
  getParticipants,
};

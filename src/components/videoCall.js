import React, { useContext } from 'react';
import { SocketContext } from '../context';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating unique IDs

const VideoCall = () => {
    const { callUser, answerCall } = useContext(SocketContext);

    const startCall = () => {
        const callId = uuidv4(); // Generate a unique call ID using uuidv4
        callUser(callId);
    };

    const handleIncomingCall = (callId) => {
        // Handle incoming calls with the generated call ID
        answerCall();
    };

    return (
        <div>
            <button onClick={startCall}>Start Call</button>
        </div>
    );
};

export default VideoCall;

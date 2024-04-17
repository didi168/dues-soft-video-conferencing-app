import { Grid, Box, Heading } from "@chakra-ui/react";
import { SocketContext } from "../context";
import { useContext, useRef, useEffect } from "react";

const VideoPlayer = () => {
    const { name, callAccepted, callEnded, stream, call } = useContext(SocketContext);
    const myVideoRef = useRef(null);
    const userVideoRef = useRef(null);

    useEffect(() => {
        if (stream && myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
        }
        if (callAccepted && call.stream && userVideoRef.current) {
            userVideoRef.current.srcObject = call.stream;
        }
    }, [stream, callAccepted, call.stream]);

    return (
        <Grid justifyContent="center" templateColumns="repeat(2, 1fr)" mt="12">
            {/* my video */}
            {stream && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">{name || "Name"}</Heading>
                        <video
                            playsInline
                            muted
                            ref={myVideoRef}
                            autoPlay
                            width="600"
                        ></video>
                    </Grid>
                </Box>
            )}
            {/* user's video */}
            {callAccepted && !callEnded && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">{call.name || "Name"}</Heading>
                        <video
                            playsInline
                            ref={userVideoRef}
                            autoPlay
                            width="600"
                        ></video>
                    </Grid>
                </Box>
            )}
        </Grid>
    );
}

export default VideoPlayer;

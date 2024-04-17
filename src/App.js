import React from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import Notifications from './components/notifications';
import Options from './components/options';
import VideoPlayer from './components/videoPlayer';
import VideoCall from './components/videoCall';

function App() {
    return (
        <Box>
          <Container maxW="1200px" mt="8">
            <Heading as="h2" size="2xl"> Video Chat App </Heading>
            <VideoPlayer />
            <Options />
            <Notifications />
            <VideoCall />
          </Container>
        </Box>
    );
}

export default App;

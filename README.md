# Voice Assistent Application

This project is part of the React Voice Assistant assignment with [https://github.com/janMoudryD/assignment-demo-be/blob/main/README.md] (websocket BE) 

## Basic setup
`npm install`
`npm run start`

This should start running React app.

Run [https://github.com/janMoudryD/assignment-demo-be/blob/main/README.md](suggested example BE repo) to have some responses from BE
Landing page is just a template, main functionality is **Call Jessica** voice assistent. It has following features:
- automatically stops recording and sending to the BE when there is silence
- it is possible to display list of recordings and replies
- you can feedback with smiley rate button

## Tech stack
- `react-audio-voice-recorder` for voice recording
- `react-audio-visualize` for visualizing sound waves during recording
- Silence analysis is custom made
- Tailwind for styling
- Context API for state handling

## Suggested Improvements

- Use React-Redux for better state management - not used right now for sake of short time and not my existing easy reusable Redux setup

### Nice to have's
- Refactor useRecordingControls to separate SilenceAnalyzer for more clean code
- Add Typography component to basic components and use for text
- Better setup for default colors, corners, etc.
- Actually dispatch Feedback values

### Ideas 
- Handle automatically start of recording when assistant blob is played whole, without need of start recording button
- Use custom made buttons for recording history replay

# Re3 (Reduce, Reuse, Recycle)
## Code for Impact Submission

## Inspiration

Our inspiration for this project came from our observations that many people are unaware of how to properly dispose of different types of garbage to most effectively reduce environmental waste. Therefore, we created this project as a way to help people get a quick summary of the most effective methods to tackle this problem.

## What it does

The project takes an image of an article of garbage, either by upload or through camera, and uses Google's Gemini AI to determine the best ways to deal with the waste. There is also a separate tab that finds recycling centers in the user's vicinity to give information on where they are located to encourage more recycling.

## How we built it

The project uses React Native with Typescript for the frontend, and a Python and Flask server in the backend to handle requests between the Gemini and Google Maps APIs.

## Challenges we ran into

We ran into some issues with the time window of the hackathon due to our time zone, so we were a bit more restricted on time. In addition, some of the APIs that we originally planned to use were not available for free public use, so we had to find alternatives.

## Accomplishments that we're proud of

We are proud of finding a way to bring together all of these technologies to help work towards one main goal.

## What we learned

We learned about how to use a new component library (React Native Paper) as well as new APIs such as Gemini and Google Maps.

## What's next for Reduce, Reuse, Recycle

We plan on adding some more user generated content, mostly likely through a user-submitted sustainability scale or recommendations for how they deal with their waste to guide other users of the app.

## Development

To get started, begin by cloning the repo. Run `npm install` in the root directory and `pip install -r requirements.txt` in the `server/` directory (a virtual environment may be needed). Then, start the server with `flask --app main run` in `server/` and use `npm run android` or `npm run web` for the client.

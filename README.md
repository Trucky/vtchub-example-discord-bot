# Example Discord Bot integrated with Trucky VTC Hub

This is a simple Discord Bot (v14) exposing an ExpressJS Webserver accepting an HTTP POST call on `/trucky/webhook` endpoint.

Receiveing the message from Trucky, it will create a Message Embed when a job starts otherwise a simple message with the event received

# How to run it

```
git clone https://github.com/Trucky/vtchub-example-discord-bot.git
cd vtchub-example-discord-bot
```

Grab your Discord Bot Token from Discord Developers portal and the Channel ID where you want to send those messages, create an .env file like `.env.example` and

```
npm run start
```

Have fun!
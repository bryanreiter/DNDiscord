<p align="center">
  <img src="/assets/dndata_logo.png" alt="DNDiscord Logo" style="width: 200px;"/>
</p>

# DNDiscord

Your Comprehensive Dungeons and Dragons 5E Companion in Discord! Elevate your gaming experience by seamlessly rolling dice, exploring an arsenal of powerful weapons, discovering formidable beasts for your party to conquer, and much more—all conveniently within your Discord server! Powered by [Discord JS](https://discord.js.org/) and [Open5E](https://api.open5e.com/).

## Table of Contents

- [DNDiscord](#dndiscord)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Getting Started](#getting-started)
      - [Recommended / Required Development Utilities](#recommended--required-development-utilities)
      - [Installing and Running](#installing-and-running)
  - [Usage](#usage)
  - [Disclaimer](#disclaimer)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Installation

### Getting Started

#### Recommended / Required Development Utilities

- [NodeJS](https://nodejs.org/en/download) version 18.x or higher
- [Git](https://git-scm.com/downloads)
- [Discord Account](https://discord.com/)

#### Installing and Running

1. **Clone the repository**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/bryanreiter/DNDiscord.git
   ```

2. **Navigate to your project directory**

   ```bash
   cd DNDiscord
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create a Discord Application**

   - Navigate to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Set the application name, description, and avatar.
   - Note down the "Client ID"

5. **Create and Configure Your Bot**

   - In the Discord Developer Portal, select "Bot" from the left navigation
   - Set a name and icon for your bot.
   - Note down the "Bot Token"

6. **Add Bot to Your Server**

   - Go to the application page in the Discord Developer Portal.
   - Navigate to 'OAuth' -> 'URL Generator'.
   - Check 'applications.commands' and 'bot'
   - Open the URL that populates at the bottom and authorize the bot to access your server.

7. **Enable Developer Mode on Discord**

   - Enable "Developer Mode" under the "Advanced" settings tab on your Discord client.
   - Right-click on the server icon, and select "Copy ID" to get the server ID.

8. **Configure Environment Variables**

   Create a `.env` file in your project root and add your client ID, server ID, and bot token:

   ```env
   TOKEN=<YOUR-BOT-TOKEN>
   CLIENTID=<YOUR-CLIENT-ID>
   GUILDID=<YOUR-SERVER-ID>
   ```

9. **Updating and Running the Bot**

   - Run the following command to deploy the slash commands, and ensure they are up to date.

      ```bash
       node deploy-commands.js
      ```

   - Run the following command to start your bot.

      ```bash
       node index.js
      ```

   - Your bot should now be online!

## Usage

This discord bot works through the use of Slash Commands. All you have to do is type `/` and you're ready to use your DNDiscord. You can easily see all the commands a bot has, as well as any validation and error handling that will help you get the command right the first time.

## Disclaimer

The code provided in this repository is intended for private, non-commercial use only. It is designed to be used with legally obtained digital materials. Users are responsible for ensuring they comply with all relevant copyright laws and licensing agreements, including those of Wizards of the Coast. This bot may utilize PDF scanning of copyrighted material. Use of this code to scan, distribute, or publicly display copyrighted material without permission from the copyright holder may be illegal. The author of this code is not responsible for any unlawful use.

## License

This project is licensed under the [MIT](https://github.com/bryanreiter/DNDiscord?tab=MIT-1-ov-file)

## Acknowledgments

- Discord JS
- Open5E

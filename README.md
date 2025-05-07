
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e7ae8363-a9aa-46cb-ab57-2c860a9a3e80

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e7ae8363-a9aa-46cb-ab57-2c860a9a3e80) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Installing as a Cockpit Plugin on Ubuntu 24.04

To install this plugin into Cockpit:

1. Make sure Cockpit is installed on your Ubuntu system:
   ```
   sudo apt update
   sudo apt install cockpit
   sudo systemctl enable --now cockpit.socket
   ```

2. Clone this repository and navigate to the project directory
   ```
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_DIRECTORY>
   ```

3. Install project dependencies:
   ```
   npm install
   ```

4. Run the installation script as root:
   ```
   sudo ./install.sh
   ```

5. Access Cockpit at https://your-server-ip:9090 or https://localhost:9090

6. Login with your system credentials and you should see the "Firewall" option in the menu

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e7ae8363-a9aa-46cb-ab57-2c860a9a3e80) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

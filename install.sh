
#!/bin/bash

# Ensure script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# Install required dependencies if needed
echo "Checking for required dependencies..."
if ! command -v npm &> /dev/null; then
  echo "Installing Node.js and npm..."
  apt-get update
  apt-get install -y nodejs npm
fi

# Build the application with correct environment variables
echo "Building application..."
export VITE_COCKPIT_BASE_PATH=/cockpit 
npm run build:cockpit

# Create plugin directory
PLUGIN_DIR="/usr/share/cockpit/firewall"
echo "Creating plugin directory at $PLUGIN_DIR..."
mkdir -p $PLUGIN_DIR

# Copy built files to plugin directory
echo "Copying files to plugin directory..."
cp -r dist/* $PLUGIN_DIR/
cp manifest.json $PLUGIN_DIR/
cp cockpit-package.json $PLUGIN_DIR/package.json

echo "Restarting Cockpit service..."
if systemctl is-active --quiet cockpit.service; then
  systemctl restart cockpit.service
else
  systemctl restart cockpit.socket
fi

echo "Plugin installation complete! Access it through Cockpit interface."
echo "If Cockpit is not installed, run: sudo apt install cockpit"
echo "Then enable and start it: sudo systemctl enable --now cockpit.socket"
echo "Access Cockpit at: https://localhost:9090"

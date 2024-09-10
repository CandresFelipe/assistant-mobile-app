#!/bin/bash

echo -e "\nStarting post create command script..."
echo "Dev machine:"
uname -a

echo -e "\nInstalling expo boiler plate..."
npm install

echo -e "\nInstalling watchman...\n"
# Update package list and install watchman
apt update
apt install -y watchman

# Verify watchman installation
watchman version

echo -e "\n*******************************"
echo -e "\nDev container ready!"
echo -e "\n*******************************\n"
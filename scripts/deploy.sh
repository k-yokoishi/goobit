#!/bin/bash
set -ex

# Workaround for socket hung up when running `expo publish`
# https://stackoverflow.com/questions/48549267/error-socket-hang-up-when-building-android-app-using-expo
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

expo login --non-interactive -u $EXPO_USERNAME
expo publish --non-interactive

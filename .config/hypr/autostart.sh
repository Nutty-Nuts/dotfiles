#!/bin/bash

sleep 2
hyprctl dispatch exec [workspace special:todoist silent] flatpak run com.todoist.Todoist
sleep 2
hyprctl dispatch exec [workspace special:discord silent] flatpak run io.github.spacingbat3.webcord
sleep 2
exec blueman-applet &

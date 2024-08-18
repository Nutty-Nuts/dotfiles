#!/bin/sh

gaps_out=$(hyprctl getoption general:gaps_out | grep custom)
echo "$gaps_out"

if [[ "$gaps_out" == "custom type: 12 12 12 12" ]]; then
    notify-send "unmaximzed"
    hyprctl keyword general:gaps_out 0
    hyprctl keyword general:border_size 4
    hyprctl keyword decoration:rounding 0
elif [[ "$gaps_out" == "custom type: 0 0 0 0" ]]; then 
    notify-send "maximized"
    hyprctl keyword general:gaps_out 12
    hyprctl keyword general:border_size 3
    hyprctl keyword decoration:rounding 4
fi

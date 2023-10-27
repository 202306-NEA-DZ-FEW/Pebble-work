#!/bin/bash

function downscale_images() {
    for file in "$1"/*.{jpg,jpeg,png,svg}; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            extension="${filename##*.}"
            filename="${filename%.*}"
            scaled_filename="${filename}_scale.${extension}"
            ffmpeg -i "$file" -vf "scale=20:-1" "downscaled/$scaled_filename"
        fi
    done

    for dir in "$1"/*/; do
        if [ "$dir" != "downscaled/" ]; then
            downscale_images "$dir"
        fi
    done
}

mkdir -p downscaled
downscale_images .

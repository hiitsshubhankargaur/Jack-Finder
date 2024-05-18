# JackFinder

JackFinder is a browser extension that detects clickjacking vulnerabilities on webpages and allows you to download a proof-of-concept (PoC) HTML file for exploitation.

## Features
- Detects clickjacking vulnerabilities by checking for the absence of the `X-Frame-Options` header.
- Highlights the vulnerable page with a red border.
- Displays a notification with the option to download a PoC HTML file.
- Works with single-page applications by observing URL changes.

## Installation
1. Clone or download this repository.
2. Open your browser's extensions page.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage
- Navigate to any webpage, and JackFinder will automatically check for clickjacking vulnerabilities.
- If a vulnerability is detected, a notification will appear at the top of the page. Click on the notification to download the PoC HTML file.

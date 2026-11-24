# TechBridge Internship Platform

A responsive TechBridge website for Baselink Services Limited, built with semantic HTML5, CSS3 and vanilla JavaScript.

## Run locally
Open `index.html` in a browser. No build step, framework or package installation is required.

## Project files
- `index.html` — TechBridge homepage, programs section and site navigation
- `tasks.html` — interactive two-track internship roadmap
- `tasks.css` — responsive roadmap layout and component styling
- `tasks.js` — task data, track switching and DOM rendering
- `challenges.html` — interactive Challenge Hub for both internship tracks
- `challenges.css` — Challenge Hub layout, filters, cards and dialog styling
- `challenges.js` — challenge data, track/difficulty filtering and challenge detail interactions
- `style.css` — shared responsive design system
- `assets/techbridge-logo.png` — locally served TechBridge logo

## Interactive internship roadmap
The Internship Roadmap page presents both official 30-day internship tracks: Data Analytics and Web Development. Each track contains eight milestones introduced on Days 1, 4, 8, 11, 15, 19, 22 and 26. Visitors can switch tracks without a page refresh. Every task displays its number, title, introduction day, description and difficulty level.

The roadmap uses vanilla JavaScript arrays and objects to store task information, functions to render the selected track, event listeners to handle track selection, conditional logic to validate the active track, and DOM manipulation to update the task cards and milestone sequence. The track selector also supports keyboard navigation with the arrow keys, Home and End.

## Developer note
I structured the roadmap as two selectable tracks, each containing its own array of eight task objects. JavaScript listens for track-selection events and rebuilds the milestone list and task cards without reloading the page. I used variables, arrays, objects, functions, event listeners, conditional logic and DOM manipulation to keep the interaction in plain JavaScript. The selected track is clearly marked, and its day sequence, descriptions and difficulty labels update together. I also added keyboard support to the track selector and kept the layout responsive across desktop, tablet and mobile screens. One challenge was ensuring that switching tracks updates every related part of the interface consistently, so I used a single render function as the source of truth for the selected track.

## Challenge Hub

The Challenge Hub contains six practical briefs across Data Analytics and Web Development. Visitors can filter by track and difficulty, reset filters, and open an accessible dialog with each challenge's objective, skills, suggested tools, deliverables, estimated time and expected result. All interactions are handled with vanilla JavaScript without a page refresh.

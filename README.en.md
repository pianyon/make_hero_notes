# make_hero_notes

A **Guitar Hero-style rhythm chart editor and player** that runs entirely in your browser. No server, no install — just open the HTML files.

[日本語 README](./README.md)

## Features

- 🎵 **Chart editor** with BPM/Offset settings and a step sequencer
- 🎬 **Video overlay** — sync any video file as a background
- 🎹 **Built-in metronome** for tight timing alignment
- 📦 **JSON-based charts** — easy to share, version, or back up
- 🌐 **100% client-side** — files are processed locally, never uploaded anywhere
- ⌨️ **Keyboard shortcuts** for fast workflow
- 🎯 **Dynamic editing mode** — record beats in real-time by tapping spacebar on rhythm
- 💾 **Auto-save** — localStorage persistence prevents data loss
- 🔄 **Video loop** — video automatically loops when shorter than audio
- ⚡ **Video speed control** — adjust playback speed from 0.1x to 4.0x

## Quick Start

### Option 1: Create charts with the editor
1. Clone or download this repository
   ```bash
   git clone https://github.com/pianyon/make_hero_notes.git
   ```
2. Open `editor.html` in your browser to create a chart
3. Click **Export JSON** to save your chart
4. Open `index.html`, load your chart JSON + audio + (optional) video, and play

### Option 2: Record beats in real-time (NEW!)
1. Open `index.html` in your browser
2. Load your audio file (and optional video)
3. Click **🎯 Edit Mode** button
4. Click **▶ Play** and tap **Spacebar** on the rhythm
5. Click **💾 Export** to save your beatmap as JSON
6. Disable Edit Mode to play back your creation

For a full walkthrough, open `help.html` in your browser.

## Files

| File | Purpose |
|------|---------|
| `index.html` | **Player** — synchronized playback of chart, audio, and video |
| `editor.html` | **Editor** — set BPM/Offset, build patterns, arrange the timeline |
| `help.html` | Documentation and help |

## Keyboard Shortcuts

### Player
- `Space` — Play / pause (or record beat in Edit Mode)
- `↑` / `↓` — Volume up / down
- `,` — Rewind to start
- `Ctrl + Enter` — Toggle theater mode

### Player (Edit Mode)
- `Space` — Record beat on rhythm (during playback)
- `Space` — Play / pause (when not recording)

### Editor
- `Space` — Preview play / pause
- `,` — Rewind preview to start

See `help.html` for the complete reference.

## Requirements

- Any modern browser (latest Chrome / Firefox / Safari / Edge)
- No internet connection required — everything runs locally

## Development

No build step. Just edit the `.html` files and reload in your browser.

```
make_hero_notes/
├── index.html       # Player
├── editor.html      # Editor
├── help.html        # Help
└── README.md
```

## License

[MIT License](./LICENSE)

## Author

[@pianyon](https://github.com/pianyon)

## Contributing

Issues and pull requests are welcome. Feel free to report bugs or suggest features.

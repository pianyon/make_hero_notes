'use strict';

(function () {
  const STORAGE_KEY = 'hero_notes_lang';
  const SUPPORTED = ['ja', 'en'];
  const FALLBACK = 'ja';

  // ============================================================
  // Dictionary
  // 注: data-i18n-html で innerHTML として挿入される文字列は、
  //     この辞書由来の信頼済みリテラルのみ。ユーザー入力は混入しない。
  // ============================================================
  const dict = {
    ja: {
      common: {
        nav: { player: 'Player', editor: 'Editor', help: '? Help', playerBack: '← Player', editorNext: 'Editor →' },
      },
      player: {
        title: 'Rhythm Player — Overlay',
        h1: '◆ Rhythm Player — Overlay',
        theater: { on: '⊟ シアター', off: '⊞ UI表示' },
        ctrl: {
          chart: '譜面 (JSON)',
          video: '動画',
          audio: '音声',
          bpm: 'BPM 上書き',
          offset: 'Offset (ms)',
          volume: 'Volume',
          videoSpeed: 'Video Speed',
        },
        btn: {
          rewind: '|◀ Rewind',
          play: '▶ Play',
          pause: '⏸ Pause',
          resume: '▶ Resume',
          stop: '■ Stop',
          sample: 'サンプル譜面ロード',
          editMode: '🎯 Edit Mode',
          editModeOn: '🎯 Edit Mode ON',
          clear: '🗑️ Clear',
          export: '💾 Export',
        },
        ph: { auto: 'auto', video: 'VIDEO PLACEHOLDER' },
        fi: {
          empty: '未選択',
          recording: 'Recording Mode',
          continuing: '{n} ビートから継続中',
          loaded: '{n} ビート読み込み済み',
          generated: '記録から生成',
          sample: 'サンプル譜面（読み込み済み）',
        },
        info: { time: 'TIME:', bpm: 'BPM:', offset: 'OFFSET:', notes: 'NOTES:', hits: 'HITS:' },
      },
      editor: {
        title: 'Rhythm Editor',
        h1: '◆ Rhythm Editor',
        meta: {
          title: 'Title',
          titlePh: 'タイトル',
          titleDefault: '新規譜面',
          bpm: 'BPM',
          offset: 'Offset (ms)',
          grid: 'Grid',
        },
        grid: { q1: '4分音符 (×1)', q2: '8分音符 (×2)', q4: '16分音符 (×4)', q8: '32分音符 (×8)' },
        btn: { import: 'Import JSON', export: 'Export JSON', addPattern: '+ New Pattern' },
        panel: {
          patterns: 'Patterns',
          timeline: 'Timeline',
          hint: '— Pool からドラッグして追加 / ブロックをドラッグで並び替え',
          seqDefault: 'Step Sequencer — パターンを選択してください',
          seqNamed: 'Step Sequencer — {name}',
          seqEmpty: '← Pool でパターンを選択してください',
          endEmpty: 'Pool からパターンをドラッグ',
          endAdd: '+ ここにドロップ',
        },
        pattern: {
          namePh: 'Pattern name',
          defaultName: 'Pattern {n}',
          deleteTitle: '削除',
          confirmDelete: '"{name}" を削除しますか？',
        },
        preview: {
          play: '▶ Play',
          pause: '⏸ Pause',
          metroOn: '♩ Click: ON',
          metroOff: '♩ Click: OFF',
          timeLabel: '{cur} / {total} s',
        },
        alert: {
          gridChange: 'グリッドを変更するとすべてのノーツがクリアされます。続けますか？',
          loadFail: '読み込みに失敗: {err}',
        },
        error: { invalidChart: 'Invalid chart: timing / patterns / timeline が見つかりません' },
      },
      help: {
        title: 'Rhythm Tool — Help',
        h1: '◆ Rhythm Tool — Help',
        overview: {
          h: 'Overview',
          body: 'このツールは <strong>Guitar Hero / Fap Hero スタイルの譜面を作って再生する</strong> ための2画面構成の Web アプリです。<strong>Editor</strong> で譜面を作り、<strong>Player</strong> で動画・音声と同期させて再生します。譜面は JSON ファイルで管理されます。',
        },
        workflow: {
          h: '作業フロー',
          s1t: '音声・動画を用意する',
          s1d: '再生したい音声ファイル（mp3/wav 等）と、オーバーレイする動画ファイル（mp4 等）をローカルに用意します。動画は必須ではありません。',
          s2t: 'Editor で BPM と Offset を設定する',
          s2d: '曲の BPM と Offset を入力します。Offset の意味は下の「<strong>Offset とは</strong>」セクションを参照してください。Grid（分解能）は 16分音符（×4）がおすすめです。',
          s3t: 'パターンを作成する',
          s3d: '左パネル「Patterns」で <strong>+ New Pattern</strong> を押してパターンを追加。名前を付け、ステップシーケンサーでノーツを打ち込みます。1パターンは8拍（デフォルト）のループ単位です。',
          s4t: 'タイムラインに並べる',
          s4d: 'パターンカードを右パネル上部の <strong>Timeline</strong> にドラッグ＆ドロップして配置します。ブロック右の <strong>×N</strong> を変えると繰り返し数を指定できます。ブロック同士もドラッグで並び替え可能です。',
          s5t: 'プレビューで確認する',
          s5d: '画面下部の Preview でノーツの流れを確認します。<kbd>Space</kbd> で再生/一時停止、<kbd>,</kbd> で先頭に戻ります。メトロノームの小節頭クリック（高音）でリズムの合わせやすさを確認しましょう。',
          s6t: 'JSON をエクスポートする',
          s6d: '右上の <strong>Export JSON</strong> で譜面ファイルを保存します。',
          s7t: 'Player で再生する',
          s7d: 'Player 画面で 譜面 JSON・音声ファイル・動画ファイル を読み込みます。<kbd>Space</kbd> で再生、<kbd>Ctrl</kbd>+<kbd>Enter</kbd> でシアターモードに切り替えるとノーツと動画だけの全画面表示になります。',
        },
        editmode: {
          h: 'ダイナミック編集モード（新機能）',
          intro: '<strong>Edit Mode</strong> を使用すると、リズムに合わせてスペースキーを叩くだけでリアルタイムでビートを記録できます。BPM や Offset を手動で入力する必要がありません。',
          s1t: '音声・動画を読み込む',
          s1d: 'Player 画面で音声ファイル（とオプションで動画）を読み込みます。',
          s2t: 'Edit Mode を有効にする',
          s2d: '<strong>🎯 Edit Mode</strong> ボタンをクリックします。ボタンがシアン色に変わり、「Edit Mode ON」と表示されます。',
          s3t: '再生してビートを記録',
          s3d: '<strong>▶ Play</strong> をクリックし、リズムに合わせて <kbd>Space</kbd> キーを叩きます。記録されたビートはシアン色のノートとしてリアルタイムで表示されます。',
          s4t: '一時停止と再開',
          s4d: '<kbd>⏸ Pause</kbd> で一時停止すると、再開時に5秒戻ってカウントダウンが表示されます。カウントダウン中のスペースキー入力は無視されるため、リズムを再同期する時間があります。',
          s5t: '既存の譜面を続ける',
          s5d: '既存の JSON 譜面を読み込んでから Edit Mode を有効にすると、その譜面のビートを引き継いで記録を続けることができます。',
          s6t: 'エクスポート',
          s6d: '<strong>💾 Export</strong> をクリックして、記録したビートマップを JSON ファイルとして保存します。BPM は自動的に計算されます。',
          s7t: '再生して確認',
          s7d: 'Edit Mode を無効にして、作成したビートマップを再生して確認します。',
          hint: '<strong>ヒント：</strong> 記録中に <kbd>🗑️ Clear</kbd> ボタンをクリックすると、ビートマップをリセットできます（音声・動画は保持されます）。',
        },
        offset: {
          h: 'Offset とは',
          body1: '<strong>Offset（ms）</strong> は「音声ファイルの先頭から、最初の1拍目が来るまでの時間（ミリ秒）」です。',
          ex1: '<strong>例：</strong> 音声ファイルの最初の 2 秒間がイントロや無音で、2 秒後に 1 拍目（ビート）が始まる場合 → <strong>Offset = 2000</strong>',
          ex2: '逆に音声がいきなり 1 拍目から始まる場合は <strong>Offset = 0</strong>（デフォルト）のままでOKです。',
          body2: 'Offset がズレていると、ノーツと音楽のリズムが噛み合わなくなります。曲を聴きながらメトロノームのクリック音（プレビュー再生）がビートと一致するよう微調整してください。<strong>10ms 単位</strong> で詰めると合わせやすいです。',
          warn: 'BPM や Offset を変更すると既存ノーツの実時間上の位置が変わります。譜面を打ち込む前に確定させるのを推奨します。',
        },
        keyboard: {
          h: 'キーボードショートカット',
          playerBadge: 'Player',
          editModeBadge: 'Player (Edit Mode)',
          editorBadge: 'Editor',
          p_space: '再生 / 一時停止 / 再開',
          p_up: '音量 +10%',
          p_down: '音量 −10%',
          p_comma: '先頭に巻き戻す（動画・音声・ノーツすべてリセット）',
          p_ctrl_enter: 'シアターモード ↔ 通常 UI の切り替え',
          p_note: '※ テキスト入力欄にフォーカスが当たっているときはショートカットは無効になります。',
          em_space_record: 'リズムに合わせてビートを記録（再生中）',
          em_space_play: '再生 / 一時停止（記録していない時）',
          e_space: 'プレビュー 再生 / 一時停止',
          e_comma: 'プレビューを先頭に巻き戻す（再生中の場合はそのまま再生継続）',
          e_note: '※ テキスト入力欄・セレクトボックスにフォーカス中はショートカット無効。パターン名編集中は <kbd>Enter</kbd> で確定、<kbd>Esc</kbd> でキャンセルも使えます。',
        },
        tips: {
          h: 'Tips',
          bpm_h: 'BPM が分からないとき',
          bpm_b: 'BPM 検出ツール（例: <strong>Tap BPM</strong> 系の Web ツール）で曲に合わせてタップすると大体の BPM が得られます。その後 Offset でズレを微修正するのが効率的です。',
          pat_h: 'パターンの使い方',
          pat_b: '「Aメロ」「サビ」「ブリッジ」のようにセクション単位でパターンを分けると、タイムライン上での管理が楽になります。同じフレーズはパターンを繰り返し（×N）で使い回せます。',
          grid_h: 'グリッド変更の注意',
          grid_b: 'Grid（分解能）を変更するとすべてのパターンのノーツがクリアされます。譜面を打ち込み始める前に決めてください。',
          backup_h: '譜面 JSON のバックアップ',
          backup_b: 'ブラウザはデータを保存しません。こまめに <strong>Export JSON</strong> でファイルに保存してください。次回は <strong>Import JSON</strong> で読み込めます。',
          em_h: 'Edit Mode の活用（新機能）',
          em_b: 'Edit Mode は BPM や Offset が分からない場合に最適です。リズムに合わせてスペースキーを叩くだけで、BPM が自動的に計算されます。既存の譜面を Edit Mode で開くと、その譜面の続きから記録を続けることができます。',
          vs_h: '動画速度の調整（新機能）',
          vs_b: '<strong>Video Speed</strong> スライダーで動画の再生速度を 0.1x から 4.0x まで調整できます。PMV 制作時に、曲の速い部分で動画を加速したり、好きなシーンでスローモーションにしたりと、リアルタイムで編集できます。',
          vl_h: '動画ループ（新機能）',
          vl_b: '動画が音声より短い場合、自動的にループ再生されます。短いループ動画を背景に使って、長い曲全体で再生できます。',
          as_h: '自動保存（新機能）',
          as_b: 'Edit Mode で記録中のデータは localStorage に自動保存されます。ブラウザを閉じても、次回 Edit Mode を有効にすると記録を続けることができます。',
        },
      },
    },

    en: {
      common: {
        nav: { player: 'Player', editor: 'Editor', help: '? Help', playerBack: '← Player', editorNext: 'Editor →' },
      },
      player: {
        title: 'Rhythm Player — Overlay',
        h1: '◆ Rhythm Player — Overlay',
        theater: { on: '⊟ Theater', off: '⊞ Show UI' },
        ctrl: {
          chart: 'Chart (JSON)',
          video: 'Video',
          audio: 'Audio',
          bpm: 'BPM Override',
          offset: 'Offset (ms)',
          volume: 'Volume',
          videoSpeed: 'Video Speed',
        },
        btn: {
          rewind: '|◀ Rewind',
          play: '▶ Play',
          pause: '⏸ Pause',
          resume: '▶ Resume',
          stop: '■ Stop',
          sample: 'Load Sample Chart',
          editMode: '🎯 Edit Mode',
          editModeOn: '🎯 Edit Mode ON',
          clear: '🗑️ Clear',
          export: '💾 Export',
        },
        ph: { auto: 'auto', video: 'VIDEO PLACEHOLDER' },
        fi: {
          empty: 'Not selected',
          recording: 'Recording Mode',
          continuing: 'Continuing from {n} beats',
          loaded: 'Loaded {n} beats',
          generated: 'Generated from recording',
          sample: 'Sample chart (loaded)',
        },
        info: { time: 'TIME:', bpm: 'BPM:', offset: 'OFFSET:', notes: 'NOTES:', hits: 'HITS:' },
      },
      editor: {
        title: 'Rhythm Editor',
        h1: '◆ Rhythm Editor',
        meta: {
          title: 'Title',
          titlePh: 'Title',
          titleDefault: 'New Chart',
          bpm: 'BPM',
          offset: 'Offset (ms)',
          grid: 'Grid',
        },
        grid: { q1: 'Quarter (×1)', q2: 'Eighth (×2)', q4: 'Sixteenth (×4)', q8: 'Thirty-second (×8)' },
        btn: { import: 'Import JSON', export: 'Export JSON', addPattern: '+ New Pattern' },
        panel: {
          patterns: 'Patterns',
          timeline: 'Timeline',
          hint: '— Drag from Pool to add / drag blocks to reorder',
          seqDefault: 'Step Sequencer — Select a pattern',
          seqNamed: 'Step Sequencer — {name}',
          seqEmpty: '← Select a pattern from the Pool',
          endEmpty: 'Drag a pattern from the Pool',
          endAdd: '+ Drop here',
        },
        pattern: {
          namePh: 'Pattern name',
          defaultName: 'Pattern {n}',
          deleteTitle: 'Delete',
          confirmDelete: 'Delete "{name}"?',
        },
        preview: {
          play: '▶ Play',
          pause: '⏸ Pause',
          metroOn: '♩ Click: ON',
          metroOff: '♩ Click: OFF',
          timeLabel: '{cur} / {total} s',
        },
        alert: {
          gridChange: 'Changing the grid clears all notes. Continue?',
          loadFail: 'Failed to load: {err}',
        },
        error: { invalidChart: 'Invalid chart: timing / patterns / timeline not found' },
      },
      help: {
        title: 'Rhythm Tool — Help',
        h1: '◆ Rhythm Tool — Help',
        overview: {
          h: 'Overview',
          body: 'This is a two-screen web app for <strong>creating and playing Guitar Hero / Fap Hero-style charts</strong>. Create charts in <strong>Editor</strong> and play them synced to video/audio in <strong>Player</strong>. Charts are stored as JSON files.',
        },
        workflow: {
          h: 'Workflow',
          s1t: 'Prepare audio and video',
          s1d: 'Have your audio file (mp3/wav etc.) and an optional overlay video (mp4 etc.) ready locally. Video is not required.',
          s2t: 'Set BPM and Offset in Editor',
          s2d: 'Enter the song\'s BPM and Offset. See the "<strong>About Offset</strong>" section below for what Offset means. Sixteenth-note grid (×4) is recommended.',
          s3t: 'Create patterns',
          s3d: 'In the left "Patterns" panel, click <strong>+ New Pattern</strong> to add a pattern. Name it and place notes in the step sequencer. One pattern is an 8-beat loop (default).',
          s4t: 'Arrange on the timeline',
          s4d: 'Drag pattern cards to the <strong>Timeline</strong> in the upper right. The <strong>×N</strong> next to each block sets the repeat count. Blocks can also be reordered via drag.',
          s5t: 'Verify in preview',
          s5d: 'Use the Preview at the bottom to check note flow. <kbd>Space</kbd> plays/pauses, <kbd>,</kbd> returns to the start. The metronome click (high pitch on the downbeat) helps you check the groove.',
          s6t: 'Export JSON',
          s6d: 'Save the chart with <strong>Export JSON</strong> at the top right.',
          s7t: 'Play in the Player',
          s7d: 'In the Player screen, load the chart JSON, audio, and video files. <kbd>Space</kbd> plays; <kbd>Ctrl</kbd>+<kbd>Enter</kbd> toggles Theater mode for a fullscreen notes + video view.',
        },
        editmode: {
          h: 'Dynamic Editing Mode (New)',
          intro: '<strong>Edit Mode</strong> lets you record beats in real time by tapping the space bar along with the rhythm — no need to enter BPM or Offset manually.',
          s1t: 'Load audio and video',
          s1d: 'Load an audio file (and optionally a video) in the Player screen.',
          s2t: 'Enable Edit Mode',
          s2d: 'Click the <strong>🎯 Edit Mode</strong> button. It turns cyan and shows "Edit Mode ON".',
          s3t: 'Play and record beats',
          s3d: 'Click <strong>▶ Play</strong>, then tap <kbd>Space</kbd> in time with the rhythm. Recorded beats appear as cyan notes in real time.',
          s4t: 'Pause and resume',
          s4d: 'Pausing with <kbd>⏸ Pause</kbd> rewinds 5 seconds and shows a countdown on resume. Space inputs during the countdown are ignored, giving you time to resync.',
          s5t: 'Continue from an existing chart',
          s5d: 'Load an existing JSON chart, then enable Edit Mode to keep recording on top of its beats.',
          s6t: 'Export',
          s6d: 'Click <strong>💾 Export</strong> to save the recorded beatmap as JSON. BPM is calculated automatically.',
          s7t: 'Play to verify',
          s7d: 'Disable Edit Mode and play back the beatmap you created to verify it.',
          hint: '<strong>Tip:</strong> Click <kbd>🗑️ Clear</kbd> while recording to reset the beatmap (audio/video are preserved).',
        },
        offset: {
          h: 'About Offset',
          body1: '<strong>Offset (ms)</strong> is "the time in milliseconds from the start of the audio file to the first beat".',
          ex1: '<strong>Example:</strong> If the first 2 seconds of the audio are intro/silence and beat 1 starts 2 seconds in → <strong>Offset = 2000</strong>',
          ex2: 'If the audio starts immediately on beat 1, leave <strong>Offset = 0</strong> (the default).',
          body2: 'If the Offset is off, notes will not line up with the music. While listening to the track, tweak it so the metronome click in preview matches the beat. <strong>10 ms increments</strong> usually work well.',
          warn: 'Changing BPM or Offset shifts the real-time positions of existing notes. Lock them in before placing notes.',
        },
        keyboard: {
          h: 'Keyboard Shortcuts',
          playerBadge: 'Player',
          editModeBadge: 'Player (Edit Mode)',
          editorBadge: 'Editor',
          p_space: 'Play / pause / resume',
          p_up: 'Volume +10%',
          p_down: 'Volume −10%',
          p_comma: 'Rewind to start (resets video, audio, and notes)',
          p_ctrl_enter: 'Toggle Theater mode ↔ normal UI',
          p_note: '※ Shortcuts are disabled while a text input has focus.',
          em_space_record: 'Record a beat in time with the rhythm (while playing)',
          em_space_play: 'Play / pause (when not recording)',
          e_space: 'Preview play / pause',
          e_comma: 'Rewind preview to start (continues playing if already playing)',
          e_note: '※ Shortcuts are disabled while a text input or select has focus. While editing a pattern name, <kbd>Enter</kbd> confirms and <kbd>Esc</kbd> cancels.',
        },
        tips: {
          h: 'Tips',
          bpm_h: 'When you don\'t know the BPM',
          bpm_b: 'Use a BPM detection tool (e.g., a <strong>Tap BPM</strong>-style web tool) and tap along to estimate the BPM. Then fine-tune with Offset.',
          pat_h: 'How to use patterns',
          pat_b: 'Splitting patterns by section (verse, chorus, bridge, etc.) makes timeline management easier. Reuse identical phrases with repeats (×N).',
          grid_h: 'Caution when changing the grid',
          grid_b: 'Changing the Grid (resolution) clears notes in all patterns. Decide on it before you start placing notes.',
          backup_h: 'Backing up chart JSON',
          backup_b: 'The browser does not persist data. Save often via <strong>Export JSON</strong>; reload later with <strong>Import JSON</strong>.',
          em_h: 'Making the most of Edit Mode (new)',
          em_b: 'Edit Mode is ideal when you don\'t know the BPM or Offset. Just tap the space bar in rhythm and BPM is calculated automatically. Opening an existing chart in Edit Mode lets you keep recording from where it left off.',
          vs_h: 'Adjusting video speed (new)',
          vs_b: 'The <strong>Video Speed</strong> slider scales playback from 0.1x to 4.0x. Great for PMV work — speed up busy sections or slow down favorite scenes in real time.',
          vl_h: 'Video looping (new)',
          vl_b: 'If the video is shorter than the audio, it loops automatically. Use a short loop video as background for a long song.',
          as_h: 'Auto-save (new)',
          as_b: 'Beats recorded in Edit Mode are auto-saved to localStorage. Even after closing the browser, re-enabling Edit Mode lets you keep recording.',
        },
      },
    },
  };

  // ============================================================
  // Logic
  // ============================================================
  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('en')) return 'en';
    return FALLBACK;
  }

  let currentLang = detectLang();

  function lookup(key, lang) {
    const parts = key.split('.');
    let cur = dict[lang];
    for (const p of parts) {
      if (cur == null) return undefined;
      cur = cur[p];
    }
    return cur;
  }

  function interpolate(str, params) {
    if (!params || typeof str !== 'string') return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : '{' + k + '}'));
  }

  function t(key, params) {
    let val = lookup(key, currentLang);
    if (val == null) val = lookup(key, FALLBACK);
    if (val == null) return key;
    return interpolate(val, params);
  }

  // 信頼済み辞書文字列を DOM ツリーに安全に展開する。
  // DOMParser はパース中スクリプトを実行しないため、innerHTML より安全。
  function setTrustedHTML(el, html) {
    const parsed = new DOMParser().parseFromString('<!doctype html><body><div>' + html + '</div></body>', 'text/html');
    const src = parsed.body.firstChild;
    el.replaceChildren(...src.childNodes);
  }

  function applyI18n() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key);
      if (val != null) setTrustedHTML(el, val);
    });

    // data-i18n-attr="placeholder:player.ph.auto;title:editor.pattern.deleteTitle"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach((pair) => {
        const idx = pair.indexOf(':');
        if (idx < 0) return;
        const attr = pair.slice(0, idx).trim();
        const key = pair.slice(idx + 1).trim();
        if (!attr || !key) return;
        const val = t(key);
        if (val != null) el.setAttribute(attr, val);
      });
    });

    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      const val = t(titleKey);
      if (val != null) document.title = val;
    }

    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyI18n();
  }

  function injectStyle() {
    if (document.getElementById('i18n-style')) return;
    const style = document.createElement('style');
    style.id = 'i18n-style';
    style.textContent = `
      .lang-switcher { position: relative; display: inline-block; }
      .lang-switcher .lang-btn {
        background: transparent; color: var(--text-dim, #888899);
        border: 1px solid var(--border, #2a2a3a);
        padding: 4px 10px; font-family: inherit; font-size: 11px;
        letter-spacing: 0.1em; text-transform: uppercase;
        cursor: pointer; border-radius: 2px;
        transition: color 0.12s, border-color 0.12s; white-space: nowrap;
      }
      .lang-switcher .lang-btn:hover {
        color: var(--accent, #00e5ff);
        border-color: var(--accent, #00e5ff);
      }
      .lang-switcher .lang-menu {
        position: absolute; top: calc(100% + 4px); right: 0;
        background: var(--bg-panel, #14141c);
        border: 1px solid var(--border, #2a2a3a);
        border-radius: 2px; min-width: 110px; z-index: 1000;
        display: flex; flex-direction: column;
      }
      .lang-switcher .lang-menu[hidden] { display: none; }
      .lang-switcher .lang-menu button {
        background: transparent; color: var(--text, #e8e8f0);
        border: none; padding: 6px 12px;
        font-family: inherit; font-size: 11px;
        letter-spacing: 0.1em; text-transform: uppercase;
        cursor: pointer; text-align: left;
        transition: color 0.12s, background 0.12s;
      }
      .lang-switcher .lang-menu button:hover {
        color: var(--accent, #00e5ff);
        background: rgba(0, 229, 255, 0.08);
      }
      .lang-switcher .lang-menu button.active {
        color: var(--accent, #00e5ff);
      }
    `;
    document.head.appendChild(style);
  }

  function mountSwitcher(container) {
    if (!container) return;
    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn';
    btn.setAttribute('aria-label', 'Language');
    const globe = document.createTextNode('🌐 ');
    const currentEl = document.createElement('span');
    currentEl.className = 'lang-current';
    btn.appendChild(globe);
    btn.appendChild(currentEl);

    const menu = document.createElement('div');
    menu.className = 'lang-menu';
    menu.hidden = true;

    const langs = [
      { code: 'ja', label: '日本語' },
      { code: 'en', label: 'English' },
    ];
    const buttons = langs.map(({ code, label }) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = code;
      b.textContent = label;
      menu.appendChild(b);
      return b;
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    container.appendChild(wrap);

    const refresh = () => {
      currentEl.textContent = currentLang.toUpperCase();
      buttons.forEach((b) => b.classList.toggle('active', b.dataset.lang === currentLang));
    };
    refresh();

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    buttons.forEach((b) => {
      b.addEventListener('click', () => {
        setLang(b.dataset.lang);
        menu.hidden = true;
      });
    });
    document.addEventListener('click', () => {
      menu.hidden = true;
    });
    document.addEventListener('i18n:changed', refresh);
  }

  // Expose API
  window.i18n = {
    t,
    setLang,
    applyI18n,
    mountSwitcher,
    getLang: () => currentLang,
  };

  function init() {
    injectStyle();
    applyI18n();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

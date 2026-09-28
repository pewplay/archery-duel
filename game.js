(() => {
  // src/utils/helpers.ts
  var $ = (selector) => document.querySelector(selector);
  var $$ = (selector) => [...document.querySelectorAll(selector)];
  var $on = (target, type, callback, options) => target == null ? void 0 : target.addEventListener(type, callback, options);
  var setHtml = (element, html) => {
    if (element) {
      element.innerHTML = html;
    }
  };
  var addStyle = (target, styles) => {
    if (target) {
      for (const style in styles) {
        target.style.setProperty(style, styles[style]);
      }
    }
  };
  var hasClass = (target, className) => !!target && target.classList.contains(className);
  var classList = (target, className, type = "add") => {
    if (target) {
      className.split(" ").forEach((classText) => {
        target.classList[type](classText);
      });
    }
  };
  var randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // src/utils/constants.ts
  var BASE_WIDTH = 412;
  var BASE_HEIGHT = 732;
  var ROOT = "root";
  var CONTAINER = "container";
  var COLORS = ["#de8f6f", "#3c7cab"];
  var STORAGE_PREFIX = "archery-duel:";

  // src/utils/storage.ts
  var getValueFromCache = (key, initial) => {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : initial;
    } catch (_) {
      return initial;
    }
  };
  var savePropierties = (key, value) => {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (_) {
    }
  };

  // src/utils/sounds.ts
  var zzfxX = null;
  var zzfxV = 0.3;
  var zzfx = (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, M = Math, R = 44100, d = 2 * M.PI, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, x, h) => {
    e = R * e + 9;
    m *= R;
    r *= R;
    t *= R;
    c *= R;
    y *= 500 * d / R ** 3;
    A *= d / R;
    v *= d / R;
    z *= R;
    l = R * l | 0;
    for (h = e + m + r + t + c | 0; a < h; k[a++] = f)
      ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? M.sin((g % d) ** 3) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : M.sin(g), f = (l ? 1 - B + B * M.sin(d * a / l) : 1) * (0 < f ? 1 : -1) * M.abs(f) ** D * zzfxV * p * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2) : f), x = (b += u += y) * M.cos(A * H++), g += x - x * E * (1 - 1e9 * (M.sin(a) + 1) % 2), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n || (n = 1));
    p = zzfxX.createBuffer(1, h, R);
    p.getChannelData(0).set(k);
    b = zzfxX.createBufferSource();
    b.buffer = p;
    b.connect(zzfxX.destination);
    b.start();
    return b;
  };
  var soundsEnabled = getValueFromCache("sound", "yes") === "yes";
  var SOUNDS = {
    gameOver: [, , 20, 0.04, , 0.6, , 1.31, , , -990, 0.06, 0.17, , , 0.04, 0.07],
    shot: [, , 150, 0.05, , 0.05, , 1.3, , , , , , 3],
    counter: [, 0.1, 75, 0.03, 0.08, 0.17, 1, 1.88, 7.83, , , , , 0.4],
    click: [, , 537, 0.02, 0.02, 0.22, 1, 1.59, -6.98, 4.97],
    target: [
      1.03,
      ,
      754,
      0.03,
      0.02,
      0.09,
      ,
      1.58,
      36.1,
      -14,
      ,
      0.01,
      -0.01,
      0.7,
      ,
      ,
      ,
      0.44,
      0.03
    ]
  };
  var getContext = () => {
    if (!zzfxX) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        return null;
      }
      zzfxX = new Ctx();
    }
    if (zzfxX.state === "suspended") {
      zzfxX.resume().catch(() => {
      });
    }
    return zzfxX;
  };
  var PlaySound = (type) => {
    if (soundsEnabled && !document.hidden) {
      try {
        if (getContext()) {
          zzfx(...SOUNDS[type]);
        }
      } catch (_) {
      }
    }
  };
  var isSoundsEnabled = () => soundsEnabled;
  var ICON_ON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.47 4.47 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06A9 9 0 0 0 14 3.23z"/></svg>`;
  var ICON_OFF = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>`;
  var soundIcon = () => soundsEnabled ? ICON_ON : ICON_OFF;
  var toogleSounds = (element) => {
    soundsEnabled = !soundsEnabled;
    savePropierties("sound", soundsEnabled ? "yes" : "no");
    element.innerHTML = soundIcon();
    element.setAttribute("aria-label", soundsEnabled ? "Mute sounds" : "Unmute sounds");
  };

  // src/components/game/components/arrow/index.ts
  var ARROW_WIDTH = 18;
  var ARROW_HEIGHT = ARROW_WIDTH * 470 / 85;
  var Arrow = ({ id, left, top, rotation, scale }) => (
    /*html*/
    `<div
  id="${id}"
  class="arrow"
  style="transform:rotate(${rotation}deg);left:${left}px;top:${top}px;"
>
  <svg viewBox="0 0 85 470" style="transform:scaleY(${scale});" aria-hidden="true">
    <polygon
      fill="#E6E9ED"
      points="85.32601928710938,127.98799896240234 51.201019287109375,149.33100128173828 33.516021728515625,149.33100128173828 0,127.98799896240234 0,21.334999084472656 85.32601928710938,21.334999084472656 "
    />
    <path
      fill="#FFCE54"
      d="m50.20101,3.117c-4.155,-4.156 -10.921,-4.156 -15.077,0c-2.093,2.094 -3.124,4.812 -3.124,7.547l0,0l0,394.283l21.326,0l0,-394.252c0.016,-2.734 -1.031,-5.484 -3.125,-7.578z"
    />
    <path
      fill="#ED5564"
      d="m55.37301,390.666c-4.484,0 -8.812,1.031 -12.718,2.984c-3.891,-1.953 -8.219,-2.984 -12.702,-2.984c-15.703,0 -28.469,12.766 -28.469,28.469c0,25.717 32.141,45.217 35.812,47.357l5.375,3.125l5.375,-3.125c3.655,-2.141 35.796,-21.641 35.796,-47.357c0,-15.688 -12.766,-28.469 -28.469,-28.469z"
    />
  </svg>
</div>`
  );
  var arrow_default = Arrow;

  // src/components/game/components/bow/index.ts
  var BOW_WIDTH = 60;
  var BOW_HEIGHT = BOW_WIDTH * 491 / 190;
  var Bow = ({ id, fill, left, top, rotation, scale }) => (
    /*html*/
    `<div
  id="${id}"
  class="bow"
  style="transform:rotate(${rotation}deg);left:${left}px;top:${top}px"
>
  <svg viewBox="0 0 190 491" style="transform:scaleX(${scale});" aria-hidden="true">
    <rect x="12" fill="black" width="21" height="491"/>
    <path
      fill="${fill}"
      d="m170.75487,205.321c0,0 20.5,-29.858 19.406,-52.482c-4,-83.169 -107.668,-88.497 -159.557,-152.839l-30.515,0c-4.156,64.467 138.823,93.419 141.964,146.448c1.438,24.421 -13.984,53.857 -13.984,53.857l0,90.028c0,0 15.421,29.437 13.984,53.857c-3.141,53.029 -146.12,81.982 -141.964,146.449l30.515,0c51.889,-64.342 155.557,-69.67 159.557,-152.84c1.094,-22.623 -19.406,-52.482 -19.406,-52.482l0,-79.996z"
    />
  </svg>
</div>`
  );
  var bow_default = Bow;

  // src/components/game/components/case/index.ts
  var Case = ({ index, type }) => {
    return (
      /*html*/
      `<div class="case ${type}">
  ${arrow_default({ id: `ac-${index}-1`, left: 5, top: -50, rotation: -10, scale: 1 })}
  ${arrow_default({ id: `ac-${index}-2`, left: 17, top: -50, rotation: 0, scale: 1 })}
  ${arrow_default({ id: `ac-${index}-3`, left: 29, top: -50, rotation: 10, scale: 1 })}
  </div>`
    );
  };
  var case_default = Case;

  // src/components/game/components/targets/helpers.ts
  var TYPES = [
    {
      w: 140,
      h: 245,
      p: [
        [54, 0],
        [36, 35],
        [71, 35],
        [18, 70],
        [53, 70],
        [88, 70],
        [0, 105],
        [35, 105],
        [70, 105],
        [105, 105],
        [18, 140],
        [53, 140],
        [88, 140],
        [36, 175],
        [71, 175],
        [54, 210]
      ]
    },
    {
      w: 105,
      h: 105,
      p: [
        [35, 0],
        [35, 35],
        [35, 70],
        [0, 35],
        [70, 35]
      ]
    },
    {
      w: 175,
      h: 175,
      a: true,
      p: [
        [155, 68],
        [145, 108],
        [117, 140],
        [78, 154],
        [36, 149],
        [2, 126],
        [-17, 88],
        [-17, 47],
        [2, 9],
        [36, -14],
        [78, -19],
        [117, -5],
        [145, 27]
      ]
    },
    {
      w: 175,
      h: 175,
      p: [
        [70, 0],
        [35, 35],
        [105, 35],
        [0, 70],
        [70, 70],
        [140, 70],
        [35, 105],
        [105, 105],
        [70, 140]
      ]
    },
    {
      w: 140,
      h: 140,
      a: true,
      p: [
        [0, 0],
        [35, 0],
        [70, 0],
        [105, 0],
        [0, 35],
        [105, 35],
        [0, 70],
        [105, 70],
        [0, 105],
        [35, 105],
        [70, 105],
        [105, 105]
      ]
    },
    {
      w: 35,
      h: 105,
      p: [
        [0, 0],
        [0, 35],
        [0, 70]
      ]
    },
    {
      w: 175,
      h: 175,
      a: true,
      p: [
        [0, 70],
        [35, 70],
        [70, 70],
        [105, 70],
        [140, 70],
        [70, 0],
        [70, 35],
        [70, 105],
        [70, 140]
      ]
    },
    {
      w: 105,
      h: 105,
      p: [
        [35, 35],
        [0, 35],
        [70, 35],
        [35, 0],
        [35, 70]
      ]
    }
  ];

  // src/components/game/components/targets/index.ts
  var Target = (id = "", left = 0, top = 0) => (
    /*html*/
    `<div class="target" id="${id}" style="left:${left}px;top:${top}px"></div>`
  );
  var SpecialTarget = () => (
    /*html*/
    `<div class="targets" style="width:105px;height:210px;">
  ${new Array(6).fill(null).map(
      (_, index) => (
        /*html*/
        `<div class="target-spe ${index % 2 === 0 ? "left" : "right"}" style="top:${35 * index}px">
      ${new Array(3).fill(null).map((_2, key) => Target(`t-${key + index * 3}`, 35 * key, 0)).join("")}
      </div>`
      )
    ).join("")}
  </div>`
  );
  var Targets = (type = 0) => {
    if (type >= TYPES.length) {
      return SpecialTarget();
    }
    const { w, h, p, a = false } = TYPES[type];
    const animate = a || randomNumber(0, 1) === 1;
    let vars = "";
    if (animate) {
      const deg = randomNumber(0, 1);
      vars = `--s:${randomNumber(2, 5)}s;--i:${deg ? "0" : "359"}deg;--f:${deg ? "359" : "0"}deg;`;
    }
    return (
      /*html*/
      `<div class="targets${animate ? " a" : ""}" style="width:${w}px;height:${h}px;${vars}">
  ${p.map(([x, y], i) => Target(`t-${i}`, x, y)).join("")}
  </div>`
    );
  };
  var targets_default = Targets;

  // src/utils/clock.ts
  var now = 0;
  var last = 0;
  var paused = false;
  var seq = 0;
  var timers = [];
  var pauseListeners = [];
  var add = (ms, fn, repeat) => {
    const id = ++seq;
    timers.push({ id, every: ms, next: now + ms, repeat, fn });
    return id;
  };
  var every = (ms, fn) => add(ms, fn, true);
  var after = (ms, fn) => add(ms, fn, false);
  var cancel = (id = 0) => {
    timers = timers.filter((t) => t.id !== id);
  };
  var cancelAll = () => {
    timers = [];
  };
  var onPauseChange = (fn) => pauseListeners.push(fn);
  var frame = (ts) => {
    requestAnimationFrame(frame);
    const dt = last ? Math.min(ts - last, 100) : 0;
    last = ts;
    if (paused) {
      return;
    }
    now += dt;
    for (let guard = 0; guard < 5e3; guard++) {
      let due = null;
      for (const t of timers) {
        if (t.next <= now && (!due || t.next < due.next)) {
          due = t;
        }
      }
      if (!due) {
        break;
      }
      if (due.repeat) {
        due.next += due.every;
      } else {
        cancel(due.id);
      }
      due.fn();
    }
  };
  requestAnimationFrame(frame);
  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
    last = 0;
    pauseListeners.forEach((fn) => fn(paused));
  });

  // src/utils/view.ts
  var view = {
    W: BASE_WIDTH,
    H: BASE_HEIGHT,
    scale: 1,
    rot: false
  };
  var MAX_STRETCH_W = 1.45;
  var MAX_STRETCH_H = 1.3;
  var rootRect = () => document.getElementById(ROOT).getBoundingClientRect();
  var fitStage = (stage) => {
    if (!stage) {
      return;
    }
    const { width: vw, height: vh } = rootRect();
    const rot = vw > vh;
    const sx = rot ? vh : vw;
    const sy = rot ? vw : vh;
    const scale = Math.min(sx / BASE_WIDTH, sy / BASE_HEIGHT);
    const W = Math.round(Math.min(sx / scale, BASE_WIDTH * MAX_STRETCH_W));
    const H = Math.round(Math.min(sy / scale, BASE_HEIGHT * MAX_STRETCH_H));
    view.W = W;
    view.H = H;
    view.scale = scale;
    view.rot = rot;
    stage.style.width = `${W}px`;
    stage.style.height = `${H}px`;
    stage.style.marginLeft = `${-W / 2}px`;
    stage.style.marginTop = `${-H / 2}px`;
    stage.style.transform = `rotate(${rot ? 90 : 0}deg) scale(${scale})`;
    stage.classList.toggle("rot", rot);
  };
  var toStage = (clientX, clientY) => {
    const r = rootRect();
    const dx = (clientX - (r.left + r.width / 2)) / view.scale;
    const dy = (clientY - (r.top + r.height / 2)) / view.scale;
    const x = view.rot ? dy : dx;
    const y = view.rot ? -dx : dy;
    return { x: x + view.W / 2, y: y + view.H / 2 };
  };
  var centerInStage = (element) => {
    const r = element.getBoundingClientRect();
    return toStage(r.left + r.width / 2, r.top + r.height / 2);
  };

  // src/components/game/helpers.ts
  var CURRENT_DIFICULTY = 1;
  var IS_MOUSE_DOWN = false;
  var POINTER_ID = -1;
  var BOW_INTERVAL_FOLLOW_TARGET = 0;
  var HIDE_TARGET_CLASS = "hide";
  var MAX_SCORE = 70;
  var IS_GAME_OVER = false;
  var HAS_SHOT = false;
  var ARROW_STEP = 15;
  var ARROW_TICK = 4;
  var HIT_RADIUS = 20;
  var TARGET_HALF = 17.5;
  var BOW_ROTATION = 270;
  var newSide = () => ({
    animate: false,
    timer: 0,
    angle: 0,
    point: { x: 0, y: 0 },
    score: 0,
    arrows: 0,
    hasArrow: true
  });
  var ANIMATION = [newSide(), newSide()];
  var positions = () => {
    const { W, H } = view;
    return [
      {
        bow: { left: W / 2 - 30, top: H - 190 },
        arrow: { left: W / 2 - 11, top: H - 160 }
      },
      {
        bow: { left: W / 2 - 30, top: 40 },
        arrow: { left: W / 2 - 11, top: 75 }
      }
    ];
  };
  var px = (value) => `${value}px`;
  var applyLayout = () => {
    positions().forEach(({ bow, arrow }, index) => {
      addStyle($(`#bow-${index + 1}`), { left: px(bow.left), top: px(bow.top) });
      if (!ANIMATION[index].animate) {
        addStyle($(`#arrow-${index + 1}`), {
          left: px(arrow.left),
          top: px(arrow.top)
        });
      }
    });
  };
  var normalizeAngle = (angle = 0) => {
    let newAngle = angle % 360;
    if (newAngle < 0) {
      newAngle += 360;
    }
    return Math.round(Math.abs(newAngle));
  };
  var calculateAngle = (p1, p2) => Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
  var getArrowTip = (index) => {
    const { angle, point } = ANIMATION[index - 1];
    const radians = angle * Math.PI / 180;
    const direction = index === 1 ? 1 : -1;
    const half = ARROW_HEIGHT / 2;
    return {
      x: point.x + ARROW_WIDTH / 2 + direction * half * Math.sin(radians),
      y: point.y + half - direction * half * Math.cos(radians)
    };
  };
  var rotateBow = (destination) => {
    const pivot = { x: view.W / 2, y: view.H - 142.5 };
    const newAngle = normalizeAngle(calculateAngle(pivot, destination));
    if (newAngle >= 180 && newAngle <= 360) {
      addStyle($("#bow-1"), { transform: `rotate(${newAngle}deg)` });
      const angleArrow = newAngle - 270;
      ANIMATION[0].angle = angleArrow;
      addStyle($("#arrow-1"), { transform: `rotate(${angleArrow}deg)` });
    }
  };
  var updateScore = () => setHtml(
    $(".score"),
    `<span>${ANIMATION[0].score}</span> - <span>${ANIMATION[1].score}</span>`
  );
  var getVisibleTargets = () => $$(".target").filter((v) => !hasClass(v, HIDE_TARGET_CLASS));
  var checkCollision = (index) => {
    const tip = getArrowTip(index);
    for (const target of getVisibleTargets()) {
      const center = centerInStage(target);
      if (Math.hypot(tip.x - center.x, tip.y - center.y) <= HIT_RADIUS) {
        classList(target, HIDE_TARGET_CLASS, "add");
        ANIMATION[index - 1].score++;
        updateScore();
        PlaySound("target");
      }
    }
  };
  var clearIntervals = () => {
    cancel(BOW_INTERVAL_FOLLOW_TARGET);
    for (const side of ANIMATION) {
      cancel(side.timer);
    }
  };
  var showWinner = (winner) => {
    const winUI = $(".win-ui");
    const youWin = winner === 0;
    setHtml(
      winUI,
      /*html*/
      `<div class="up win-box">
      <span class="win-title">${youWin ? "YOU WIN!" : "BOT WINS"}</span>
      <span class="win-score">${ANIMATION[0].score} \u2013 ${ANIMATION[1].score}</span>
      <div class="win-btns">
        <button type="button" id="again">PLAY AGAIN</button>
        <button type="button" id="menu">MENU</button>
      </div>
    </div>`
    );
    classList(winUI, HIDE_TARGET_CLASS, "remove");
    classList(winUI, youWin ? "r" : "b", "add");
    classList($("#stage"), "over", "add");
    $on($("#again"), "click", () => {
      cancelAll();
      screens_default("Game", { dificulty: CURRENT_DIFICULTY });
    });
    $on($("#menu"), "click", () => {
      cancelAll();
      screens_default("Lobby");
    });
  };
  var validateNextTurnOrGameOver = () => {
    const winner = ANIMATION.findIndex((v) => v.score >= MAX_SCORE);
    if (winner >= 0) {
      clearIntervals();
      IS_GAME_OVER = true;
      IS_MOUSE_DOWN = false;
      showWinner(winner);
      PlaySound("gameOver");
      const totalScore = getValueFromCache("score", { red: 0, blue: 0 });
      totalScore[winner === 0 ? "red" : "blue"]++;
      savePropierties("score", totalScore);
    } else {
      const targets = getVisibleTargets();
      const hasArrows = ANIMATION.some((v) => v.hasArrow);
      if (targets.length === 0 || !hasArrows) {
        clearIntervals();
        arrowReleaseTurn();
      }
    }
  };
  var validateArrowOutsiteStage = (x, y) => y < -100 || x < -50 || y > view.H + 100 || x > view.W + 50;
  var moveArrow = (index = 1) => {
    const side = ANIMATION[index - 1];
    const arrow = $(`#arrow-${index}`);
    const angleInRadians = (side.angle - 90) * (Math.PI / 180);
    const direction = index === 1 ? 1 : -1;
    const newX = side.point.x + ARROW_STEP * Math.cos(angleInRadians) * direction;
    const newY = side.point.y + ARROW_STEP * Math.sin(angleInRadians) * direction;
    side.point = { x: newX, y: newY };
    addStyle(arrow, { left: px(newX), top: px(newY) });
    if (validateArrowOutsiteStage(newX, newY)) {
      side.animate = false;
      cancel(side.timer);
      const hasArrows = side.arrows > 0;
      side.hasArrow = hasArrows;
      if (hasArrows) {
        const { left, top } = positions()[index - 1].arrow;
        addStyle(arrow, { left: px(left), top: px(top) });
        classList($(`#ac-${index}-${side.arrows}`), HIDE_TARGET_CLASS, "add");
        side.arrows--;
        if (index === 2) {
          validateBotMovement();
        }
      } else {
        addStyle($(`#bow-${index}`), { transform: `rotate(${BOW_ROTATION}deg)` });
      }
      validateNextTurnOrGameOver();
    } else {
      checkCollision(index);
    }
  };
  var shotArrow = (index = 1) => {
    const side = ANIMATION[index - 1];
    const { left, top } = positions()[index - 1].arrow;
    side.point = { x: left, y: top };
    side.animate = true;
    cancel(side.timer);
    side.timer = every(ARROW_TICK, () => moveArrow(index));
    PlaySound("shot");
    if (index === 1 && !HAS_SHOT) {
      HAS_SHOT = true;
      classList($("#hint"), "gone", "add");
    }
  };
  var handlePointerDown = (event) => {
    if (event.button > 0) {
      return;
    }
    if (!IS_GAME_OVER && !IS_MOUSE_DOWN && !ANIMATION[0].animate && ANIMATION[0].hasArrow) {
      event.preventDefault();
      const control = event.currentTarget;
      try {
        control.setPointerCapture(event.pointerId);
      } catch (_) {
      }
      POINTER_ID = event.pointerId;
      IS_MOUSE_DOWN = true;
      rotateBow(toStage(event.clientX, event.clientY));
    }
  };
  var handlePointerUp = (event) => {
    if (!IS_MOUSE_DOWN || event.pointerId !== POINTER_ID) {
      return;
    }
    IS_MOUSE_DOWN = false;
    if (!IS_GAME_OVER && !ANIMATION[0].animate && ANIMATION[0].hasArrow) {
      shotArrow();
    }
  };
  var handlePointerMove = (event) => {
    if (!IS_GAME_OVER && IS_MOUSE_DOWN && event.pointerId === POINTER_ID && !ANIMATION[0].animate) {
      rotateBow(toStage(event.clientX, event.clientY));
    }
  };
  var handlePointerCancel = (event) => {
    if (event.pointerId === POINTER_ID) {
      IS_MOUSE_DOWN = false;
    }
  };
  var validateBotMovement = () => {
    let targets = getVisibleTargets();
    const counterDificulty = [18, 10, 2][CURRENT_DIFICULTY - 1];
    if (IS_GAME_OVER || targets.length === 0) {
      return;
    }
    let target = targets[randomNumber(0, targets.length - 1)];
    const bow = positions()[1].bow;
    const bowPoint = { x: bow.left, y: bow.top };
    let counterToShoot = 0;
    cancel(BOW_INTERVAL_FOLLOW_TARGET);
    BOW_INTERVAL_FOLLOW_TARGET = every(100, () => {
      if (IS_GAME_OVER) {
        cancel(BOW_INTERVAL_FOLLOW_TARGET);
        return;
      }
      const center = centerInStage(target);
      const aim = { x: center.x - TARGET_HALF, y: center.y - TARGET_HALF };
      const angle = normalizeAngle(calculateAngle(bowPoint, aim));
      addStyle($("#bow-2"), { transform: `rotate(${angle}deg)` });
      const angleArrow = angle - 270;
      ANIMATION[1].angle = angleArrow;
      addStyle($("#arrow-2"), { transform: `rotate(${angleArrow}deg)` });
      counterToShoot++;
      if (counterToShoot % counterDificulty === 0) {
        let stopInterval = true;
        if (hasClass(target, HIDE_TARGET_CLASS)) {
          targets = getVisibleTargets();
          if (targets.length !== 0) {
            target = targets[randomNumber(0, targets.length - 1)];
            stopInterval = false;
          }
        }
        if (stopInterval) {
          cancel(BOW_INTERVAL_FOLLOW_TARGET);
          shotArrow(2);
        }
      }
    });
  };
  var arrowReleaseTurn = () => {
    const showSpecial = CURRENT_DIFICULTY === 3 && randomNumber(0, 1) === 1;
    const typeTarget = !showSpecial ? randomNumber(0, TYPES.length) : 8;
    setHtml($("#r-target"), targets_default(typeTarget));
    positions().forEach(({ arrow }, index) => {
      addStyle($(`#bow-${index + 1}`), {
        transform: `rotate(${BOW_ROTATION}deg)`
      });
      addStyle($(`#arrow-${index + 1}`), {
        left: px(arrow.left),
        top: px(arrow.top),
        transform: "rotate(0deg)",
        display: "block"
      });
    });
    for (let i = 0; i < ANIMATION.length; i++) {
      const side = ANIMATION[i];
      cancel(side.timer);
      side.animate = false;
      side.arrows = 2;
      side.angle = 0;
      side.hasArrow = true;
      for (let c = 1; c <= 3; c++) {
        classList(
          $(`#ac-${i + 1}-${c}`),
          HIDE_TARGET_CLASS,
          c === 3 ? "add" : "remove"
        );
      }
    }
    validateBotMovement();
  };
  var onResize = () => {
    const stage = $("#stage");
    if (stage) {
      fitStage(stage);
      applyLayout();
    }
  };
  $on(window, "resize", onResize);
  $on(window, "orientationchange", () => after(50, onResize));
  onPauseChange((paused2) => classList($("#stage"), "paused", paused2 ? "add" : "remove"));
  var addEvents = (dificulty) => {
    cancelAll();
    CURRENT_DIFICULTY = dificulty;
    IS_GAME_OVER = false;
    IS_MOUSE_DOWN = false;
    POINTER_ID = -1;
    for (let i = 0; i < ANIMATION.length; i++) {
      ANIMATION[i] = newSide();
    }
    onResize();
    if (HAS_SHOT) {
      classList($("#hint"), "gone", "add");
    }
    const control = $("#control");
    $on(control, "pointerdown", handlePointerDown);
    $on(control, "pointermove", handlePointerMove);
    $on(control, "pointerup", handlePointerUp);
    $on(control, "pointercancel", handlePointerCancel);
    $on(control, "lostpointercapture", handlePointerCancel);
    $on($("#exit"), "click", () => {
      cancelAll();
      screens_default("Lobby");
    });
    updateScore();
    const steps = ["3", "2", "1", "GO!"];
    let step = 0;
    const showStep = () => {
      setHtml($(".lock-ui .count"), steps[step]);
      PlaySound("counter");
      step++;
    };
    showStep();
    const inputInterval = every(1e3, () => {
      if (step < steps.length) {
        showStep();
        return;
      }
      cancel(inputInterval);
    });
    after(3600, () => {
      cancel(inputInterval);
      classList($(".lock-ui"), HIDE_TARGET_CLASS, "add");
      arrowReleaseTurn();
    });
  };

  // src/components/game/index.ts
  var Game = ({ dificulty = 1 }) => {
    const render = (
      /*html*/
      `<div class="game jc" id="stage">
      <div class="lock-ui wh jc"><span class="up count"></span></div>
      <div class="win-ui hide wh jc"></div>
      ${[0, 1].map(
        (i) => `${bow_default({
          id: `bow-${i + 1}`,
          fill: COLORS[i],
          left: 0,
          top: 0,
          rotation: 270,
          scale: i === 0 ? 1 : -1
        })}
          ${arrow_default({
          id: `arrow-${i + 1}`,
          left: 0,
          top: 0,
          rotation: 0,
          scale: i === 0 ? -1 : 1
        })}
          ${case_default({ index: i + 1, type: i === 0 ? "bottom" : "top" })}
        `
      ).join("")}
      <div class="score jc" aria-live="polite"></div>
      <button type="button" id="exit">EXIT</button>
      <div id="r-target"></div>
      <div id="control"><div id="hint">Drag back and release to shoot</div></div>
  </div>`
    );
    setHtml($(`#${CONTAINER}`), render);
    addEvents(dificulty);
  };
  var game_default = Game;

  // src/components/person/index.ts
  var Person = ({ color, score, type, label }) => (
    /*html*/
    `<div class="pe pe-${type}">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="${color}" d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
  </svg>
  <div id="sc-${type}" class="pe-sco">${score}</div>
  <div class="pe-label">${label}</div>
</div>`
  );
  var person_default = Person;

  // src/components/lobby/index.ts
  var Lobby = () => {
    const wins = getValueFromCache("score", { red: 0, blue: 0 });
    const render = (
      /*html*/
      `<div class="lobby wh">
  <button type="button" class="lobby-so jc" aria-label="${isSoundsEnabled() ? "Mute sounds" : "Unmute sounds"}">${soundIcon()}</button>
  <header class="lobby-hd"><h1>ARCHERY DUEL</h1></header>
  <div class="lobby-btn">
    <p>Load your bow and hit 70 targets before your opponent!</p>
    <div class="lobby-opts">
      <button type="button" data-level="1">EASY</button>
      <button type="button" data-level="2">MEDIUM</button>
      <button type="button" data-level="3">HARD</button>
    </div>
  </div>
  <div class="lobby-pe">
    ${person_default({ color: COLORS[0], score: wins.red || 0, type: "red", label: "YOU" })}
    ${person_default({ color: COLORS[1], score: wins.blue || 0, type: "blue", label: "BOT" })}
  </div>
  <p class="lobby-co">By Jorge Rubiano<br />js13kGames 2023</p>
</div>`
    );
    setHtml($(`#${CONTAINER}`), render);
    $$(".lobby-opts button").forEach((button) => {
      $on(button, "click", () => {
        screens_default("Game", { dificulty: Number(button.dataset.level) });
      });
    });
    $on($(".lobby-so"), "click", () => {
      toogleSounds($(".lobby-so"));
    });
  };
  var lobby_default = Lobby;

  // src/screens/index.ts
  var Handler = { Game: game_default, Lobby: lobby_default };
  var Screen = (screen = "Lobby", params = {}) => {
    document.body.dataset.screen = screen.toLowerCase();
    Handler[screen](params);
  };
  var screens_default = Screen;

  // src/index.ts
  setHtml($(`#${ROOT}`), `<div id="${CONTAINER}" class="wh"></div>`);
  $on(document, "contextmenu", (event) => event.preventDefault());
  $on(window, "click", (e) => {
    var _a;
    const target = (_a = e.target) == null ? void 0 : _a.closest("a, button");
    if (target) {
      PlaySound("click");
    }
  });
  screens_default("Lobby");
})();

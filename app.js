/* =========================================================
   StudyTrail - app logic
   Sections: data, state, helpers, cloud (auth, usernames, saving),
             sign-in screen, profile sheet, views, actions, render
   Subject and self-growth roadmaps live in roadmaps.js (EXTRA, SEMS).
   ========================================================= */

/* ---------- Sample data (used in demo mode) ---------- */
const DEMO_SECONDS = 5;
const TRACKS = {};
const DEMO_BOARD = [['aarav_s',1240,1],['meera_k',1105,4],['kabir_t',980,2],['ishita_r',860,6],['dev_p',745,3],['sana_m',620,5]];
const DEMO_FEED = [['aarav_s','completed Arrays in Data Structures','12 min ago'],['meera_k','completed CSS selectors and layout in Web Development','40 min ago'],['kabir_t','started Linear regression','1 hr ago'],['ishita_r','completed Von Neumann architecture in TCS101','2 hr ago']];
Object.keys(EXTRA).forEach(k => { TRACKS[k] = EXTRA[k]; });

const AVATARS = [['#6366f1','#2563eb'],['#f43f5e','#fb923c'],['#10b981','#06b6d4'],['#f59e0b','#ef4444'],['#8b5cf6','#ec4899'],['#0ea5e9','#22d3ee'],['#84cc16','#10b981'],['#64748b','#0f172a']];
const LEVELS = ['Trailhead','Scout','Explorer','Navigator','Pathfinder','Trailblazer','Summiteer','Legend'];
const RESERVED = ['admin','administrator','you','studytrail','support','moderator','mod','root','system','staff','official'];
const REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- State ---------- */
const S = {
  view:'dash', track:'tcs101', done:{}, points:0, active:null, left:0, timer:null, lastKey:'',
  sel:{course:'B.Tech',branch:'CSE',sem:'1',sec:'D2'}, feed:DEMO_FEED.slice(),
  user:null, ready:false, lb:null, mode:'in', em:'', un:'', ph:'', phStep:1, confirm:null,
  me:{username:'you', private:false, av:0}, streak:0, lastDay:'', sheet:null, lock:false,
  pendingName:'', justDone:null, previewLogin:false
};
const CLOUD = typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.apiKey.indexOf('PASTE') < 0;
let auth = null, db = null;
if (CLOUD) { firebase.initializeApp(firebaseConfig); auth = firebase.auth(); db = firebase.firestore(); S.feed = []; S.ready = false; S.me = {username:'', private:false, av:0}; }
else { S.ready = true; S.previewLogin = location.hash === '#login'; }

const NAV = [['dash','Dashboard'],['subjects','My subjects'],['growth','Self-growth'],['board','Leaderboard']];
const IC = {
  dash:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  subjects:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
  growth:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  board:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.5h-3a1.8 1.8 0 0 0 0 3.5h4"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  flame:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
  rank:'<path d="M6 20V10M12 20V4M18 20v-7"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M3 3l18 18"/><path d="M10.6 5.1A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  shield:'<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/>',
  warn:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.01"/>'
};
const svg = (p, cls) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${cls ? ' class="' + cls + '"' : ''} aria-hidden="true">${p}</svg>`;
const LOCK = svg(IC.lock), TICK = svg(IC.check);
const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
const GOOGLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.4z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A12 12 0 0 0 1.8 7.1l3.8 3c.9-2.7 3.4-5.3 6.4-5.3z"/></svg>';

/* ---------- Helpers ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const val = id => { const e = $(id); return e ? e.value.trim() : ''; };
function avatar(i, name, sz, id) {
  const c = AVATARS[(i || 0) % AVATARS.length];
  return `<span class="av"${id ? ' id="' + id + '"' : ''} style="--a:${c[0]};--b:${c[1]};--sz:${sz || 36}px">${esc((name || '?').charAt(0))}</span>`;
}
function flat(id) { const out = []; let n = 0; TRACKS[id].units.forEach((u, ui) => { u.topics.forEach(t => { out.push({id:id + '-' + n, u:ui, name:t[0], min:t[1], pts:Math.max(5, Math.round(t[1] / 6))}); n++; }); }); return out; }
function prog(id) { const l = flat(id), d = l.filter(t => S.done[t.id]).length; return {d, n:l.length, p:Math.round(100 * d / l.length)}; }
function nextTopic(id) { const l = flat(id); for (let i = 0; i < l.length; i++) if (!S.done[l[i].id]) return l[i]; return null; }
function level(p) { const n = Math.floor(p / 100); return {n:n + 1, title:LEVELS[Math.min(n, LEVELS.length - 1)], pct:p % 100}; }
function doneTotal() { let n = 0; Object.keys(S.done).forEach(k => { if (S.done[k]) n++; }); return n; }
function semCodes() { return S.sel.branch === 'CSE' ? (SEMS[S.sel.sem] || []) : []; }
const tid = code => code.toLowerCase();
const hasTrack = code => !!TRACKS[tid(code)];
function dayStr(off) { const d = new Date(); d.setDate(d.getDate() + (off || 0)); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function curStreak() { return (S.lastDay === dayStr(0) || S.lastDay === dayStr(-1)) ? S.streak : 0; }
function greeting() { const h = new Date().getHours(); return h < 5 || h >= 22 ? 'Welcome back' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
function contact() { return S.user ? (S.user.email || S.user.phoneNumber || 'Signed in') : 'Demo mode, nothing is saved'; }
function hasPw() { return !!(S.user && S.user.providerData && S.user.providerData.some(p => p.providerId === 'password')); }
function board() {
  let b;
  if (CLOUD) b = (S.lb || []).filter(r => !S.user || r.uid !== S.user.uid).map(r => ({u:r.username, p:r.points || 0, av:r.av || 0}));
  else b = DEMO_BOARD.map(r => ({u:r[0], p:r[1], av:r[2]}));
  if (!S.me.private && S.me.username) b.push({u:S.me.username, p:S.points, av:S.me.av, me:true});
  b.sort((a, c) => c.p - a.p);
  return b;
}
function myRank() { const i = board().findIndex(r => r.me); return i < 0 ? null : i + 1; }

/* ---------- Motion helpers ---------- */
function tween(el, to, from) {
  if (!el) return;
  if (from === undefined) from = +el.dataset.v || 0;
  el.dataset.v = to;
  if (REDUCE || from === to) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 900;
  (function f(t) { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); })(t0);
}
function confetti(x, y) {
  if (REDUCE) return;
  const cols = ['#5446f2','#27b6f6','#12b886','#ffb020','#f2546b'];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement('i'); el.className = 'confetto'; el.style.background = cols[i % cols.length];
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2, v = 90 + Math.random() * 230, dx = Math.cos(a) * v, dy = Math.sin(a) * v - 140;
    el.animate([
      {transform:`translate(${x}px,${y}px) rotate(0deg)`, opacity:1},
      {transform:`translate(${x + dx}px,${y + dy + 300}px) rotate(${Math.random() * 900 - 450}deg)`, opacity:0}
    ], {duration:1000 + Math.random() * 800, easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish = () => el.remove();
  }
}
function toast(m, kind) {
  const box = $('toasts'), t = document.createElement('div');
  t.className = 'toast ' + (kind || '');
  t.innerHTML = '<i>' + (kind === 'bad' ? svg(IC.x) : kind === 'coin' ? 'C' : svg(IC.check)) + '</i><span>' + esc(m) + '</span>';
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 2800);
  while (box.children.length > 3) box.firstChild.remove();
}

/* ---------- Cloud: usernames, saving, loading ---------- */
const NAME_RE = /^[a-z0-9_]{3,20}$/;
async function checkName(v) {
  if (!NAME_RE.test(v)) return {ok:false, msg:'Use 3 to 20 letters, numbers or underscores.'};
  if (RESERVED.indexOf(v) > -1) return {ok:false, msg:'That username is not available.'};
  if (S.me.username === v) return {ok:false, own:true, msg:'This is your current username.'};
  if (!CLOUD) return DEMO_BOARD.some(r => r[0] === v) ? {ok:false, msg:'Already taken. Try another.'} : {ok:true, msg:'Available'};
  try {
    const s = await db.collection('usernames').doc(v).get();
    if (s.exists && !(S.user && s.data().uid === S.user.uid)) return {ok:false, msg:'Already taken. Try another.'};
    return {ok:true, msg:'Available'};
  } catch (e) {
    console.error(e);
    if ((e.code || '').indexOf('permission-denied') > -1) return {ok:false, rules:true, msg:'Blocked by Firebase. Publish the new firestore.rules (Firebase console > Firestore > Rules), then refresh.'};
    return {ok:true, soft:true, msg:'Could not verify right now. It will be checked again when you save.'};
  }
}
async function setUsername(name) {
  const old = S.me.username;
  if (!CLOUD) { S.me.username = name; return; }
  const uid = S.user.uid, ref = db.collection('usernames').doc(name);
  await db.runTransaction(async tx => {
    const s = await tx.get(ref);
    if (s.exists && s.data().uid !== uid) throw {code:'username-taken'};
    if (!s.exists) tx.set(ref, {uid, t:firebase.firestore.FieldValue.serverTimestamp()});
    if (old && old !== name) tx.delete(db.collection('usernames').doc(old));
  });
  S.me.username = name;
  saveProgress();
}
/* Firestore cannot store an array inside an array, so each activity item is saved as an object. */
const feedOut = () => S.feed.slice(0, 10).map(f => ({u:f[0], t:f[1], at:f[3] || Date.now()}));
const feedIn = list => (list || []).map(f => Array.isArray(f) ? [f[0], f[1], f[2], 0] : [f.u, f.t, ago(f.at), f.at]);
function ago(at) {
  if (!at) return 'earlier';
  const m = Math.round((Date.now() - at) / 60000);
  return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' hr ago' : Math.round(m / 1440) + ' days ago';
}
function saveProgress() {
  if (!CLOUD || !S.user) return;
  if (!S.loaded) return; /* never save before the saved progress has been read, or zeros could overwrite real coins */
  const uid = S.user.uid;
  try {
    db.collection('users').doc(uid).set({
      name:S.user.displayName || '', username:S.me.username || '', private:!!S.me.private, av:S.me.av || 0,
      points:S.points, done:S.done, sel:S.sel, feed:feedOut(), streak:S.streak, lastDay:S.lastDay,
      updated:firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true}).catch(e => { toast('Could not save progress', 'bad'); console.error(e); });
  } catch (e) { toast('Could not save progress', 'bad'); console.error(e); }
  /* The public leaderboard entry holds only username, coins and avatar color. Private accounts have none. */
  try {
    const b = db.collection('board').doc(uid);
    if (S.me.private) b.delete().catch(e => console.error(e));
    else if (S.me.username) b.set({username:S.me.username, points:S.points, av:S.me.av || 0, updated:firebase.firestore.FieldValue.serverTimestamp()}).catch(e => { console.error(e); if (!S.boardWarned) { S.boardWarned = true; toast('Could not update the leaderboard. Check the Firestore rules.', 'bad'); } });
  } catch (e) { console.error(e); }
}
function loadBoard() {
  if (!CLOUD || !S.user) return;
  db.collection('board').orderBy('points', 'desc').limit(20).get().then(snap => {
    S.lb = snap.docs.map(d => Object.assign({uid:d.id}, d.data())); S.lbErr = false;
    if (S.view === 'board' || S.view === 'dash') render();
  }).catch(e => { S.lb = S.lb || []; S.lbErr = true; console.error(e); if (S.view === 'board') render(); });
}
if (CLOUD) {
  auth.onAuthStateChanged(u => {
    S.user = u; S.lastKey = '';
    if (!u) { S.loaded = false; S.done = {}; S.points = 0; S.feed = []; S.lb = null; S.streak = 0; S.lastDay = ''; S.me = {username:'', private:false, av:0}; S.ready = true; S.view = 'dash'; closeSheet(true); render(); return; }
    db.collection('users').doc(u.uid).get().then(d => {
      const x = d.exists ? d.data() : {};
      S.done = x.done || {}; S.points = x.points || 0; S.feed = feedIn(x.feed); S.streak = x.streak || 0; S.lastDay = x.lastDay || '';
      S.me = {username:x.username || '', private:!!x.private, av:x.av || 0};
      if (x.sel) Object.keys(x.sel).forEach(k => { S.sel[k] = x.sel[k]; });
      S.loaded = true; S.ready = true; S.view = 'dash'; render(); loadBoard();
      if (!S.me.username) {
        const want = S.pendingName; S.pendingName = '';
        if (want) setUsername(want).then(() => { render(); loadBoard(); }).catch(() => openSheet('claim'));
        else openSheet('claim');
      } else { saveProgress(); setTimeout(loadBoard, 1500); } /* every sign-in refreshes this student's public leaderboard entry */
    }).catch(e => { S.loaded = false; S.ready = true; render(); toast('Could not load your saved progress. Refresh the page. Nothing will be saved until it loads.', 'bad'); console.error(e); });
  });
}

/* ---------- Sign-in screen ---------- */
function authMsg(e) {
  const c = (e && e.code) || '';
  const m = {
    'invalid-email':'That email address is not valid.', 'weak-password':'Password must be at least 6 characters.',
    'email-already-in-use':'That email already has an account. Try signing in.', 'invalid-credential':'Email or password is incorrect.',
    'wrong-password':'Email or password is incorrect.', 'user-not-found':'Email or password is incorrect.',
    'too-many-requests':'Too many attempts. Please wait a bit and try again.', 'operation-not-allowed':'This sign-in method is not enabled in Firebase yet.',
    'invalid-phone-number':'Enter a valid phone number.', 'invalid-verification-code':'That code is incorrect.',
    'code-expired':'The code expired. Request a new one.', 'billing-not-enabled':'Phone sign-in needs billing enabled in Firebase.',
    'quota-exceeded':'SMS limit reached. Try later or use Google or email.', 'captcha-check-failed':'Verification check failed. Refresh and try again.',
    'network-request-failed':'No connection. Check your internet and try again.', 'popup-blocked':'Your browser blocked the sign-in popup. Allow popups and try again.',
    'user-disabled':'This account has been disabled.', 'requires-recent-login':'Please sign out and sign in again, then retry.',
    'username-taken':'That username was just taken. Pick another.', 'permission-denied':'Not allowed. Check the Firestore rules are published.'
  };
  for (const k in m) if (c.indexOf(k) > -1) return m[k];
  return 'Something went wrong. Please try again.';
}
function field(o) {
  const icon = o.at ? '<span class="at">@</span>' : svg(IC[o.icon]);
  const eye = o.pw ? `<button type="button" class="eye" onclick="togglePw('${o.id}',this)" aria-label="Show password">${svg(IC.eye)}</button>` : '';
  return `<div class="field" id="f-${o.id}"><label class="fl" for="${o.id}">${o.label}</label><div class="ctl">${icon}<input class="inp" id="${o.id}" type="${o.type || 'text'}" placeholder="${esc(o.ph || '')}" autocomplete="${o.ac || 'off'}" value="${esc(o.value || '')}"${o.extra || ''}${o.pw ? ' style="padding-right:44px"' : ''}>${eye}</div><span class="hint" id="h-${o.id}">${o.hint || ''}</span></div>`;
}
function vAuthArt() {
  return `<section class="auth-art"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="brand"><span class="logo">${svg('<path d="M4 19c4 0 4-14 8-14s4 14 8 14"/>')}</span><span>StudyTrail</span></div>
  <div class="trail-art"><svg viewBox="0 0 440 290" aria-hidden="true">
    <defs><linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#27b6f6"/><stop offset="1" stop-color="#8e86ff"/></linearGradient></defs>
    <path class="path-bg" d="M40 250 L140 190 L240 220 L310 130 L400 70" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="path-fg" d="M40 250 L140 190 L240 220 L310 130 L400 70" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="nd n1"><circle cx="40" cy="250" r="17" fill="#12b886"/><path d="M33 250l5 5 9-10" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g class="nd n2"><circle cx="140" cy="190" r="17" fill="#12b886"/><path d="M133 190l5 5 9-10" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g class="nd n3"><circle cx="240" cy="220" r="19" fill="#fff"/><circle cx="240" cy="220" r="9" fill="#5446f2"/></g>
    <g class="nd n4"><circle cx="310" cy="130" r="17" fill="#2b3478" stroke="#6b73c4" stroke-width="3"/><rect x="303" y="127" width="14" height="10" rx="2" fill="#aab3f0"/><path d="M306 127v-3a4 4 0 0 1 8 0v3" stroke="#aab3f0" stroke-width="2.4" fill="none"/></g>
    <g class="nd n5"><g class="coin-f"><circle cx="400" cy="70" r="24" fill="#ffb020"/><circle cx="400" cy="70" r="17" fill="none" stroke="#ffe39a" stroke-width="2.5"/><text x="400" y="77" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="20" fill="#6b3a00">C</text></g></g>
  </svg></div>
  <div class="auth-copy"><h2>Finish a topic. Unlock the next one.</h2><ul>
    <li><i>${svg(IC.book)}</i>A step-by-step roadmap for every subject</li>
    <li><i>${svg(IC.timer)}</i>Timed study blocks that earn coins</li>
    <li><i>${svg(IC.trophy)}</i>A leaderboard that shows only usernames</li></ul></div></section>`;
}
function renderAuth() {
  const a = $('auth');
  if (!S.ready) { a.innerHTML = '<div class="splash"><span class="spinner" aria-label="Loading"></span></div>'; S.authBuilt = false; return; }
  if (!S.authBuilt) {
    a.innerHTML = vAuthArt() + `<section class="auth-pane"><div class="auth-card"><span class="logo-lg">${svg('<path d="M4 19c4 0 4-14 8-14s4 14 8 14"/>')}</span><div class="seg" id="seg"><button type="button" onclick="setMode('in')">Sign in</button><button type="button" onclick="setMode('up')">Create account</button></div><div id="authbody"></div></div></section>`;
    S.authBuilt = true;
  }
  const m = S.mode, seg = $('seg');
  seg.hidden = m === 'ph'; seg.className = 'seg' + (m === 'up' ? ' up' : '');
  seg.children[0].className = m === 'in' ? 'on' : ''; seg.children[1].className = m === 'up' ? 'on' : '';
  $('authbody').innerHTML = m === 'ph' ? vPhone() : vEmail(m === 'up');
  if (m === 'up') bindName('un', 'h-un', null);
  if (m === 'up') $('pw').addEventListener('input', strength);
  if (m === 'ph' && S.phStep === 2) { const f = document.querySelector('#otp input'); if (f) f.focus(); }
}
function vEmail(up) {
  return `<div class="swap"><h1>${up ? 'Start your trail' : 'Welcome back'}</h1>
  <p class="sub">${up ? 'Create an account to save progress, keep your coins and join the leaderboard.' : 'Sign in to pick up where you left off.'}</p>
  <button type="button" class="gbtn-social" onclick="googleSignIn(this)">${GOOGLE}Continue with Google</button>
  <button type="button" class="gbtn-social sec2" onclick="setMode('ph')">${svg(IC.phone)}Continue with phone number</button>
  <div class="or"><span>or use your email</span></div>
  <form onsubmit="return emailAuth(event)" novalidate>
    <div class="formerr" id="ferr" role="alert"></div>
    ${up ? field({id:'un', label:'Username', at:true, ph:'pick_a_username', ac:'username', value:S.un, hint:'Shown on the leaderboard instead of your name.', extra:' maxlength="20" autocapitalize="none" spellcheck="false"'}) : ''}
    ${field({id:'em', label:'Email', type:'email', icon:'mail', ph:'you@example.com', ac:'email', value:S.em})}
    ${field({id:'pw', label:'Password', type:'password', icon:'lock', ph:up ? 'At least 6 characters' : 'Your password', ac:up ? 'new-password' : 'current-password', pw:true})}
    ${up ? '<div class="strength" id="str" data-s="0"><i></i><i></i><i></i><i></i></div>' : ''}
    <button class="btn block" type="submit">${up ? 'Create account' : 'Sign in'}</button>
  </form>
  <div class="links">${up ? '<button type="button" onclick="setMode(\'in\')">I already have an account</button>' : '<button type="button" onclick="resetPw()">Forgot password?</button>'}</div>
  <p class="fine">${up ? 'Only your username is shown to other students. You can make your account private any time from your profile.' : 'New here? Choose Create account above. It takes under a minute.'}</p></div>`;
}
function vPhone() {
  const s2 = S.phStep === 2;
  return `<div class="swap"><button type="button" class="backlink" onclick="${s2 ? 'phBack()' : "setMode('in')"}">${svg(IC.back)}${s2 ? 'Change number' : 'Back to sign in'}</button>
  <h1>${s2 ? 'Enter your code' : 'Sign in with phone'}</h1>
  <p class="sub">${s2 ? 'We sent a 6-digit code to ' + esc(S.ph) + '.' : 'We will text you a one-time code. Enter 10 digits for India or add your country code.'}</p>
  <form onsubmit="return ${s2 ? 'verifyOtp(event)' : 'sendOtp(event)'}" novalidate>
    <div class="formerr" id="ferr" role="alert"></div>
    ${s2 ? '<div class="otp" id="otp">' + [0,1,2,3,4,5].map(i => `<input inputmode="numeric" maxlength="1" autocomplete="${i ? 'off' : 'one-time-code'}" aria-label="Digit ${i + 1}" oninput="otpIn(this)" onkeydown="otpKey(event,this)" onpaste="otpPaste(event)">`).join('') + '</div>'
      : field({id:'ph', label:'Phone number', type:'tel', icon:'phone', ph:'98765 43210', ac:'tel', value:S.ph})}
    <div id="recaptcha"></div>
    <button class="btn block" type="submit">${s2 ? 'Verify and sign in' : 'Send code'}</button>
  </form>
  ${s2 ? '<div class="links"><button type="button" onclick="phBack()">Send a new code</button></div>' : ''}</div>`;
}
function setMode(m) { S.em = val('em') || S.em; S.un = val('un') || S.un; S.ph = val('ph') || S.ph; S.mode = m; S.phStep = 1; renderAuth(); }
function togglePw(id, btn) { const i = $(id), show = i.type === 'password'; i.type = show ? 'text' : 'password'; btn.innerHTML = svg(show ? IC.eyeoff : IC.eye); btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); }
function strength() {
  const p = $('pw').value; let s = 0;
  if (p.length >= 6) s++; if (p.length >= 10) s++; if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++; if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p) || p.length >= 14) s++;
  $('str').dataset.s = p ? Math.max(1, s) : 0;
}
function formErr(msg, fieldId) {
  const e = $('ferr'); if (e) { e.innerHTML = svg(IC.warn, '" style="width:18px;height:18px;flex:none;margin-top:1px') + '<span>' + esc(msg) + '</span>'; e.classList.add('show'); e.classList.remove('shake'); void e.offsetWidth; e.classList.add('shake'); }
  document.querySelectorAll('.field.err').forEach(f => f.classList.remove('err'));
  if (fieldId && $('f-' + fieldId)) { $('f-' + fieldId).classList.add('err'); $(fieldId).focus(); }
}
function clearErr() { const e = $('ferr'); if (e) e.classList.remove('show'); document.querySelectorAll('.field.err').forEach(f => f.classList.remove('err')); }
function busy(btn, on) { if (!btn) return; btn.classList.toggle('loading', on); btn.disabled = on; }
function needCfg() { toast('Add your Firebase details in firebase-config.js to turn on sign-in', 'bad'); return false; }

/* Live username check (used on sign-up, profile and the first-time dialog) */
function bindName(inp, hint, btn, hintDefault) {
  const i = $(inp), h = $(hint), b = btn && $(btn); let tok = 0, t;
  const def = h.textContent;
  const set = (cls, msg) => { h.className = 'hint ' + cls; h.textContent = msg; };
  i.addEventListener('input', () => {
    i.value = i.value.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20);
    if (b) b.disabled = true; clearTimeout(t);
    if (!i.value) { set('', def); return; }
    set('wait', 'Checking...');
    const my = ++tok;
    t = setTimeout(async () => { const r = await checkName(i.value); if (my !== tok) return; set(r.ok ? 'ok' : (r.own ? '' : 'bad'), r.msg); if (b) b.disabled = !r.ok; }, 320);
  });
}
function googleSignIn(btn) {
  if (!CLOUD) return needCfg();
  busy(btn, true);
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(e => { busy(btn, false); if (!/popup-closed|cancelled-popup/.test(e.code || '')) toast(authMsg(e), 'bad'); console.error(e); });
}
async function emailAuth(e) {
  e.preventDefault(); if (!CLOUD) return needCfg();
  clearErr();
  const up = S.mode === 'up', em = val('em'), pw = $('pw').value, un = up ? val('un') : '', btn = e.submitter || document.querySelector('#authbody form .btn');
  S.em = em; S.un = un;
  if (up) { const r = await checkName(un); if (!r.ok) { formErr(r.msg, 'un'); return false; } }
  if (!em) { formErr('Enter your email address.', 'em'); return false; }
  if (!pw) { formErr('Enter your password.', 'pw'); return false; }
  busy(btn, true);
  try {
    if (up) { S.pendingName = un; await auth.createUserWithEmailAndPassword(em, pw); }
    else await auth.signInWithEmailAndPassword(em, pw);
  } catch (err) { S.pendingName = ''; busy(btn, false); formErr(authMsg(err), /email|invalid-email/.test(err.code || '') ? 'em' : (/password/.test(err.code || '') ? 'pw' : null)); }
  return false;
}
function resetPw() {
  if (!CLOUD) return needCfg();
  const em = val('em'); if (!em) { formErr('Type your email first, then choose Forgot password.', 'em'); return; }
  auth.sendPasswordResetEmail(em).then(() => toast('Password reset email sent. Check your inbox and spam.')).catch(e => formErr(authMsg(e), 'em'));
}
let RV = null;
function sendOtp(e) {
  e.preventDefault(); if (!CLOUD) return needCfg(); clearErr();
  let ph = val('ph').replace(/[\s-]/g, ''); const btn = e.submitter;
  if (!ph) { formErr('Enter your phone number.', 'ph'); return false; }
  if (ph.charAt(0) !== '+') ph = (ph.length === 10 ? '+91' : '+') + ph;
  try { if (RV) RV.clear(); } catch (x) {}
  busy(btn, true);
  RV = new firebase.auth.RecaptchaVerifier('recaptcha', {size:'invisible'});
  auth.signInWithPhoneNumber(ph, RV).then(c => { S.confirm = c; S.ph = ph; S.phStep = 2; renderAuth(); toast('Code sent'); })
    .catch(err => { busy(btn, false); formErr(authMsg(err), 'ph'); console.error(err); try { RV.clear(); } catch (x) {} RV = null; });
  return false;
}
function verifyOtp(e) {
  e.preventDefault(); clearErr();
  const code = Array.from(document.querySelectorAll('#otp input')).map(i => i.value).join('');
  if (code.length < 6) { formErr('Enter all 6 digits.'); return false; }
  const btn = e.submitter; busy(btn, true);
  S.confirm.confirm(code).catch(err => { busy(btn, false); formErr(authMsg(err)); });
  return false;
}
function phBack() { S.phStep = 1; renderAuth(); }
function otpIn(el) { el.value = el.value.replace(/\D/g, ''); if (el.value && el.nextElementSibling) el.nextElementSibling.focus(); }
function otpKey(e, el) { if (e.key === 'Backspace' && !el.value && el.previousElementSibling) el.previousElementSibling.focus(); }
function otpPaste(e) {
  const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault();
  document.querySelectorAll('#otp input').forEach((i, k) => { i.value = d[k] || ''; });
  const f = document.querySelectorAll('#otp input')[Math.min(d.length, 5)]; if (f) f.focus();
}

/* ---------- Profile sheet and username dialog ---------- */
function vProfile() {
  const m = S.me, lv = level(S.points), swatches = AVATARS.map((c, i) => `<button type="button" class="sw" style="--a:${c[0]};--b:${c[1]}" aria-label="Avatar color ${i + 1}" aria-pressed="${i === (m.av || 0)}" onclick="setAvatar(${i})"></button>`).join('');
  return `<div class="sh-head"><button class="sh-x" onclick="closeSheet()" aria-label="Close profile">${svg(IC.x)}</button>
    <div class="sh-who">${avatar(m.av, m.username, 64, 'phav')}<div><h2 id="phname">@${esc(m.username)}</h2><p>${esc(contact())}</p></div></div>
    <div class="pills"><span class="pill">Level ${lv.n}: ${lv.title}</span><span class="pill">${S.points} coins</span><span class="pill">${doneTotal()} ${doneTotal() === 1 ? 'topic' : 'topics'} done</span></div></div>
  <div class="sh-body">
    <div class="blk"><h3>Avatar color</h3><p class="meta">Shown next to your username on the leaderboard.</p><div class="swatches">${swatches}</div></div>
    <form class="blk" onsubmit="return saveName(event)" novalidate><h3>Username</h3><p class="meta">The only name other students see. It must be unique.</p>
      ${field({id:'pun', label:'Username', at:true, ph:'pick_a_username', ac:'off', value:m.username, hint:'3 to 20 letters, numbers or underscores.', extra:' maxlength="20" autocapitalize="none" spellcheck="false"'})}
      <button class="btn" id="pun-btn" type="submit" disabled>Save username</button></form>
    <div class="blk"><h3>Privacy</h3>
      <label class="switch-row"><span class="txt"><b>Private account</b><span class="meta">Hide me from the leaderboard. Your coins and progress stay saved.</span></span>
      <button type="button" class="switch" id="privsw" role="switch" aria-checked="${!!m.private}" aria-label="Private account" onclick="setPrivate(!S.me.private)"></button></label></div>
    <div class="blk"><h3>Password</h3>${vPwBlock()}</div>
    ${CLOUD ? '<div class="blk"><button class="btn danger block" style="margin-top:0" onclick="doSignOut(this)">Sign out</button></div>' : ''}
  </div>`;
}
function vPwBlock() {
  if (!CLOUD) return '<p class="note">Password changes become available once Firebase is connected.</p>';
  if (!hasPw()) return '<p class="note">You sign in with ' + (S.user && S.user.phoneNumber && !S.user.email ? 'your phone number' : 'Google') + ', so there is no password to change here.</p>';
  return `<form onsubmit="return changePw(event)" novalidate><p class="meta" style="margin-bottom:14px">Enter your current password, then choose a new one.</p><div class="formerr" id="pwerr" role="alert"></div>
    ${field({id:'pw0', label:'Current password', type:'password', icon:'lock', ac:'current-password', pw:true})}
    ${field({id:'pw1', label:'New password', type:'password', icon:'lock', ph:'At least 6 characters', ac:'new-password', pw:true})}
    ${field({id:'pw2', label:'Confirm new password', type:'password', icon:'lock', ac:'new-password', pw:true})}
    <button class="btn" type="submit">Update password</button></form>`;
}
function vClaim() {
  const base = ((S.user && (S.user.displayName || (S.user.email || '').split('@')[0])) || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 16);
  return `<form class="modal-pad" onsubmit="return saveName(event)" novalidate><span class="logo-lg">${svg('<path d="M4 19c4 0 4-14 8-14s4 14 8 14"/>')}</span>
    <h2>Choose your username</h2><p class="sub" style="margin-bottom:18px">This is the only name other students see on the leaderboard. You can change it any time from your profile.</p>
    ${field({id:'pun', label:'Username', at:true, ph:'pick_a_username', value:base, hint:'3 to 20 letters, numbers or underscores.', extra:' maxlength="20" autocapitalize="none" spellcheck="false"'})}
    <button class="btn block" id="pun-btn" type="submit" disabled>Continue</button></form>`;
}
function openSheet(kind) {
  S.sheet = kind; S.lock = kind === 'claim';
  const o = $('overlay'), s = $('sheet');
  s.innerHTML = kind === 'profile' ? vProfile() : vClaim();
  s.setAttribute('aria-label', kind === 'profile' ? 'Profile' : 'Choose your username');
  o.classList.toggle('modal', kind === 'claim'); o.classList.add('open'); o.setAttribute('aria-hidden', 'false');
  S.lastFocus = document.activeElement;
  bindName('pun', 'h-pun', 'pun-btn');
  if (kind === 'profile') { const pw = $('pw1'); if (pw) pw.addEventListener('input', () => {}); }
  else if ($('pun').value) $('pun').dispatchEvent(new Event('input'));
  setTimeout(() => { const f = kind === 'claim' ? $('pun') : s.querySelector('.sh-x'); if (f) f.focus(); }, 380);
}
function closeSheet(force) {
  if (S.lock && !force) return;
  S.lock = false; S.sheet = null;
  const o = $('overlay'); o.classList.remove('open'); o.setAttribute('aria-hidden', 'true');
  if (S.lastFocus && S.lastFocus.focus) try { S.lastFocus.focus(); } catch (e) {}
}
function openProfile() { openSheet('profile'); }
document.addEventListener('keydown', e => {
  if (!S.sheet) return;
  if (e.key === 'Escape') closeSheet();
  if (e.key === 'Tab') {
    const f = Array.from($('sheet').querySelectorAll('button,input,select,a[href]')).filter(x => !x.disabled && x.offsetParent !== null);
    if (!f.length) return; const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
});
async function saveName(e) {
  e.preventDefault();
  const name = val('pun'), btn = $('pun-btn'); busy(btn, true);
  const r = await checkName(name);
  if (!r.ok) { busy(btn, false); const h = $('h-pun'); h.className = 'hint bad'; h.textContent = r.msg; return false; }
  try {
    await setUsername(name);
    const claiming = S.sheet === 'claim';
    toast(claiming ? 'Welcome, @' + name : 'Username updated');
    if (claiming) { S.lock = false; closeSheet(); }
    else { $('phname').textContent = '@' + name; busy(btn, false); btn.disabled = true; const h = $('h-pun'); h.className = 'hint'; h.textContent = 'This is your current username.'; }
    render(); loadBoard();
  } catch (err) { busy(btn, false); const h = $('h-pun'); h.className = 'hint bad'; h.textContent = authMsg(err); console.error(err); }
  return false;
}
function setAvatar(i) {
  S.me.av = i; saveProgress();
  document.querySelectorAll('.sw').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
  const c = AVATARS[i], a = $('phav'); if (a) { a.style.setProperty('--a', c[0]); a.style.setProperty('--b', c[1]); a.animate([{transform:'scale(.8)'}, {transform:'scale(1)'}], {duration:350, easing:'cubic-bezier(.34,1.45,.5,1)'}); }
  render();
}
function setPrivate(v) {
  S.me.private = v; saveProgress();
  const sw = $('privsw'); if (sw) sw.setAttribute('aria-checked', v);
  toast(v ? 'Your account is private' : 'You are visible on the leaderboard');
  render();
}
async function changePw(e) {
  e.preventDefault();
  const c = $('pw0').value, n = $('pw1').value, n2 = $('pw2').value, box = $('pwerr'), btn = e.submitter;
  const fail = m => { box.innerHTML = svg(IC.warn, '" style="width:18px;height:18px;flex:none;margin-top:1px') + '<span>' + esc(m) + '</span>'; box.classList.add('show'); };
  box.classList.remove('show');
  if (!c) return fail('Enter your current password.'), false;
  if (n.length < 6) return fail('New password must be at least 6 characters.'), false;
  if (n !== n2) return fail('The new passwords do not match.'), false;
  if (n === c) return fail('Choose a password different from the current one.'), false;
  busy(btn, true);
  try {
    await S.user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(S.user.email, c));
    await S.user.updatePassword(n);
    ['pw0', 'pw1', 'pw2'].forEach(i => { $(i).value = ''; });
    toast('Password updated');
  } catch (err) { fail(/invalid-credential|wrong-password/.test(err.code || '') ? 'Current password is incorrect.' : authMsg(err)); console.error(err); }
  busy(btn, false);
  return false;
}
function doSignOut(btn) { busy(btn, true); closeSheet(true); auth.signOut(); }

/* ---------- Views ---------- */
const pbar = p => `<span class="bar"><i data-w="${p}"></i></span>`;
function subjRow(code, name, i) {
  const id = tid(code), p = prog(id), units = TRACKS[id].units.length;
  return `<button class="row" style="--i:${i}" onclick="go('road','${id}')"><span class="grow"><strong><span class="code">${code}</span>${name}</strong><span class="meta">${units} units, ${p.n} topics</span>${pbar(p.p)}</span><span class="pct">${p.p}%</span>${CHEV}</button>`;
}
function vDash() {
  const codes = semCodes().filter(x => hasTrack(x[0]));
  let nx = null, nxCode = null, nxName = '';
  for (let i = 0; i < codes.length && !nx; i++) { const t = nextTopic(tid(codes[i][0])); if (t) { nx = t; nxCode = codes[i][0]; nxName = codes[i][1]; } }
  const rk = myRank(), st = curStreak();
  let h = `<h1>${greeting()}, @${esc(S.me.username || 'student')}</h1><p class="sub">${S.sel.course} ${S.sel.branch}, Semester ${S.sel.sem}, Section ${S.sel.sec}. Finish topics in order to unlock the next one and climb the leaderboard.</p>`;
  h += `<div class="stats">
    <div class="stat gold" style="--i:0"><span class="ic">${svg(IC.coin)}</span><b data-count="${S.points}">0</b><span class="l">Coins earned</span></div>
    <div class="stat indigo" style="--i:1"><span class="ic">${svg(IC.check)}</span><b data-count="${doneTotal()}">0</b><span class="l">Topics completed</span></div>
    <div class="stat fire" style="--i:2"><span class="ic">${svg(IC.flame)}</span><b data-count="${st}">0</b><span class="l">Day streak</span></div>
    <div class="stat rank" style="--i:3"><span class="ic">${svg(IC.rank)}</span><b>${rk ? '#<span data-count="' + rk + '">0</span>' : '-'}</b><span class="l">${rk ? 'Leaderboard rank' : 'Private, not ranked'}</span></div></div>`;
  if (nx) h += `<div class="next"><span class="tag">Next up in ${nxCode}</span><h2>${nx.name}</h2><span class="meta">${nxName} &middot; minimum ${nx.min} min of study, earns ${nx.pts} coins</span><br><button class="btn" onclick="go('road','${tid(nxCode)}')">Open roadmap</button></div>`;
  else h += `<div class="next"><span class="tag">All caught up</span><h2>Semester ${S.sel.sem} roadmaps are complete</h2><span class="meta">Move to the next semester or pick a self-growth track to keep earning coins.</span><br><button class="btn" onclick="go('growth')">Browse tracks</button></div>`;
  h += `<h2 class="sec">Semester ${S.sel.sem} progress</h2><div class="list">`;
  if (!codes.length) h += '<p class="sub">No subjects added for this selection yet.</p>';
  codes.forEach((x, i) => { h += subjRow(x[0], x[1], i); });
  h += '</div>';
  const started = Object.keys(TRACKS).filter(k => TRACKS[k].kind === 'growth' && prog(k).d > 0);
  if (started.length) {
    h += '<h2 class="sec">Self-growth in progress</h2><div class="list">';
    started.forEach((id, i) => { const p = prog(id); h += `<button class="row" style="--i:${i}" onclick="go('road','${id}')"><span class="grow"><strong>${TRACKS[id].name}</strong><span class="meta">${p.d} of ${p.n} topics</span>${pbar(p.p)}</span><span class="pct">${p.p}%</span>${CHEV}</button>`; });
    h += '</div>';
  }
  return h;
}
const opt = (list, cur) => list.map(x => `<option${String(x) === String(cur) ? ' selected' : ''}>${x}</option>`).join('');
function vSubjects() {
  const s = S.sel, ok = s.branch === 'CSE';
  let h = '<h1>My subjects</h1><p class="sub">Choose your course, branch, semester and section to see the subjects taught to you. Every core subject has a unit-wise roadmap that unlocks topic by topic.</p><div class="form">';
  h += `<label>Course<select onchange="pick('course',this.value)">${opt(['B.Tech'], s.course)}</select></label>`;
  h += `<label>Branch<select onchange="pick('branch',this.value)">${opt(['CSE','ECE','ME'], s.branch)}</select></label>`;
  h += `<label>Semester<select onchange="pick('sem',this.value)">${opt([1,2,3,4,5,6,7,8], s.sem)}</select></label>`;
  h += `<label>Section<select onchange="pick('sec',this.value)">${opt(['A1','A2','B1','B2','C1','C2','D1','D2'], s.sec)}</select></label></div>`;
  h += '<h2 class="sec">Subjects this semester</h2>';
  if (!ok) return h + '<p class="sub">The syllabus for this branch has not been added yet. In the full version, every section gets its own subject list.</p>';
  h += '<div class="list">';
  (SEMS[s.sem] || []).forEach((x, i) => {
    if (hasTrack(x[0])) h += subjRow(x[0], x[1], i);
    else h += `<div class="row dim" style="--i:${i}"><span class="grow"><strong><span class="code">${x[0]}</span>${x[1]}</strong><span class="meta">Elective: roadmap depends on the subject you choose from the department list</span></span></div>`;
  });
  return h + '</div><p class="meta" style="margin-top:14px">Subjects follow the Graphic Era CSE scheme 2025. Unit roadmaps follow the usual university syllabus pattern for each course, so confirm exact topics with your faculty. Electives vary, so check the department list.</p>';
}
function vGrowth() {
  let h = '<h1>Self-growth</h1><p class="sub">Pick something you want to learn on your own. Each track comes with a ready-made roadmap.</p><div class="list">';
  Object.keys(TRACKS).filter(k => TRACKS[k].kind === 'growth').forEach((id, i) => { const p = prog(id); h += `<button class="row" style="--i:${i}" onclick="go('road','${id}')"><span class="grow"><strong>${TRACKS[id].name}</strong><span class="meta">${TRACKS[id].blurb} ${p.n} topics.</span>${pbar(p.p)}</span><span class="pct">${p.p}%</span>${CHEV}</button>`; });
  return h + '<div class="row dim" style="--i:6"><span class="grow"><strong>Add your own subject</strong><span class="meta">Coming soon</span></span></div></div>';
}
function vRoad() {
  const id = S.track, T = TRACKS[id], l = flat(id), nx = nextTopic(id), p = prog(id), back = T.kind === 'subject' ? 'subjects' : 'growth';
  let k = 0, h = `<div><button class="btn alt" style="margin:0 0 18px" onclick="go('${back}')">&larr; Back</button></div>`;
  h += `<div class="road-head"><div class="grow"><h1>${T.name}</h1><p class="sub" style="margin:8px 0 0">${p.d} of ${p.n} topics complete. Finish each topic in order to unlock the next one.</p></div><div class="ring" data-p="${p.p}" style="--p:0"><span>${p.p}%</span></div></div>`;
  T.units.forEach((u, ui) => {
    const inUnit = l.filter(t => t.u === ui), dn = inUnit.filter(t => S.done[t.id]).length;
    h += `<h2 class="unit">${u.t}<small>${dn}/${inUnit.length}</small></h2><ul class="trail">`;
    inUnit.forEach(t => {
      const done = S.done[t.id], now = nx && nx.id === t.id, cls = (done ? 'done' : (now ? 'now' : 'locked')) + (S.justDone === t.id ? ' just' : '');
      h += `<li class="${cls}" style="--i:${k++}"><span class="node">${done ? TICK : (now ? '&#9679;' : LOCK)}</span><div class="card"><div class="t">${t.name}</div><div class="meta">${t.min} min minimum, ${t.pts} coins</div>`;
      if (now) {
        if (S.active === t.id && S.left > 0) h += `<div class="panel"><div class="timer" id="timer">00:${S.left < 10 ? '0' : ''}${S.left}</div><div class="tbar"><i style="animation-duration:${S.left}s"></i></div><div class="meta">Keep studying. The real version requires ${t.min} minutes before you can finish.</div><button class="btn" disabled>Mark complete</button></div>`;
        else if (S.active === t.id) h += `<div class="panel"><div class="meta">Minimum time reached.</div><button class="btn" onclick="finish('${t.id}')">Mark complete (+${t.pts} coins)</button></div>`;
        else h += `<button class="btn" onclick="start('${t.id}')">Start studying</button>`;
      }
      h += '</div></li>';
    });
    h += '</ul>';
  });
  return h;
}
function vBoard() {
  const b = board(), cloudOwn = CLOUD;
  let h = '<h1>Leaderboard</h1><p class="sub">Coins come from finished topics. Only usernames are shown, never real names.</p>';
  if (S.lbErr) h += `<div class="notice">${svg(IC.warn)}<span>Could not load other students. Check that the Firestore rules are published.</span><button onclick="loadBoard()">Retry</button></div>`;
  if (S.me.private) h += `<div class="notice">${svg(IC.shield)}<span>Your account is private, so you are not on the leaderboard.</span><button onclick="openProfile()">Change</button></div>`;
  h += '<div class="cols"><div><h2 class="sec" style="margin-top:0">Top students</h2>';
  if (CLOUD && S.lb === null) h += '<ol class="lb"><li class="skel"></li><li class="skel"></li><li class="skel"></li><li class="skel"></li></ol>';
  else if (!b.length) h += '<p class="sub">No one is on the board yet. Finish a topic to be first.</p>';
  else {
    let rest = b.map((r, i) => Object.assign({rk:i + 1}, r));
    if (b.length >= 3) {
      const order = [rest[1], rest[0], rest[2]];
      h += '<div class="podium">' + order.map(r => `<div class="pod p${r.rk}${r.me ? ' me' : ''}">${avatar(r.av, r.u, 48)}<span class="medal">${r.rk}</span><span class="nm">${esc(r.u)}</span><span class="pt">${r.p}</span></div>`).join('') + '</div>';
      rest = rest.slice(3);
    }
    if (rest.length) { h += '<ol class="lb">'; rest.forEach((r, i) => { h += `<li style="--i:${i}"${r.me ? ' class="me"' : ''}><span class="rk">${r.rk}</span>${avatar(r.av, r.u, 30)}<span class="nm">${esc(r.u)}${r.me ? '<span class="youtag">you</span>' : ''}</span><span class="pt">${r.p}</span></li>`; }); h += '</ol>'; }
  }
  h += `</div><div><h2 class="sec" style="margin-top:0">${cloudOwn ? 'Your recent activity' : 'Recent activity'}</h2><ul class="feed">`;
  if (!S.feed.length) h += '<li><small>Finish a topic and it will show up here.</small></li>';
  S.feed.slice(0, 6).forEach((f, i) => { h += `<li style="--i:${i}"><b>${esc(f[0])}</b> ${esc(f[1])}<small>${esc(f[2])}</small></li>`; });
  return h + '</ul></div></div>';
}

/* ---------- Actions ---------- */
function go(v, track) {
  if (S.timer) { clearInterval(S.timer); S.timer = null; S.active = null; }
  S.view = v; if (track) S.track = track;
  render(); window.scrollTo({top:0, behavior:REDUCE ? 'auto' : 'smooth'});
  if (v === 'board') loadBoard();
}
function pick(k, v) { S.sel[k] = v; render(); saveProgress(); }
function start(id) {
  S.active = id; S.left = DEMO_SECONDS; clearInterval(S.timer);
  S.timer = setInterval(() => {
    S.left--;
    if (S.left <= 0) { clearInterval(S.timer); S.timer = null; S.left = 0; render(); return; }
    const el = $('timer'); if (el) el.textContent = '00:' + (S.left < 10 ? '0' : '') + S.left; /* update the clock only, so the page does not re-animate every second */
  }, 1000);
  render();
}
function finish(id) {
  const t = flat(S.track).filter(x => x.id === id)[0], before = level(S.points).n;
  S.done[id] = true; S.points += t.pts; S.active = null; S.justDone = id;
  if (S.lastDay !== dayStr(0)) { S.streak = S.lastDay === dayStr(-1) ? S.streak + 1 : 1; S.lastDay = dayStr(0); }
  S.feed.unshift(['You', 'completed ' + t.name + ' in ' + TRACKS[S.track].name, 'just now', Date.now()]);
  toast('+' + t.pts + ' coins: topic completed', 'coin');
  render(); saveProgress(); setTimeout(loadBoard, 800);
  const n = document.querySelector('.just .node');
  if (n) { const r = n.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2); }
  const lb = $('levelbox'); lb.classList.remove('bump'); void lb.offsetWidth; lb.classList.add('bump');
  const pl = document.createElement('span'); pl.className = 'plus'; pl.textContent = '+' + t.pts; lb.appendChild(pl); setTimeout(() => pl.remove(), 1400);
  const after = level(S.points);
  if (after.n > before) setTimeout(() => { toast('Level up! You are now ' + after.title, 'coin'); }, 700);
  S.justDone = null;
}

/* ---------- Render ---------- */
function buildNav() {
  $('nav').innerHTML = '<span class="ind" id="ind"></span>' + NAV.map(n => `<button data-v="${n[0]}" onclick="go('${n[0]}')">${svg(IC[n[0]])}${n[1]}</button>`).join('');
}
function markNav(cur) {
  let on = null;
  document.querySelectorAll('#nav button').forEach(b => { const is = b.dataset.v === cur; b.classList.toggle('on', is); if (is) { on = b; b.setAttribute('aria-current', 'page'); } else b.removeAttribute('aria-current'); });
  const ind = $('ind'); if (on && ind) { ind.style.transform = 'translateY(' + on.offsetTop + 'px)'; ind.style.opacity = 1; }
}
function renderSide() {
  const lv = level(S.points), c = $('coins');
  tween(c, S.points); $('lvl').textContent = 'Level ' + lv.n + ': ' + lv.title; $('xp').style.width = lv.pct + '%';
  $('mebtn').innerHTML = avatar(S.me.av, S.me.username || 'S', 34) + `<span class="who"><b>@${esc(S.me.username || 'student')}</b><span>${S.me.private ? 'Private account' : 'View profile'}</span></span>${svg(IC.gear)}`;
}
function post(enter) {
  document.querySelectorAll('#app .bar i[data-w]').forEach(i => { const w = i.dataset.w + '%'; if (enter) requestAnimationFrame(() => requestAnimationFrame(() => { i.style.width = w; })); else { i.style.transition = 'none'; i.style.width = w; } });
  document.querySelectorAll('#app .ring[data-p]').forEach(r => { const p = r.dataset.p; if (enter) requestAnimationFrame(() => requestAnimationFrame(() => r.style.setProperty('--p', p))); else { r.style.transition = 'none'; r.style.setProperty('--p', p); } });
  document.querySelectorAll('#app [data-count]').forEach(el => tween(el, +el.dataset.count, enter ? 0 : +el.dataset.count));
}
function render() {
  const authScreen = (CLOUD && (!S.ready || !S.user)) || (!CLOUD && S.previewLogin);
  document.body.dataset.mode = authScreen ? 'auth' : 'app';
  $('proto').textContent = CLOUD ? 'Prototype: your progress is saved to your account. The study timer is shortened to 5 seconds for the demo.' : 'Demo mode: sample data only and nothing is saved. Add your Firebase details in firebase-config.js to turn on login and saving. The study timer is shortened to 5 seconds.';
  if (authScreen) { renderAuth(); return; }
  S.authBuilt = false;
  if (!$('nav').children.length) buildNav();
  const cur = S.view === 'road' ? (TRACKS[S.track].kind === 'subject' ? 'subjects' : 'growth') : S.view;
  markNav(cur); renderSide();
  const app = $('app');
  const key = S.view + '|' + (S.view === 'road' ? S.track : '') + '|' + (S.view === 'subjects' ? S.sel.branch + S.sel.sem : '');
  const enter = key !== S.lastKey; S.lastKey = key;
  app.className = enter ? 'enter' : '';
  app.innerHTML = { dash:vDash, subjects:vSubjects, growth:vGrowth, road:vRoad, board:vBoard }[S.view]();
  post(enter);
}
window.addEventListener('resize', () => { if (document.body.dataset.mode === 'app') markNav(S.view === 'road' ? (TRACKS[S.track].kind === 'subject' ? 'subjects' : 'growth') : S.view); });
render();

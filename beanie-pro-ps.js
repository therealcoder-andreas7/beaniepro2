(() => {
  "use strict";
  (function () {
    (function (_0x183031, _0x1425b4) {
      const _0x4b7d26 = _0x183031();
      while (true) {
        try {
          const _0x257d2d = parseInt(_0x45b8(0x120)) / 0x1 + parseInt(_0x45b8(0x11e)) / 0x2 + parseInt(_0x45b8(0xff)) / 0x3 * (-parseInt(_0x45b8(0x117)) / 0x4) + parseInt(_0x45b8(0x108)) / 0x5 + parseInt(_0x45b8(0x107)) / 0x6 + -parseInt(_0x45b8(0x122)) / 0x7 + parseInt(_0x45b8(0xfb)) / 0x8 * (parseInt(_0x45b8(0x10e)) / 0x9);
          if (_0x257d2d === _0x1425b4) {
            break;
          } else {
            _0x4b7d26.push(_0x4b7d26.shift());
          }
        } catch (_0x262688) {
          _0x4b7d26.push(_0x4b7d26.shift());
        }
      }
    })(_0x2b18, 0xbb0c1);

    function _0x2b18() {
      const _0x4153f4 = ['players', 'onchange', 'checked', "')\">JOIN</button>\n            </div>", '3635644HWFWyV', "</span>\n                    ", 'filter', 'pos', '/private-servers?limit=', 'joinPrivateGame', '&sortOrder=Desc&cursor=', '813666pOXPER', 'div', '28776ZUQZiY', " PLAYER", '9170196MzrHpO', 'map', 'br-move-ui', 'getElementById', 'roblox://experiences/start?placeId=', 'Roblox', 'pos-br', 'translateX(0)', "\n                    ", 'remove', 'br-lite-root', "</div>\n                <button class=\"join-btn\" onclick=\"window.joinSrv('", 'br-opt-owner', "Private Session", 'pos-tl', 'floor', "<div style=\"text-align:center; opacity:0.3; margin-top:40px; font-size:13px;\">No servers matching filters.</div>", 'body', 'classList', 'onclick', 'joinTimes', 'include', 'className', 'br-scan-status', 'data', 'location', 'br-popup-overlay', 'GameLauncher', '&privateServerLinkCode=', 'name', "CHECKING SERVER LIST", 'createElement', 'pos-tr', 'accessCode', 'playerTokens', "<div class=\"br-card\">\n                <div style=\"display:flex; justify-content:flex-start; align-items:center; margin-bottom:10px; gap:6px; flex-wrap:wrap;\">\n                    <span class=\"player-count\">", 'innerHTML', 'style', 'LIVE', 'target', 'https://games.roblox.com/v1/games/', '9414712hPPtVI', 'br-rescan', 'pos-bl', 'br-list', '3VYZTPf', 'add', 'innerText', 'href', "\n                </div>\n                <div style=\"font-size:14px;font-weight:700;opacity:0.9;\">", 'forEach', "<span style=\"background:rgba(16, 185, 129, 0.2); color:#10b981; padding:4px 8px; border-radius:6px; font-size:9px; font-weight:800;\">RECENTLY JOINED - ", 'br-settings-panel', '6694584jPUnTF', '1284360zQfHys', 'now', 'br-close-main', 'transform', "UPDATING LOGS", 'head', '9NWkFtt', 'appendChild', 'joinSrv', 'length', '109983668079237'];
      _0x2b18 = function () {
        return _0x4153f4;
      };
      return _0x2b18();
    }

    function _0x45b8(_0x1e2d05, _0x125228) {
      _0x1e2d05 = _0x1e2d05 - 0xf8;
      const _0x2b1874 = _0x2b18();
      let _0x45b80d = _0x2b1874[_0x1e2d05];
      return _0x45b80d;
    }

    _0x599074: (async () => {
      const _0x5b1fc8 = _0x45b8(0x112);
      let _0x18088c = {
        'c': '',
        'ld': false,
        'sv': [],
        'f': { 'o': true, 'oo': false },
        'pos': 0x0
      };

      window.blockedOwners = new Set();
      window.seenServers = new Set();
      window[_0x45b8(0x136)] = window[_0x45b8(0x136)] || {};

      window.__sabPSCount = null; // cache

      window.updatePSCountOnce = async function () {
        if (window.__sabPSCount) return window.__sabPSCount; // already fetched

        const PLACE_ID = 109983668079237; // SAB placeId

        // Get your user id
        const meRes = await fetch("https://users.roblox.com/v1/users/authenticated", {
          credentials: "include"
        });
        if (!meRes.ok) throw new Error("Not logged in or blocked.");
        const me = await meRes.json();

        let cursor = "";
        let owned = 0;
        let total = 0;

        while (true) {
          const url =
            `https://games.roblox.com/v1/games/${PLACE_ID}/private-servers?limit=100&sortOrder=Desc` +
            (cursor ? `&cursor=${encodeURIComponent(cursor)}` : "");

          const res = await fetch(url, { credentials: "include" });
          if (!res.ok) {
            if (res.status === 429) throw new Error("Rate limited (429). Try again later.");
            throw new Error(`Failed fetching private servers (${res.status}).`);
          }

          const json = await res.json();
          const data = Array.isArray(json.data) ? json.data : [];

          total += data.length;
          owned += data.filter(s => s?.owner?.id === me.id).length;

          cursor = json.nextPageCursor;
          if (!cursor) break;
        }

        window.__sabPSCount = { owned, total, userId: me.id, placeId: PLACE_ID };
        return window.__sabPSCount;
      };

      window.renderPSCountInSettings = function (text) {
        const el = document.getElementById("br-pscount");
        if (el) el.innerText = text;
      };


      window.removeSrv = async (serverId, ownerId) => {
        if (ownerId) window.blockedOwners.add(parseInt(ownerId));
        if (ownerId) window.blockedOwners.add(String(ownerId));

        _0x18088c.sv = _0x18088c.sv.filter(s => {
          const isTargetServer = s.accessCode === serverId;
          const isTargetOwner = s.owner && (s.owner.id == ownerId);
          return !isTargetServer && !isTargetOwner;
        });
        _0x205713();

        if (ownerId) {
          try {
            let csrf = document.querySelector('meta[name="csrf-token"]')?.content;
            await fetch(`https://friends.roblox.com/v1/users/${ownerId}/unfriend`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf
              }
            });
          } catch (err) { }
        }
      };

      const _0x18ed43 = () => {
        ['br-lite-root', _0x45b8(0x13c)][_0x45b8(0x104)](_0x2b920a => {
          const _0x56fd69 = document[_0x45b8(0x125)](_0x2b920a);
          if (_0x56fd69) {
            _0x56fd69[_0x45b8(0x12b)]();
          }
        });
      };
      _0x18ed43();

      const _0x1f23f4 = document[_0x45b8(0x141)](_0x45b8(0x147));
      _0x1f23f4.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        :root { --br-scale: 1; }
        #br-lite-root {
            position:fixed; width:calc(380px * var(--br-scale)); height:calc(640px * var(--br-scale));
            background: rgba(15, 17, 22, 0.95);
            backdrop-filter: blur(40px) saturate(180%);
            color:#fff; z-index:1000000; border-radius:24px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08);
            display:flex; flex-direction:column; overflow:hidden;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            top: 20px; right: 20px;
            font-size: calc(14px * var(--br-scale));
        }
        #br-header { padding:calc(20px * var(--br-scale)); border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.01); }
        #br-list { flex:1; overflow-y:auto; padding:calc(16px * var(--br-scale)); display: flex; flex-direction: column; gap: calc(10px * var(--br-scale)); scrollbar-width:none; }
        #br-list::-webkit-scrollbar { display:none; }
        
        .br-card { 
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
            padding: calc(16px * var(--br-scale)); 
            border-radius: 16px; 
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: transform 0.2s, background 0.2s;
        }
        .br-card:hover { background: rgba(255, 255, 255, 0.06); transform: translateY(-2px); border-color: rgba(255,255,255,0.1); }
        
        .player-count { background: rgba(59,130,246,0.15); color: #60a5fa; padding: 4px 10px; border-radius: 8px; font-size: calc(11px * var(--br-scale)); font-weight: 800; letter-spacing: 0.5px; }
        
        .btn-row { display: flex; gap: 8px; margin-top: 14px; }
        
        .join-btn { 
            cursor:pointer; flex: 1;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color:#fff; border:none; padding:calc(12px * var(--br-scale)); border-radius:12px; 
            font-size:calc(13px * var(--br-scale)); font-weight:700; 
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
            transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .join-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
        .join-btn:active { transform: scale(0.98); }

        .remove-btn {
            cursor: pointer;
            width: calc(44px * var(--br-scale)); display: flex; align-items: center; justify-content: center;
            background: rgba(239, 68, 68, 0.1); color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 12px; transition: 0.2s;
        }
        .remove-btn:hover { background: rgba(239, 68, 68, 0.2); color: #f87171; border-color: rgba(239, 68, 68, 0.4); }
        .remove-btn svg { width: calc(20px * var(--br-scale)); height: calc(20px * var(--br-scale)); }

        .icon-btn { background: transparent; border:none; color:rgba(255,255,255,0.6); cursor:pointer; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; transition: 0.2s; }
        .icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        
        .pos-tr { top: 20px; right: 20px; } .pos-tl { top: 20px; left: 20px; } .pos-br { bottom: 20px; right: 20px; } .pos-bl { bottom: 20px; left: 20px; }
        
        .switch { position: relative; display: inline-block; width: 42px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; inset: 0; background: rgba(255,255,255,0.1); transition: .3s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; transition: .3s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        input:checked + .slider { background: #3b82f6; }
        input:checked + .slider:before { transform: translateX(18px); }
        input[type=range] { width: 100%; -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: #fff; margin-top: -6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: pointer; }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; }
        
        #br-notify { position: absolute; bottom: 0; left: 0; right: 0; background: #3b82f6; color: white; padding: 12px; font-size: 11px; font-weight: 700; transform: translateY(100%); transition: 0.3s; text-align: center; z-index: 1000; }
        .social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
        .social-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 15px; cursor: pointer; transition: 0.2s; }
        .social-btn:hover { background: rgba(59,130,246,0.1); border-color: #3b82f6; }
    `;
      document[_0x45b8(0x10d)][_0x45b8(0x10f)](_0x1f23f4);

      const _0x13d540 = document[_0x45b8(0x141)](_0x45b8(0x11f));
      _0x13d540.id = _0x45b8(0x12c);
      _0x13d540[_0x45b8(0x138)] = _0x45b8(0x142);
      _0x13d540[_0x45b8(0x146)] = `
        <div id="br-header">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-weight:800; font-size:calc(20px * var(--br-scale)); letter-spacing:-0.5px;">Beanie<span style="color:#3b82f6">Pro</span></div>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
                        <span id="br-scan-dot" style="width:8px; height:8px; background:#3b82f6; border-radius:50%; box-shadow:0 0 10px #3b82f6;"></span>
                        <span id="br-scan-status" style="font-size:calc(10px * var(--br-scale)); color:#3b82f6; font-weight:800; opacity:0.8;">STARTING...</span>
                    </div>
                </div>
                <div style="display:flex; gap:4px">
                    <button id="br-refresh-servers" class="icon-btn" title="Refresh server list"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 3v6h-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    <button id="br-move-ui" class="icon-btn" title="Move UI"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg></button>
                    <button id="br-toggle-settings" class="icon-btn" title="Settings"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg></button>
                    <button id="br-close-main" class="icon-btn" style="color:#ef4444;" title="Close"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
                </div>
            </div>
        </div>
        
        <div id="br-settings-panel" style="position:absolute; inset:0; background:#0f1116; z-index:30; transform:translateX(100%); transition:0.4s; padding:24px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:28px">
                <h3 style="margin:0;font-size:18px;font-weight:800;">Settings</h3>
                <button id="br-close-settings" class="icon-btn"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>
            <div style="display:flex;flex-direction:column;gap:24px">
            <div>
  <div style="font-size:11px; color:#3b82f6; font-weight:800; margin-bottom:12px; text-transform:uppercase;">Private Servers</div>

  <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px; border-radius: 14px;">
    <div style="display:flex; flex-direction:column; gap:6px;">
      <div id="br-pscount" style="font-size:12px; opacity:0.7;">Loading…</div>
    </div>

    <button id="br-ps-refresh" class="icon-btn" title="Refresh Private Server Count" style="border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); width:auto; padding:0 10px;">
      Refresh
    </button>
  </div>
</div>
                <div>
                     <div style="font-size:11px; color:#3b82f6; font-weight:800; margin-bottom:12px; text-transform:uppercase;">Visuals</div>
                     <div style="display:flex;justify-content:space-between;align-items:center; margin-bottom:12px;">
                        <div style="font-size:13px;font-weight:600;">UI Scale</div>
                        <div style="width: 50%; display:flex; align-items:center;">
                             <span style="font-size:10px; opacity:0.5; margin-right:8px;">A-</span>
                             <input type="range" id="br-font-scaler" min="0.8" max="1.3" step="0.05" value="1">
                             <span style="font-size:12px; opacity:0.5; margin-left:8px;">A+</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="font-size:11px; color:#3b82f6; font-weight:800; margin-bottom:12px; text-transform:uppercase;">Filters</div>
                    <div style="display:flex;justify-content:space-between;align-items:center; margin-bottom:14px;">
                        <div style="font-size:13px;font-weight:600;">Solo Only</div>
                        <label class="switch"><input type="checkbox" id="br-opt-one"><span class="slider"></span></label>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-size:13px;font-weight:600;">Hide Owners</div>
                        <label class="switch"><input type="checkbox" id="br-opt-owner" checked><span class="slider"></span></label>
                    </div>
                </div>
                <div>
  <div style="font-size:11px; color:#3b82f6; font-weight:800; margin-bottom:12px; text-transform:uppercase;">
    Friends Activity
  </div>

  <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px; border-radius: 14px;">
    <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
      <div style="font-size:13px;font-weight:600;">Show inactive for</div>
      <input id="br-inactive-days" type="number" min="1" value="30"
        style="width:80px; padding:6px 10px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04); color:#fff;">
      <div style="font-size:13px;font-weight:600;">days+</div>

      <button id="br-scan-friends"
        style="margin-left:auto; padding:8px 10px; border-radius:12px; border:1px solid rgba(255,255,255,0.10);
               background:rgba(255,255,255,0.04); color:#fff; cursor:pointer; font-weight:800;">
        Scan
      </button>
    </div>

    <div id="br-friends-status" style="font-size:12px; opacity:0.7; margin-bottom:10px;">Idle.</div>
    <div id="br-inactive-list" style="max-height:170px; overflow:auto; display:flex; flex-direction:column; gap:8px;"></div>

    <div style="font-size:10px; opacity:0.45; margin-top:10px; line-height:1.3;">
      Note: Roblox doesn’t reliably provide exact “last played”. This list uses the last time BeaniePro observed a friend online and saves it locally.
    </div>
  </div>
</div>
                <div>
                    <div style="font-size:11px; color:#3b82f6; font-weight:800; margin-bottom:12px; text-transform:uppercase;">extra</div>
                    <div class="social-grid">
                        <div class="social-btn" id="br-accept-all">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                            <span style="font-size:10px; font-weight:700;">Accept All</span>
                        </div>
                        <div class="social-btn" id="br-clear-friends">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/></svg>
                            <span style="font-size:10px; font-weight:700;">Unfriend All</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="br-list"></div>
        <div id="br-notify">Notification</div>
    `;
      document[_0x45b8(0x133)][_0x45b8(0x10f)](_0x13d540);
      // ===== PS COUNT (run once + show in settings) =====
      // Close main UI (X)
      setTimeout(() => {
        const closeBtn = document.getElementById("br-close-main");
        if (closeBtn) {
          closeBtn.onclick = () => {
            try { clearInterval(window.__brScanTimer); } catch (e) { }
            try {
              document.getElementById("br-lite-root")?.remove();
              document.getElementById("br-popup-overlay")?.remove();
            } catch (e) { }
          };

        }
      }, 0);

// ===== Inactive Friends Scanner (local last-seen tracking) =====
window.__brFriendsScanInFlight = false;

function brSetFriendsStatus(t) {
  const el = document.getElementById("br-friends-status");
  if (el) el.innerText = t;
}

function brReadLastSeenMap() {
  try { return JSON.parse(localStorage.getItem("__brFriendLastSeen") || "{}"); }
  catch { return {}; }
}
function brWriteLastSeenMap(map) {
  try { localStorage.setItem("__brFriendLastSeen", JSON.stringify(map)); } catch {}
}

async function brGetAuthedUserId() {
  const meRes = await fetch("https://users.roblox.com/v1/users/authenticated", { credentials: "include" });
  if (!meRes.ok) throw new Error("Not logged in.");
  const me = await meRes.json();
  return me.id;
}

// Friends list: try paginated /friends/find first (works better beyond 200 in many cases), fallback to /friends
async function brFetchAllFriends(userId, limit = 1000) {
  const friends = [];
  let cursor = "";
  // Try /friends/find (cursor pagination)
  try {
    while (friends.length < limit) {
      const url = `https://friends.roblox.com/v1/users/${userId}/friends/find?limit=50` + (cursor ? `&cursor=${encodeURIComponent(cursor)}` : "");
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("friends/find failed");
      const json = await res.json();

      const items = json.PageItems || json.data || [];
      for (const it of items) friends.push(it);
      cursor = json.NextCursor || json.nextPageCursor || json.nextCursor || "";
      if (!cursor || items.length === 0) break;
    }
    if (friends.length) return friends;
  } catch (e) {
    // ignore; fallback below
  }

  // Fallback (may cap at 200 depending on Roblox behavior)
  const res = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed fetching friends.");
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

// Presence batch lookup
async function brPresenceBatch(userIds) {
  const res = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds })
  });
  if (!res.ok) throw new Error(`Presence failed (${res.status}).`);
  const json = await res.json();
  return Array.isArray(json.userPresences) ? json.userPresences : [];
}

function brDaysAgo(ts) {
  const d = Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
  return d < 0 ? 0 : d;
}

function brRenderInactiveList(rows) {
  const list = document.getElementById("br-inactive-list");
  if (!list) return;

  if (!rows.length) {
    list.innerHTML = `<div style="font-size:12px; opacity:0.6;">No matches.</div>`;
    return;
  }

  list.innerHTML = rows.map(r => {
    const name = (r.name && r.name.trim()) ? r.name : (r.displayName && r.displayName.trim()) ? r.displayName : `User ${r.id}`;
    const badge = r.lastSeen ? `${brDaysAgo(r.lastSeen)}d` : "unknown";
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;
                  padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02);">
        <div style="font-size:12px; font-weight:800; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${name}</div>
        <div style="font-size:11px; opacity:0.75; font-weight:900;">${badge}</div>
      </div>
    `;
  }).join("");
}

// Main scan (updates local last-seen when friend is online)
window.brScanInactiveFriends = async function () {
  if (window.__brFriendsScanInFlight) return;
  window.__brFriendsScanInFlight = true;

  const btn = document.getElementById("br-scan-friends");
  const prevText = btn ? btn.innerText : null;
  if (btn) { btn.innerText = "Scanning…"; btn.style.opacity = "0.7"; btn.style.pointerEvents = "none"; }

  try {
    brSetFriendsStatus("Loading your account…");
    const meId = await brGetAuthedUserId();

    brSetFriendsStatus("Fetching friends…");
    const friends = await brFetchAllFriends(meId, 1200);

    const days = Math.max(1, parseInt(document.getElementById("br-inactive-days")?.value || "30", 10));
    brSetFriendsStatus(`Checking presence for ${friends.length} friends…`);

    const lastSeenMap = brReadLastSeenMap();

    // Batch presence calls (gentle pacing)
    const ids = friends.map(f => f.id).filter(Boolean);
    const chunkSize = 50;

    for (let i = 0; i < ids.length; i += chunkSize) {
      const chunk = ids.slice(i, i + chunkSize);
      const presences = await brPresenceBatch(chunk);

      for (const p of presences) {
        // userPresenceType: 0 = offline, >0 = online in some form
        if (p && p.userId && p.userPresenceType && p.userPresenceType !== 0) {
          lastSeenMap[String(p.userId)] = Date.now();
        }
      }

      // small delay to reduce 429 risk
      await new Promise(r => setTimeout(r, 250));
    }

    brWriteLastSeenMap(lastSeenMap);

    // Build inactive list
    const thresholdMs = days * 24 * 60 * 60 * 1000;
    const rows = friends.map(f => {
      const lastSeen = lastSeenMap[String(f.id)] ? Number(lastSeenMap[String(f.id)]) : null;
      return { ...f, lastSeen };
    }).filter(r => {
      if (!r.lastSeen) return true; // unknown -> show (you can change this if you want)
      return (Date.now() - r.lastSeen) >= thresholdMs;
    }).sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0)); // unknown last

    brRenderInactiveList(rows);
    brSetFriendsStatus(`Done. Showing ${rows.length} (inactive/unknown ≥ ${days}d).`);
  } catch (err) {
    console.error(err);
    brSetFriendsStatus(`Error: ${err.message}`);
  } finally {
    if (btn) { btn.innerText = prevText; btn.style.opacity = ""; btn.style.pointerEvents = ""; }
    window.__brFriendsScanInFlight = false;
  }
};

// Wire button
setTimeout(() => {
  const b = document.getElementById("br-scan-friends");
  if (b) b.onclick = () => window.brScanInactiveFriends();
}, 0);


      window.renderPSCountInSettings("Loading…");
      window.updatePSCountOnce()
        .then(({ owned, total }) => {
          window.renderPSCountInSettings(`Owned by you: ${owned} • Total visible: ${total}`);
        })
        .catch(err => {
          window.renderPSCountInSettings(`Couldn’t load (${err.message})`);
        });

      // Refresh button (manual)
      setTimeout(() => {
        const btn = document.getElementById("br-ps-refresh");
        if (btn) {
          btn.onclick = async () => {
            window.__sabPSCount = null; // clear cache to force re-fetch
            window.renderPSCountInSettings("Refreshing…");
            try {
              const { owned, total } = await window.updatePSCountOnce();
              window.renderPSCountInSettings(`Owned by you: ${owned} • Total visible: ${total}`);
            } catch (err) {
              window.renderPSCountInSettings(`Couldn’t load (${err.message})`);
            }
          };
        }
      }, 0);

      window[_0x45b8(0x110)] = (_0x48a4ed, _0x320d0d) => {
        window.joinTimes[_0x320d0d] = Date[_0x45b8(0x109)]();
        _0x205713();
        if (window[_0x45b8(0x127)]?.[_0x45b8(0x13d)]?.[_0x45b8(0x11c)]) {
          window[_0x45b8(0x127)][_0x45b8(0x13d)][_0x45b8(0x11c)](_0x48a4ed, _0x320d0d, null);
        } else {
          window[_0x45b8(0x13b)][_0x45b8(0x102)] = _0x45b8(0x126) + _0x48a4ed + _0x45b8(0x13e) + _0x320d0d;
        }
      };
      const _0x2ffe6d = _0x4d0437 => {
        const _0x10f39e = Math[_0x45b8(0x131)](_0x4d0437 / 0x3e8);
        if (_0x10f39e < 0x3c) {
          return _0x10f39e + 'S';
        }
        const _0x13db27 = Math[_0x45b8(0x131)](_0x10f39e / 0x3c);
        if (_0x13db27 < 0x3c) {
          return _0x13db27 + 'M';
        }
        const _0x4590f0 = Math[_0x45b8(0x131)](_0x13db27 / 0x3c);
        return _0x4590f0 + 'H';
      };

      const _0x205713 = () => {
        const _0x2052e1 = document[_0x45b8(0x125)](_0x45b8(0xfe));

        const _0x56e80d = _0x18088c.sv[_0x45b8(0x119)](_0xf260de => {
          const _0x374574 = _0xf260de[_0x45b8(0x144)]?.[_0x45b8(0x111)] || _0xf260de[_0x45b8(0x113)]?.['length'] || 0x0;
          if (_0x374574 === 0x0) return false;

          const _0x54f8ec = _0xf260de[_0x45b8(0x113)]?.['some'](_0x45c681 => _0x45c681.id === _0xf260de.owner?.['id']);
          const passSettings = (!_0x18088c.f.o || !_0x54f8ec) && (!_0x18088c.f.oo || _0x374574 === 0x1);

          const ownerId = _0xf260de.owner?.id;
          const isBlocked = ownerId && window.blockedOwners.has(ownerId);

          return passSettings && !isBlocked;
        });

        if (!_0x56e80d || _0x56e80d.length === 0) {
          _0x2052e1.innerHTML = "<div style=\"text-align:center; opacity:0.4; margin-top:60px; font-size:13px; font-weight:600;\">Scanning for servers...</div>";
          return;
        }

        const _0x6eda97 = _0x56e80d[_0x45b8(0x123)](_0x3cecd9 => {
          const _0x8c0c30 = _0x3cecd9[_0x45b8(0x144)]?.['length'] || _0x3cecd9[_0x45b8(0x113)]?.[_0x45b8(0x111)] || 0x0;
          const _0x678f2e = _0x3cecd9[_0x45b8(0x113)]?.['some'](_0x2d326b => _0x2d326b.id === _0x3cecd9.owner?.['id']);
          let _0x2fa43e = '';
          if (window[_0x45b8(0x136)][_0x3cecd9[_0x45b8(0x143)]]) {
            const _0x471fea = _0x2ffe6d(Date[_0x45b8(0x109)]() - window.joinTimes[_0x3cecd9.accessCode]);
            _0x2fa43e = _0x45b8(0x105) + _0x471fea + " AGO</span>";
          }

          return `
        <div class="br-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                 <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <span class="player-count">${_0x8c0c30}/8 PLAYER${_0x8c0c30 === 1 ? '' : 'S'}</span>
                    ${_0x2fa43e}
                    ${_0x678f2e ? `<span style="background:rgba(239, 68, 68, 0.2);color:#f87171;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:800;">OWNER</span>` : ''}
                 </div>
            </div>
            <div style="font-size:calc(15px * var(--br-scale)); font-weight:700; color:#fff; margin-top:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${_0x3cecd9.name || "Private Session"}
            </div>
            
            <div class="btn-row">
                <button class="join-btn" onclick="window.joinSrv('${_0x5b1fc8}','${_0x3cecd9.accessCode}')">Join Server</button>
                <button class="remove-btn" title="Unfriend & Block" onclick="window.removeSrv('${_0x3cecd9.accessCode}','${_0x3cecd9.owner?.id || ''}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </div>
        </div>`;
        }).join('');

        if (_0x2052e1[_0x45b8(0x146)] !== _0x6eda97) {
          _0x2052e1[_0x45b8(0x146)] = _0x6eda97;
        }
      };

      const _0x335c49 = async (isAuto = false) => {
        _0x18088c.ld = true;
        const _0xc87be0 = document.getElementById(_0x45b8(0x139));
        if (!isAuto) {
          _0x18088c.sv = [];
          window.seenServers.clear();
          _0xc87be0[_0x45b8(0x101)] = 'STARTING';
        } else {
          _0xc87be0[_0x45b8(0x101)] = 'AUTO-SCANNING';
        }

        let _0x518545 = _0x45b8(0xfa) + _0x5b1fc8 + _0x45b8(0x11b) + 0x64 + _0x45b8(0x11d) + _0x18088c.c;

        try {
          const _0x450b1f = await fetch(_0x518545, { 'credentials': _0x45b8(0x137) });
          if (!_0x450b1f.ok) throw new Error();
          const _0x376fc9 = await _0x450b1f.json();

          if (_0x376fc9[_0x45b8(0x13a)]) {
            const newServers = _0x376fc9[_0x45b8(0x13a)].filter(s => {
              if (window.seenServers.has(s.accessCode)) return false;
              window.seenServers.add(s.accessCode);
              return true;
            });

            _0x18088c.sv = [..._0x18088c.sv, ...newServers];
            _0xc87be0[_0x45b8(0x101)] = _0x45b8(0x10c);
            _0x205713();
          }
          _0x18088c.c = _0x376fc9.nextPageCursor || '';
        } catch (_0x3c6794) {
          _0xc87be0[_0x45b8(0x101)] = _0x45b8(0x140);
        }
        _0x18088c.ld = false;
        setTimeout(() => { _0xc87be0[_0x45b8(0x101)] = _0x45b8(0xf8); }, 1000);
      };
      // Manual refresh (rescan now)
      window.__brManualScanInFlight = false;

      window.brRescanNow = async () => {
        if (window.__brManualScanInFlight) return;
        if (_0x18088c.ld) return; // avoid overlapping fetches

        window.__brManualScanInFlight = true;

        const statusEl = document.getElementById("br-scan-status");
        const btn = document.getElementById("br-refresh-servers");
        const prevBtnHTML = btn ? btn.innerHTML : null;

        try {
          if (statusEl) statusEl.innerText = "REFRESHING…";
          if (btn) {
            btn.style.opacity = "0.6";
            btn.style.pointerEvents = "none";
            btn.innerHTML = `<span style="font-size:11px;font-weight:900;">…</span>`;
          }

          // Fresh scan: clears list + cursor + seenServers
          await _0x335c49(false);

          // Optional: scroll list back to top after refresh
          const list = document.getElementById("br-list");
          if (list) list.scrollTop = 0;
        } finally {
          if (btn) {
            btn.style.opacity = "";
            btn.style.pointerEvents = "";
            btn.innerHTML = prevBtnHTML;
          }
          window.__brManualScanInFlight = false;
        }
      };

      // Wire button
      setTimeout(() => {
        const btn = document.getElementById("br-refresh-servers");
        if (btn) btn.onclick = () => window.brRescanNow();
      }, 0);


      document.getElementById(_0x45b8(0x124))[_0x45b8(0x135)] = () => {
        const _0x5e2833 = [_0x45b8(0x142), _0x45b8(0x130), _0x45b8(0xfd), _0x45b8(0x128)];
        _0x13d540[_0x45b8(0x134)][_0x45b8(0x12b)](..._0x5e2833);
        _0x18088c.pos = (_0x18088c[_0x45b8(0x11a)] + 0x1) % 0x4;
        _0x13d540[_0x45b8(0x134)][_0x45b8(0x100)](_0x5e2833[_0x18088c[_0x45b8(0x11a)]]);
      };

      document[_0x45b8(0x125)]('br-toggle-settings')[_0x45b8(0x135)] = () => document[_0x45b8(0x125)](_0x45b8(0x106))[_0x45b8(0x147)][_0x45b8(0x10b)] = _0x45b8(0x129);
      document.getElementById('br-close-settings')[_0x45b8(0x135)] = () => document[_0x45b8(0x125)]('br-settings-panel')[_0x45b8(0x147)][_0x45b8(0x10b)] = 'translateX(100%)';

      document.getElementById(_0x45b8(0x12e)).onchange = _0x431214 => {
        _0x18088c.f.o = _0x431214[_0x45b8(0xf9)][_0x45b8(0x115)];
        _0x205713();
      };
      document.getElementById('br-opt-one')[_0x45b8(0x114)] = _0x3604dd => {
        _0x18088c.f.oo = _0x3604dd[_0x45b8(0xf9)][_0x45b8(0x115)];
        _0x205713();
      };
      document.getElementById('br-font-scaler').oninput = (e) => {
        document.getElementById('br-lite-root').style.setProperty('--br-scale', e.target.value);
      };

      _0x335c49(false);
      // update PS count after UI is mounted
      window.__brScanTimer = setInterval(() => {
        _0x335c49(true);
      }, 25000);
    })();
  })();
})();
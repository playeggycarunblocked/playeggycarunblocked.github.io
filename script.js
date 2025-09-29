function uuid() {
  let t = Math.floor(Date.now() / 1000);
  let b = "";

  for (let i = 0; i < 4; i++) {
    b = String.fromCharCode(t & 255) + b; // eslint-disable-line no-bitwise
    t >>= 8; // eslint-disable-line no-bitwise
  }

  if (window.crypto && crypto.getRandomValues && Uint32Array) {
    const r = new Uint32Array(12);
    crypto.getRandomValues(r);
    for (let i = 0; i < 12; i++) {
      b += String.fromCharCode(r[i] & 255); // eslint-disable-line no-bitwise
    }
  } else {
    for (let i = 0; i < 12; i++) {
      b += String.fromCharCode(Math.floor(Math.random() * 256));
    }
  }
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function sendAnalytics(userID, domain) {
  console.log(`domain blocked: ${domain}`);

  try {
    return await fetch("https://erikarena.com/observer/t", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ve: 7,
        c: "page",
        a: "domain-access-fail",
        l: domain,
        u: { id: userID },
        s: { id: "unknown" },
        ti: "unknown",
        lp: { pa: "/" },
        p: { pa: "/" },
        do: domain,
      }),
    });
  } catch {}
}

function checkDomains() {
  const userID = uuid();
  const urls = {
    "poki.com": "https://poki.com/favicon.ico",
    "poki-gdn.com": "https://poki-gdn.com/",
    "pok-cdn.com":
      "https://img.poki-cdn.com/cdn-cgi/image/width=30,height=30,fit=cover,f=auto/a4de0b7936e98f0843e8ef40a428ee2e/drive-mad.png",
    "poki.io": "https://geo.poki.io/",
    "eggycarofficial.com": "https://eggycarofficial.com/favicon.ico",
    "eggycar2.io": "https://eggycar2.io/favicon.ico",
    "crazygames.com": "https://www.crazygames.com/favicon.ico",
    "friv.com": "https://www.friv.com/favicon.ico",
    "coolmathgames.com": "https://www.coolmathgames.com/favicon.ico",
    "mathplayground.com": "https://www.mathplayground.com/favicon.ico",
    "hoodamath.com": "https://www.hoodamath.com/favicon.ico",
    "playhop.com": "https://www.playhop.com/favicon.ico",
    "mortgagecalculator.org": "https://www.mortgagecalculator.org/favicon.ico",
    "watchdocumentaries.com": "https://www.watchdocumentaries.com/favicon.ico",
    "leveldevilgame.com": "https://leveldevilgame.com/favicon.ico",
    "leveldevilnotatrollgame.io":
      "https://leveldevilnotatrollgame.io/favicon.ico",
    "leveldevil.vip": "https://leveldevil.vip/favicon.ico",
    "retrobowlgame.io": "https://retrobowlgame.io/favicon.ico",
    "monkeymartgame.org": "https://monkeymartgame.org/favicon.ico",
    "retrobowlofficial.com": "https://retrobowlofficial.com/play.svg",
    "dressupgames.com": "https://www.dressupgames.com/favicon.ico",
    "drivemad3.io": "https://drivemad3.io/favicon.ico",
    "drivemad.com": "https://drivemad.com/favicon.ico",
    "subwaysurfers.com": "https://subwaysurfers.com/assets/css/form.css",
    "stickmanhookgame.org": "https://stickmanhookgame.org/favicon.ico",
    "eggy-car-online.github.io":
      "https://eggy-car-online.github.io/js/darkMode.bundle.js",
    "unblocked-games.s3.amazonaws.com":
      "https://unblocked-games.s3.amazonaws.com/favicon.ico",
  };

  for (const domain in urls) {
    fetch(urls[domain], { mode: "no-cors" }).catch(() =>
      sendAnalytics(userID, domain)
    );
  }
}

window.addEventListener("load", checkDomains);

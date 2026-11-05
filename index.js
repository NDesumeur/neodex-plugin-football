// Football : ton équipe (prochain match, forme, résultats, calendrier), les matchs du jour, le classement et les feuilles de match, comme l'appli NBA (données ESPN).
// Il tourne dans le bac à sable de NeoDex, avec ses outils d'interface (ctx.host) et seulement les autorisations de son plugin.json.
const HTML = `<div class="appWrap">
  <div class="agHead"><span class="label">Football</span><select id="ftLeague" class="ftSel" title="Championnat"></select>
    <div class="agNav" id="ftDayNav"><button class="btn px" id="ftPrev" title="Jour précédent">&lt;</button><button class="btn px" id="ftToday">AUJOURD'HUI</button><button class="btn px" id="ftNext" title="Jour suivant">&gt;</button></div>
    <div class="agNav" id="ftTabs"><button class="btn px" data-v="team">MON ÉQUIPE</button><button class="btn px" data-v="games">MATCHS</button><button class="btn px" data-v="table">CLASSEMENT</button></div></div>
  <div id="ftDay" class="ftDay"></div>
  <label class="ftCal"><input type="checkbox" id="ftCal"> Ajouter les matchs de mon équipe à mon emploi du temps, mis à jour automatiquement</label>
  <div id="ftMain"></div>
  <div class="hint">Données ESPN, heures de Paris. L'étoile d'une équipe en fait ton équipe. Clique sur un match pour sa feuille de match.</div>
</div>`;
const CSS = `.ftSel{margin-left:12px;background:var(--bg2,#14102a);color:#fff;border:2px solid var(--line2,#3a2f6a);font:13px var(--body,inherit);padding:4px 6px}
#ftDayNav{margin-left:auto}#ftTabs{margin-left:12px}#ftTabs .btn.on{--c:var(--magenta);color:#fff}
.ftDay{font-size:17px;color:#fff;margin:4px 0}.ftCal{display:flex;gap:8px;align-items:center;margin:6px 0 10px;color:var(--shell);font-size:14px}
.ftGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
.ftGame{gap:8px}.ftGame.fav{--c:var(--magenta)}.ftGame.click{cursor:var(--cp,pointer)}.ftGame.click:hover{--c:var(--violet)}
.ftTeam{display:grid;grid-template-columns:28px 1fr auto 40px;gap:10px;align-items:center}.ftTeam img{width:26px;height:26px;object-fit:contain}
.ftTeam .tn{color:#fff;font-size:15px;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ftTeam.lost .tn,.ftTeam.lost .ftScore{color:var(--muted)}
.ftScore{font:20px var(--title);color:#fff;text-align:right}
.ftStatus{font:8px var(--title);letter-spacing:1px;color:var(--lilac);padding-top:6px;border-top:1px solid rgba(255,255,255,.06)}
.ftStatus.live{color:#fff}.ftStatus.live::before{content:"";display:inline-block;width:8px;height:8px;margin-right:8px;background:var(--red);animation:blink 1s steps(2) infinite}
.ftStar{all:unset;cursor:var(--cp,pointer);color:var(--muted);font-size:16px;padding:0 4px}.ftStar:hover,.ftStar.on{color:#ffd07a}
.ftRow{display:grid;grid-template-columns:26px 24px 1fr 34px 34px 34px 34px 46px 40px 70px;gap:6px;align-items:center;font-size:14px;color:var(--lilac);padding:4px 0 4px 6px;border-left:3px solid transparent}
.ftRow img{width:22px;height:22px;object-fit:contain}.ftRow .tn{color:#fff;display:flex;align-items:center;gap:4px;min-width:0;white-space:nowrap;overflow:hidden}
.ftRow.head{font:7px var(--title);letter-spacing:1px;color:var(--muted)}.ftRow.fav{background:rgba(var(--mgr),.14)}.ftRow b{color:#fff}
.ftForm{display:flex;gap:2px}.ftForm i{width:12px;height:12px;font:7px/12px var(--title);text-align:center;color:#05010b;font-style:normal}
.ftForm .W{background:#5ad05a}.ftForm .D{background:#c8c0a0}.ftForm .L{background:#ff5a5a}
.ftHero{flex-direction:row!important;align-items:center;gap:22px}.ftHero img{width:84px;height:84px;object-fit:contain}
.ftBig{font:18px var(--title);color:#fff;margin-bottom:6px}.ftNext{font:13px var(--title);color:var(--pink);margin-top:8px}
.ftCols{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-top:18px}
.ftList{display:flex;flex-direction:column}.ftLine{display:grid;grid-template-columns:62px 20px 1fr 54px;gap:8px;align-items:center;padding:6px 0;border-top:1px solid rgba(255,255,255,.06);font-size:14px;color:var(--lilac);cursor:var(--cp,pointer)}
.ftLine:hover{color:#fff}.ftLine img{width:20px;height:20px;object-fit:contain}.ftLine b{text-align:right;color:#fff;font-weight:600}.ftLine .W{color:#5ad05a}.ftLine .L{color:#ff7a7a}
.ftEv{display:grid;grid-template-columns:44px 22px 1fr;gap:8px;align-items:center;padding:5px 0;font-size:14px;color:var(--lilac);border-top:1px solid rgba(255,255,255,.06)}
.ftEv.away{grid-template-columns:1fr 22px 44px;text-align:right}.ftEv b{color:#fff;font-weight:600}.ftEv .min{font:9px var(--title);color:var(--muted)}
.ftIco{width:16px;height:16px;image-rendering:pixelated}
.ftCmp{display:grid;grid-template-columns:70px 1fr 70px;gap:4px 10px;align-items:center;font-size:14px;color:var(--lilac)}.ftCmp b{color:#fff;font-weight:600}.ftCmp b:last-of-type{text-align:right}.ftCmp span{text-align:center}
.ftBar{grid-column:1/-1;display:flex;gap:2px;height:6px}.ftBar i{background:var(--line2)}.ftBar i.win{background:var(--magenta)}
#ftMain>.sysCard,#ftMain .sysCard{align-self:stretch}`;
// les championnats proposés (code ESPN, nom)
const LEAGUES = [['fra.1', 'Ligue 1'], ['eng.1', 'Premier League'], ['esp.1', 'LaLiga'], ['ita.1', 'Serie A'], ['ger.1', 'Bundesliga'], ['fra.2', 'Ligue 2'], ['por.1', 'Liga Portugal'], ['ned.1', 'Eredivisie'], ['uefa.champions', 'Ligue des champions'], ['uefa.europa', 'Ligue Europa']];
const CUPS = ['uefa.champions', 'uefa.europa', 'uefa.europa.conf'];  // les coupes d'Europe s'ajoutent au calendrier de ton équipe
// petites icônes pixel des événements de match : but, carton jaune, carton rouge, remplacement
const EV_ICON = {goal: ['..kkk..', '.kwwwk.', 'kwkwkwk', 'kwwkwwk', 'kwkwkwk', '.kwwwk.', '..kkk..'], yellow: ['.kkkk..', '.kyyyk.', '.kyyyk.', '.kyyyk.', '.kyyyk.', '.kkkkk.', '.......'],
  red: ['.kkkk..', '.krrrk.', '.krrrk.', '.krrrk.', '.krrrk.', '.kkkkk.', '.......'], sub: ['..g....', '.ggg...', 'g.g....', '..g.r..', '....r.r', '...rrr.', '....r..']};
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast } = ctx.host, folder = ctx.folder;
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  const $ = id => view.querySelector('#' + id);
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  let prefs = (await doc('prefs')) || {league: 'fra.1'};
  const save = async s => { Object.assign(prefs, s); await folder.write('prefs', prefs).catch(() => {}); };
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const API = 'https://site.api.espn.com/apis/', get = p => fetch(API + p).then(r => { if (!r.ok) throw new Error('ESPN ' + r.status); return r.json(); });
  const sc = s => s == null ? '' : typeof s === 'object' ? s.displayValue ?? s.value ?? '' : s;  // le score : un nombre, ou un objet selon la page ESPN
  const fr = s => String(s || '').replace(/^FT$|Full Time/, 'Terminé').replace(/^HT$|Halftime/, 'Mi-temps').replace(/Postponed/, 'Reporté').replace(/Canceled/, 'Annulé').replace(/AET/, 'Après prol.').replace(/Pens|FT-Pens/, 'Tirs au but');
  console.assert(fr('FT') === 'Terminé' && fr('HT') === 'Mi-temps' && sc({displayValue: '2'}) === '2' && sc(3) === 3, 'football fr/sc');
  const icon = k => { const c = el('canvas', 'ftIco'); c.width = c.height = 7; const g = c.getContext('2d'); EV_ICON[k].forEach((r, y) => [...r].forEach((ch, x) => { const col = {k: '#05010b', w: '#ffffff', y: '#ffd84a', r: '#ff4a5a', g: '#5ad05a'}[ch]; if (col) { g.fillStyle = col; g.fillRect(x, y, 1, 1); } })); return c; };
  const logo = (src, cls = '') => { const i = el('img', cls); i.src = src || ''; i.loading = 'lazy'; i.onerror = () => i.style.visibility = 'hidden'; return i; };
  const isFav = id => prefs.team?.id === String(id);
  let day = null, tab = prefs.team ? 'team' : 'games', timer = null, detailOpen = null;
  const leagueName = code => LEAGUES.find(l => l[0] === code)?.[1] || code;
  $('ftLeague').append(...LEAGUES.map(([v, n]) => { const o = el('option', '', n); o.value = v; return o; })); $('ftLeague').value = prefs.league;
  const star = (team, league) => {
    const b = el('button', 'ftStar' + (isFav(team.id) ? ' on' : ''), isFav(team.id) ? '★' : '☆');
    b.title = isFav(team.id) ? "Ce n'est plus mon équipe" : 'Mon équipe : son onglet, ses matchs en premier et dans mon emploi du temps';
    b.onclick = async e => { e.stopPropagation(); await save({team: isFav(team.id) ? null : {id: String(team.id), name: team.displayName, logo: team.logo || team.logos?.[0]?.href || '', league: league || prefs.league}}); render(); syncCalendar(); };
    return b;
  };
  function card(e, league) {  // un match : les deux équipes, le score, l'état
    const c = e.competitions[0], st = c.status.type, box = el('div', 'sysCard px ftGame click'), teams = [...c.competitors].sort((a, b) => a.homeAway === 'home' ? -1 : 1);
    if (teams.some(t => isFav(t.team.id))) box.classList.add('fav');
    for (const t of teams) {
      const r = el('div', 'ftTeam' + (st.state === 'post' && t.winner === false && teams.some(o => o.winner) ? ' lost' : ''));
      r.append(logo(t.team.logo || t.team.logos?.[0]?.href), el('span', 'tn', t.team.displayName), star(t.team, league), el('span', 'ftScore', st.state === 'pre' ? '' : sc(t.score)));
      box.append(r);
    }
    const live = st.state === 'in', s = el('div', 'ftStatus' + (live ? ' live' : ''));
    s.textContent = st.state === 'pre' ? new Date(e.date).toLocaleString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : live ? 'EN DIRECT · ' + (c.status.displayClock || st.shortDetail) : fr(st.shortDetail);
    box.append(s); box.title = 'Voir la feuille de match'; box.onclick = () => match(e.id, league || prefs.league);
    return box;
  }
  async function render() {
    clearTimeout(timer);
    if (!view.classList.contains('on') || detailOpen) return;
    view.querySelectorAll('#ftTabs .btn').forEach(b => b.classList.toggle('on', b.dataset.v === tab));
    $('ftDayNav').style.visibility = tab === 'games' ? '' : 'hidden'; $('ftDay').textContent = '';
    const main = $('ftMain');
    try {
      if (tab === 'team') return await teamPage(main);
      if (tab === 'table') return await table(main);
      // première ouverture : la journée en cours du championnat (ESPN la choisit), puis on navigue jour par jour
      const sb = await get('site/v2/sports/soccer/' + prefs.league + '/scoreboard' + (day ? '?dates=' + day.replace(/-/g, '') : ''));
      day ??= sb.events?.length ? ymd(new Date(sb.events[0].date)) : ymd(new Date());
      $('ftDay').textContent = leagueName(prefs.league) + ' · ' + new Date(day + 'T12:00').toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'});
      const evs = (sb.events || []).sort((a, b) => (a.competitions[0].competitors.some(t => isFav(t.team.id)) ? 0 : 1) - (b.competitions[0].competitors.some(t => isFav(t.team.id)) ? 0 : 1) || a.date.localeCompare(b.date));
      const grid = el('div', 'ftGrid'); grid.append(...(evs.length ? evs.map(e => card(e, prefs.league)) : [el('div', 'hint', 'Aucun match ce jour-là dans ce championnat. Utilise les flèches pour changer de jour.')]));
      main.replaceChildren(grid);
      if (evs.some(e => e.status.type.state === 'in')) timer = setTimeout(render, 30000);
    } catch (err) { main.replaceChildren(el('div', 'hint', 'Données indisponibles : ' + err.message + '. Vérifie ta connexion.')); }
  }
  async function table(main) {
    const st = await get('v2/sports/soccer/' + prefs.league + '/standings');
    main.replaceChildren(...(st.children || []).map(gr => {
      const box = el('div', 'sysCard px'), stat = (en, k) => en.stats.find(s => s.name === k)?.displayValue ?? '';
      box.append(el('span', 'label', (st.children.length > 1 ? gr.name : leagueName(prefs.league)) + ' · classement'));
      const head = el('div', 'ftRow head'); head.append(...['#', '', 'Équipe', 'J', 'G', 'N', 'P', 'Diff', 'Pts', ''].map(t => el('span', '', t))); box.append(head);
      const entries = [...gr.standings.entries].sort((a, b) => +stat(a, 'rank') - +stat(b, 'rank')), notes = new Map();
      for (const en of entries) {
        const r = el('div', 'ftRow' + (isFav(en.team.id) ? ' fav' : '')), name = el('span', 'tn', en.team.shortDisplayName || en.team.displayName);
        name.append(star(en.team, prefs.league));
        if (en.note?.color) { r.style.borderLeftColor = en.note.color; notes.set(en.note.color, en.note.description); }
        r.append(el('span', '', stat(en, 'rank')), logo(en.team.logos?.[0]?.href), name, el('span', '', stat(en, 'gamesPlayed')), el('span', '', stat(en, 'wins')), el('span', '', stat(en, 'ties')), el('span', '', stat(en, 'losses')), el('span', '', stat(en, 'pointDifferential')), el('b', '', stat(en, 'points')), el('span'));
        box.append(r);
      }
      const NOTE = {'Champions League': 'Ligue des champions', 'Europa League': 'Ligue Europa', 'Conference League': 'Ligue Conférence', Relegation: 'Relégation', 'Relegation Playoff': 'Barrage de relégation', 'Promotion': 'Montée', 'Promotion Playoff': 'Barrage de montée'};
      if (notes.size) { const h = el('div', 'hint'); [...notes].forEach(([c, d], i) => { const sw = el('span'); sw.style.cssText = `display:inline-block;width:10px;height:10px;background:${c};margin:0 6px 0 ${i ? 14 : 0}px`; h.append(sw, NOTE[d] || d); }); box.append(h); }
      return box;
    }));
  }
  async function teamSchedule(team) {  // résultats et matchs à venir : championnat + coupes d'Europe, sans doublon
    const leagues = [...new Set([team.league, ...CUPS])], seen = new Map();
    await Promise.all(leagues.flatMap(lg => ['', '?fixture=true'].map(q => get('site/v2/sports/soccer/' + lg + '/teams/' + team.id + '/schedule' + q).then(j => { for (const e of j.events || []) seen.set(e.id, {e, lg}); }).catch(() => {}))));
    return [...seen.values()].sort((a, b) => a.e.date.localeCompare(b.e.date));
  }
  const res = (e, id) => { const c = e.competitions[0], me = c.competitors.find(t => String(t.team.id) === String(id)), op = c.competitors.find(t => t !== me); if (!me || !op) return null;
    const a = +sc(me.score), b = +sc(op.score); return {me, op, txt: sc(me.score) + ' - ' + sc(op.score), r: a > b ? 'W' : a < b ? 'L' : 'D', home: me.homeAway === 'home'}; };
  async function teamPage(main) {
    const team = prefs.team;
    if (!team) { main.replaceChildren(el('div', 'sysCard px', 'Choisis ton équipe : ouvre MATCHS ou CLASSEMENT et clique sur l\'étoile ☆ à côté de son nom.')); return; }
    main.replaceChildren(el('div', 'hint', 'Chargement des matchs de ' + team.name + '…'));
    const all = await teamSchedule(team), done = all.filter(x => x.e.competitions[0].status.type.state === 'post'), next = all.filter(x => x.e.competitions[0].status.type.state !== 'post');
    const hero = el('div', 'sysCard px ftHero'), info = el('div'); info.append(el('div', 'ftBig', team.name), el('div', 'hint', leagueName(team.league)));
    const form = el('div', 'ftForm'); for (const x of done.slice(-5)) { const r = res(x.e, team.id); if (r) { const i = el('i', r.r, {W: 'V', D: 'N', L: 'D'}[r.r]); i.title = (r.home ? 'contre ' : 'à ') + r.op.team.displayName + ' : ' + r.txt; form.append(i); } }
    if (form.childNodes.length) info.append(el('div', 'hint', 'Forme (5 derniers) :'), form);
    const n = next[0]; if (n) { const c = n.e.competitions[0], op = c.competitors.find(t => String(t.team.id) !== team.id), d = new Date(n.e.date), days = Math.round((new Date(ymd(d)) - new Date(ymd(new Date()))) / 864e5);
      info.append(el('div', 'ftNext', (c.status.type.state === 'in' ? 'EN DIRECT : ' : 'Prochain match ' + (days === 0 ? "aujourd'hui" : days === 1 ? 'demain' : 'dans ' + days + ' jours') + ' : ') + (c.competitors.find(t => String(t.team.id) === team.id)?.homeAway === 'home' ? 'contre ' : 'à ') + (op?.team.displayName || '?') + ' · ' + d.toLocaleString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'}))); }
    hero.append(logo(team.logo), info);
    const line = (x, past) => {
      const c = x.e.competitions[0], me = c.competitors.find(t => String(t.team.id) === team.id), op = c.competitors.find(t => t !== me), r = past ? res(x.e, team.id) : null, row = el('div', 'ftLine');
      row.append(el('span', '', new Date(x.e.date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'})), logo(op?.team.logo || op?.team.logos?.[0]?.href), el('span', '', (me?.homeAway === 'home' ? 'contre ' : 'à ') + (op?.team.displayName || '?') + (CUPS.includes(x.lg) ? ' · ' + (x.lg === 'uefa.champions' ? 'LDC' : x.lg === 'uefa.europa' ? 'LE' : 'LC') : '')),
        el('b', r ? r.r : '', r ? r.txt : new Date(x.e.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})));
      row.title = 'Voir la feuille de match'; row.onclick = () => match(x.e.id, x.lg); return row;
    };
    const cols = el('div', 'ftCols'), a = el('div', 'sysCard px ftList'), b = el('div', 'sysCard px ftList');
    a.append(el('span', 'label', 'Derniers résultats'), ...(done.length ? done.slice(-10).reverse().map(x => line(x, true)) : [el('div', 'hint', 'Pas encore de résultat cette saison.')]));
    b.append(el('span', 'label', 'Calendrier'), ...(next.length ? next.slice(0, 12).map(x => line(x, false)) : [el('div', 'hint', 'Aucun match annoncé pour le moment.')]));
    cols.append(a, b); main.replaceChildren(hero, cols);
    if (next[0]?.e.competitions[0].status.type.state === 'in') timer = setTimeout(render, 30000);
  }
  async function match(id, league) {
    detailOpen = id; $('ftDayNav').style.visibility = 'hidden';
    const main = $('ftMain'), back = el('button', 'btn px', '‹ RETOUR'); back.onclick = () => { detailOpen = null; render(); };
    main.replaceChildren(back, el('div', 'hint', 'Chargement du match…'));
    let s; try { s = await get('site/v2/sports/soccer/' + league + '/summary?event=' + id); } catch (e) { main.replaceChildren(back, el('div', 'hint', 'Match indisponible : ' + e.message)); return; }
    if (detailOpen !== id) return;
    const comp = s.header.competitions[0], st = comp.status.type, teams = [...comp.competitors].sort((a, b) => a.homeAway === 'home' ? -1 : 1), nodes = [back];
    const top = el('div', 'sysCard px ftGame');
    for (const t of teams) { const r = el('div', 'ftTeam'); r.append(logo(t.team.logos?.[0]?.href || t.team.logo), el('span', 'tn', t.team.displayName), el('span'), el('span', 'ftScore', st.state === 'pre' ? '' : sc(t.score))); top.append(r); }
    top.append(el('div', 'ftStatus' + (st.state === 'in' ? ' live' : ''), st.state === 'pre' ? new Date(comp.date).toLocaleString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'}) : (st.state === 'in' ? 'EN DIRECT · ' : '') + fr(st.detail || st.shortDetail)));
    const v = s.gameInfo?.venue; if (v) top.append(el('div', 'hint', v.fullName + (v.address?.city ? ', ' + v.address.city : '') + (s.gameInfo.attendance ? ' · ' + s.gameInfo.attendance.toLocaleString('fr-FR') + ' spectateurs' : '')));
    nodes.push(top);
    // le fil du match : buts, cartons, remplacements
    const KIND = t => /own goal/i.test(t) ? ['goal', 'But contre son camp'] : /penalty - scored|goal/i.test(t) ? ['goal', /penalty/i.test(t) ? 'But sur penalty' : 'But'] : /yellow/i.test(t) ? ['yellow', 'Carton jaune'] : /red/i.test(t) ? ['red', 'Carton rouge'] : /substitution/i.test(t) ? ['sub', 'Remplacement'] : null;
    const evs = (s.keyEvents || []).map(k => ({k, kind: KIND(k.type?.text || '')})).filter(x => x.kind && x.k.team);
    if (evs.length) {
      const box = el('div', 'sysCard px'); box.append(el('span', 'label', 'Le match'));
      for (const {k, kind} of evs) {
        const home = String(k.team.id) === String(teams[0].team.id), who = (k.participants || []).map(p => p.athlete?.displayName).filter(Boolean), r = el('div', 'ftEv' + (home ? '' : ' away'));
        const txt = el('span'); txt.append(el('b', '', who[0] || k.team.displayName), kind[0] === 'sub' && who[1] ? ' remplace ' + who[1] : kind[0] === 'goal' && who[1] ? ' (passe de ' + who[1] + ')' : '', ' · ' + kind[1]);
        const parts = [el('span', 'min', k.clock?.displayValue || ''), icon(kind[0]), txt]; r.append(...(home ? parts : parts.reverse())); box.append(r);
      }
      nodes.push(box);
    }
    // les stats des deux équipes, côte à côte
    const [ta, tb] = teams.map(t => s.boxscore?.teams?.find(x => String(x.team.id) === String(t.team.id)));
    if (ta?.statistics?.length && tb?.statistics?.length) {
      const LAB = {possessionPct: 'Possession %', totalShots: 'Tirs', shotsOnTarget: 'Tirs cadrés', wonCorners: 'Corners', foulsCommitted: 'Fautes', offsides: 'Hors-jeu', yellowCards: 'Cartons jaunes', redCards: 'Cartons rouges', saves: 'Arrêts', accuratePasses: 'Passes réussies', totalPasses: 'Passes', totalTackles: 'Tacles', interceptions: 'Interceptions'}, LOW = ['foulsCommitted', 'offsides', 'yellowCards', 'redCards'];
      const box = el('div', 'sysCard px'); box.append(el('span', 'label', 'Statistiques'));
      for (const [k, name] of Object.entries(LAB)) {
        const a = ta.statistics.find(x => x.name === k), b = tb.statistics.find(x => x.name === k); if (!a || !b) continue;
        const av = parseFloat(a.displayValue) || 0, bv = parseFloat(b.displayValue) || 0, r = el('div', 'ftCmp'), bar = el('div', 'ftBar'), l = el('i'), rr = el('i'), share = av + bv ? av / (av + bv) * 100 : 50;
        l.style.width = share + '%'; rr.style.width = 100 - share + '%'; if (av !== bv) ((LOW.includes(k) ? av < bv : av > bv) ? l : rr).classList.add('win');
        bar.append(l, rr); r.append(el('b', '', a.displayValue), el('span', '', name), el('b', '', b.displayValue), bar); box.append(r);
      }
      nodes.push(box);
    }
    if (nodes.length === 2) nodes.push(el('div', 'hint', 'Le fil du match et les statistiques arrivent au coup d’envoi.'));
    const wrap = el('div'); wrap.style.cssText = 'display:flex;flex-direction:column;gap:18px;align-items:flex-start'; wrap.append(...nodes); main.replaceChildren(wrap);
    if (st.state === 'in') setTimeout(() => detailOpen === id && match(id, league), 30000);
  }
  // ---- les matchs de ton équipe dans ton emploi du temps ----
  const hm = mn => String(Math.floor(mn / 60)).padStart(2, '0') + ':' + String(mn % 60).padStart(2, '0');
  async function syncCalendar() {
    const evs = [];
    if (prefs.calendar !== false && prefs.team) try {
      for (const {e} of await teamSchedule(prefs.team)) {
        const d = new Date(e.date); if (d < new Date(Date.now() - 36e5) || d > new Date(Date.now() + 90 * 864e5)) continue;
        const cs = e.competitions?.[0]?.competitors || [], home = cs.find(c => c.homeAway === 'home')?.team, away = cs.find(c => c.homeAway === 'away')?.team, s = d.getHours() * 60 + d.getMinutes();
        evs.push({id: 'foot:' + e.id, kind: 'event', title: '⚽ ' + (home?.displayName || '?') + ' - ' + (away?.displayName || '?'), date: ymd(d), start: hm(s), end: hm(Math.min(1439, s + 115)), allDay: false, color: '#3aa84a', place: 'Match de foot'});
      }
    } catch {}
    ctx.host.agenda?.sync('football', evs);
  }
  $('ftCal').checked = prefs.calendar !== false;
  $('ftCal').onchange = async () => { await save({calendar: $('ftCal').checked}); syncCalendar(); toast(prefs.calendar ? 'Les matchs de ton équipe sont dans ton emploi du temps' : 'Les matchs ne sont plus dans ton emploi du temps'); };
  $('ftLeague').onchange = async () => { await save({league: $('ftLeague').value}); if (tab === 'team') tab = 'games'; detailOpen = null; day = null; render(); };
  $('ftPrev').onclick = () => { day = ymd(addDays(new Date(day + 'T12:00'), -1)); render(); };
  $('ftNext').onclick = () => { day = ymd(addDays(new Date(day + 'T12:00'), 1)); render(); };
  $('ftToday').onclick = () => { day = ymd(new Date()); render(); };
  $('ftTabs').onclick = e => { const v = e.target.dataset.v; if (v) { tab = v; detailOpen = null; render(); } };
  syncCalendar(); const calTimer = setInterval(syncCalendar, 3 * 3600e3);
  ctx.onOpen(() => render());
  ctx.onClose(() => { clearTimeout(timer); clearInterval(calTimer); });
}

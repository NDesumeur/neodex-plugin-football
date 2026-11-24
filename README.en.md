# Football

Follow your team and the major leagues: next match, current form, results, fixtures, today's matches live, standings and detailed match reports, in Paris time.

*Version française : [README.md](README.md)*

## Live goals (new in 1.2.0)

A notification for every goal in your teams' matches, even with Football closed (scorer, minute, opponent and disallowed goals included); if you want, kick-off and the result. No request outside their matches.

## The tabs

- **My team**: your team's next match (live if it is being played), its form over recent matches, its **latest results** and its **fixtures**, European cups included.
- **Matches**: every match of a day in the chosen league, with the score and status (upcoming, live with the minute, half-time, full time, after extra time, penalties, postponed, cancelled). **Today** and the arrows change the day.
- **Standings**: the league table with points, goal difference and zones (Champions League, Europa League, Conference League, promotion, play-offs, relegation).

During a live match, the page refreshes by itself every 30 seconds.

## The match report

Click a match to open it: the **match timeline** (goals with the assist, penalties and own goals, yellow and red cards, substitutions, with the minute) and both teams' **statistics** (shots, shots on target, corners, fouls, offsides, cards, saves, passes and completed passes, tackles, interceptions). Before kick-off, the report says so.

## Leagues

Ligue 1, Premier League, LaLiga, Serie A, Bundesliga, Ligue 2, Liga Portugal, Eredivisie, Champions League and Europa League, chosen from the list.

## Your team

Click the **star ☆** next to a team, in Matches or Standings, to make it your team: it gets its own tab, its matches come first, and its row is highlighted. Clicking again removes it.

## Schedule

Tick **Add my team's matches to my schedule**: its upcoming matches are added to the NeoDex calendar and refreshed every 3 hours (time changes included). Unticking the box removes them.

## The data

Matches, standings and match reports come from **ESPN**. Without a connection, a message says so.

## Data and sync

Your team, the chosen league and the schedule choice are stored by NeoDex, backed up and synced between your PCs when sync is on. The plugin only contacts ESPN's servers.

## Install

In NeoDex: **NeoStore → Discover → Football → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## Several teams

A team's ☆ star adds it to **My teams** (up to eight). Their games come first, all go into your schedule if you ticked it, and buttons at the top of the tab switch between them.

## Line-ups

In the match sheet, both starting elevens are drawn in pixel art on a pitch, in their positions and formation (4-3-3, 3-5-2…): club-coloured shirts, goalkeeper in yellow, number and name; ↓ marks a substituted player, and the players who came on are listed below.

## Live goals (1.2.0)

Tick **Tell me about every goal in my teams’ matches** (ticked by default): during a match of one of your teams, Football checks the score every minute, even closed, and sends a notification for every goal (“⚽ GOAL! Rennes · Rennes 1 - 0 Lille · 23' · the scorer”), including opponent goals and disallowed goals.

- **and about kick-off and the result** adds a notification at the start and at the end of the match (win, defeat or draw).
- **TRY** sends a sample notification.
- No request outside your teams’ matches: Football knows when they are played from their schedule (read again every 3 h).
- Your teams’ matches still go into your timetable if the first box is ticked.

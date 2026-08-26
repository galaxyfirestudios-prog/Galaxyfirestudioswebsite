export type RadioHost = { id: string; name: string; role: string; bio: string; };
export type RadioProgramme = { id: string; title: string; host?: string; hostId?: string; tagline: string; start: string; end: string; days: number[]; mood: string; };
export const RADIO_TIME_ZONE = "Africa/Lagos";
export const RADIO_HOSTS: RadioHost[] = [
  { id: "nebulae", name: "DJ NEBULAE", role: "THE EXPLORER · MAIN HOST", bio: "The voice at the centre of the station — moving between new African sounds, global records and the unexpected." },
  { id: "stirfry", name: "STIRFRY", role: "THE DISRUPTOR", bio: "No clean edges. No predictable combinations. STIRFRY throws the culture in the pot and sees what catches fire." },
  { id: "bigmooch", name: "BIGMOOCH", role: "THE NIGHT CREATURE", bio: "Late-night records, after-hours moods and sounds that make more sense when the city gets quiet." },
];
const WEEKDAYS = [1, 2, 3, 4, 5]; const SATURDAY = [6]; const SUNDAY = [0];
const programme = (item: Omit<RadioProgramme, "days"> & { days?: number[] }): RadioProgramme => ({ ...item, days: item.days || WEEKDAYS });
export const RADIO_PROGRAMMES: RadioProgramme[] = [
  programme({ id: "night-transmission", title: "NIGHT TRANSMISSION", tagline: "Low lights. Deep records. No rush.", start: "00:00", end: "03:00", mood: "after-hours", days: [0,1,2,3,4,5,6] }),
  programme({ id: "overnight-frequency", title: "OVERNIGHT FREQUENCY", tagline: "The station stays awake.", start: "03:00", end: "06:00", mood: "late-night", days: [0,1,2,3,4,5,6] }),
  programme({ id: "culture-wake-up", title: "THE CULTURE WAKE-UP", tagline: "Wake up. You're already late.", start: "06:00", end: "09:00", mood: "morning" }),
  programme({ id: "nebulae", title: "NEBULAE", host: "DJ NEBULAE", hostId: "nebulae", tagline: "Music for people who refuse to stay in one genre.", start: "09:00", end: "12:00", mood: "discovery" }),
  programme({ id: "culture-lunch", title: "THE CULTURE LUNCH", host: "DJ NEBULAE", hostId: "nebulae", tagline: "A midday collision of records, voices and new discoveries.", start: "12:00", end: "15:00", mood: "midday" }),
  programme({ id: "stirfry", title: "STIRFRY", host: "STIRFRY", hostId: "stirfry", tagline: "Everything goes in the pot.", start: "15:00", end: "18:00", mood: "chaos" }),
  programme({ id: "culture-drive", title: "THE CULTURE DRIVE", host: "DJ NEBULAE", hostId: "nebulae", tagline: "The city moves. The station moves with it.", start: "18:00", end: "21:00", mood: "energy" }),
  programme({ id: "bigmooch-after-dark", title: "BIGMOOCH AFTER DARK", host: "BIGMOOCH", hostId: "bigmooch", tagline: "Lights low. Volume up.", start: "21:00", end: "00:00", mood: "night" }),
  programme({ id: "weekend-starter", title: "THE WEEKEND STARTER", host: "DJ NEBULAE", hostId: "nebulae", tagline: "Saturday starts here.", start: "08:00", end: "11:00", mood: "weekend", days: SATURDAY }),
  programme({ id: "culture-club", title: "CULTURE CLUB", host: "STIRFRY", hostId: "stirfry", tagline: "New names. New records. New obsessions.", start: "11:00", end: "14:00", mood: "club", days: SATURDAY }),
  programme({ id: "open-rotation", title: "OPEN ROTATION", tagline: "The playlist has the keys.", start: "14:00", end: "18:00", mood: "open", days: SATURDAY }),
  programme({ id: "the-mix", title: "THE MIX", host: "BIGMOOCH", hostId: "bigmooch", tagline: "One room. One mix. No skipping.", start: "18:00", end: "21:00", mood: "mix", days: SATURDAY }),
  programme({ id: "saturday-after-dark", title: "BIGMOOCH AFTER DARK", host: "BIGMOOCH", hostId: "bigmooch", tagline: "Saturday night belongs to the night creatures.", start: "21:00", end: "00:00", mood: "night", days: SATURDAY }),
  programme({ id: "sunday-service", title: "SUNDAY SERVICE", host: "DJ NEBULAE", hostId: "nebulae", tagline: "A three-hour reset. No sermons required.", start: "09:00", end: "12:00", mood: "reset", days: SUNDAY }),
  programme({ id: "the-archive", title: "THE ARCHIVE", tagline: "Forgotten records. Essential records. Still-alive records.", start: "12:00", end: "15:00", mood: "archive", days: SUNDAY }),
  programme({ id: "diaspora-frequencies", title: "DIASPORA FREQUENCIES", host: "DJ NEBULAE", hostId: "nebulae", tagline: "One culture. Many coordinates.", start: "15:00", end: "18:00", mood: "diaspora", days: SUNDAY }),
  programme({ id: "sunday-reset", title: "THE SUNDAY RESET", host: "STIRFRY", hostId: "stirfry", tagline: "Slow down. Refill the tank.", start: "18:00", end: "21:00", mood: "slow", days: SUNDAY }),
  programme({ id: "sunday-night-transmission", title: "SUNDAY NIGHT TRANSMISSION", host: "BIGMOOCH", hostId: "bigmooch", tagline: "The week ends somewhere between sleep and sound.", start: "21:00", end: "00:00", mood: "experimental", days: SUNDAY }),
];
const minutes = (value: string) => { const [hour, minute] = value.split(":").map(Number); return hour * 60 + minute; };
const localParts = (date: Date) => { const formatter = new Intl.DateTimeFormat("en-US", { timeZone: RADIO_TIME_ZONE, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }); const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value])); const weekdayMap: Record<string, number> = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 }; return { day: weekdayMap[parts.weekday], minute: Number(parts.hour) * 60 + Number(parts.minute) }; };
const programmeForDay = (day: number) => RADIO_PROGRAMMES.filter(item => item.days.includes(day));
export const getCurrentProgramme = (date = new Date()): RadioProgramme => { const { day, minute } = localParts(date); const current = programmeForDay(day).find(item => { const start = minutes(item.start); const end = minutes(item.end) || 1440; return minute >= start && minute < end; }); return current || RADIO_PROGRAMMES.find(item => item.id === "overnight-frequency")!; };
export const getNextProgramme = (date = new Date()): RadioProgramme => { const current = getCurrentProgramme(date); const { day, minute } = localParts(date); const today = programmeForDay(day).sort((a,b) => minutes(a.start)-minutes(b.start)); const next = today.find(item => minutes(item.start) > minute); if (next) return next; const tomorrow = programmeForDay((day + 1) % 7).sort((a,b) => minutes(a.start)-minutes(b.start)); return tomorrow[0] || current; };
export const getTodaySchedule = (date = new Date()) => { const { day } = localParts(date); return programmeForDay(day).sort((a,b) => minutes(a.start)-minutes(b.start)); };
export const getHost = (hostId?: string) => RADIO_HOSTS.find(host => host.id === hostId);
export const formatRadioTime = (value: string) => { const [hour, minute] = value.split(":").map(Number); const suffix = hour >= 12 ? "PM" : "AM"; return `${hour % 12 || 12}:${String(minute).padStart(2,"0")} ${suffix}`; };

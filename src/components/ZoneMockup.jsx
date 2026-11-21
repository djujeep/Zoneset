import { useEffect, useState } from "react";

// "You" are the freelancer. Change this to any IANA timezone.
const YOU = "Africa/Lagos";

const CLIENTS = [
  { city: "London", tz: "Europe/London" },
  { city: "New York", tz: "America/New_York" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "Sydney", tz: "Australia/Sydney" },
];

const time = (d, tz) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(d);

const hour = (d, tz) =>
  Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "numeric", hour12: false }).format(d)) % 24;

const dateKey = (d, tz) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(d);

const dayLabel = (d, tz) => {
  const diff = Math.round((Date.parse(dateKey(d, tz)) - Date.parse(dateKey(d, YOU))) / 864e5);
  return diff === 0 ? "Today" : diff > 0 ? "Tomorrow" : "Yesterday";
};

export default function ZoneMockup() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-[22rem] rounded-2xl bg-white/80 p-5 shadow-xl backdrop-blur font-phone text-slate-800">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-base font-semibold">Your clients right now</h3>
        <span className="text-sm text-slate-500">You: {time(now, YOU)}</span>
      </div>

      <ul className="divide-y divide-slate-200">
        {CLIENTS.map(({ city, tz }) => {
          const h = hour(now, tz);
          const online = h >= 9 && h < 18;
          return (
            <li key={tz} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{city}</p>
                <p className="text-sm text-slate-500">{dayLabel(now, tz)}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold tabular-nums">{time(now, tz)}</p>
                <p className={`text-sm ${online ? "text-emerald-700" : "text-slate-500"}`}>
                  {online ? "Likely online" : "Likely offline"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-lg border border-[#c2410c]/30 bg-[#c2410c]/10 p-3 text-sm text-[#9a3412]">
        US public holiday on Thu, Nov 26. Your New York client may be offline.
      </div>
    </div>
  );
}
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorldCupMatch } from "@/app/page";
import { TeamType } from "./TeamList";
import { object } from "zod/v4";

interface MatchCardProps {
  match: WorldCupMatch;
  homeTeam: TeamType;
  awayTeam: TeamType;
}

export function MatchCard({ match, homeTeam, awayTeam }: MatchCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline">Group {match.group}</Badge>

          <Badge variant={match.finished !== "FALSE" ? "secondary" : "default"}>
            {match.finished !== "FALSE" ? "Finished" : "Upcoming"}
          </Badge>
        </div>

        {/* Match */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          {/* Home */}
          <div className="flex flex-col items-end gap-2">
            {homeTeam?.flag && (
              <Image
                src={homeTeam.flag}
                alt={homeTeam.name_en}
                width={72}
                height={54}
                className="rounded border"
              />
            )}
            <div className="text-right">
              <h3 className="font-semibold">{homeTeam?.name_en}</h3>

              <p className="text-sm text-muted-foreground">
                {homeTeam?.fifa_code}
              </p>
            </div>

            {match.finished === "TRUE" && Number(match.home_score) > 0 && (
              <div>
                <ScorersCard rawData={match.home_scorers} />
              </div>
            )}
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-4xl font-bold">
              {match.home_score}
              <span className="mx-3 text-muted-foreground">:</span>
              {match.away_score}
            </div>

            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              Matchday {match.matchday}
            </p>
          </div>

          {/* Away */}
          <div className="flex flex-col items-start gap-2">
            {awayTeam?.flag && (
              <Image
                src={awayTeam.flag}
                alt={awayTeam?.name_en}
                width={72}
                height={54}
                className="rounded border"
              />
            )}

            <div>
              <h3 className="font-semibold">{awayTeam?.name_en}</h3>

              <p className="text-sm text-muted-foreground">
                {awayTeam?.fifa_code}
              </p>
            </div>

            {match.finished === "TRUE" && Number(match.away_score) > 0 && (
              <div>
                <ScorersCard rawData={match.away_scorers} />
              </div>
            )}
          </div>
        </div>

        <div className="border-t" />

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="flex items-center justify-start gap-3">
            <span className="font-bold">
              {formatIncomingDate(match.local_date)}
            </span>
            <span>{new Date(match.local_date).toDateString()}</span>
          </p>

          <div className="flex gap-2">
            <Badge variant="secondary">{homeTeam?.iso2}</Badge>
            <Badge variant="secondary">{awayTeam?.iso2}</Badge>
          </div>

          <span>Stadium #{match.stadium_id}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function getUserTimezone() {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return userTimeZone;
}

function formatIncomingDate(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [month, day, year] = datePart.split("/");
  const isoString = `${year}-${month}-${day}T${timePart}:00`;

  const absoluteDate = new Date(`${isoString}-04:00`);

  const hours = absoluteDate.getHours();

  return absoluteDate.getHours() > 18
    ? `ምሸት ${hours - 18} ` + "ሰዓት"
    : `ለይቲ ${hours + 6} ` + "ሰዓት";
}

function ScorersCard({ rawData }: { rawData: string }) {
  // 1. Clean the invalid formatting into valid JSON syntax
  const fixedJson = `[${rawData.replace(/"\s*,\s*"/g, '","')}]`;

  // Safely handle whatever the database sends (string, array, or undefined)
  let scorers: string[] = [];

  if (typeof fixedJson === "string") {
    // Use regex to find everything wrapped in double quotes
    const matches = fixedJson.match(/"([^"]+)"/g);

    if (matches) {
      // Strip the double quotes out of the matched strings
      scorers = matches.map((item) => item.replace(/"/g, ""));
    }
  } else if (Array.isArray(fixedJson)) {
    scorers = fixedJson;
  }

  return (
    <div style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
      {scorers.map((scorer, index) => (
        <div key={index} style={{ marginBottom: "4px" }}>
          ⚽ {scorer}
        </div>
      ))}
    </div>
  );
}

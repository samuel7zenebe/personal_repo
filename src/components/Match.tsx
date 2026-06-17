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

function formatIncomingDate(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [month, day, year] = datePart.split("/");
  const isoString = `${year}-${month}-${day}T${timePart}:00`;

  const absoluteDate = new Date(`${isoString}-04:00`);

  const hours = absoluteDate.getHours();

  return absoluteDate.toLocaleTimeString();
}

function ScorersCard({
  rawData,
  align = "left",
}: {
  rawData: string;
  align?: "left" | "right";
}) {
  const fixedJson = `[${rawData.replace(/"\s*,\s*"/g, '","')}]`;

  const matches = fixedJson.match(/"([^"]+)"/g) ?? [];

  const scorers = matches.map((item) => item.replace(/"/g, ""));

  if (scorers.length === 0) return null;

  return (
    <div
      className={`space-y-1 text-sm ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {scorers.map((scorer, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          {align === "left" && <span>⚽</span>}
          <span>{scorer}</span>
          {align === "right" && <span>⚽</span>}
        </div>
      ))}
    </div>
  );
}

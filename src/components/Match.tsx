import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorldCupMatch } from "@/app/page";
import { TeamType } from "./TeamList";

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
          </div>
        </div>

        <div className="border-t" />

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{match.local_date}</span>

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

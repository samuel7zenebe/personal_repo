import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorldCupMatch } from "../app/page";
import { TeamType } from "@/components/TeamList";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: WorldCupMatch;
  homeTeam?: TeamType;
  awayTeam?: TeamType;
}

function TeamDisplay({
  team,
  fallback,
  align = "left",
}: {
  team?: TeamType;
  fallback: string;
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div
      className={cn("flex flex-1 items-center gap-2", isRight && "justify-end")}
    >
      {!isRight && (
        <>
          {team ? (
            <Image
              src={team.flag}
              alt={team.name_en}
              width={24}
              height={18}
              className="rounded"
            />
          ) : (
            <div className="h-[18px] w-6 rounded bg-muted" />
          )}

          <span className="truncate text-sm font-medium">
            {team?.name_en ?? fallback}
          </span>
        </>
      )}

      {isRight && (
        <>
          <span className="truncate text-right text-sm font-medium">
            {team?.name_en ?? fallback}
          </span>

          {team ? (
            <Image
              src={team.flag}
              alt={team.name_en}
              width={24}
              height={18}
              className="rounded"
            />
          ) : (
            <div className="h-[18px] w-6 rounded bg-muted" />
          )}
        </>
      )}
    </div>
  );
}

export function MatchCard({ match, homeTeam, awayTeam }: MatchCardProps) {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <TeamDisplay team={homeTeam} fallback={match.home_team_name_en} />

        <div className="flex flex-col items-center">
          {match.finished === "TRUE" && (
            <span className="text-lg font-bold">
              {match.home_score} - {match.away_score}
            </span>
          )}

          <Badge
            variant={match.finished !== "FALSE" ? "secondary" : "outline"}
            className="mt-1 text-[10px]"
          >
            {match.finished !== "FALSE" ? "FT" : `G${match.group}`}
          </Badge>
        </div>

        <TeamDisplay
          team={awayTeam}
          fallback={match.away_team_name_en}
          align="right"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{match.local_date}</span>

        <span>MD {match.matchday}</span>
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WorldCupMatch } from "@/app/page";
import { TeamType } from "./TeamList";

interface MatchCardProps {
  match: WorldCupMatch;
  homeTeam: TeamType;
  awayTeam: TeamType;
}

export function MatchCard({ match, homeTeam, awayTeam }: MatchCardProps) {
  const isFinished = match.finished === "TRUE";
  const homeScore = Number(match.home_score);
  const awayScore = Number(match.away_score);
  const homeWins = isFinished && homeScore > awayScore;
  const awayWins = isFinished && awayScore > homeScore;

  return (
    <Card className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-xl hover:shadow-black/5">
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-border/80 font-medium text-muted-foreground"
          >
            Group {match.group}
          </Badge>
          <MatchStatusBadge isFinished={isFinished} />
        </div>

        {/* Match */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
          <TeamColumn
            team={homeTeam}
            align="right"
            scorersRaw={
              isFinished && homeScore > 0 ? match.home_scorers : undefined
            }
            isWinner={homeWins}
            faded={awayWins}
          />

          <ScorePanel
            homeScore={match.home_score}
            awayScore={match.away_score}
            isFinished={isFinished}
            matchday={match.matchday}
          />

          <TeamColumn
            team={awayTeam}
            align="left"
            scorersRaw={
              isFinished && awayScore > 0 ? match.away_scorers : undefined
            }
            isWinner={awayWins}
            faded={homeWins}
          />
        </div>

        <div className="border-t border-border/60" />

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">
              {formatMatchTime(match.local_date)}
            </span>
            <span>{formatMatchDate(match.local_date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {homeTeam?.iso2}
            </Badge>
            <span className="text-xs text-muted-foreground/60">vs</span>
            <Badge variant="secondary" className="font-mono text-xs">
              {awayTeam?.iso2}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Stadium #{match.stadium_id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MatchStatusBadge({ isFinished }: { isFinished: boolean }) {
  return (
    <Badge
      variant={isFinished ? "secondary" : "default"}
      className="gap-1.5 font-medium"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isFinished
            ? "bg-muted-foreground"
            : "animate-pulse bg-primary-foreground",
        )}
      />
      {isFinished ? "Finished" : "Upcoming"}
    </Badge>
  );
}

function ScorePanel({
  homeScore,
  awayScore,
  isFinished,
  matchday,
}: {
  homeScore: string;
  awayScore: string;
  isFinished: boolean;
  matchday: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-2">
      <div className="flex items-center gap-3 text-4xl font-bold tabular-nums">
        <span className={cn(!isFinished && "text-muted-foreground/40")}>
          {isFinished ? homeScore : "–"}
        </span>
        <span className="text-xl font-normal text-muted-foreground/40">:</span>
        <span className={cn(!isFinished && "text-muted-foreground/40")}>
          {isFinished ? awayScore : "–"}
        </span>
      </div>
      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Matchday {matchday}
      </span>
    </div>
  );
}

function TeamColumn({
  team,
  align,
  scorersRaw,
  isWinner,
  faded,
}: {
  team: TeamType;
  align: "left" | "right";
  scorersRaw?: string;
  isWinner: boolean;
  faded: boolean;
}) {
  const isRight = align === "right";

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 transition-opacity",
        isRight ? "items-end text-right" : "items-start text-left",
        faded && "opacity-60",
      )}
    >
      <FlagImage team={team} isWinner={isWinner} />

      <div>
        <h3 className="font-semibold leading-tight">{team?.name_en}</h3>
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          {team?.fifa_code}
        </p>
      </div>

      {scorersRaw && <ScorersList rawData={scorersRaw} align={align} />}
    </div>
  );
}

function FlagImage({ team, isWinner }: { team: TeamType; isWinner: boolean }) {
  const [errored, setErrored] = useState(false);

  if (!team?.flag || errored) {
    return (
      <div className="flex h-[54px] w-[72px] items-center justify-center rounded border bg-muted text-sm font-semibold text-muted-foreground">
        {team?.fifa_code ?? "—"}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={team.flag}
        alt={team.name_en}
        width={72}
        height={54}
        onError={() => setErrored(true)}
        className={cn(
          "rounded border object-cover transition-transform duration-300 group-hover:scale-[1.03]",
          isWinner &&
            "ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
      />
      {isWinner && (
        <Trophy className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-background p-0.5 text-primary drop-shadow" />
      )}
    </div>
  );
}

function ScorersList({
  rawData,
  align,
}: {
  rawData: string;
  align: "left" | "right";
}) {
  const scorers = parseScorers(rawData);
  if (scorers.length === 0) return null;

  const isRight = align === "right";

  return (
    <div
      className={cn(
        "space-y-1 text-xs text-muted-foreground",
        isRight ? "text-right" : "text-left",
      )}
    >
      {scorers.map((scorer, index) => (
        <div
          key={`${scorer}-${index}`}
          className={cn(
            "flex items-center gap-1.5",
            isRight ? "justify-end" : "justify-start",
          )}
        >
          {!isRight && <span aria-hidden>⚽</span>}
          <span>{scorer}</span>
          {isRight && <span aria-hidden>⚽</span>}
        </div>
      ))}
    </div>
  );
}

function parseScorers(rawData: string): string[] {
  try {
    const fixed = `[${rawData.replace(/"\s*,\s*"/g, '","')}]`;
    const matches = fixed.match(/"([^"]+)"/g) ?? [];
    return matches.map((item) => item.replace(/"/g, ""));
  } catch {
    return [];
  }
}

function parseMatchDate(dateString: string): Date {
  const [datePart, timePart] = dateString.split(" ");
  const [month, day, year] = datePart.split("/");
  const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}:00-04:00`;
  return new Date(isoString);
}

function formatMatchTime(dateString: string): string {
  return parseMatchDate(dateString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatMatchDate(dateString: string): string {
  return parseMatchDate(dateString).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

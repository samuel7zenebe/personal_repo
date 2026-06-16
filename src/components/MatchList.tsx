"use client";

import { MatchCard } from "@/components/Match";
import TeamList, { TeamType } from "@/components/TeamList";
import teamsData from "@/Data/teamsData.json";
import { MatchCard as SmallMatchCard } from "./MatchCard2";
import { WorldCupMatch } from "@/app/page";
import { useState } from "react";
import { Badge } from "./ui/badge";

export default function MatchList({
  data,
}: {
  data: { games: WorldCupMatch[] };
}) {
  const [matchFilter, setMatchFilter] = useState<
    "upcoming" | "finished" | "all"
  >("all");

  return (
    <div>
      <div className="m-3">
        {["upcoming", "finished", "all"].map((matchType, idx) => (
          <Badge
            key={idx}
            variant={matchType === matchFilter ? "default" : "ghost"}
            className="p-2 grid-cols-3 cursor-pointer w-fit  min-w-20  "
            onClick={() => {
              setMatchFilter(matchType as "upcoming" | "finished" | "all");
            }}
          >
            {matchType}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-4 ">
        {data.games
          .filter((match) =>
            matchFilter === "all"
              ? true
              : matchFilter === "finished"
                ? match.finished === "TRUE"
                : match.finished === "FALSE",
          )
          .sort(
            (match1, match2) =>
              new Date(match1.local_date).getTime() -
              new Date(match2.local_date).getTime(),
          )
          .map((match: WorldCupMatch) => (
            <MatchCard
              awayTeam={
                teamsData.find(
                  (team) => match.away_team_id === team.id,
                ) as TeamType
              }
              homeTeam={
                teamsData.find(
                  (team) => match.home_team_id === team.id,
                ) as TeamType
              }
              key={match.id}
              match={match}
            />
            // <SmallMatchCard
            //   awayTeam={
            //     teamsData.find(
            //       (team) => match.away_team_id === team.id,
            //     ) as TeamType
            //   }
            //   homeTeam={
            //     teamsData.find(
            //       (team) => match.home_team_id === team.id,
            //     ) as TeamType
            //   }
            //   key={match.id}
            //   match={match}
            // />
          ))}
      </div>
    </div>
  );
}

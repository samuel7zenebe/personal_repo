"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TeamType } from "./TeamList";

interface StandingTeamStats {
  team_id: string;
  mp: string;
  w: string;
  l: string;
  d: string;
  pts: string;
  gf: string;
  ga: string;
  gd: string;
  _id: string;
}

export interface StandingsGroup {
  _id: string;
  name: string;
  teams: StandingTeamStats[];
}

interface GroupStandingsProps {
  groups: StandingsGroup[];
  teamsById: Record<string, TeamType>;
  qualifySpots?: number;
}

export function GroupStandings({
  groups,
  teamsById,
  qualifySpots = 2,
}: GroupStandingsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {groups.map((group) => (
        <GroupStandingsCard
          key={group._id}
          group={group}
          teamsById={teamsById}
          qualifySpots={qualifySpots}
        />
      ))}
    </div>
  );
}

function GroupStandingsCard({
  group,
  teamsById,
  qualifySpots,
}: {
  group: StandingsGroup;
  teamsById: Record<string, TeamType>;
  qualifySpots: number;
}) {
  const ranked = [...group.teams].sort((a, b) => {
    if (Number(b.pts) !== Number(a.pts)) return Number(b.pts) - Number(a.pts);
    if (Number(b.gd) !== Number(a.gd)) return Number(b.gd) - Number(a.gd);
    return Number(b.gf) - Number(a.gf);
  });

  return (
    <Card className="overflow-hidden border-border/60">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 bg-muted/40 py-4">
        <h3 className="font-semibold">Group {group.name}</h3>
        <span className="text-xs text-muted-foreground">
          Top {qualifySpots} advance
        </span>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">MP</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center font-semibold">Pts</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ranked.map((stat, index) => {
                const team = teamsById[stat.team_id];
                const qualifies = index < qualifySpots;
                const gd = Number(stat.gd);

                return (
                  <TableRow
                    key={stat._id}
                    className={cn(
                      "border-border/40 transition-colors hover:bg-muted/50",
                      qualifies && "bg-primary/[0.03]",
                    )}
                  >
                    <TableCell className="text-center">
                      <span
                        className={cn(
                          "inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums",
                          qualifies
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {index + 1}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <FlagThumb team={team} />
                        <div>
                          <p className="text-sm font-medium leading-tight">
                            {team?.name_en ?? "Unknown"}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {team?.fifa_code}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.mp}
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.w}
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.d}
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.l}
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.gf}
                    </TableCell>
                    <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                      {stat.ga}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-center text-sm font-medium tabular-nums",
                        gd > 0 && "text-emerald-600 dark:text-emerald-400",
                        gd < 0 && "text-red-500 dark:text-red-400",
                        gd === 0 && "text-muted-foreground",
                      )}
                    >
                      {gd > 0 ? `+${gd}` : gd}
                    </TableCell>
                    <TableCell className="text-center text-sm font-bold tabular-nums">
                      {stat.pts}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function FlagThumb({ team }: { team?: TeamType }) {
  const [errored, setErrored] = useState(false);

  if (!team?.flag || errored) {
    return (
      <div className="flex h-5 w-7 items-center justify-center rounded-sm border bg-muted text-[9px] font-semibold text-muted-foreground">
        {team?.fifa_code?.slice(0, 2) ?? "—"}
      </div>
    );
  }

  return (
    <Image
      src={team.flag}
      alt={team.name_en}
      width={28}
      height={20}
      onError={() => setErrored(true)}
      className="rounded-sm border object-cover"
    />
  );
}

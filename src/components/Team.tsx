import Image from "next/image";
import type { TeamType as Team } from "./TeamList";
import { Card, CardContent } from "./ui/card";

export default function Team(team: Team) {
  return (
    <>
      <Card key={team._id} className="transition-shadow hover:shadow-lg">
        <CardContent className="flex items-center gap-4 p-4">
          <Image
            src={team.flag}
            alt={team.name_en}
            width={64}
            height={48}
            className="rounded border object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{team.name_en}</h3>

            <p className="text-sm text-muted-foreground">{team.fifa_code}</p>

            <div className="mt-2 flex items-center justify-between">
              <span className="rounded bg-muted px-2 py-1 text-xs">
                Group {team.groups}
              </span>

              <span className="text-xs text-muted-foreground">{team.iso2}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

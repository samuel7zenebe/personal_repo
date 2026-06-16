import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Team from "./Team";

export type WorldCupGroup =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

export interface TeamType {
  _id: string;
  name_en: string;
  name_fa: string;
  flag: string;
  fifa_code: string;
  iso2: string;
  groups: WorldCupGroup;
  id: string;
}

interface TeamListProps {
  teams: TeamType[];
}

export default function TeamList({ teams }: TeamListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <Team key={team.id} {...team} />
      ))}
    </div>
  );
}

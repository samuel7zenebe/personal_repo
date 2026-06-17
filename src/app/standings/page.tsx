import { GroupStandings, StandingsGroup } from "@/components/Standings";
import { TeamType } from "@/components/TeamList";
import { Button } from "@/components/ui/button";
import teamsData from "@/Data/teamsData.json";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function Page() {
  try {
    const response = await fetch("https://worldcup26.ir/get/groups", {
      method: "GET",
      cache: "no-store",
    });
    const standings: {
      groups: StandingsGroup[];
    } = await response.json();

    const teamsById: Record<string, TeamType> = Object.fromEntries(
      teamsData.map((team) => [team.id, team as TeamType]),
    );

    return (
      <>
        <div>
          <div className="flex items-center justify-start gap-2">
            <div>
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
            </div>
            <h1 className="px-3 text-xl italic"> Standings as it is </h1>
          </div>
          <GroupStandings groups={standings.groups} teamsById={teamsById} />
        </div>
      </>
    );
  } catch (err: any) {
    console.log(" Error: ", err);
    return (
      <div className="w-full  mx-auto text-2xl italic font-bold p-10 bg-red-200 text-red-900">
        <h1> Something went wrong , most probably fetch failed.</h1>
        {err?.message && <pre>{JSON.stringify(err)}</pre>}
        <Button variant={"link"} className="block">
          <Link href={"/standings"}> Refresh </Link>
        </Button>
      </div>
    );
  }
}

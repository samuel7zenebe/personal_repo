import MatchList from "@/components/MatchList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface WorldCupMatch {
  _id: string;
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  home_scorers: string;
  away_scorers: string;
  group: string;
  matchday: string;
  local_date: string;
  persian_date: string;
  stadium_id: string;
  finished: "TRUE" | "FALSE";
  time_elapsed: string;
  type: string;
  home_team_name_en: string;
  home_team_name_fa: string;
  away_team_name_en: string;
  away_team_name_fa: string;
}

export interface WorldCupMatchesResponse {
  success: boolean;
  data: WorldCupMatch[];
}

export const dynamic = "force-dynamic";

async function Page() {
  try {
    const response = await fetch("https://worldcup26.ir/get/games", {
      method: "GET",
      cache: "no-store",
    });
    const data: {
      games: WorldCupMatch[];
    } = await response.json();

    return (
      <div className="w-full flex flex-col justify-center items-center">
        {/* <TeamList teams={teamsData as TeamType[]} /> */}

        <MatchList data={data} />
      </div>
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

export default Page;

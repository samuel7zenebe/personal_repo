import MatchList from "@/components/MatchList";

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
async function Page() {
  const response = await fetch("https://worldcup26.ir/get/games", {
    method: "GET",
    cache: "force-cache",
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
}

export default Page;

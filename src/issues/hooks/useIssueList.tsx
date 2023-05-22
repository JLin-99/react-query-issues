import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubAPI } from "../../api/githubAPI";

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubAPI.get<Issue[]>("/issues");
  console.log(data);
  return data;
};

export const useIssueList = () => {
  const issuesQuery = useQuery(["issues"], getIssues);

  return {
    issuesQuery,
  };
};

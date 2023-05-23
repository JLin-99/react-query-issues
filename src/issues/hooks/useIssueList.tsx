import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";

interface useIssueListProps {
  state?: State;
  labels: string[];
}

const getIssues = async (
  labels: string[] = [],
  state?: State
): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssueList = ({ state, labels }: useIssueListProps) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );

  return {
    issuesQuery,
  };
};

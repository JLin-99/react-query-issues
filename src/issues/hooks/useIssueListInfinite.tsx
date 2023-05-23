import { useInfiniteQuery } from "@tanstack/react-query";
import { sleep } from "../../helpers/sleep";
import { githubAPI } from "../../api/githubAPI";
import { Issue } from "../interfaces";

interface useIssueListInfiniteProps {
  state?: string;
  labels: string[];
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | useIssueListInfiniteProps)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps) => {
  const [, , args] = queryKey;
  const { state, labels } = args as useIssueListInfiniteProps;

  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssueListInfinite = ({
  state,
  labels,
}: useIssueListInfiniteProps) => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.length) return;

        return pages.length + 1;
      },
    }
  );
  return {
    issuesQuery,
  };
};

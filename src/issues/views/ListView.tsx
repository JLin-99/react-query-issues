import { useState } from "react";

import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

import { useIssueList } from "../hooks";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssueList();

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList issues={issuesQuery.data || []} />
        )}
      </div>

      <div className="col-4">
        <LabelPicker
          onChange={(label) => onLabelChanged(label)}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};

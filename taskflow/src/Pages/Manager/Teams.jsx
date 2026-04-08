import React, { lazy } from "react";
const TeamTable = lazy(() => import("../../Components/Table/TeamTable"));

const Teams = () => {
  return (
    <div>
      <TeamTable />
    </div>
  );
};

export default Teams;

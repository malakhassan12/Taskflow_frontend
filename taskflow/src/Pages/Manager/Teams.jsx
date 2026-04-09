import { lazy } from "react";
const TeamTable = lazy(() => import("../../Components/Table/TeamTable"));

const Teams = () => {
  return (
    <div  data-aos="flip-up">
      <TeamTable />
    </div>
  );
};

export default Teams;

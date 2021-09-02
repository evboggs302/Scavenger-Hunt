import { useSelector } from "react-redux";

const TempLandingPage = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return <div>Temp Landing PAGE</div>;
};
export default TempLandingPage;

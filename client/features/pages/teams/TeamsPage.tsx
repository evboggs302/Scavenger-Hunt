import { useEffect, useState, Fragment } from "react";
import { useAppSelector, useAppDispatch } from "@dux/stateHooks";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { setTeams } from "../../../dux/reducers/teamsReducer";
import { createTeams, fetchTeamsByHunt } from "../../../utils/apiUtils";

const TeamsPage = () => {
  const state = useAppSelector((state) => state);
  const [teamsExist, setTeamsExist] = useState(false);
  const [teamsNumber, setTeamNum] = useState(0);
  const [teams, setTempTeams] = useState([]);
  const [saveReady, setReady] = useState(false);
  const dispatch = useAppDispatch();
  let history = useHistory();

  useEffect(() => {
    if (!state.hunt._id) {
      history.push("/");
    }
    if (state.teams.length > 0) {
      setTeamsExist(true);
    }
  }, []);

  useEffect(() => {
    let keyCount = 0;
    for (let i = 0; i < teams.length; i++) {
      keyCount += Object.keys(teams[i]).length;
    }
    const hasKeys = teams.length * 2 === keyCount && teams.length > 0;
    if (hasKeys) {
      setReady(true);
    }
  }, [teams]);

  useEffect(() => {
    let tempTeams = [];
    for (let i = 0; i < teamsNumber; i++) {
      tempTeams.push({});
    }
    setTempTeams(tempTeams);
  }, [teamsNumber]);

  const updateTeamMembers = (value, dex) => {
    let copy = teams.slice();
    copy[dex].members = value.split(",").map((el) => el.trim());
    setTempTeams(copy);
  };
  const updateTeamPhone = (value, dex) => {
    let copy = teams.slice();
    copy[dex].phone = value;
    setTempTeams(copy);
  };

  const mappedTeamTemplates = teams.map((el, dex) => {
    return (
      <Fragment key={dex + 1}>
        <textarea
          name="clueText"
          id={dex}
          placeholder="MEMBERS (comma separated)"
          cols="30"
          rows="10"
          onChange={(e) => updateTeamMembers(e.target.value, dex)}
          required></textarea>
        <br />
        PHONE NUMBER:{" "}
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          onChange={(e) => updateTeamPhone(e.target.value, dex)}
        />
        <small>Format: 123-456-7890</small>
        <br />
      </Fragment>
    );
  });

  const teamStatus = useQuery("teams", async () => {
    const data = await fetchTeamsByHunt(state.hunt._id);
    return data[0].teams;
  });

  const saveTeams = async () => {
    const { data } = await createTeams(state.hunt._id, teams);
    dispatch(setTeams(data[0].teams));
    setTeamsExist(true);
    return;
  };

  console.log(teamStatus);
  return (
    <div>
      {!teamsExist ? (
        <>
          <section>Create your teams below.</section>
          <br />
          <span>
            <div>How many teams?</div>
            <input
              type="number"
              onChange={(e) => setTeamNum(+e.target.value)}
            />
          </span>
        </>
      ) : null}
      <br />
      {!teamsExist ? (
        <span>{mappedTeamTemplates}</span>
      ) : (
        <span>
          {teamStatus.isLoading && <p>Loading Teams...</p>}
          {teamStatus.status === "success" &&
            teamStatus.data.map((el) => {
              return (
                <div key={el._id}>
                  <h4>
                    MEMBERS: <em>{el.members.join(", ")}</em>
                  </h4>
                  <p>
                    Last Clue Sent: <em>{el.lastClue_sent}</em>
                  </p>
                  <p>
                    Recal Message Sent: <em>{el.recall_sent ? "Yes" : "No"}</em>
                  </p>
                </div>
              );
            })}
        </span>
      )}
      {!teamsExist && saveReady && (
        <button onClick={saveTeams}>Save Teams</button>
      )}
    </div>
  );
};
export default TeamsPage;

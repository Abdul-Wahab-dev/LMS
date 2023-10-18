import React, { useEffect } from "react";
import { FormSelect, FormFeedback } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { getPrograms } from "../actions/programAndAction";
function Program(props) {
  const programs = useSelector((state) => state.programAndBatch.programs);
  // initialize useDispatch()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrograms());
  }, []);
  return (
    <>
      <FormSelect
        value={props.program}
        defaultValue={props.program}
        onChange={(e) => props.setProgram(e.target.value)}
        required
        invalid={
          props.errors &&
          props.errors.validation &&
          props.errors.validation.program &&
          true
        }
      >
        {programs.length > 0 ? (
          <>
            <option value="">Choose</option>{" "}
            {programs.map((pro) => (
              <option key={pro._id} value={pro.program.toLowerCase()}>
                {pro.program}
              </option>
            ))}
          </>
        ) : (
          <option>Loading...</option>
        )}
        {props.errors &&
          props.errors.validation &&
          props.errors.validation.program && (
            <FormFeedback>{props.errors.validation.program}</FormFeedback>
          )}
      </FormSelect>
    </>
  );
}
export default Program;

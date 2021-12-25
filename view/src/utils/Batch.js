import React, { useEffect } from "react";
import { FormSelect, FormFeedback } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { getBatchs } from "../actions/programAndAction";
function batch(props) {
  const batchs = useSelector(state => state.programAndBatch.batchs);
  // initialize useDispatch()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBatchs());
  }, []);
  return (
    <>
      <FormSelect
        value={props.batch}
        onChange={e => props.setBatch(e.target.value)}
        required
        invalid={
          props.errors &&
          props.errors.validation &&
          props.errors.validation.batch &&
          true
        }
      >
        {batchs.length > 0 ? (
          <>
            <option value="">Choose Batch...</option>{" "}
            {batchs.map(batch => (
              <option key={batch._id} value={batch.batch}>
                {batch.batch}
              </option>
            ))}
          </>
        ) : (
          <option>Loading...</option>
        )}
        {props.errors &&
          props.errors.validation &&
          props.errors.validation.batch && (
            <FormFeedback>{props.errors.validation.batch}</FormFeedback>
          )}
      </FormSelect>
    </>
  );
}
export default batch;

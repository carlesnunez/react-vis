import React from 'react';

export function useStateByRow(rows) {
  return React.useMemo(() => {
    let stateByRow = [];

    rows.forEach((row, rowIndex) => {
      const earlierRowState = stateByRow[rowIndex - 1] || [];
      let stateForThisRow = [...earlierRowState];

      row.forEach((node) => {
        if (
          node.ownsState &&
          !stateForThisRow.includes(node.ownsState)
        ) {
          stateForThisRow.push(node.ownsState);
        }
      });

      stateByRow.push(stateForThisRow);
    });

    return stateByRow;
  }, [rows]);
}
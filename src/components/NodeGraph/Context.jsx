import React from 'react';

const Context = React.createContext({});

export function Provider({ wrapperRef, groupId, onContextChange, onParentPropagation, contextPropagation, parentPropagation, children }) {
  const domNodes = React.useRef({});

  const value = React.useMemo(() => {
    return {
      domNodes,
      groupId,
      wrapperRef,
      onContextChange,
      onParentPropagation,
      contextPropagation,
      parentPropagation,
    };
  }, [groupId, wrapperRef, onContextChange, onParentPropagation, contextPropagation, parentPropagation]);

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

export default Context;
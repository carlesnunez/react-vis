import React from 'react';

const Context = React.createContext({});

export function Provider({ wrapperRef, groupId, children }) {
  const domNodes = React.useRef({});

  const value = React.useMemo(() => {
    return {
      domNodes,
      groupId,
      wrapperRef,
    };
  }, [groupId, wrapperRef]);

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

export default Context;
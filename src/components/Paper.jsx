// NOTE: Going forwards, I should use ColorModeContainer directly. This feels like too silly an abstraction. There are 100+ callsites though, so I'm not worrying about it for now.

import React from "react";
import ColorModeContainer from "./ColorModeContainer";

const Paper = React.forwardRef((props, ref) => {
  return <ColorModeContainer ref={ref} colorMode="light" {...props} />;
});

export default Paper;
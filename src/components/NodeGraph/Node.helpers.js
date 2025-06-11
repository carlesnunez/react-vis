import React from 'react';

import Context from './Context';

export function useParentPath({
  actualId,
  parentId,
  nodeRef,
  alignment,
}) {
  const [parentPath, setParentPath] = React.useState(null);
  const { domNodes, wrapperRef } = React.useContext(Context);

  React.useEffect(() => {
    function runEffect() {
      // Store this node in the big index
      domNodes.current[actualId] = nodeRef;

      // We want to draw a path from this node to its parent,
      // if applicable
      const parentNode = domNodes.current[parentId];
      if (!parentNode?.current || !wrapperRef?.current) {
        return;
      }

      const wrapperBox = wrapperRef.current.getBoundingClientRect();

      const parentBox = parentNode.current.getBoundingClientRect();
      const relativeParentBox = {
        top: parentBox.top - wrapperBox.top,
        left: parentBox.left - wrapperBox.left,
        right: parentBox.left - wrapperBox.left + parentBox.width,
        bottom: parentBox.top - wrapperBox.top + parentBox.height,
        width: parentBox.width,
        height: parentBox.height,
      };
      relativeParentBox.centerX =
        relativeParentBox.left + relativeParentBox.width / 2;
      relativeParentBox.centerY =
        relativeParentBox.top + relativeParentBox.height / 2;

      const nodeBox = nodeRef.current.getBoundingClientRect();
      const relativeNodeBox = {
        top: nodeBox.top - wrapperBox.top,
        left: nodeBox.left - wrapperBox.left,
        right: nodeBox.left - wrapperBox.left + nodeBox.width,
        bottom: nodeBox.top - wrapperBox.top + nodeBox.height,
        width: nodeBox.width,
        height: nodeBox.height,
      };
      relativeNodeBox.centerX =
        relativeNodeBox.left + relativeNodeBox.width / 2;
      relativeNodeBox.centerY =
        relativeNodeBox.top + relativeNodeBox.height / 2;

      const PATH_GAP = 8;

      // We want to modify the path depending on whether it's
      // straight up/down, going up+right, or going up+left
      if (alignment === 'center') {
        const xStart = relativeNodeBox.centerX;
        const yStart = relativeNodeBox.top - PATH_GAP;
        const xEnd = relativeParentBox.centerX;
        const yEnd = relativeParentBox.bottom + PATH_GAP;

        setParentPath(`
          M ${xStart} ${yStart}
          L ${xEnd}   ${yEnd}
        `);
      } else if (alignment === 'left') {
        // Going up and to the right
        const xStart =
          relativeNodeBox.left + relativeNodeBox.width * 0.66;
        const yStart = relativeNodeBox.top - PATH_GAP;

        const xPoint1 =
          relativeNodeBox.left + relativeNodeBox.width * 0.66;
        const yPoint1 = relativeParentBox.bottom + PATH_GAP;
        const xPoint2 =
          relativeParentBox.left + relativeParentBox.width * 0.4;
        const yPoint2 = relativeNodeBox.top - PATH_GAP;

        const xEnd =
          relativeParentBox.left + relativeParentBox.width * 0.45;
        const yEnd = relativeParentBox.bottom + PATH_GAP;

        setParentPath(`
          M ${xStart}  ${yStart}
          C ${xPoint1} ${yPoint1}
            ${xPoint2} ${yPoint2}
            ${xEnd}    ${yEnd}
        `);
      } else {
        // Going up and to the right
        const xStart =
          relativeNodeBox.left + relativeNodeBox.width * 0.33;
        const yStart = relativeNodeBox.top - PATH_GAP;

        const xPoint1 =
          relativeNodeBox.left + relativeNodeBox.width * 0.33;
        const yPoint1 = relativeParentBox.bottom + PATH_GAP;
        const xPoint2 =
          relativeParentBox.left + relativeParentBox.width * 0.6;
        const yPoint2 = relativeNodeBox.top - PATH_GAP;

        const xEnd =
          relativeParentBox.left + relativeParentBox.width * 0.55;
        const yEnd = relativeParentBox.bottom + PATH_GAP;

        setParentPath(`
          M ${xStart}  ${yStart}
          C ${xPoint1} ${yPoint1}
            ${xPoint2} ${yPoint2}
            ${xEnd}    ${yEnd}
        `);
      }
    }

    // Run after everything's already happened - increased timeout
    const timeoutId = window.setTimeout(runEffect, 100);

    // Also run on resize
    window.addEventListener('resize', runEffect);

    // Retry mechanism - check again after a longer delay in case parent wasn't ready
    const retryTimeoutId = window.setTimeout(runEffect, 300);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(retryTimeoutId);
      window.removeEventListener('resize', runEffect);
    };
    // Missing a bunch of dependencies. I don't *think* it's a problem, but I haven't really dug into it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualId, parentId]);

  return parentPath;
}

export function useContextPaths({
  actualId,
  usesContext,
  nodeRef,
  alignment,
}) {
  const [contextPaths, setContextPaths] = React.useState([]);
  const { domNodes, wrapperRef } = React.useContext(Context);

  React.useEffect(() => {
    function runEffect() {
      if (!usesContext || usesContext.length === 0) {
        setContextPaths([]);
        return;
      }

      const paths = [];

      usesContext.forEach(contextName => {
        const contextId = contextName.toLowerCase();
        const contextNode = domNodes.current[contextId];
        
        if (!contextNode?.current || !wrapperRef?.current || !nodeRef?.current) {
          return;
        }

        const wrapperBox = wrapperRef.current.getBoundingClientRect();

        const contextBox = contextNode.current.getBoundingClientRect();
        const relativeContextBox = {
          top: contextBox.top - wrapperBox.top,
          left: contextBox.left - wrapperBox.left,
          right: contextBox.left - wrapperBox.left + contextBox.width,
          bottom: contextBox.top - wrapperBox.top + contextBox.height,
          width: contextBox.width,
          height: contextBox.height,
        };
        relativeContextBox.centerX =
          relativeContextBox.left + relativeContextBox.width / 2;
        relativeContextBox.centerY =
          relativeContextBox.top + relativeContextBox.height / 2;

        const nodeBox = nodeRef.current.getBoundingClientRect();
        const relativeNodeBox = {
          top: nodeBox.top - wrapperBox.top,
          left: nodeBox.left - wrapperBox.left,
          right: nodeBox.left - wrapperBox.left + nodeBox.width,
          bottom: nodeBox.top - wrapperBox.top + nodeBox.height,
          width: nodeBox.width,
          height: nodeBox.height,
        };
        relativeNodeBox.centerX =
          relativeNodeBox.left + relativeNodeBox.width / 2;
        relativeNodeBox.centerY =
          relativeNodeBox.top + relativeNodeBox.height / 2;

        const PATH_GAP = 8;

        // Context connections are usually from top to multiple children
        // We'll make them curved and dotted to differentiate from parent connections
        const xStart = relativeContextBox.centerX;
        const yStart = relativeContextBox.bottom + PATH_GAP;
        const xEnd = relativeNodeBox.centerX;
        const yEnd = relativeNodeBox.top - PATH_GAP;

        // Add some curve for visual appeal
        const midY = yStart + (yEnd - yStart) * 0.5;
        const controlOffset = Math.abs(xEnd - xStart) * 0.3;

        const path = `
          M ${xStart} ${yStart}
          Q ${xStart + controlOffset} ${midY}
            ${xEnd} ${yEnd}
        `;

        paths.push({
          path,
          contextName,
        });
      });

      setContextPaths(paths);
    }

    // Run after everything's already happened
    const timeoutId = window.setTimeout(runEffect, 150);

    // Also run on resize
    window.addEventListener('resize', runEffect);

    // Retry mechanism
    const retryTimeoutId = window.setTimeout(runEffect, 400);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(retryTimeoutId);
      window.removeEventListener('resize', runEffect);
    };
  }, [actualId, usesContext]);

  return contextPaths;
}
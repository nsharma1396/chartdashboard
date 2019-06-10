import React, { useState, useEffect } from "react";

function ComponentRenderer({ Component }) {
  const [renderOnResize, toggleRender] = useState(false);
  useEffect(() => {
    const onResize = function(ev) {
      toggleRender(!renderOnResize);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [renderOnResize]);
  return <Component />;
}

function ResizeObserver(Component) {
  return function(props) {
    return <ComponentRenderer Component={Component} />;
  };
}

export default ResizeObserver;

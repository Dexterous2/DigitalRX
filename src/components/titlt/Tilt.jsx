'use client'

import Tilt from 'react-tilt';

const TiltComponent = ({ options, children }) => {
  return (
    <Tilt className="Tilt" options={options}>
      <div className="Tilt-inner">{children}</div>
    </Tilt>
  );
};

export default TiltComponent;
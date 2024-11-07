import { createContext, useRef, useState } from "react";
import PropTypes from "prop-types";

const SectionSliderContext = createContext({
  goToSectionRef: null,
  currentSection: null,
});

export const SectionSliderProvider = ({ children }) => {
  const goToSectionRef = useRef(null);
  const [currentSection, setcurrentSection] = useState(null);

  return (
    <SectionSliderContext.Provider
      value={{
        goToSectionRef,
        currentSection,
        setcurrentSection,
      }}
    >
      {children}
    </SectionSliderContext.Provider>
  );
};

SectionSliderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionSliderContext;

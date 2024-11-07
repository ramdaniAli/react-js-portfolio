import { Box, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import SectionSliderContext from "context/SectionSliderContext";

const VerticalPagination = ({ sectionIds, contextSafe }) => {
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { goToSectionRef, currentSection } = useContext(SectionSliderContext);

  const goToNextSection = contextSafe((index, direction) => {
    goToSectionRef.current(index, direction);
  }, []);

  return (
    !isDownMd && (
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            px: 1.2,
            gap: 1.5,
            transform: "scale(0.8)",
          }}
        >
          {sectionIds.map((sectionId, index) => (
            <Box
              component="span"
              key={index}
              onClick={() =>
                sectionId !== currentSection &&
                goToNextSection(
                  sectionIds.indexOf(sectionId),
                  sectionIds.indexOf(sectionId) >
                    sectionIds.indexOf(currentSection)
                    ? 1
                    : -1,
                )
              }
              sx={{
                opacity: currentSection === sectionId ? 0.65 : 0.35,
                width: currentSection === sectionId ? 10 : 6,
                height: currentSection === sectionId ? 10 : 6,
                borderRadius: "50%",
                background: (theme) => theme.palette.common.white,
                cursor: sectionId !== currentSection ? "pointer" : "default",
                transition: "all 0.5s ease",
                boxShadow: (theme) =>
                  currentSection === sectionId
                    ? `0 0 0 2px ${theme.palette.common.white}`
                    : "none",
              }}
            />
          ))}
        </Box>
      </Box>
    )
  );
};

export default VerticalPagination;

VerticalPagination.propTypes = {
  sectionIds: PropTypes.array.isRequired,
  currentSection: PropTypes.string || null,
  contextSafe: PropTypes.func,
};

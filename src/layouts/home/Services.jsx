import { useContext, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import PropTypes from "prop-types";

import SectionSliderContext from "context/SectionSliderContext";

const Services = ({ content, currentIndex }) => {
  const container = useRef();
  const animationRef = useRef(null);

  const { currentSection } = useContext(SectionSliderContext);

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let titles = gsap.utils.toArray(".title");
        let subtitles = gsap.utils.toArray(".subtitle");

        const tl = gsap.timeline({
          defaults: {
            duration: 2,
            ease: "power1.inOut",
          },
          paused: true,
        });

        tl.fromTo(
          [titles, subtitles],
          {
            yPercent: 25,
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            stagger: 0.25,
            duration: 3,
          },
          "<",
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === `services-${currentIndex}`) {
          animationRef.current.play();
        } else {
          animationRef.current.reverse(); // This will double the speed of the reverse animation
        }
      };

      playAnimation();

      return () => {
        animationRef.current.kill();
        animationRef.current = null;
      };
    },
    {
      scope: container,
      dependencies: [currentSection, currentIndex],
    },
  );

  return (
    <Box
      ref={container}
      sx={{
        position: "absolute",
        zIndex: 4,
        top: 0,
        left: 0,

        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Content */}

        <Box
          sx={{
            width: "100%",
            height: "100%",
            zIndex: 3,
            position: "absolute",
            bottom: 0,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "stretch",
            gap: 2,
            overflow: "hidden",
          }}
        >
          <Typography
            className="title"
            component="h1"
            sx={{
              fontSize: {
                xs: "clamp(2rem, 10vw, 2rem)",
                sm: "clamp(3rem, 10vw, 2rem)",
                md: "clamp(6rem, 10vw, 2rem)",
              },
              fontWeight: 800,
              textAlign: "left",
              letterSpacing: "0.25rem",
              willChange: "transform",
              textTransform: "uppercase",
              maxWidth: "lg",
            }}
          >
            {content.title}
          </Typography>
          <Typography
            className="subtitle"
            component="h2"
            sx={{
              // fontSize: "clamp(0.65rem, 2vw, 1.2rem)",
              fontSize: {
                xs: "clamp(1rem, 2vw, 1.2rem)",
                sm: "clamp(2rem, 2vw, 1.2rem)",
                md: "clamp(2.5rem, 2vw, 1.2rem)",
              },
              fontWeight: 400,
              textAlign: "left",
              letterSpacing: "0.25rem",
              willChange: "transform",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
              maxWidth: "lg",
            }}
          >
            {content.subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Services;

Services.propTypes = {
  content: PropTypes.object.isRequired,
  currentIndex: PropTypes.number,
};

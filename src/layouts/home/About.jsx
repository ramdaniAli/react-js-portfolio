import { useContext, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import SectionSliderContext from "context/SectionSliderContext";

import { landingPageContent } from "config";
import Bear from "components/Bear";

const About = () => {
  const container = useRef();
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline

  const { currentSection } = useContext(SectionSliderContext);

  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let texts = gsap.utils.toArray(".text");
        let bears = gsap.utils.toArray(".bears-container");

        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 3,
          },
          paused: true,
        });

        // Define the intro animation for texts
        tl.fromTo(
          [texts, bears],
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
          },
          "<",
        );

        tl.to(
          texts,
          {
            duration: 5,
            text: {
              value: landingPageContent.aboutSection.description,
            },
          },
          "<",
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === "about") {
          animationRef.current.timeScale(1).play();
        } else {
          animationRef.current.timeScale(3).reverse(); // This will double the speed of the reverse animation
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
      dependencies: [currentSection, isDownMd],
    },
  );

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,

          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 2,
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* Short Description */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            className="text"
            component="h2"
            gutterBottom
            sx={{
              fontSize: "clamp(1rem, 4.5vw, 1.5rem)",
              fontWeight: 400,
              textAlign: "center",
              letterSpacing: "0.25rem",
              willChange: "transform",
              maxWidth: 850,
            }}
          >
            {""}
          </Typography>
        </Box>

        {/* BEAR */}
        <Box
          className="bears-container"
          sx={{
            position: "absolute",
            zIndex: 4,
            left: "50%", // Position in the center from the left
            bottom: 0, // Anchor it to the bottom
            transform: "translateX(-50%)", // Center it by negating half its own width
          }}
        >
          <Bear />
        </Box>
      </Box>
    </Box>
  );
};

export default About;

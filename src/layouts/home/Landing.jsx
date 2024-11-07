import { Fragment, useContext, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

import SectionSliderContext from "context/SectionSliderContext";

import { landingPageContent } from "config";

const Landing = ({ contextSafe }) => {
  const container = useRef();
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline
  const buttonHoverAnimationRef = useRef(null); // Holds a reference to the GSAP timeline
  const { goToSectionRef, currentSection } = useContext(SectionSliderContext);

  const goToNextSection = contextSafe(() => {
    goToSectionRef.current(1, 1);
  }, []);

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let titles = gsap.utils.toArray(".title");
        let subtitles = gsap.utils.toArray(".subtitle");
        let letters = gsap.utils.toArray(".letter");
        let iconButtons = gsap.utils.toArray(".button-icon");

        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 4,
          },
          paused: true,
        });

        tl.fromTo(
          iconButtons,
          {
            opacity: 0,
            yPercent: 50,
            scale: 0.5,
          },
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
          },
          "<",
        );

        // Define the intro animation for texts
        tl.fromTo(
          [subtitles, titles],
          {
            yPercent: 25,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
          },
          "<",
        );

        tl.fromTo(
          letters,
          {
            opacity: 0,
            yPercent: 100,
            scale: 0.5,
          },
          {
            opacity: 1,
            stagger: 0.1,
            yPercent: 0,
            scale: 1,
          },
          "<",
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === "landing") {
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
      dependencies: [currentSection],
    },
  );

  const buttonIconHoverAnimation = contextSafe((state) => {
    let iconButtons = gsap.utils.toArray(".button-icon");

    if (iconButtons.length > 0) {
      if (buttonHoverAnimationRef.current === null) {
        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 1.5,
          },
          paused: true,
        });

        tl.to(iconButtons, {
          scale: 1.2,
        });

        buttonHoverAnimationRef.current = tl;
      }

      if (state === "enter") {
        buttonHoverAnimationRef.current.play();
      } else {
        buttonHoverAnimationRef.current.reverse();
      }
    }
  });

  return (
    <Fragment>
      <Box
        ref={container}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 4,
            top: 0,
            left: 0,

            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: 2,
            p: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              flexGrow: 1,
            }}
          >
            <Typography
              className="title"
              component="h1"
              sx={{
                lineHeight: 1.2,
                fontSize: "clamp(2rem, 10vw, 10vw)",
                fontWeight: 300,
                textAlign: "center",
                // letterSpacing: "1.2rem",
                willChange: "transform",
                textTransform: "uppercase",

                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {landingPageContent.heroSection.title
                .split("")
                .map((letter, index) => {
                  return (
                    <span key={index} className="letter">
                      {letter}
                    </span>
                  );
                })}
            </Typography>
            <Typography
              className="subtitle"
              component="h1"
              sx={{
                fontSize: "clamp(1rem, 3.5vw, 2rem)",
                fontWeight: 200,
                textAlign: "center",
                willChange: "transform",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {landingPageContent.heroSection.subtitle
                .split("")
                .map((letter, index) => {
                  return (
                    <span key={index} className="letter">
                      {letter}
                    </span>
                  );
                })}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform",
            }}
          >
            <IconButton
              className="button-icon"
              onClick={() => goToNextSection()}
              onMouseEnter={() => buttonIconHoverAnimation("enter")}
              onMouseLeave={() => buttonIconHoverAnimation("leave")}
              aria-label="go down"
              color="default"
              size="large"
              disableRipple
            >
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Landing;

Landing.propTypes = {
  contextSafe: PropTypes.func,
};

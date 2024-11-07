import { Suspense, useContext, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

 
import { BuildingsPerspectiveB } from "bundles";

import { useNavigate } from "react-router-dom";
import SectionSliderContext from "context/SectionSliderContext";
import { routesMap } from "config/routes";
import { landingPageContent } from "config";

const RedirectServices = () => {
  const container = useRef();
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline
  const buttonHoverAnimationRef = useRef(null); // Holds a reference to the GSAP timeline
  const { currentSection } = useContext(SectionSliderContext);
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { contextSafe } = useGSAP({ scope: container });
  const navigate = useNavigate();

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let buttons = gsap.utils.toArray(".button-text");
        let svgPaths = gsap.utils.toArray(".bg-path");

        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 2,
          },
          paused: true,
        });

        // Define the intro animation for buttons
        tl.fromTo(
          buttons,
          {
            opacity: 0,
            yPercent: 100,
            scale: 0.5,
          },
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
          },
        );

        if (!isDownMd) {
          tl.fromTo(
            svgPaths,
            {
              opacity: 0,
              strokeDashoffset: 1000,
              strokeDasharray: 1000,
            },
            {
              opacity: 1,
              strokeDashoffset: 0,
              strokeDasharray: 1000,
              duration: 5,
            },
            "<",
          );
        } else {
          tl.fromTo(
            svgPaths,
            {
              opacity: 0,
            },
            {
              opacity: 1,

              duration: 5,
            },
            "<",
          );
        }

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === "redirect-services") {
          animationRef.current.timeScale(1).play();
        } else {
          animationRef.current.timeScale(2).reverse(); // This will double the speed of the reverse animation
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

  const buttonHoverAnimation = contextSafe((state) => {
    let buttons_underline = gsap.utils.toArray(".button-text-underline");

    if (buttons_underline.length > 0) {
      if (buttonHoverAnimationRef.current === null) {
        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 1.5,
            stagger: 0.5,
          },
          paused: true,
        });

        tl.to(buttons_underline, {
          width: "100%",
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

  const redirectToServicesPage = contextSafe(() => {
    let buttons = gsap.utils.toArray(".button-text");

    const tl = gsap.timeline({
      defaults: {
        ease: "power1.inOut",
        duration: 1.5,
      },
    });

    tl.fromTo(
      buttons,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        opacity: 1,
      },
      {
        opacity: 0,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        onComplete: () => navigate(routesMap.projects),
      },
    );
  });

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "100%",
        // overflow: "hidden",
      }}
    >
      <Box className="bgContainer">
        <Box
          className="bgSvg"
          sx={{
            rotate: "180deg",
          }}
        >
          <Suspense fallback={null}>
            <BuildingsPerspectiveB />
          </Suspense>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          zIndex: 4,
          top: 0,
          left: 0,

          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 2,
          p: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            className="button-text"
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => buttonHoverAnimation("enter")}
            onMouseLeave={() => buttonHoverAnimation("leave")}
            onClick={() => redirectToServicesPage()}
          >
            <Typography
              variant="h1"
              component="span"
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "0.5rem",
                fontSize: {
                  xs: "clamp(1.5rem, 4.5vw, 3rem)",
                  sm: "clamp(1.5rem, 5vw, 3rem)",
                  md: "clamp(2rem, 10vw, 10rem)",
                  lg: "clamp(2rem, 10vw, 12rem)",
                },
                width: "fit-content",
                willChange: "transform",
              }}
            >
              {landingPageContent.redirectServicesSection.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}
            </Typography>
            <Box
              component="span"
              className="button-text-underline"
              sx={{
                width: 0,
                display: "block",
                height: "calc(1.5px + 0.5vw)",
                backgroundColor: "#ffff",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            className="button-text"
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => buttonHoverAnimation("enter")}
            onMouseLeave={() => buttonHoverAnimation("leave")}
            onClick={() => redirectToServicesPage()}
          >
            <Typography
              variant="h1"
              component="span"
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "0.5rem",
                fontSize: {
                  xs: "clamp(1.5rem, 4.5vw, 3rem)",
                  sm: "clamp(1.5rem, 5vw, 3rem)",
                  md: "clamp(2rem, 10vw, 10rem)",
                  lg: "clamp(2rem, 10vw, 12rem)",
                },
                width: "fit-content",
                willChange: "transform",
              }}
            >
              {landingPageContent.redirectServicesSection.title
                .split(" ")
                .slice(2)
                .join(" ")}
            </Typography>
            <Box
              component="span"
              className="button-text-underline"
              sx={{
                width: 0,
                display: "block",
                height: "calc(1.5px + 0.5vw)",
                backgroundColor: "#ffff",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RedirectServices;

import errorNotFound from "assets/storyset/404-error-lost-in-space-animate.svg";
import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Navigation from "components/Navigation";
import { routesMap } from "config/routes";
import { button_text } from "config";
const NotFoundPage = () => {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline

  const navigate = useNavigate();

  const buttonHoverAnimation = contextSafe((state) => {
    let buttons_underline = gsap.utils.toArray(".button-text-underline");

    if (buttons_underline.length > 0) {
      if (animationRef.current === null) {
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

        animationRef.current = tl;
      }

      if (state === "enter") {
        animationRef.current.play();
      } else {
        animationRef.current.reverse();
      }
    }
  });

  useGSAP(
    () => {
      let buttons = gsap.utils.toArray(".button-text");

      const tl = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
          duration: 2,
        },
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
    },
    {
      scope: container,
    },
  );

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Navigation />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          bottom: 0,
          p: 4,
        }}
      >
        <Box
          component="img"
          src={errorNotFound}
          alt="not found img"
          loading="lazy"
          sx={{
            willChange: "transform",
            width: "100%",
            height: "90%",
            objectFit: "contain",
            objectPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(0, 0)",
            filter: "brightness(0.65) contrast(1.2)",
            p: 4,
          }}
        />
      </Box>

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
            justifyContent: "flex-end",
            alignItems: "center",
            flexGrow: 1,
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
            onClick={() => navigate(routesMap.index)}
          >
            <Typography
              component="h1"
              sx={{
                lineHeight: 1.2,
                fontSize: "clamp(1rem, 10vw, 3vw)",
                fontWeight: 400,
                textAlign: "center",

                willChange: "transform",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              {button_text}
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

export default NotFoundPage;

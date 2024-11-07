import { Suspense, useContext, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import SectionSliderContext from "context/SectionSliderContext";
import { FooterLinks } from "bundles";

import { landingPageContent } from "config";
import { recipientEmail } from "config";
const Contact = () => {
  const container = useRef();
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline
  const buttonHoverAnimationRef = useRef(null); // Holds a reference to the GSAP timeline
  const { currentSection } = useContext(SectionSliderContext);

  const isDownLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let buttons = gsap.utils.toArray(".button-text");

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
          "<",
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === "contact") {
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
      dependencies: [currentSection, isDownLg],
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

  const sendEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Content */}
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
          justifyContent: "center",
          alignItems: "stretch",
          gap: 2,
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* Contact Button */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            onClick={() => sendEmail(recipientEmail)}
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
                  xs: "clamp(3rem, 4.5vw, 3rem)",
                  md: "clamp(8rem, 10vw, 10rem)",
                },
                width: "fit-content",
                willChange: "transform",
              }}
            >
              {landingPageContent.contactSection.title.split(" ")[0]}
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
            justifyContent: "center",
            alignItems: "center",
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
            onClick={() => sendEmail(recipientEmail)}
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
                  xs: "clamp(3rem, 4.5vw, 3rem)",
                  md: "clamp(8rem, 10vw, 10rem)",
                },
                width: "fit-content",
                willChange: "transform",
              }}
            >
              {landingPageContent.contactSection.title.split(" ")[1]}
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

        {/* Footer links */}
        <Suspense fallback={null}>
          <FooterLinks section="contact" containerRef={container} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Contact;

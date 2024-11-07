import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SectionSliderContext from "context/SectionSliderContext";

import { EmailRounded, PhoneRounded } from "@mui/icons-material";
import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import {
  recipientEmail,
  recipientPhone,
  recipientPhoneFormatted,
} from "config";

const FooterLinks = ({ section, containerRef }) => {
  const animationRef = useRef(null); // Holds a reference to the GSAP timeline
  const { currentSection } = useContext(SectionSliderContext);
  const isDownLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  useGSAP(
    () => {
      if (animationRef.current === null) {
        let links = gsap.utils.toArray(".contact-us-link-item");

        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 2,
          },
          paused: true,
        });

        tl.fromTo(
          links,
          {
            xPercent: isDownLg ? -100 : 100,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            stagger: 0.25,
            duration: 4,
          },
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (currentSection === section) {
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
      scope: containerRef,
      dependencies: [section, currentSection, isDownLg],
    },
  );

  const call = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const sendEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <Box
      ref={containerRef}
      component="footer"
      className="footer-section"
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: {
          xs: "flex-start",
          lg: "flex-end",
        },
        alignItems: "center",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        className="contact-us-links-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "left",
          gap: 2,
        }}
        // onMouseEnter={handleMouseOver}
        // onMouseLeave={handleMouseOut}
      >
        <Box
          className="contact-us-link-item"
          onClick={() => call(recipientPhone)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 1.2,
            cursor: "pointer",
            position: "relative",
            "&:hover": {
              ".link-underline": {
                width: "100%",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <PhoneRounded className="phone-icon" />
            <Typography
              className="phone-number"
              variant="caption"
              sx={{
                letterSpacing: 1.2,
                fontWeight: 200,
              }}
            >
              {recipientPhoneFormatted}
            </Typography>
          </Box>
          <Box
            component="span"
            className="link-underline"
            sx={{
              width: 0,
              display: "block",
              height: "2px",
              backgroundColor: "#ffff",
              transition: "all 2s",
            }}
          />
        </Box>

        <Box
          className="contact-us-link-item"
          onClick={() => sendEmail(recipientEmail)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 1.2,
            cursor: "pointer",
            position: "relative",
            "&:hover": {
              ".link-underline": {
                width: "100%",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <EmailRounded className="email-icon" />
            <Typography
              className="email-text"
              variant="caption"
              sx={{
                letterSpacing: 1.2,
                fontWeight: 200,
              }}
            >
              {recipientEmail}
            </Typography>
          </Box>
          <Box
            component="span"
            className="link-underline"
            sx={{
              width: 0,
              display: "block",
              height: "2px",
              backgroundColor: "#ffff",
              transition: "all 2s",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FooterLinks;

FooterLinks.propTypes = {
  section: PropTypes.string.isRequired,
  containerRef: PropTypes.object.isRequired,
};

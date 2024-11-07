import { Box, Typography, IconButton } from "@mui/material";
import { Fragment, useContext, useRef } from "react";

import { CloseOutlined, EmailRounded, PhoneRounded } from "@mui/icons-material";

import DrawerContext from "context/DrawerProviderContext";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { categories } from "config";

import {
  navigationList,
  recipientEmail,
  recipientPhone,
  recipientPhoneFormatted,
} from "config";

import SectionSliderContext from "context/SectionSliderContext";

const MenuDrawer = () => {
  const { open, closeDrawer } = useContext(DrawerContext);

  const container = useRef();
  const animationRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      if (animationRef?.current === null) {
        let nav_links = gsap.utils.toArray(".nav_link");
        let drawer_nav_background = gsap.utils.toArray(
          ".drawer_nav_background",
        );
        let drawer_menu_close = gsap.utils.toArray(".drawer_menu_close");

        let contact_links = gsap.utils.toArray(".contact-us-drawer-link-item");

        const tl = gsap.timeline({
          defaults: {
            ease: "power1.inOut",
            duration: 2,
            // stagger: 0.5,
          },
          paused: true,
        });

        tl.fromTo(
          drawer_nav_background,
          {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          },
          {
            opacity: 1,
            clipPath: "circle(100% at 50% 50%)",
          },
        );

        tl.fromTo(
          nav_links,
          {
            xPercent: -100,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            stagger: 0.5,
          },
          "<",
        );

        tl.fromTo(
          contact_links,
          {
            xPercent: -100,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            stagger: 0.5,
          },
          "<",
        );

        tl.fromTo(
          drawer_menu_close,
          { xPercent: 100, opacity: 0 },
          { xPercent: 0, opacity: 1 },
          "<",
        );

        animationRef.current = tl;
      }

      const playAnimation = () => {
        if (open) {
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
      dependencies: [open],
    },
  );

  const linkHoverAnimation = contextSafe((state, navItem) => {
    let nav_links_underline = gsap.utils.toArray(
      `.nav_link_underline_${navItem}`,
    );

    if (nav_links_underline.length > 0) {
      const tl = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
          duration: 0.5,
        },
      });

      if (state === "enter") {
        tl.to(nav_links_underline, {
          width: "100%",
        });
      } else {
        tl.to(nav_links_underline, {
          width: 0,
        });
      }
    }
  });

  const closeMenu = contextSafe(async () => {
    await animationRef.current.timeScale(3).reverse();
    closeDrawer();
  });

  // Access the `goToSectionRef` function from the context
  const { goToSectionRef } = useContext(SectionSliderContext);

  // currentSection can be retrieved from the same context if needed
  const { currentSection } = useContext(SectionSliderContext);

  const handleNavigation = contextSafe(async (sectionId) => {
    await animationRef.current.timeScale(3).reverse();
    closeMenu();

    if (!goToSectionRef.current) return; // Ensure goToSectionRef is available

    let index;
    if (sectionId === "services") {
      index = sectionIds.findIndex((id) => id.startsWith("services-")); // Find the first service section
    } else if (sectionId === "contact") {
      index = sectionIds.indexOf("contact"); // Find the contact section directly
    } else {
      index = sectionIds.indexOf(sectionId); // Find the index of other sections
    }

    // Determine if the target section is the current section
    if (sectionIds[index] === currentSection) {
      return; // Return early if the section is already the current section
    }

    if (index !== -1) {
      const direction = index > sectionIds.indexOf(currentSection) ? 1 : -1;
      goToSectionRef.current(index, direction);
    }
  });

  const call = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const sendEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <Fragment>
      <Box
        ref={container}
        className="drawer_nav"
        sx={{
          position: "fixed",
          zIndex: 3000,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        {/* Background */}
        <Box
          className="drawer_nav_background"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,1)",
          }}
        />

        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            gap: 4,
            p: 2,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 2,
              position: "relative",
            }}
          >
            {/* LOGO */}

            {/* CLOSE BUTTON */}
            <Box
              className="drawer_menu_close"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                position: "absolute",
                right: 0,
                top: "25px",
              }}
            >
              <IconButton
                size="small"
                // color="inherit"
                // color="default"
                aria-label="open drawer"
                disableFocusRipple
                disableRipple
                // onClick={() => toggleDrawerState()}
                onClick={() => closeMenu()}
                sx={{
                  //change color to black
                  color: "#000",
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
          </Box>

          {/* NAVIGATION MENU */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            {navigationList.map((nav, indx) => {
              return (
                <Box
                  key={indx}
                  className="nav_link"
                  onMouseEnter={() =>
                    linkHoverAnimation(
                      "enter",
                      nav.title.toLowerCase().split(" ").join("-"),
                    )
                  }
                  onMouseLeave={() =>
                    linkHoverAnimation(
                      "leave",
                      nav.title.toLowerCase().split(" ").join("-"),
                    )
                  }
                  onClick={() => handleNavigation(nav.sectionId)}
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{
                      fontWeight: 300,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      willChange: "transform",
                      width: "fit-content",
                      color: "#000",
                    }}
                  >
                    {nav.title}
                  </Typography>
                  <Box
                    className={`nav_link_underline_${nav.title
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    component="span"
                    sx={{
                      width: 0,
                      display: "block",
                      height: "3.5px",
                      // backgroundColor: (theme) => theme.palette.text.primary,
                      backgroundColor: "#000",
                      borderRadius: 1,
                      mt: 0.5,
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Contact info */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              textAlign: "left",
              gap: 2,
              pb: 4,
            }}
          >
            <Box
              className="contact-us-drawer-link-item"
              onClick={() => call(recipientPhone)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <PhoneRounded
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "0.69rem",
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: "0.69rem",
                  letterSpacing: 1,
                  fontWeight: 400,
                  color: "#000",
                }}
              >
                {recipientPhoneFormatted}
              </Typography>
            </Box>

            <Box
              className="contact-us-drawer-link-item"
              onClick={() => sendEmail(recipientEmail)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <EmailRounded
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: "0.69rem",
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: "0.69rem",
                  letterSpacing: 1,
                  fontWeight: 400,
                  color: "#000",
                }}
              >
                {recipientEmail}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default MenuDrawer;

const sectionIds = [
  "landing",
  "about",
  ...categories.map((elmt) => `services-${elmt.id}`),
  "contact",
];

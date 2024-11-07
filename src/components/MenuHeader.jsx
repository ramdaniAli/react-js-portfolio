import {
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Fragment, useContext, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import logo from "assets/LOGO/white.svg";
import DrawerContext from "context/DrawerProviderContext";
// import SectionSliderContext from "context/SectionSliderContext";
import { categories } from "config";

import { Menu } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";
import { navigationList } from "config/routes";

import SectionSliderContext from "context/SectionSliderContext";

const MenuHeader = () => {
  const container = useRef();
  // const { goToSectionRef } = useContext(SectionSliderContext);
  const { toggleDrawerState } = useContext(DrawerContext);

  const { contextSafe } = useGSAP({ scope: container });

  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // const navigate = useNavigate();

  // get current path
  // const location = useLocation();

  useGSAP(
    () => {
      let nav_logo = gsap.utils.toArray(".nav_logo");
      let nav_links = gsap.utils.toArray(".nav_link");

      const tl = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
          duration: 3,
          stagger: 0.5,
        },
      });

      tl.fromTo(
        nav_logo,
        { xPercent: -10, opacity: 0 },
        { xPercent: 0, opacity: 1 },
      );
      tl.fromTo(
        nav_links,
        {
          xPercent: 100,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
        },
        "<",
      );
    },
    {
      scope: container,
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

  // Access the `goToSectionRef` function from the context
  const { goToSectionRef } = useContext(SectionSliderContext);

  // currentSection can be retrieved from the same context if needed
  const { currentSection } = useContext(SectionSliderContext);

  const handleNavigation = contextSafe((sectionId) => {
    // if (
    //   location.pathname === "/" &&
    //   link === "/" &&
    //   goToSectionRef.current !== null
    // ) {
    //   goToSectionRef.current(0, -1);
    // } else {
    // }
    // navigate(link);
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

  return (
    <Fragment>
      <Box
        ref={container}
        component="header"
        sx={{
          position: "fixed",
          zIndex: 2000,
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            className="nav_logo"
            sx={{
              cursor: "pointer",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              p: "0 1rem",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                height: "25px", // Values for different screen sizes
                width: "auto",
                willChange: "transform",
                ObjectFit: "contain",
              }}
            />
          </Box>

          {isDownMd ? (
            <Box
              className="nav_link"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                aria-label="open drawer"
                disableFocusRipple
                disableRipple
                onClick={() => toggleDrawerState()}
              >
                <Menu className="menu_icon_open" />
              </IconButton>
            </Box>
          ) : (
            navigationList.map((nav, indx) => {
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
                    variant="caption"
                    color="inherit"
                    component="span"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 300,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      willChange: "transform",
                      width: "fit-content",
                    }}
                  >
                    {nav.title}
                  </Typography>
                  <Box
                    component="span"
                    className={`nav_link_underline_${nav.title
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    sx={{
                      width: 0,
                      display: "block",
                      height: "1.5px",
                      backgroundColor: (theme) => theme.palette.text.disabled,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              );
            })
          )}
        </Toolbar>
      </Box>
    </Fragment>
  );
};

export default MenuHeader;

const sectionIds = [
  "landing",
  "about",
  ...categories.map((elmt) => `services-${elmt.id}`),
  "contact",
];

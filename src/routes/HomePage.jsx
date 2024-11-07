import { Fragment, Suspense, useContext, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Box } from "@mui/material";
import "theme/vslider.styles.scss";
import "theme/background.styles.scss";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { About, Contact, Landing, Services } from "bundles";

import VerticalPagination from "components/VerticalPagination";
import SectionSliderContext from "context/SectionSliderContext";
import { categories } from "config";

import LinesAnimation from "components/LinesAnimation";
import MenuHeader from "components/MenuHeader";
import MenuDrawer from "components/MenuDrawer";
import DrawerContext from "context/DrawerProviderContext";

const HomePage = () => {
  const container = useRef();
  const { open } = useContext(DrawerContext);

  const { goToSectionRef, setcurrentSection } =
    useContext(SectionSliderContext);

  const animatingRef = useRef();

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      /* CONTAINERS */
      let sections = document.querySelectorAll("section");
      let images = document.querySelectorAll(".bg");
      let outerWrappers = gsap.utils.toArray(".outer");
      let innerWrappers = gsap.utils.toArray(".inner");

      if (sections.length === 0) return;

      let wrap = gsap.utils.wrap(0, sections.length);
      let currentIndex = -1;

      let animating = false;

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      const gotoSection = (index, direction) => {
        index = wrap(index); // make sure it's valid

        animating = true;

        let fromTop = direction === -1;
        let dFactor = fromTop ? -1 : 1;

        /* Transition animation */
        let tl = gsap.timeline({
          defaults: { duration: 2, ease: "power1.inOut" },
          onComplete: () => (animating = false),
        });

        if (currentIndex >= 0) {
          // The first time this function runs, current is -1
          gsap.set(sections[currentIndex], { zIndex: 0 });

          tl.to(images[currentIndex], {
            yPercent: -100 * dFactor,
          }).set(sections[currentIndex], { autoAlpha: 0 });
        }

        gsap.set(sections[index], {
          autoAlpha: 1,
          zIndex: 1,
        });

        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
          },
          {
            yPercent: 0,
          },
          0,
        ).fromTo(
          images[index],
          {
            yPercent: 100 * dFactor,
          },
          {
            yPercent: 0,
          },
          0,
        );

        currentIndex = index;
        setcurrentSection(sectionIds[currentIndex]);
      };

      goToSectionRef.current = gotoSection;

      animatingRef.current = animating;

      ScrollTrigger.observe({
        target: container.current,
        type: "wheel,pointer,touch",
        onDown: () =>
          !animating && currentIndex > 0 && gotoSection(currentIndex - 1, -1),
        onUp: () =>
          !animating &&
          currentIndex < sections.length - 1 &&
          gotoSection(currentIndex + 1, 1),

        wheelSpeed: -1,
        tolerance: 200,
        preventDefault: true,
      });

      gotoSection(0, 1);
    },
    {
      scope: container,
    },
  );

  return (
    <Fragment>
      {/* APPBAR */}
      <MenuHeader />
      {/* DRAWER */}
      {open && <MenuDrawer />}

      {/* PAGINATION */}
      <VerticalPagination sectionIds={sectionIds} contextSafe={contextSafe} />

      {/* MAIN CONTAINER */}
      <Box ref={container} component="main" className="home">
        <Box className="bgContainer">
          <Box className="bgSvg">
            <LinesAnimation />
          </Box>
        </Box>

        {/* Section 1 */}
        <Box component="section" className="landing">
          <Box className="outer">
            <Box className="inner">
              <Box className="bg">
                <Suspense fallback={null}>
                  <Landing contextSafe={contextSafe} />
                </Suspense>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box component="section" className="about">
          <Box className="outer">
            <Box className="inner">
              <Box className="bg">
                <Suspense fallback={null}>
                  <About />
                </Suspense>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Section 3 */}
        {categories.map((elmt) => {
          return (
            <Box
              component="section"
              className={`services-${elmt.id} services`}
              key={elmt.id}
            >
              <Box className="outer">
                <Box className="inner">
                  <Box className="bg">
                    <Suspense fallback={null}>
                      <Services content={elmt} currentIndex={elmt.id} />
                    </Suspense>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        {/* Section 6 */}
        <Box component="section" className="contact">
          <Box className="outer">
            <Box className="inner">
              <Box className="bg">
                <Suspense fallback={null}>
                  <Contact />
                </Suspense>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default HomePage;

const sectionIds = [
  "landing",
  "about",
  ...categories.map((elmt) => `services-${elmt.id}`),
  "contact",
];

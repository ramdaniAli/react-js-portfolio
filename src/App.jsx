import Router from "./routes/Router";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";

import { gsap } from "gsap";

gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin, Flip);

function App() {
  return <Router />;
}

export default App;

import { React, useState, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/proclinic/loader/Loader";
const Header = lazy(() => import("./components/Header"));
const Navbar = lazy(() => import("./components/Navbar"));
const CombinedAlldata = lazy(() =>
  import("./components/proclinic/CombinedALLdata")
);
function App() {
  const [NavVisiblity, SetNavVisiblity] = useState("block");
  const [navwidth, setnavwidth] = useState("w-[270px]");
  const [fontsize, setfontsize] = useState("text-[17px] w-6");
  const [mobileview, setmobileview] = useState("hidden");
  const [dispalyreverse, setdisplayreverse] = useState("");
  const menuChange = () => {
    if (NavVisiblity === "hidden") {
      SetNavVisiblity("block");
      setnavwidth("w-[270px]");
      setfontsize("text-[17px] w-6");
      setmobileview("w-[70px] ");
    } else {
      SetNavVisiblity("hidden");
      setnavwidth("w-[70px]");
      setfontsize("text-[30px] text-center w-full");
      setmobileview("w-0");
    }
  };
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <div className={`flex ${dispalyreverse} bg-slate-200`}>
            <Navbar
              NavVisiblity={NavVisiblity}
              navwidth={navwidth}
              fontsize={fontsize}
              mobileview={mobileview}
              SetNavVisiblity={SetNavVisiblity}
              setdisplayreverse={setdisplayreverse}
              dispalyreverse={dispalyreverse}
            />

            <div className="w-[100%] h-[100vh] overflow-y-scroll no-scrollbar">
              <Header event={menuChange} />
              <CombinedAlldata />
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

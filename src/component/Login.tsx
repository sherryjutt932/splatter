import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { SplatterFiles1 } from "../assets/SplatterFiles1";
import { SplatterFiles2 } from "../assets/SplatterFiles2";
import { SplatterFiles3 } from "../assets/SplatterFiles3";
import { motion } from "framer-motion";
import TransformText from "./ui/TransformText";
import File from "./ui/File";
import Button from "./ui/Button";
import SliderWithTiers from "./ui/Slider";

const Login = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="sm:p-10 flex flex-col justify-start sm:justify-between h-full items-start gap-10">
        <div className="max-sm:py-8"></div>
        <div className="px-8 sm:px-10 flex flex-col gap-0 justify-between items-start">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 1,
            }}
            src={Logo}
            alt="Logo"
            className="h-20 sm:h-32 w-auto"
          />
          <h1 className="pl-2 mb-6 text-splatter-100 text-base sm:text-lg font-bold leading-[1.1]">
            <TransformText text="Because job Applications Suck" />
          </h1>
          <div className="min-w-[250px] w-[30vw]">
            <SliderWithTiers
              min={0.65}
              max={3}
              step={0.01}
              className="my-custom-slider-class"
              style={{ marginTop: "20px" }}
            />
            <SliderWithTiers
              lightMode
              min={0.65}
              max={3}
              step={0.01}
              className="my-custom-slider-class"
              style={{ marginTop: "20px" }}
            />
            <br />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.2,
              duration: 1,
            }}
            className="pl-2 flex gap-3"
          >
            <Button>Login</Button>
            <Button variant="outline">Signin with Google</Button>
          </motion.div>
        </div>
        <div className="max-sm:mt-auto max-sm:pb-3 max-sm:pt-8 px-5 sm:px-12 max-sm:bg-gradient-to-t from-splatter-800 to-splatter-800/0 max-sm:w-full">
          didn't have an account yet?{" "}
          <Link
            to="/Signup"
            className="transition-colors duration-300 hover:text-splatter-100 underline text-splatter-200 sm:text-splatter-400"
          >
            Signup
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 2,
          }}
          className="pointer-events-none absolute inset-0 z-[-2] overflow-hidden"
        >
          <div className="animate-scale absolute w-[25vw] h-[25vw] left-[45vw] top-[14vh] bg-splatter-700 opacity-60 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="animate-scale absolute w-[12vw] h-[12vw] left-[79vw] top-[-2vh] bg-splatter-250 opacity-80 blur-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <SplatterFiles1 />
          <SplatterFiles2 />
          <SplatterFiles3 />
        </motion.div>

        <svg
          width="0"
          height="0"
          viewBox="0 0 1 1"
          fill="none"
          className="absolute w-0 h-0"
        >
          <defs>
            <clipPath id="clip-fileClip">
              <path
                d="M20.9017 0H219.745C220.806 0 221.823 0.421427 222.573 1.17157L318.23 96.8284C318.98 97.5786 319.402 98.596 319.402 99.6569V422C319.402 433.046 310.447 442 299.402 442H20.9017C9.85603 442 0.901733 433.046 0.901733 422V20C0.901733 8.9543 9.85604 0 20.9017 0Z"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>

        <div className="animate-float absolute right-[20vw] bottom-[30vh] sm:right-[10vw] sm:bottom-[45vh]">
          <File className="w-[30vw] sm:w-[min(226.29px,14.5vw)] h-auto rotate-[-19.22deg] bg-white/10 backdrop-blur-sm" />
        </div>
        <div className="animate-floatFast absolute right-[42vw] bottom-[10vh] sm:right-[19vw] sm:bottom-[10vh]">
          <File className="w-[35vw] sm:w-[min(250px,16vw)] h-auto rotate-[31.22deg] bg-white/5 backdrop-blur-md" />
        </div>
        <div className="animate-floatSlow absolute right-[1vw] bottom-[1vh] sm:right-[1vw] sm:bottom-[-2vh]">
          <File className="w-[28vw] sm:w-[min(220px,14vw)] h-auto rotate-[7.8deg] bg-white/5 backdrop-blur-md" />
        </div>
      </div>
    </section>
  );
};

export default Login;

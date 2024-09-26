import { motion } from "framer-motion";
import fileClip from "../../assets/fileClip.svg";

export default function File({ ...props }) {
    return (
      <motion.svg
        {...props}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 2,
        }}
        width="324"
        height="447"
        viewBox="0 0 324 447"
        fill="none"
        style={{
          maskImage: `url(${fileClip})`,
          maskRepeat: "no-repeat",
          maskPosition: "100% 100%",
          maskSize: "cover",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_7_895)">
          <path
            d="M22.9017 2.78369L223.402 2.78369L321.402 100.784V424.784C321.402 435.829 312.447 444.784 301.402 444.784H22.9017C11.856 444.784 2.90173 435.829 2.90173 424.784L2.90173 22.7837C2.90173 11.738 11.856 2.78369 22.9017 2.78369Z"
            fill="#D9D9D9"
            fill-opacity="0.2"
          />
          <path
            d="M223.402 2.78369L22.9017 2.78369C11.856 2.78369 2.90173 11.738 2.90173 22.7837L2.90173 424.784C2.90173 435.829 11.856 444.784 22.9017 444.784H301.402C312.447 444.784 321.402 435.829 321.402 424.784V100.784M223.402 2.78369L321.402 100.784M223.402 2.78369V80.7837C223.402 91.8294 232.356 100.784 243.402 100.784H321.402"
            stroke="url(#paint0_linear_7_895)"
            stroke-width="4"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M96.9018 42.5337L37.9018 42.5337C34.0358 42.5337 30.9018 45.6677 30.9018 49.5337L30.9018 90.8192L46.7351 82.3632C53.1979 78.9117 60.9734 78.9888 67.3663 82.5679L77.311 88.1354C82.5809 91.0857 88.9592 91.278 94.3971 88.6503L103.902 84.0577V49.5337C103.902 45.6677 100.768 42.5337 96.9018 42.5337ZM30.9018 123.534V94.2202L48.1484 85.0094C53.7093 82.0395 60.3999 82.1059 65.9008 85.1856L75.8455 90.7531C81.97 94.1819 89.3825 94.4052 95.7024 91.3515L103.902 87.3895L103.902 123.534C103.902 127.4 100.768 130.534 96.9018 130.534H37.9018C34.0358 130.534 30.9018 127.4 30.9018 123.534ZM106.902 123.534L106.902 85.9399L107.017 85.8843L106.902 85.6458V49.5337C106.902 44.0108 102.425 39.5337 96.9018 39.5337L37.9018 39.5337C32.3789 39.5337 27.9018 44.0108 27.9018 49.5337L27.9018 123.534C27.9018 129.057 32.3789 133.534 37.9018 133.534L96.9018 133.534C102.425 133.534 106.902 129.057 106.902 123.534ZM111.902 177.034L27.9017 177.034L27.9017 174.034H111.902V177.034ZM296.402 219.034L27.9018 219.034L27.9018 216.034L296.402 216.034L296.402 219.034ZM27.9018 240.034L296.402 240.034V237.034L27.9018 237.034V240.034ZM296.402 261.034H27.9018V258.034L296.402 258.034L296.402 261.034ZM27.9018 282.034L296.402 282.034V279.034L27.9018 279.034L27.9018 282.034ZM296.402 303.034L27.9018 303.034L27.9018 300.034H296.402L296.402 303.034ZM27.9018 324.034L296.402 324.034V321.034L27.9018 321.034V324.034ZM27.9018 366.034H111.902V363.034H27.9018V366.034ZM111.902 387.034H27.9017L27.9017 384.034L111.902 384.034L111.902 387.034ZM27.9017 408.034H111.902V405.034H27.9017V408.034Z"
          fill="url(#paint1_linear_7_895)"
          fill-opacity="0.7"
        />
        <defs>
          <filter
            id="filter0_b_7_895"
            x="-29.0983"
            y="-29.2163"
            width="382.5"
            height="506"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="15" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_7_895"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_7_895"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_7_895"
            x1="15.6417"
            y1="12.7418"
            x2="302.218"
            y2="440.71"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4A0064" />
            <stop offset="1" stop-color="#FEB6FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_7_895"
            x1="162.251"
            y1="39.5337"
            x2="162.251"
            y2="408.034"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#B24AB3" />
            <stop offset="1" stop-color="#FEB6FF" />
          </linearGradient>
        </defs>
      </motion.svg>
    );
  }
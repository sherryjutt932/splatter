import React, { useState } from "react";
import "./style.css";
// import { COLORS } from './Sheen'; // Adjust the import path for COLORS

interface SliderWithTiersProps {
  className?: string;
  style?: React.CSSProperties;
  min?: number;
  max?: number;
  step?: number;
  lightMode?: boolean;
}

const SliderWithTiers: React.FC<SliderWithTiersProps> = (props) => {
  const { min = 0.65, max = 3, step = 0.01 } = props; // Use min/max values from props, default to 0 and 100
  const [value, setValue] = useState<number>(1);

  // Define the sections and their corresponding colors from COLORS
  const sectionColors = [
    ["#684098", "#8263B3"],
    ["#3671CD", "#5CDCF7"],
    ["#A24F60", "#E2BB18"],
    ["#4F719D", "#A5C5EE"],
  ];

  // Determine how wide each section is based on the number of colors
  const sectionWidth = 100 / sectionColors.length;

  return (
    <div
      className={`customSliderCon relative flex items-center rounded-lg ${
        props.className || ""
      }`}
      style={
        {
          ...props.style,
          "--glow": props.lightMode
            ? "none"
            : `linear-gradient(
          -255deg,
          transparent ${3 * sectionWidth}%,
          ${sectionColors[3][0]} ${3 * sectionWidth}%,
          ${sectionColors[3][1]} 100%
        )`,
          background: props.lightMode
            ? "#E1D2FF"
            : `linear-gradient(
          -255deg,
          ${sectionColors[0][0]} 0%,
          ${sectionColors[0][1]} ${sectionWidth}%,
          ${sectionColors[1][0]} ${sectionWidth}%,
          ${sectionColors[1][1]} ${2 * sectionWidth}%,
          ${sectionColors[2][0]} ${2 * sectionWidth}%,
          ${sectionColors[2][1]} ${3 * sectionWidth}%,
          ${sectionColors[3][0]} ${3 * sectionWidth}%,
          ${sectionColors[3][1]} 100%
        )`,
        } as React.CSSProperties
      }
    >
      {/* Slider Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="customSlider w-full h-3 text-xs rounded-lg appearance-none cursor-pointer z-20 relative"
        style={
          {
            "--otherSecWidth": props.lightMode
              ? "100%"
              : `${sectionWidth * (sectionColors.length - 1)}%`,
            "--lastSecWidth": props.lightMode ? "0%" : `${sectionWidth}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default SliderWithTiers;

{/* <SliderWithTiers
  lightMode
  min={0.65}
  max={3}
  step={0.01}
  className="my-custom-slider-class"
  style={{ marginTop: "20px" }}
/>;

<SliderWithTiers
  min={0.65}
  max={3}
  step={0.01}
  className="my-custom-slider-class"
  style={{ marginTop: "20px" }}
/>; */}

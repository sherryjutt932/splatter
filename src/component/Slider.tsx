import "./SliderStyle.css";

interface SliderWithTiersProps {
    value: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    className?: string;
    style?: React.CSSProperties;
    min: number;
    max: number;
    step?: number;
    lightMode?: boolean;
    int?: boolean;
}

const SliderWithTiers: React.FC<SliderWithTiersProps> = (props) => {
    const { value, setValue, min, max, step = 0.01, int=false } = props;

    // Define the sections and their corresponding colors from COLORS
    const sectionInfo = [
        ["#684098", "#8263B3", 1],
        ["#4F719D", "#A5C5EE", 1.5],
        ["#A24F60", "#E2BB18", 2],
        ["#3671CD", "#5CDCF7", max],
    ];

    const calculateSectionPercent = (value: number) => {
        return ((value - min) / (max - min)) * 100;
    }

    // Increment by 1 cent
    const numIncrements = (max - min) / step;

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
            transparent ${calculateSectionPercent(Number(sectionInfo[2]?.[2]))}%,
            ${sectionInfo[3]?.[0]} ${calculateSectionPercent(Number(sectionInfo[2]?.[2]))}%,
            ${sectionInfo[3]?.[1]} 100%
            )`,
            background: props.lightMode
                ? "#E1D2FF"
                : `linear-gradient(
            -255deg,

            ${sectionInfo[0]?.[0]} 0%,
            ${sectionInfo[0]?.[1]} ${calculateSectionPercent(Number(sectionInfo[0]?.[2]))}%,
            ${sectionInfo[1]?.[0]} ${calculateSectionPercent(Number(sectionInfo[0]?.[2]))}%,
            ${sectionInfo[1]?.[1]} ${calculateSectionPercent(Number(sectionInfo[1]?.[2]))}%,
            ${sectionInfo[2]?.[0]} ${calculateSectionPercent(Number(sectionInfo[1]?.[2]))}%,
            ${sectionInfo[2]?.[1]} ${calculateSectionPercent(Number(sectionInfo[2]?.[2]))}%,
            ${sectionInfo[3]?.[0]} ${calculateSectionPercent(Number(sectionInfo[2]?.[2]))}%,
            ${sectionInfo[3]?.[1]} 100%
            )`,
            } as React.CSSProperties
        }
        >

        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => int ? setValue(Math.floor(Math.min(Number(e.target.value), max))) : setValue(Math.min(Number(e.target.value), max))}
            className="customSlider w-full h-3 text-xs rounded-lg appearance-none cursor-pointer z-20 relative"
            style={
            {
                "--otherSecWidth": props.lightMode
                ? "100%"
                : `${numIncrements * (sectionInfo.length - 1)}%`,
                "--lastSecWidth": props.lightMode ? "0%" : `15%`,
            } as React.CSSProperties
            }
        />
        </div>
  );
};

export default SliderWithTiers;
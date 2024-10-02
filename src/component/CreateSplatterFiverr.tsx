"use client";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Form from "./Form.tsx";
import CurrencyField from "./CurrencyField.tsx";
import InputField from "./InputField.tsx";
import Card from "./Card";
import classes from "./cssUtility";
import { Transition } from "@headlessui/react";
import SliderWithTiers from "./Slider";
import { getValueTier } from "./tier.ts";
import { Sheen, COLORS } from "./Sheen.tsx";
import InputWrapper from "./InputWrapper.tsx";

const MAX_SIZES = {
  numApplications: 100,
  pricePerApplication: 100,
  title: 25,
  jobLocations: 50,
  jobTypes: 100,
  comments: 100,
};

const APPLICATION_LAYER_THRESHOLDS: number[] = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
];

function getMouseRotate(
  { x, y }: { x: number; y: number },
  magnitude: number | [number, number] = 15
) {
  if (typeof window !== "undefined") {
    const xFrac = x / window.innerWidth;
    const yFrac = y / window.innerHeight;

    const xTilt =
      (xFrac - 0.5) * 2 * (Array.isArray(magnitude) ? magnitude[0] : magnitude);
    const yTilt =
      (yFrac - 0.5) * 2 * (Array.isArray(magnitude) ? magnitude[1] : magnitude);

    return `rotateY(${xTilt}deg) rotateX(${-yTilt}deg)`;
  }
  return ``;
}

function getMouseTranslate(
  { x, y }: { x: number; y: number },
  magnitude: number | [number, number] = 15
) {
  if (typeof window !== "undefined") {
    const xFrac = x / window.innerWidth;
    const yFrac = y / window.innerHeight;

    const xShift =
      (xFrac - 0.5) * 2 * (Array.isArray(magnitude) ? magnitude[0] : magnitude);
    const yShift =
      (yFrac - 0.5) * 2 * (Array.isArray(magnitude) ? magnitude[1] : magnitude);

    return `translate(${xShift}px, ${yShift}px)`;
  }
  return ``;
}

const TRANSFORM_REST = `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`;

export default function CreateSplatter() {
  const [mouseShift, setMouseShift] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const targetMouseShift = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const shiftAnimFrameRef = useRef<number | null>(null);

  const mockSplatterRef = useRef<HTMLDivElement>(null);
  const mockQuantityElems = useRef<(HTMLDivElement | null)[]>([]);
  const mockDetailsRef = useRef<HTMLDivElement>(null);
  const mockApplicationRef = useRef<HTMLDivElement>(null);

  const mousePosHistory = useRef<{ x: number; y: number }[]>([]);

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      mousePos.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }
  }, []);

  const offsetMousePos: { x: number; y: number } = {
    x: mousePos.current.x + mouseShift.x,
    y: mousePos.current.y + mouseShift.y,
  };

  const updateTweens = useCallback(() => {
    const offsetMousePos: { x: number; y: number } = {
      x: mousePos.current.x + mouseShift.x,
      y: mousePos.current.y + mouseShift.y,
    };

    mousePosHistory.current.push(mousePos.current);
    if (mousePosHistory.current.length > 100)
      mousePosHistory.current = mousePosHistory.current.slice(
        mousePosHistory.current.length - 100
      );

    if (mockSplatterRef.current)
      mockSplatterRef.current.style.transform = [
        TRANSFORM_REST,
        getMouseRotate(offsetMousePos),
      ].join(" ");
    if (mockDetailsRef.current)
      mockDetailsRef.current.style.transform = [
        TRANSFORM_REST,
        getMouseRotate(offsetMousePos, 6),
        getMouseTranslate(offsetMousePos, [10, 5]),
      ].join(" ");

    mockQuantityElems.current
      .filter((e) => e != null)
      .forEach((elem, i) => {
        const pos = mousePosHistory.current[
          mousePosHistory.current.length - 1 - Math.round(Math.pow(i, 0.9))
        ] as { x: number; y: number };
        if (pos != undefined) {
          const offsetPos = {
            x: pos.x + mouseShift.x,
            y: pos.y + mouseShift.y,
          };

          (elem as HTMLDivElement).style.transform = [
            TRANSFORM_REST,
            getMouseRotate(offsetPos),
            getMouseTranslate(offsetPos, -10 * (i + 1)),
          ].join(" ");
        }
      });

    if (mockApplicationRef.current)
      mockApplicationRef.current.style.transform = [
        TRANSFORM_REST,
        getMouseRotate(offsetMousePos, 12),
        getMouseTranslate(offsetMousePos, 5),
      ].join(" ");
  }, [mouseShift]);

  useEffect(() => {
    let cancel = 0;
    const loop = () => {
      updateTweens();
      cancel = requestAnimationFrame(loop);
    };
    cancel = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(cancel);
  }, [updateTweens]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [mouseShift, updateTweens]);

  useEffect(() => {
    targetMouseShift.current = {
      x: window.innerWidth / 2,
      y: -window.innerHeight / 1.2,
    };

    setMouseShift((mouseShift) => {
      if (
        mouseShift.x !== targetMouseShift.current.x ||
        mouseShift.y !== targetMouseShift.current.y
      ) {
        if (shiftAnimFrameRef.current)
          cancelAnimationFrame(shiftAnimFrameRef.current);

        function loop() {
          setMouseShift((mouseShift) => {
            if (
              Math.abs(mouseShift.x - targetMouseShift.current.x) < 1 &&
              Math.abs(mouseShift.y - targetMouseShift.current.y) < 1
            ) {
              shiftAnimFrameRef.current = null;
              return targetMouseShift.current;
            } else {
              shiftAnimFrameRef.current = requestAnimationFrame(loop);

              return {
                x:
                  mouseShift.x +
                  (targetMouseShift.current.x - mouseShift.x) / 6,
                y:
                  mouseShift.y +
                  (targetMouseShift.current.y - mouseShift.y) / 6,
              };
            }
          });
        }

        loop();
      }

      return mouseShift;
    });
  }, []);

  const [numApplications, setNumApplications] = useState<number | undefined>(
    30
  );
  const [pricePerApplication, setPricePerApplication] = useState<
    number | undefined
  >(undefined);

  const CurrentTier = getValueTier(pricePerApplication || 0);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid px-12 grid-cols-[1fr,700px] w-screen max-w-[1400px] mx-auto gap-6 xl:gap-24 relative">
        {/* Inputs */}
        <Card
          className="w-full mt-24 mb-16
				place-self-center relative z-20 backdrop-blur-lg !p-0"
        >
          {/* rerenderKey={privateSplatter ? 1 : 0}  overflow-hidden h-max*/}
          <Form className="w-full p-6">
            <div className="flex flex-col w-full gap-6">
              <InputWrapper label="Number of Applications" required>
                <div className="w-full flex gap-4 items-center bg-splatter-200/10 pr-3 rounded-md">
                  <InputField
                    label="Number of Applications"
                    type="number"
                    value={numApplications ? numApplications.toString() : ""}
                    inputClassName="w-[100px]"
                    onChange={(value) =>
                      setNumApplications(
                        value === ""
                          ? undefined
                          : Math.floor(
                              Math.min(Number(value), MAX_SIZES.numApplications)
                            )
                      )
                    }
                  />
                  <SliderWithTiers
                    value={numApplications}
                    setValue={setNumApplications}
                    min={10}
                    max={MAX_SIZES.numApplications}
                    step={1}
                    className="min-w-[100px] w-full"
                    lightMode={true}
                    int={true}
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Price Per Application (USD)" required>
                <div className="w-full flex gap-4 items-center bg-splatter-200/10 pr-3 rounded-md">
                  <CurrencyField
                    label="Price Per Application (USD)"
                    value={pricePerApplication || 0}
                    prefix="$"
                    inputClassName="w-[100px]"
                    decimalsLimit={2}
                    required
                    max={MAX_SIZES.pricePerApplication} // Pass the max value
                    onChange={(value) => {
                      setPricePerApplication(value || 0);
                    }}
                  />
                  <SliderWithTiers
                    value={pricePerApplication || 0}
                    setValue={setPricePerApplication}
                    min={0.65}
                    max={2.5}
                    step={0.01}
                    className="min-w-[100px] w-full"
                  />
                </div>
              </InputWrapper>
            </div>
          </Form>
        </Card>

        {/* Preview */}

        <div className="sticky h-screen top-0">
          <div
            className={classes(
              "w-[400px] h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "mt-16 ml-32 bg-pink-300 blur-[96px] transition duration-200",
              "scale-[120%]"
            )}
          />

          <div className="w-0 h-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [perspective:1000px]">
            {APPLICATION_LAYER_THRESHOLDS.map((num, i) => (
              <Transition
                as="div"
                key={i}
                ref={(elem) =>
                  (mockQuantityElems.current[i] = elem as HTMLDivElement)
                }
                enterFrom="!opacity-0 [scale:.7]"
                enter="transition-all will-change-transform
								[transition-property:opacity,scale,translate,transform] duration-100"
                leaveTo="!opacity-0 [scale:.7]"
                leave="transition-all will-change-transform
								[transition-property:opacity,scale,translate,transform] duration-100"
                show={(numApplications ?? 0) >= num}
                style={{
                  background: `${COLORS["--color-tier-sheen"][CurrentTier]}`,
                  transform: [
                    getMouseRotate(offsetMousePos),
                    TRANSFORM_REST,
                    getMouseTranslate(offsetMousePos, -10 * (i + 1)),
                  ].join(" "),
                  zIndex: 100 - i,
                  opacity: `${
                    40 -
                    APPLICATION_LAYER_THRESHOLDS.filter(
                      (t) => (numApplications ?? 0) >= t
                    ).length *
                      1
                  }%`,
                  scale: `${1 - (i + 1) * 0.027} ${1 - (i + 1) * -0.01}`,
                }}
                className={classes(`flex flex-col rounded-md rounded-tl-xl rounded-br-xl absolute
								isolate overflow-hidden top-[calc(50%-70px)] left-[calc(50%-270px)]
								w-[min(50vw,550px)] h-[140px] backdrop-blur-md [box-shadow:0px_4px_12px_0px_rgb(0_0_0/20%)]`)} // ,!!detailsFocused && 'blur opacity-60'
              />
            ))}

            <Transition
              as={Fragment}
              show={true}
              enterFrom="opacity-0 [translate:0px_-32px] [scale:.8]"
              enter="transition-all will-change-transform
							[transition-property:opacity,scale,translate] duration-300 delay-[150ms]"
              leaveTo="opacity-0 [translate:0px_32px] [scale:.8]"
              leave="transition-all will-change-transform
							[transition-property:opacity,scale,translate] duration-300 delay-[50ms]"
            >
              <div
                ref={mockSplatterRef}
                style={{
                  transform: [
                    TRANSFORM_REST,
                    getMouseRotate(offsetMousePos),
                  ].join(" "),
                }}
                className={classes(
                  `flex flex-col rounded-md rounded-tl-xl rounded-br-xl relative isolate overflow-hidden top-[calc(50%-70px)] left-[calc(5%-270px)]
								w-[min(50vw,550px)] z-[100]`,
                  "[scale:1]"
                )}
              >
                <Sheen
                  outerClassName=""
                  innerClassName="p-3.5 py-3"
                  tier={CurrentTier}
                  value={pricePerApplication || 0}
                >
                  <p
                    style={{
                      color: `${COLORS["--color-tier-100"][CurrentTier]}`,
                    }}
                    className="flex text-xl items-center font-bold mb-2"
                  >
                    <span>{"Remote"}</span>
                  </p>

                  <p className="flex items-center text-[40px] font-bold text-slate-50 -ml-0.5 mb-3 h-10">
                    <span>{"Title"}</span>
                  </p>

                  <div
                    style={{
                      color: `${COLORS["--color-tier-200"][CurrentTier]}`,
                    }}
                    className="flex items-center font-semibold text-xl"
                  >
                    <span>{numApplications || 10} Applications</span>
                    <span className="mx-2">•</span>
                    <span>${pricePerApplication || 0} each</span>
                  </div>
                </Sheen>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
}

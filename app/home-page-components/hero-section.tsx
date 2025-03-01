import React from "react";
import { HeroPill } from "./hero-pill";
import { DotPattern } from "@/components/ui/dot-pattern";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <div>
      <section id="home">
        <div className="animation-delay-8 animate-fadeIn flex  flex-col items-center justify-center  text-center ">
          <div className="">
            <div className="px-2">
              <div className="border-ali relative mx-auto h-full max-w-7xl  p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
                <HeroPill />
                <div className="flex gap-4 text-8xl mt-12">
                  <TextAnimate animation="blurIn" as="h1" duration={1}>
                    {"INTEL."}
                  </TextAnimate>
                  <TextAnimate
                    animation="blurIn"
                    as="h1"
                    duration={3}
                    delay={1}
                  >
                    {"POWER."}
                  </TextAnimate>
                  <TextAnimate
                    animation="blurIn"
                    as="h1"
                    duration={3}
                    delay={2}
                  >
                    {"COMMS."}
                  </TextAnimate>
                </div>
                <div className="">
                  <TextAnimate
                    animation="blurIn"
                    as="h3"
                    duration={3}
                    delay={3}
                    className="text-2xl font-semibold tracking-tight max-w-xl  "
                  >
                    Innovative Engineering Solutions That Give You The
                    Confidence You’ll Accomplish Your Mission.
                  </TextAnimate>
                </div>
              </div>
            </div>
          </div>
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(1250px_circle_at_center,white,transparent)] -z-10"
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

import {
  Marquee,
  MarqueeItem,
  MarqueeFade,
  MarqueeContent,
} from "@/components/ui/marquee";

const ScrollingBanner = () => {
  const array = [
    "✓ Technical Risk Mitigation",
    "✓ Faster Development Time",
    "✓ Experience & Reputation",
    " ✓ 35+ Years In Business",
    "✓ TRL 9 Hardware",
  ];
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {array.map((text, index) => (
          <MarqueeItem key={index} className="">
            <p className="">{text}</p>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
};

export default ScrollingBanner;

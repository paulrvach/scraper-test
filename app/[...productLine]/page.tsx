"use client";
import React from "react";
import { useData } from "../context/scraped-data-context";
import DataDistributor from "./components/data-distributor";
import { ContentBlock } from "../api/test-scraper/route";

type Props = {};
// const data: { data: ContentBlock[] } = {
//   data: [
//     {
//       items: [
//         {
//           text: "The Iris Technology QP-1800 DC/AC Inverter System provides reliable AC power in all conditions and delivers superior quality true sine wave output with typically only 1% Total Harmonic Distortion.",
//         },
//         {
//           text: "Ruggedized for tactical and industrial applications, the 120-volt, 60 Hz AC power output is capable of supporting both heavy duty and smaller, multiple AC loads.",
//         },
//         {
//           text: "Output power is rated at 1800 Watts. This enables operation of 115 VAC powered devices from the vehicle’s prime power and is intended for use with medium/high power equipment.",
//         },
//         {
//           text: "The inverter system has found wide use throughout the DoD and is ideally suited for electrical systems that already have a quality multistage battery charger.",
//         },
//       ],
//       headings: {
//         h1: "QP-1800 COMPLETE INVERTER SYSTEM",
//         h3: "MOBILE DC/AC INVERTER SYSTEM DELIVERING 1800 WATTS OF RELIABLE AC POWER FROM A DC SOURCE",
//       },
//     },
//     {},
//     {
//       headings: {
//         p: "Features",
//       },
//       items: [
//         {
//           text: "True sine wave AC output (crystal controlled)",
//         },
//         {
//           text: "2900 watt surge capability",
//         },
//         {
//           text: "Removable LCD display can be mounted remotely for control and monitoring",
//         },
//         {
//           text: "Unique DC terminals offer 180-degree connections for easy installation in tight places",
//         },
//         {
//           text: "Power-save mode draws only 1.5 watts under no load",
//         },
//         {
//           text: "Two year warranty",
//         },
//       ],
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/a37e708b-8836-4877-a8f2-b92bbc64503d/QP-1800-inverter.png",
//           text: "QP-1800 DC/AC Inverter",
//         },
//       ],
//     },
//     {
//       headings: {
//         h3: "A COMPLETE DC/AC VEHICLE SYSTEM",
//       },
//       items: [
//         {
//           text: "The QP-1800 DC/AC Inverter System Complete Kit (PN 100499) is a comprehensive DC/AC power management solution for vehicle mounted or stand-alone applications. The QP-1800 System Complete Kit includes the following:",
//         },
//         {
//           text: "Ruggedized DC/AC 1800 Watt Power Inverter",
//         },
//         {
//           text: "Heavy-duty #00 AWG Flex cable with NATO Slave for connections between vehicle and Inverter",
//         },
//         {
//           text: "Compact case (22.1” x 17.9” x 10.4”) for weatherproof transportation and storage",
//         },
//         {
//           text: "Installation kit / Spare fuse",
//         },
//         {
//           text: "System manuals / Hand book",
//         },
//       ],
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/f7f340d0-d6d8-41da-ae61-342d18c0e8fa/QP-1800-complete-kit.png",
//           text: "QP-1800 Complete kit",
//         },
//       ],
//     },
//     {
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/f7f340d0-d6d8-41da-ae61-342d18c0e8fa/QP-1800-complete-kit.png",
//           text: "QP-1800 Complete kit",
//         },
//       ],
//     },
//     {
//       headings: {
//         h3: "A COMPLETE DC/AC VEHICLE SYSTEM",
//       },
//       items: [
//         {
//           text: "The QP-1800 DC/AC Inverter System Complete Kit (PN 100499) is a comprehensive DC/AC power management solution for vehicle mounted or stand-alone applications. The QP-1800 System Complete Kit includes the following:",
//         },
//         {
//           text: "Ruggedized DC/AC 1800 Watt Power Inverter",
//         },
//         {
//           text: "Heavy-duty #00 AWG Flex cable with NATO Slave for connections between vehicle and Inverter",
//         },
//         {
//           text: "Compact case (22.1” x 17.9” x 10.4”) for weatherproof transportation and storage",
//         },
//         {
//           text: "Installation kit / Spare fuse",
//         },
//         {
//           text: "System manuals / Hand book",
//         },
//       ],
//     },
//     {
//       items: [
//         {
//           text: "This optional QP-1800 Mounting Plate can be easily installed in any military / DOD vehicle / platform type that offers adequate mounting space. The mounting plate provides a 15’’ x 36’’ mounting surface with cable restraints and vibration isolators to minimize terrain shock and stress to the hardware.",
//         },
//         {
//           text: "The additional space on the Mounting Plate can be utilized to mount accessories such as Toughbooks or radio packs.",
//         },
//       ],
//       headings: {
//         h3: "Vehicle installation kit available",
//       },
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/0a6e1b1b-4007-4a1d-ae8b-7807c9c5d1e0/qp-1800-military-vehicle-mount.jpg",
//           text: "QP-1800 mounted in a military vehicle",
//         },
//       ],
//     },
//     {
//       items: [
//         {
//           text: "This optional QP-1800 Mounting Plate can be easily installed in any military / DOD vehicle / platform type that offers adequate mounting space. The mounting plate provides a 15’’ x 36’’ mounting surface with cable restraints and vibration isolators to minimize terrain shock and stress to the hardware.",
//         },
//         {
//           text: "The additional space on the Mounting Plate can be utilized to mount accessories such as Toughbooks or radio packs.",
//         },
//       ],
//       headings: {
//         h3: "Vehicle installation kit available",
//       },
//     },
//     {
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/0a6e1b1b-4007-4a1d-ae8b-7807c9c5d1e0/qp-1800-military-vehicle-mount.jpg",
//           text: "QP-1800 mounted in a military vehicle",
//         },
//       ],
//     },
//     {
//       items: [
//         {
//           text: "QP-1800 power inverters use high frequency switching technology in the power conversion process, similar to those used in power supplies for computers and other electronic equipment.",
//         },
//       ],
//       headings: {
//         h2: "HIGH FREQUENCY SWITCHING TECHNOLOGY",
//         h4: "Totally silent for quiet operationHigh surge capability for “hard-to-start” AC loadsLighter & more compact than inverters with similar power ratings",
//       },
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/df4f527b-deca-4383-b46d-c9b7d442681b/silent-blue.png",
//           text: "Silent operation icon",
//         },
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/d35c15b4-14e3-4aa9-b7c0-0137db6e98ba/thunder-blue.png",
//           text: "high surge capacity icon",
//         },
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/8976603d-68dd-41a0-ba99-624e0cb88acd/feather-blue.png",
//           text: "lighter than other inverters icon",
//         },
//       ],
//     },
//     {
//       items: [],
//       headings: {
//         h4: "Totally silent for quiet operation",
//       },
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/df4f527b-deca-4383-b46d-c9b7d442681b/silent-blue.png",
//           text: "Silent operation icon",
//         },
//       ],
//     },
//     {
//       items: [],
//       headings: {
//         h4: "High surge capability for “hard-to-start” AC loads",
//       },
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/d35c15b4-14e3-4aa9-b7c0-0137db6e98ba/thunder-blue.png",
//           text: "high surge capacity icon",
//         },
//       ],
//     },
//     {
//       items: [],
//       headings: {
//         h4: "Lighter & more compact than inverters with similar power ratings",
//       },
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/8976603d-68dd-41a0-ba99-624e0cb88acd/feather-blue.png",
//           text: "lighter than other inverters icon",
//         },
//       ],
//     },
//     {
//       headings: {
//         h3: "Protection Features",
//       },
//       items: [
//         {
//           text: "Over temperature shutdown and automatic overload protection",
//         },
//         {
//           text: "Over voltage and under voltage protection",
//         },
//         {
//           text: "Short circuit and AC backfeed protection",
//         },
//       ],
//     },
//     {
//       items: [],
//       headings: {
//         h3: "Protection Features",
//       },
//     },
//     {
//       headings: {
//         p: "Over temperature shutdown and automatic overload protection",
//       },
//       items: [
//         {
//           text: "Over temperature shutdown and automatic overload protection",
//         },
//         {
//           text: "Over voltage and under voltage protection",
//         },
//         {
//           text: "Short circuit and AC backfeed protection",
//         },
//       ],
//     },
//     {
//       items: [
//         {
//           text: "Thank you! We will be in contact soon.",
//         },
//       ],
//       headings: {
//         h3: "Let’s find the right mobile power system solution for your needs. Email us now.",
//       },
//       tables: [
//         [
//           {
//             PRODUCT: "PRODUCT",
//             "PART NUMBER": "PART NUMBER",
//           },
//           {
//             PRODUCT:
//               "QP-1800 Inverter Complete System Includes inverter, NATO Slave cable and tan transport case",
//             "PART NUMBER": "100499",
//           },
//           {
//             PRODUCT:
//               "QP-1800 Inverter System Includes inverter and NATO Slave cable",
//             "PART NUMBER": "100498",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter Only",
//             "PART NUMBER": "100401",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter NATO Cable",
//             "PART NUMBER": "102051",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter System Case",
//             "PART NUMBER": "101601",
//           },
//           {
//             PRODUCT: "QP-1800 Mounting Plate",
//             "PART NUMBER": "100421",
//           },
//         ],
//       ],
//     },
//     {
//       tables: [
//         [
//           {
//             PRODUCT: "PRODUCT",
//             "PART NUMBER": "PART NUMBER",
//           },
//           {
//             PRODUCT:
//               "QP-1800 Inverter Complete System Includes inverter, NATO Slave cable and tan transport case",
//             "PART NUMBER": "100499",
//           },
//           {
//             PRODUCT:
//               "QP-1800 Inverter System Includes inverter and NATO Slave cable",
//             "PART NUMBER": "100498",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter Only",
//             "PART NUMBER": "100401",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter NATO Cable",
//             "PART NUMBER": "102051",
//           },
//           {
//             PRODUCT: "QP-1800 Inverter System Case",
//             "PART NUMBER": "101601",
//           },
//           {
//             PRODUCT: "QP-1800 Mounting Plate",
//             "PART NUMBER": "100421",
//           },
//         ],
//       ],
//     },
//     {
//       images: [
//         {
//           src: "https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/a36558f7-1407-4c9b-a696-47ad97e2e574/Iris-Logo-RGB-color.png",
//           text: "Iris Technology logo",
//         },
//       ],
//     },
//   ],
// };
const ProductLinePage: React.FC<Props> = () => {
  const { data } = useData();
  return (
    <div className="  flex flex-col mx-auto mt-8 max-w-screen-xl rounded-2xl  p-6 lg:p-16 ">
      {data?.data?.map((properties, index) => {
        return <DataDistributor key={`comp-${index}`} data={properties} />;
      })}
    </div>
  );
};

export default ProductLinePage;

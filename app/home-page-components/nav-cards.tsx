"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

import dynamic from "next/dynamic";
const Meteors = dynamic(() => import("../../components/ui/meteors"), {
  ssr: false,
});

import { motion } from "framer-motion";
import React, { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";


const NavCards = () => {
  const [isHovering, setIsHovering] = useState<"aerospace" | "tactical" | null>(
    null
  );
  return (
    <div className="mt-8 flex w-full gap-24 justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href={"/aerospace"}>
          <Card
            className="overflow-hidden bg-opacity-15 relative"
            onMouseOver={() => {
              setIsHovering("aerospace");
            }}
            onMouseOut={() => {
              setIsHovering(null);
            }}
          >
            <CardHeader className="h-56 overflow-hidden">
              <Meteors number={20} />
            </CardHeader>
            <CardContent className="flex grow min-w-96">
              <Badge variant={"secondary"}>
                <p className="text-lg">🚀AEROSPACE</p>
              </Badge>
            </CardContent>
            {isHovering == "aerospace" && (
              <BorderBeam size={250} duration={4} delay={15} />
            )}
          </Card>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href={"/aerospace"}>
          <Card
            className="h-full relative cursor-pointer"
            onMouseOver={() => {
              setIsHovering("tactical");
            }}
            onMouseOut={() => {
              setIsHovering(null);
            }}
          >
            <CardHeader className="h-56">
              <div className="size-full bg-grid-pattern-light dark:bg-grid-pattern bg-repeat bg-[length:50px_50px]"></div>
            </CardHeader>
            <CardFooter className="  min-w-96">
              <Badge variant={"outline"}>
                <p className="text-lg">🪖TACTICAL</p>
              </Badge>
            </CardFooter>
            {isHovering == "tactical" && (
              <BorderBeam size={250} duration={4} delay={9} />
            )}
          </Card>
        </Link>
      </motion.div>
    </div>
  );
};

export default NavCards;

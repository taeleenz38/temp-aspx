"use client";
import React, { useState } from "react";
import SortToggle from "../../ui/SortToggle";
import Projects from "./Projects";
import ProjectsSideBar from "../../ui/ProjectsSideBar";

const Section3 = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  return (
    <div className="min-h-screen w-full text-primary flex justify-between gap-4 py-14 px-4">
      <div className="w-[88%] flex flex-col mt-36">
        <p className="text-7xl mr-8 font-extralight mb-8">Portfolio.</p>
        <div className="flex gap-4 mb-8">
          <p className="font-extralight underline decoration-1 text-2xl underline-offset-[12px]">
            Sort
          </p>
          <SortToggle
            sortOrder={sortOrder}
            toggleSortOrder={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          />{" "}
        </div>
        <Projects activeCategory={activeCategory} sortOrder={sortOrder} />
      </div>
      <ProjectsSideBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default Section3;

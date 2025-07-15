"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion as MotionComponent } from "framer-motion";

const projectData = [
  {
    category: "videographers",
    thumbnail: "/mock-project-3.jpg",
    images: [
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
    ],
    title: "Title 1",
    description: "Sample description for videographers...",
  },
  {
    category: "photographers",
    thumbnail: "/mock-project-2.png",
    images: [
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
    ],
    title: "Title 2",
    description: "Sample description for photographers...",
  },
  {
    category: "artists",
    thumbnail: "/mock-project-1.jpg",
    images: [
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
      "/mock-project-1.jpg",
    ],
    title: "Title 3",
    description: "Sample description for artists...",
  },
];

const Divider = () => (
  <div className="w-1/2 flex justify-center">
    <span className="w-2 h-24 bg-black" />
  </div>
);

const ProjectItem = ({
  thumbnail,
  title,
  description,
  onViewMore,
}: (typeof projectData)[0] & { onViewMore: () => void }) => (
  <MotionComponent.div
    className="flex gap-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="w-1/2 relative group">
      <img
        src={thumbnail}
        className="w-full h-auto object-contain"
        alt={title}
      />
      <div
        className="h-1/2 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-end flex items-center justify-center"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p
          onClick={onViewMore}
          className="text-white text-2xl font-extralight hover:cursor-pointer hover:font-light duration-200"
        >
          View More
        </p>
      </div>
    </div>

    <div className="w-1/2 flex flex-col gap-2 pr-10">
      <h2 className="text-3xl font-medium m-0 leading-none">{title}</h2>
      <p className="font-extralight text-xl">{description}</p>
    </div>
  </MotionComponent.div>
);

const ImageModal = ({
  images,
  onClose,
}: {
  images: string[];
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl w-4/5 max-h-[90vh] overflow-auto relative"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Project Image ${idx + 1}`}
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ activeCategory }: { activeCategory: string }) => {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectData
      : projectData.filter(
          (project) =>
            project.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <>
      {filteredProjects.map((project, index) => (
        <React.Fragment key={index}>
          <ProjectItem
            {...project}
            onViewMore={() => setSelectedImages(project.images)}
          />
          {index < filteredProjects.length - 1 && <Divider />}
        </React.Fragment>
      ))}

      {selectedImages && (
        <ImageModal
          images={selectedImages}
          onClose={() => setSelectedImages(null)}
        />
      )}
    </>
  );
};

export default Projects;

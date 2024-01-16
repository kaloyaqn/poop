import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Drawer = ({ isActive, setIsActive }) => {
  const controls = useAnimation();
  const [dragStart, setDragStart] = useState(0);

  useEffect(() => {
    if (isActive) {
      controls.start("active");
    } else {
      controls.start("inactive");
    }
  }, [isActive, controls]);

  const drawerVariants = {
    active: { opacity: 1, y: 0 },
    inactive: { opacity: 1, y: 300 },
  };

  const handleDragStart = (_, info) => {
    setDragStart(info.point.y);
  };

  const handleDrag = (_, info) => {
    const dragDistance = info.point.y - dragStart;
    controls.set("inactive");
    controls.set("active", { y: dragDistance < 0 ? 0 : dragDistance });
  };

  const handleDragEnd = (_, info) => {
    const dragDistance = info.point.y - dragStart;
    if (dragDistance > 100) {
      setIsActive(false); // Close the drawer if dragged down by a certain distance
    } else {
      controls.start(isActive ? "active" : "inactive");
    }
  };

  return (
    <motion.div
      key="drawer"
      initial="inactive"
      animate={controls}
      variants={drawerVariants}
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
        borderRadius: { duration: 0.5 },

      }}
      drag="y"
      dragElastic={0.1} // Adjust the dragElastic value for a more noticeable dragging effect
      dragConstraints={{ top: 0, bottom: 0 }} // Allow dragging only within the vertical axis
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      exit={{ opacity: 0, y: 300 }}
      style={{ zIndex: 99 }}
      className="bg-white w-full h-64 fixed bottom-0 right-0 z-99 flex flex-col rounded-t-lg border-[1px] border-gray-100"
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-300"></div>
      User info
    </motion.div>
  );
};

export default Drawer;

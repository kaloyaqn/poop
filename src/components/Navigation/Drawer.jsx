import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const SidekickWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 300px;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
`;

const SidekickOverlay = styled(motion.div)(({ overlayColor }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  bottom: 0,
  left: 0,
  backgroundColor: overlayColor,
  pointerEvents: "all",
  zIndex: 0,
}));

const SidekickBody = styled(motion.div)(({ width }) => ({
  position: "relative",
  zIndex: 1,
  pointerEvents: "all",
  backgroundColor: "#fff",
  padding: "40px 60px 30px 30px",
  height: "100%",
  maxWidth: `${width}px`,
  boxSizing: "border-box",
}));

const MenuHandler = styled(motion.button)`
  border: none;
  background: transparent;
  borderRadius: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  outline: none;
`;

const SideBarList = ({ data }) => <div>{/* Render your list items here */}</div>;

const Drawer = ({ overlayColor = "transparent", width = 200, data, isActive, setIsActive }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isActive ? "active" : "inactive");
  }, [isActive, controls]);

  const sidekickBodyStyles = {
    active: {
      y: 0,
    },
    inactive: {
      y: +300,
    },
  };

  const menuHandlerStyles = {
    active: {
      y: 0,
      color: "#000",
    },
    inactive: {
      y: 60,
      color: "#fff",
    },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <SidekickWrapper>
          <SidekickOverlay
            overlayColor={overlayColor}
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
          />

          <SidekickBody
            key="sidekickBody"
            width={width}
            drag="y"
            dragElastic={0.1}
            dragConstraints={{
              top: 10,
              bottom: 300,
            }}
            dragMomentum={false}
            onDragEnd={(_event, info) => {
              const isDraggingLeft = info.offset.x < 0;
              const multiplier = isDraggingLeft ? 1 / 4 : 2 / 3;
              const threshold = width * multiplier;

              if (Math.abs(info.point.x) > threshold && isActive) {
                setIsActive(false);
              } else if (Math.abs(info.point.x) < threshold && !isActive) {
                setIsActive(true);
              } else {
                controls.start(isActive ? "active" : "inactive");
              }
            }}
            animate={controls}
            variants={sidekickBodyStyles}
            transition={{ type: "spring", damping: 60, stiffness: 180 }}
          >
            <MenuHandler
              onTap={() => setIsActive((s) => !s)}
              variants={menuHandlerStyles}
              transition={{ type: "spring", damping: 60, stiffness: 180 }}
            >
              {isActive ? "Close" : "Open"}
            </MenuHandler>
            <SideBarList data={data} />
          </SidekickBody>
        </SidekickWrapper>
      )}
    </AnimatePresence>
  );
};

export default Drawer;

import React, { useState, useEffect } from "react";
import { CarrouselContainer, Arrow } from "./styles";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDims() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function Carrousel({ children, breakpoints }) {
  if (breakpoints.length === 0) {
    console.log(
      "[error] breakpoints should include an array with objects describing the number of elements to show per screen size."
    );
  }
  const { width, height } = useWindowDims();
  const [currentStartIdx, setCurrentStartIdx] = useState(0);
  const [elementsPerSlide, setElementsPerSlide] = useState(
    breakpoints[0].elementCount
  );
  const [content, setContent] = useState(<div />);
  const childrenComponents = React.Children.toArray(children);
  const totalElements = childrenComponents.length;
  const showArrows = totalElements > elementsPerSlide;

  const setElementCount = () => {
    let isSet = false;
    for (let i = 0; i < breakpoints.length; i++) {
      if (width <= breakpoints[i].screenSize) {
        setElementsPerSlide(breakpoints[i].elementCount);
        isSet = true;
        break;
      }
    }
    if (!isSet) {
      setElementsPerSlide(breakpoints[breakpoints.length - 1].elementCount);
    }
  };
  useEffect(() => {
    let tmpContent = [];
    let offsetIdx = currentStartIdx;
    let size = elementsPerSlide;
    if (totalElements < elementsPerSlide) {
      size = totalElements;
    }
    for (let i = 0; i <= size - 1; i++) {
      tmpContent.push(childrenComponents[(i + offsetIdx) % totalElements]);
    }
    setContent(tmpContent);
  }, [currentStartIdx, elementsPerSlide]);

  useEffect(() => {
    setElementCount();
  }, [width]);

  useEffect(() => {
    setElementCount();
  }, []);
  const arrowClickHandler = (arrow) => {
    if (arrow === "left") {
      setCurrentStartIdx(
        (prevIdx) =>
          (totalElements - (prevIdx - elementsPerSlide)) % totalElements
      );
    } else if (arrow === "right") {
      setCurrentStartIdx(
        (prevIdx) => (prevIdx + elementsPerSlide) % totalElements
      );
    }
  };
  return (
    <CarrouselContainer>
      {showArrows && (
        <Arrow
          color={"black"}
          onClick={() => {
            arrowClickHandler("left");
          }}
        >
          <AiFillCaretLeft />
        </Arrow>
      )}
      {content}
      {showArrows && (
        <Arrow
          color={"black"}
          onClick={() => {
            arrowClickHandler("right");
          }}
        >
          <AiFillCaretRight />
        </Arrow>
      )}
    </CarrouselContainer>
  );
}

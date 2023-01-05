import React, { useRef, useState} from "react";
import Moveable from "react-moveable";

function ItemMoveable({
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    color,
    id,
    setSelected,
    isSelected = false,
    updateEnd,
    valuefit,
    objectImg
  }) {
    const ref = useRef();

    const [nodoReferencia, setNodoReferencia] = useState({
      top,
      left,
      width,
      height,
      index,
      color,
      id,
      valuefit
    });
  
    let parent = document.getElementById("parent");
    let parentBounds = parent?.getBoundingClientRect();
    
    const onResize = async (e) => {
      // ACTUALIZAR ALTO Y ANCHO
      let newWidth = e.width;
      let newHeight = e.height;
  
      const positionMaxTop = top + newHeight;
      const positionMaxLeft = left + newWidth;
  
      if (positionMaxTop > parentBounds?.height)
        newHeight = parentBounds?.height - top;
      if (positionMaxLeft > parentBounds?.width)
        newWidth = parentBounds?.width - left;
  
      updateMoveable(id, {
        top,
        left,
        width: newWidth,
        height: newHeight,
        color,
        valuefit
      });
  
      // ACTUALIZAR NODO REFERENCIA
      const beforeTranslate = e.drag.beforeTranslate;
  
      ref.current.style.width = `${e.width}px`;
      ref.current.style.height = `${e.height}px`;
  
      let translateX = beforeTranslate[0];
      let translateY = beforeTranslate[1];
  
      ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
  
      setNodoReferencia({
        ...nodoReferencia,
        translateX,
        translateY,
        top: top + translateY < 0 ? 0 : top + translateY,
        left: left + translateX < 0 ? 0 : left + translateX,
      });
    };
  
    const onResizeEnd = async (e) => {
      let newWidth = e.lastEvent?.width;
      let newHeight = e.lastEvent?.height;
  
      const positionMaxTop = top + newHeight;
      const positionMaxLeft = left + newWidth;
  
      if (positionMaxTop > parentBounds?.height)
        newHeight = parentBounds?.height - top;
      if (positionMaxLeft > parentBounds?.width)
        newWidth = parentBounds?.width - left;
  
      const { lastEvent } = e;
      const { drag } = lastEvent;
      const { beforeTranslate } = drag;
  
      const absoluteTop = top + beforeTranslate[1];
      const absoluteLeft = left + beforeTranslate[0];
  
      updateMoveable(
        id,
        {
          top: absoluteTop,
          left: absoluteLeft,
          width: newWidth,
          height: newHeight,
          color,
          valuefit
        },
        true
      );
    };

    console.log('pruebaIMG',objectImg)
  
    return (
      <>
        <div
          ref={ref}
          className="draggable"
          id={"component-" + id}
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            background: color,
          }}
          onClick={() => setSelected(id)}
        >
                    <img 
          src={objectImg?.url}
          alt={objectImg?.title} 
          width={width}
          height={height}
          style={{
            objectFit: valuefit,

          }}
        />
        </div>
  
        <Moveable
          target={isSelected && ref.current}
          resizable
          draggable
          onDrag={(e) => {
            updateMoveable(id, {
              top: e.top,
              left: e.left,
              width,
              height,
              color,
              valuefit
            });
          }}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          bounds={{
            "left": 0,
            "top": 0,
            "right": parentBounds.right - parentBounds.left,
            "bottom": parentBounds.bottom - parentBounds.top,
          }}
          snappable
        />
      </>
    );
}

export default ItemMoveable
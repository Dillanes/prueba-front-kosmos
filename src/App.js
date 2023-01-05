import React, {useState,useEffect} from "react";
import Button from "./components/Button";
import ItemMoveable from "./components/ItemMoveable";
const App = () => {

  //almacena todos los items agregados
  const [moveableComponents, setMoveableComponents] = useState([])
  //Estado para saber si haz seleccionado un item
  const [selected, setSelected] = useState(null);
  const [data,setData] = useState()


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())
    .then(res=> setData(res))
    .catch(err=> console.log('ERROR',err))
    return;
  }, [])
  
  console.log('DATA SETEADA', data)

  /**
   * Agrega un nuevo item a la caja
   */
  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const colors = ["red", "blue", "yellow", "green", "purple"];
    // Valores Object Fit
    const objectFit = ['fill','contain','cover','scale-down']
    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        valuefit:objectFit[Math.floor(Math.random() * objectFit.length)],
        updateEnd: true
      },
    ]);
  };


const deleteMoveable = () =>{
  setMoveableComponents(moveableComponents.filter(item => item.id !== selected ))
}



  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };


  console.log('ESTO SON LOS COMPONENTES',moveableComponents)
console.log('Este es el seleccionado',selected)
  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <Button
        color='#1c1'
        msg='AGREGAR ITEM'
        Action={addMoveable}   
      />
      <Button
        color='#c11'
        msg='ELIMINAR ITEM'
        Action={deleteMoveable}   
      />
      </div>

      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80%",
          margin:"auto"
        }}
      >
        {moveableComponents.map((item, index) => (
          <ItemMoveable
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            objectImg={data.find(item => item.id === index+1)}
          />
        ))}
      </div>
    </main>
  );
};

export default App;



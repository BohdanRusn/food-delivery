import {useState} from "react";

function UnitPreviewItem(props) {
  const {grocer_id, unit_id, unit_name, price, countUnits, addOneUnit, deleteOneUnit, getAllPreviewData} = props;
  const [count, setCount] = useState(countUnits)


  const incrementCount = () => {
    (addOneUnit)(grocer_id, unit_id, unit_name, price);
    setCount(count + 1);
    getAllPreviewData();

  }
  const decrementCount = () => {
    setCount((count > 0) ? count - 1 : count);
    (deleteOneUnit)(unit_id)
    getAllPreviewData();

  }

  return (
        <div className="collection-item">
          <p>{unit_name}, кількість кг: {count}, ціна: {price} грн/кг</p>
          <button className="waves-effect waves-light btn-small" type="button" style={{marginRight: 5}} onClick={decrementCount}>-</button>
          <button className="waves-effect waves-light btn-small" type="button" onClick={incrementCount}>+</button>
        </div>
  )
}

export default UnitPreviewItem

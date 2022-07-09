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
    (deleteOneUnit)(unit_id)
    setCount((count > 0) ? count - 1 : count);
    getAllPreviewData();

  }

  return (
        <div className="collection-item">
          <p>{unit_name}, кількість кг: {count}, ціна: {price} грн/кг</p>
          <button className="waves-effect waves-light btn-small"  style={{marginRight: 5}} type="button" onClick={incrementCount}>Increment</button>
          <button className="waves-effect waves-light btn-small" type="button" onClick={decrementCount}>Decrement</button>
        </div>
  )
}

export default UnitPreviewItem

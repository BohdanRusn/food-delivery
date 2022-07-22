import {useState} from "react";

function UnitPreviewItem(props) {
  const {grocer_id, unit_id, unit_name, price, countUnits, addOneUnit, deleteOneUnit, getAllPreviewData} = props;
  const [count, setCount] = useState(countUnits)


  const incrementCount = async () => {
    await (addOneUnit)(grocer_id, unit_id, unit_name, price);
    setCount(count + 1);
    window.M.toast({html: "Додано ще один кілограм.", displayLength: 1500})
    getAllPreviewData();

  }
  const decrementCount = async () => {
    await (deleteOneUnit)(unit_id)
    setCount(count - 1);
    (count - 1 > 0) ? window.M.toast({html: "Видалено один кілограм.", displayLength: 1500})
          :window.M.toast({html: "Товар видалено з кошика.", displayLength: 1500})
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

import UnitPreviewItem from "./unitPreviewItem";
import 'materialize-css'

function UnitsPreviewList(props) {
  const {data, unitsIdAndCount, addOneUnit, deleteOneUnit, getAllPreviewData} = props;


  const units = data.map((unit) => {
    return (
          <UnitPreviewItem
                key={unit._id}
                {...unit}
                addOneUnit={addOneUnit}
                getAllPreviewData={getAllPreviewData}
                deleteOneUnit={deleteOneUnit}
                countUnits={unitsIdAndCount[unit.unit_id]}
          />
    )
  })
  return (
        <div  className={'unitsListScroll'}>
          <ul className="collection">
            {units}
          </ul>
        </div>

  )
}

export default UnitsPreviewList

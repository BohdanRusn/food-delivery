import UnitItem from "./unitItem";

function UnitsList(props) {

  const {data} = props;
  const units = data.map((unit) => {
    return (
          <UnitItem
                key={unit.unit_id}
                {...unit}
          />
    )
  })
  return (
        <div className="col s9">
          {units}
        </div>
  )
}

export default UnitsList

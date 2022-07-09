import UnitItem from "./unitItem";

function UnitsList(props) {

  const {data} = props;
  const units = data.map((unit) => {
    return (
          <UnitItem
                key={unit._id}
                {...unit}
          />
    )
  })
  return (
        <div>
          {units}
        </div>
  )
}

export default UnitsList

import {useHttp} from "../hooks/http.hook";

function UnitItem(props) {
  const {unit_name, unit_id, grocer_id, price, thumbnail} = props;
  const {request} = useHttp();


  const addUnitToPreview = async (e, grocer_id, unit_id, unit_name, price) => {
    e.preventDefault();
    await request('api/sentPreviewOrder', "POST", {
      grocer_id: grocer_id,
      unit_id: unit_id,
      unit_name: unit_name,
      price: price
    })
    window.M.toast({html: "Додано в кошик", displayLength: 1500})
  }

  return (
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img alt={'Thumbnail'} src={thumbnail}/>
              <a href="/#" className="btn-floating halfway-fab waves-effect waves-light red"
                 onClick={(e) => addUnitToPreview(e, grocer_id, unit_id, unit_name, price)}>
                <i className="material-icons ">add</i></a>
            </div>
            <div className="card-content">
              <p>{unit_name}</p>
              <p>Ціна за кілограм: {price} грн</p>
            </div>
          </div>
        </div>
  )
}

export default UnitItem

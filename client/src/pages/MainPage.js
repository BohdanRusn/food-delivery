import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import UnitsList from "../components/unitsList";
import 'materialize-css'

export const Main = () => {
  const [units, setUnits] = useState([])
  const {request} = useHttp();

  const getAllData = async () => {
    const data = await request('api/getAllUnits')
    setUnits(data);
  }

  const getCurrentStores = async (id) => {
    const data = await request(`api/getFilteredData?filter=grocer_id&id=${id}`)
    setUnits(data);
  }

  return (
        <div className="row" style={{marginTop: '20px'}}>
          <div className="col s3 groove">
            <p className='center-align' style={{fontSize: '20px', margin: 0}}>Виберіть магазин</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={getAllData}>Всі товари</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(1)}>Сільпо</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(2)}>АТБ</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(3)}>Грош</p>
          </div>
          {(units.length > 0) ? <UnitsList className="pad" data={units}/> :
                <h4>Виберіть товари якого магазину ви хочете побачити</h4>}
        </div>
  )
}


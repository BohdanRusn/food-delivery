import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import UnitsList from "../components/UnitsList";
import 'materialize-css'

export const Main = () => {
  const [units, setUnits] = useState([])
  const {request} = useHttp();

  const getAllData = useCallback (async () => {
    const data = await request('api/getAllUnits')
    setUnits(data);
  }, [request])

  const getCurrentStores = async (id) => {
    const data = await request(`api/getFilteredData?filter=grocer_id&id=${id}`)
    setUnits(data);
  }

  useEffect(() => {
    getAllData().catch(console.error);
  }, [getAllData])

  return (
        <div className="row" style={{marginTop: '20px'}}>
          <aside className="col s3 groove">
            <p className='center-align' style={{fontSize: '20px', margin: 0}}>Виберіть магазин</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={getAllData}>Всі товари</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(1)}>Сільпо</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(2)}>АТБ</p>
            <p className="waves-effect waves-light btn-small" style={{margin: '.2rem', width: '100%'}}
               onClick={() => getCurrentStores(3)}>Грош</p>
          </aside>

          <section className="col s9">
            {(units.length > 0) ? <UnitsList className="pad" data={units}/> :
                  <h4>В магазині відсутні товари для продажу.</h4>}
          </section>

        </div>
  )
}


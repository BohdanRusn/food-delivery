import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import UnitsPreviewList from "../components/UnitsPreviewList";
import 'materialize-css'


export const ShopCart = (callback, deps) => {
  const [units, setUnits] = useState([])
  const [unitsId, setUnitsId] = useState({})
  const [allUnits, setAllUnits] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };
  const [userData, setUserData] = useState(initialState)
  const {request} = useHttp();

  const deleteAllPreview = async () => {
    await request('api/deleteAllFromPreview', "DELETE")
  }

  const getAllPreviewData = useCallback(async () => {
    const [data, finalPrice] = await request('api/getPreviewOrder');
    setTotalPrice(finalPrice);
    setAllUnits(data);
    const countId = data.reduce((accumulator, value) => {
      return {...accumulator, [value.unit_id]: (accumulator[value.unit_id] || 0) + 1};
    }, {});
    setUnitsId(countId);
    const uniqUnits = [...new Map(data.map(v => [v.unit_id, v])).values()];
    setUnits(uniqUnits);
  }, [request])

  useEffect(() => {
    getAllPreviewData().catch(console.error)
  }, [getAllPreviewData])

  const validData = () => {
    if (userData.name.trim() === '' || userData.address.trim() === '' || userData.phone.trim() === '' || userData.email.trim() === '') {return false;}
    else return allUnits.length > 0;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validData()) {
      await fetch('api/send', {
        headers: {
          'Content-Type': 'application/json',
          'AllowedHeaders': '*',
          'AllowedMethods': 'POST, GET, PUT, DELETE, HEAD'
        },
        method: 'POST',
        body: JSON.stringify({
          ...userData,
          order: allUnits
        })
      })
      await deleteAllPreview();
      setUserData(initialState)
      await getAllPreviewData();
    } else {
      alert('Ви не вказали всю особисту інформацію або ваш кошик пустий')
    }

  }

  const onChange = e => {
    const {name, value} = e.target;
    setUserData(prevState => ({...prevState, [name]: value}));
  };

  const addOneUnit = async (grocer_id, unit_id, unit_name, price) => {
    await request('api/sentPreviewOrder', "POST", {
      grocer_id: grocer_id,
      unit_id: unit_id,
      unit_name: unit_name,
      price: price
    })
  }

  const deleteOneUnit = async (unit_id) => {
    await request(`api/delete/${unit_id}`, "DELETE")
  }

  return (
        <div className="row pdTop">
          <form className="col s6">
            <div className="row">
              <div className="input-field col s12">
                <input
                      id="name"
                      type="text"
                      className="validate"
                      name='name'
                      required="required"
                      value={userData.name}
                      onChange={onChange}/>
                <label htmlFor="name">Ваше Ім'я</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                      id="email"
                      type="email"
                      className="validate"
                      name='email'
                      required="required"
                      value={userData.email}
                      onChange={onChange}/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                      id="phone"
                      type="text"
                      className="validate"
                      name='phone'
                      required="required"
                      value={userData.phone}
                      onChange={onChange}/>
                <label htmlFor="phone">Номер Телефону</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                      id="address"
                      type="text"
                      className="validate"
                      name='address'
                      required="required"
                      value={userData.address}
                      onChange={onChange}/>
                <label htmlFor="address">Адреса</label>
              </div>
            </div>
          </form>
          <div className="col s6">
            <UnitsPreviewList
                  data={units}
                  unitsIdAndCount={unitsId}
                  getAllPreviewData={getAllPreviewData}
                  addOneUnit={addOneUnit}
                  deleteOneUnit={deleteOneUnit}
            />
            <div>
              <p>До сплати: {totalPrice} грн</p>
              <button className="btn waves-effect waves-light s6" type="submit" name="action" onClick={onSubmit}>Надіслати
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>

        </div>

  )
}


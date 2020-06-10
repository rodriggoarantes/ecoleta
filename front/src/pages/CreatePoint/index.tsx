import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent, LatLngTuple } from 'leaflet';

import api from './../../services/api';

import './styles.css';

import Header from './../../components/Header';

interface Item {
  id: number;
  title: string;
  url: string;
  selected?: boolean;
}

interface State {
  id: number;
  uf: string;
}

interface City {
  id: number;
  name: string;
}

const CreatePoint: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedUf, setSelectedUf] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<LatLngTuple>([
    -16.6956997,
    -49.3743072,
  ]);

  useEffect(() => {
    api.get('items').then((response) => {
      setItems((response && response.data) || []);
    });
  }, []);

  useEffect(() => {
    api.get('states').then((response) => {
      setStates((response && response.data) || []);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === 0) {
      setCities([]);
      return;
    }
    api.get(`cities/states/${selectedUf}`).then((response) => {
      setCities((response && response.data) || []);
    });
  }, [selectedUf]);

  const handleSelectState = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setSelectedUf(Number(uf));
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(Number(city));
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectItem = (itemId: number) => {
    const indexExist = selectedItems.indexOf(itemId);
    if (indexExist >= 0) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, email, whatsapp } = formData;
    const city = selectedCity;
    const items = [...selectedItems];
    const [latitude, longitude] = selectedPosition;

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      items,
    };

    api.post('points', data).then((response) => {
      if (response && response.status === 200) {
        alert('Ponto de coleta criado com sucesso');
        console.log(JSON.stringify(response.data));
        history.push('/');
      } else {
        alert('Erro ao criar um novo ponto de coleta');
      }
    });
  };

  return (
    <div id="page-create-point">
      <Header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={12} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="estado">Estado (UF)</label>
              <select
                name="estado"
                id="estado"
                value={selectedUf}
                onChange={handleSelectState}
              >
                <option value="0">Selecione uma UF</option>
                {states.map((state: State) => (
                  <option key={state.id} value={state.id}>
                    {state.uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="cidade">Cidade</label>
              <select
                name="cidade"
                id="cidade"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city: City) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: Item) => (
              <li
                key={item.id}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;

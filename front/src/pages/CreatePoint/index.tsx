import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

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
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedUf, setSelectedUf] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);

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
    if (selectedUf == 0) {
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

  return (
    <div id="page-create-point">
      <Header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-16.7405827, -49.2537338]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-16.7405827, -49.2537338]} />
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
                {states.map((state) => (
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
              <li key={item.id} className={item.selected ? 'selected' : ''}>
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

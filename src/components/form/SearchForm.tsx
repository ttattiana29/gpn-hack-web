import React, { useState, useEffect } from "react";
import styles from "./searchForm.module.scss";
import Search from "antd/es/transfer/search";

interface Suggestion {
  value: string;
  data: {
    address: {
      value: string;
    };
    inn: string;
  };
}

const SearchForm: React.FC = () => {
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setInn] = useState("");
  const [suggestionsName, setSuggestionsName] = useState<Suggestion[]>([]);
  const [suggestionsAddress, setSuggestionsAddress] = useState<Suggestion[]>([]);
  const [suggestionsInn, setSuggestionsInn] = useState<Suggestion[]>([]);
  const [activeSuggestionNameIndex, setActiveSuggestionNameIndex] = useState<number>(-1);
  const [activeSuggestionAddressIndex, setActiveSuggestionAddressIndex] = useState<number>(-1);
  const [activeSuggestionInnIndex, setActiveSuggestionInnIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleKeyDown = (event: KeyboardEvent, activeSuggestionIndex: number, suggestions: any[], setActiveSuggestionIndex: Function, handleSuggestionClick: Function, setSuggestions: Function) => {
    if (event.key === "ArrowUp" || (event.key === "ArrowUp" && event.metaKey)) {
      event.preventDefault();
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (
      event.key === "ArrowDown" ||
      (event.key === "ArrowDown" && event.metaKey)
    ) {
      event.preventDefault();
      if (activeSuggestionIndex < suggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      const selectedSuggestion = suggestions[activeSuggestionIndex];
      handleSuggestionClick(selectedSuggestion);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    const handleKeyDownForName = (event: KeyboardEvent) => {
      handleKeyDown(event, activeSuggestionNameIndex, suggestionsName, setActiveSuggestionNameIndex, handleSuggestionNameClick, setSuggestionsName);
    };
    document.addEventListener("keydown", handleKeyDownForName);
  
    const handleKeyDownForAddress = (event: KeyboardEvent) => {
      handleKeyDown(event, activeSuggestionAddressIndex, suggestionsAddress, setActiveSuggestionAddressIndex, handleSuggestionAddressClick, setSuggestionsAddress);
    };
    document.addEventListener("keydown", handleKeyDownForAddress);
  
    const handleKeyDownForInn = (event: KeyboardEvent) => {
      handleKeyDown(event, activeSuggestionInnIndex, suggestionsInn, setActiveSuggestionInnIndex, handleSuggestionInnClick, setSuggestionsInn);
    };
    document.addEventListener("keydown", handleKeyDownForInn);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDownForName);
      document.removeEventListener("keydown", handleKeyDownForAddress);
      document.removeEventListener("keydown", handleKeyDownForInn);
    };
  }, [activeSuggestionAddressIndex, suggestionsAddress, activeSuggestionNameIndex, suggestionsName, activeSuggestionInnIndex, suggestionsInn]);
  
  // Обработчик изменения значения
  const handleInputChange = (field: string, value: string, setFunc: Function, setOtherFields: Function[], fetchFunc: Function) => {
    setFunc(value);
    setOtherFields.forEach((setOtherField) => setOtherField(""));
    fetchFunc([]);
    switch (field) {
      case "name":
        setActiveSuggestionNameIndex(-1);
        break;
      case "address":
        setActiveSuggestionAddressIndex(-1);
        break;
      case "inn":
        setActiveSuggestionInnIndex(-1);
        break;
      default:
        break;
    }
    if (value.length >= 2) {
      fetchFunc(value);
    }
  };

  // Обработчик изменения значения поля "Название организации"
const handleOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("name", event.target.value, setOrganization, [setAddress, setInn], fetchSuggestionsName);
  };
  
  // Обработчик изменения значения поля "Адрес"
  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("address", event.target.value, setAddress, [setOrganization, setInn], fetchAddressSuggestions);
  };
  
  // Обработчик изменения значения поля "ИНН"
  const handleInnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("inn", event.target.value, setInn, [setOrganization, setAddress], fetchInnSuggestions);
  };
  
  // Функция для получения подсказок
  const fetchSuggestions = async (query: string, field: string, setSuggestions: Function) => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    const token = "46f9c319c7748bfab59844084dabc8e89ecd9ccc";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token
      },
      body: JSON.stringify({ query: query, count: 5 })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setSuggestions(data.suggestions);
    switch (field) {
      case "name":
        setActiveSuggestionNameIndex(-1);
        break;
      case "address":
        setActiveSuggestionAddressIndex(-1);
        break;
      case "inn":
        setActiveSuggestionInnIndex(-1);
        break;
      default:
        break;
    }
  };

  // Функция для получения подсказок по запросу по названию
const fetchSuggestionsName = async (query: string) => {
    fetchSuggestions(query, "name", setSuggestionsName);
  };
  
  // Функция для получения подсказок по запросу по адресу
  const fetchAddressSuggestions = async (query: string) => {
    fetchSuggestions(query, "address", setSuggestionsAddress);
  };
  
  // Функция для получения подсказок по запросу по инн
  const fetchInnSuggestions = async (query: string) => {
    fetchSuggestions(query, "inn", setSuggestionsInn);
  };

  //Click
  const handleSuggestionClick = (suggestion: Suggestion, field: string) => {
    setOrganization(suggestion.value);
    setAddress(suggestion.data.address.value);
    setInn(suggestion.data.inn);
    switch (field) {
      case "name":
        setSuggestionsName([]);
        setActiveSuggestionNameIndex(-1);
        break;
      case "address":
        setSuggestionsAddress([]);
        setActiveSuggestionAddressIndex(-1);
        break;
      case "inn":
        setSuggestionsInn([]);
        setActiveSuggestionInnIndex(-1);
        break;
      default:
        break;
    }
  };

  // Обработчик выбора элемента из списка подсказок для Названия
const handleSuggestionNameClick = (suggestion: Suggestion) => {
    handleSuggestionClick(suggestion, "name");
  };
  
  // Обработчик выбора элемента из списка подсказок для Адреса
  const handleSuggestionAddressClick = (suggestion: Suggestion) => {
    handleSuggestionClick(suggestion, "address");
  };
  
  // Обработчик выбора элемента из списка подсказок для ИНН
  const handleSuggestionInnClick = (suggestion: Suggestion) => {
    handleSuggestionClick(suggestion, "inn");
  };

  // Обработчик нажатия на кнопку "Поиск"
  const handleSearchClick = async () => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    const token = "46f9c319c7748bfab59844084dabc8e89ecd9ccc";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token
      },
      body: JSON.stringify({
        query: inn,
        count: 1
      })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (data.suggestions && data.suggestions.length > 0) {
        setSearchResults(data.suggestions);
      } else {
        setSearchResults([]);
      }
      setSuggestionsName([]);
      setSuggestionsAddress([]);
      setSuggestionsInn([]);
  };

  return (
    <div className={styles.container}>
      <h2>Подсказки</h2>
      <p>Быстрый ввод адресов, компаний, банков, ФИО, email и ещё много чего</p>
      <div className={styles.field}>
        <input type="text" value={organization} onChange={handleOrganizationChange} placeholder="Название организации"/>
        {suggestionsName.length > 0 && (
          <ul className={styles.suggestions}>
          {suggestionsName.map((suggestion: Suggestion, index: number) => (
            <li
              key={`${suggestion.value}-${suggestion.data.address.value}`}
              onClick={() => handleSuggestionNameClick(suggestion)}
              className={index === activeSuggestionNameIndex ? styles.activeSuggestion : ""}>
              {suggestion.value}
              <div className={styles.suggestionInfo}>{suggestion.data.address.value}</div>
            </li>
          ))}
        </ul>
        )}
      </div>
      <div className={styles.field}>
        <input type="text" value={address} onChange={handleAddressChange} placeholder="Адрес"/>
        {suggestionsAddress.length > 0 && (
          <ul className={styles.suggestions}>
          {suggestionsAddress.map((suggestion: Suggestion, index: number) => (
            <li
              key={`${suggestion.value}-${suggestion.data.address.value}`}
              onClick={() => handleSuggestionAddressClick(suggestion)}
              className={index === activeSuggestionAddressIndex ? styles.activeSuggestion : ""}>
              {suggestion.value}
              <div className={styles.suggestionInfo}>{suggestion.data.address.value}</div>
            </li>
          ))}
        </ul>
        )}
      </div>
      <div className={styles.field}>
        <input type="text" pattern="^\d{0,10}$" value={inn} placeholder="ИНН" onChange={(event) => {
            const inputValue = event.target.value;
            const isValid = /^\d{0,10}$/.test(inputValue);
            if (isValid) {
                handleInnChange(event);
            }
        }} />
        {suggestionsInn.length > 0 && (
          <ul className={styles.suggestions}>
          {suggestionsInn.map((suggestion: Suggestion, index: number) => (
            <li
              key={`${suggestion.value}-${suggestion.data.inn}`}
              onClick={() => handleSuggestionInnClick(suggestion)}
              className={index === activeSuggestionInnIndex ? styles.activeSuggestion : ""}>
              {suggestion.value}
              <div className={styles.suggestionInfo}>{suggestion.data.inn}</div>
            </li>
          ))}
        </ul>
        )}
        
      </div>
      <button onClick={handleSearchClick}>Поиск</button>
      <div className={styles.result}>
      {searchResults.map((result, index) => (
            <div key={index}>
                <h1>{result.value}</h1>
                <h2>ИНН: </h2>
                <p>{result.data.inn}</p>
                <h2>Полное наименование: </h2>
                <p>{result.data.name.full_with_opf}</p>
                <h2>Адрес: </h2>
                <p>{result.data.address.value}</p>
                <h2>Статус: </h2>
                <p>{result.data.state.status}</p>
                <h2>Дата основания: </h2>
                <p>{result.data.state.registration_date}</p>
                <h2>Дата ликвидации: </h2>
                <p>{result.data.state.liquidation_date}</p>
                <h2>Полное имя главного руководителя: </h2>
                <p>{result.data.management && result.data.management.name}</p>
                <h2>Должность главного руководителя: </h2>
                <p>{result.data.management && result.data.management.post}</p>
                <h2>Количество филиалов: </h2>
                <p>{result.branch_count || "нет данных"}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
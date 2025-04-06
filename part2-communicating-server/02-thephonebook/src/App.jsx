import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ searchValue, onChange }) => (
  <div>
    filter shown with{" "}
    <input type="text" value={searchValue} onChange={onChange} />
  </div>
);

const PersonForm = ({ onSubmit, name, setName, number, setNumber }) => {
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <div key={person.id}>
        <p>
          {person.name} {person.number}
        </p>
      </div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (event) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    const newFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearchValue.toLowerCase())
    );
    setFilteredPersons(newFilteredPersons);
  };

  const loadPersons = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log(response.data);
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching persons:", error);
        alert("Failed to load persons. Please try again later.");
      });
  };

  useEffect(loadPersons, []);

  const addName = (event) => {
    event.preventDefault();

    const isDuplicate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${newName} is already added in the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    };

    setPersons(persons.concat(newPerson));
    setFilteredPersons(
      persons
        .concat(newPerson)
        .filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} onChange={handleSearchValueChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        name={newName}
        number={newNumber}
        setName={setNewName}
        setNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

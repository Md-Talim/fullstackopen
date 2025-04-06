import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    const newFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearchValue.toLowerCase())
    );
    setFilteredPersons(newFilteredPersons);
  };

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
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person, index) => (
          <div key={index}>
            <p>
              {person.name} {person.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

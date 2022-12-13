import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { AppContainer, AppSection } from 'components/App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name))
      return alert(`${name} is alredy in contacts.`);

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    const newArray = contacts.filter(contact => contact.id !== contactId);
    setContacts(newArray);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const filterSettings = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterSettings)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <AppContainer>
      <AppSection>
        <h1 style={{ marginTop: '0px' }}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 style={{ marginTop: '0px' }}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length >= 1 ? (
          <ContactList
            contactsArray={filteredContacts}
            onClickHandler={deleteContact}
          />
        ) : (
          <p>Oooops, You have not added any contact yet</p>
        )}
      </AppSection>
    </AppContainer>
  );
}

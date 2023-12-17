import { Contacts } from 'components/Contacts/Contacts';
import { Form } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const newContact = {
      id: nanoid(3),
      name: name,
      number: number,
    };

    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form addContacts={addContacts} />
        <h2>Contacts</h2>
        <Filter filter={filterChange} />
        <Contacts contacts={filterContact} dellContact={deleteContact} />
      </div>
    </>
  );
};

import { Contacts } from 'components/Contacts/Contacts';
import { Form } from 'components/Form/Form';
import { Component } from 'react';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(3), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(3), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(3), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(3), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({
        contacts: JSON.parse(localData),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContacts = ({ name, number }) => {
    const contact = {
      id: nanoid(3),
      name,
      number,
    };

    if (
      this.state.contacts.find(item => {
        return item.name.toLowerCase() === contact.name.toLowerCase();
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    }

    this.setState(prev => ({
      contacts: [contact, ...prev.contacts],
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const filterContact = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
    return (
      <>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <Form addContacts={this.addContacts} />
          <h2>Contacts</h2>
          <Filter filter={this.filterChange} />
          <Contacts filter={filterContact} dellContact={this.deleteContact} />
        </div>
      </>
    );
  }
}

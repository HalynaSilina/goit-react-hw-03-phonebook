import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm.jsx/ContactForm';
import Filter from '../Filter.jsx/Filter';
import ContactList from '../ContactList/ContactList';
import { Container, Title, Contacts } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({ filter: value });
  };

  filterByName = filter => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filtredContacts = this.filterByName(normalizedFilter);
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <Contacts>Contacts</Contacts>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filtredContacts} onDelete={this.deleteContact} />
      </Container>
    );
  }
}

export default App;

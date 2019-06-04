import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  updateQuery = (newQuery) => {
    this.setState(() => ({   //always wrap in round braces when returning an object
      query: newQuery.trim()
    }));
  }

  clearQuery = () => {
    this.updateQuery("")
  }

  render () {
    const { query } = this.state  //destructure state and props objects so we can just use the variable below.
    const { contacts, onDelete } = this.props

    const displayedContacts = query === ""
      ? contacts
      : contacts.filter((c) => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ))

    return (
      <div className="list-contacts">
        {/* {JSON.stringify(this.state)} */}
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={this.state.query} //value is controlled by the state
            onChange={(event) => this.updateQuery(event.target.value)}  // when input is changed we updated the state
          />
          <Link to="/create"
            className="add-contact">
            Add Contact</Link>
        </div>
        {displayedContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now Showing {displayedContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className='contact-list'>
          {displayedContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar'
                style={{ backgroundImage: `url(${contact.avatarURL})` }}>
              </div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDelete(contact)}
                className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts
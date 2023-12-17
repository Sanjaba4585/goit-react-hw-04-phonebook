import css from './Form.module.css';
import { useState } from 'react';

export const Form = ({ addContacts }) => {
  const [form, setForm] = useState({ name: '', number: '' });

  const formChange = ({ target }) => {
    const { name, value } = target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const formSubmit = e => {
    e.preventDefault();
    addContacts({ ...form });
    setForm({
      name: '',
      number: '',
    });
  };

  // const { name, number } = form;

  return (
    <div className={css.container}>
      <form onSubmit={formSubmit}>
        <label>
          <p className={css.title}>Name</p>
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Oleksandr Korniichuk"
            required
            onChange={formChange}
          />
          <p className={css.title}>Number</p>
          <input
            className={css.input}
            type="tel"
            name="number"
            placeholder="123-45-67"
            required
            onChange={formChange}
          />
        </label>
        <button type="submit" className={css.btnSubmit}>
          Add contact
        </button>
      </form>
    </div>
  );
};

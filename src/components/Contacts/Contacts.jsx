import css from './Contacts.module.css';

export const Contacts = ({ contacts, dellContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.text}>
            {name}: {number}
          </p>
          <button
            className={css.btnDell}
            type="button"
            onClick={() => dellContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

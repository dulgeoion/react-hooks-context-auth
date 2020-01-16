import React from "react";
import "./style.scss";
import { useIntl } from "react-intl";
import { useUser } from '../../context';

export const Header = () => {
  const { formatMessage } = useIntl();
  const { setUserLocale } = useUser();

  const onSelect = (e) => {
    setUserLocale(e.target.value)
  }

  return (
    <div className="header">
      <h1>{formatMessage({ id: "title" })}</h1>
      <select onChange={onSelect}>
        <option value="uk">Українська</option>
        <option value="hu">Magyar</option>
      </select>
    </div>
  );
};

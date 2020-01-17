import React, { useState } from "react";
// import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useIntl } from "react-intl";

import './styles.scss';
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { useUser, useAuth } from "../../context";

export const AuthorizedPage = () => {
  const { formatMessage } = useIntl();
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <div className="authorized-page">
      <h2> {formatMessage({ id: "title-authorized" })}</h2>
      <h3>
        {formatMessage(
          { id: "hello" },
          { name: user.name, surname: user.surname }
        )}
      </h3>
      <Table data={user} className="authorized-page__table" />
      <Button onClick={signOut}> {formatMessage({ id: "sign-out" })} </Button>
    </div>
  );
};

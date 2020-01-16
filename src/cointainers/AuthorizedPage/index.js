import React, { useState } from "react";
// import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useUser } from '../../context';

export const AuthorizedPage = () => {

  const { formatMessage } = useIntl();
  const { user, signOut } = useUser();
  const [value, changeValue] = useState("");

  return (
    <div>
      <h2> {formatMessage({id:'title-authorized' })}</h2>
      <h3>{formatMessage({id: 'hello'}, {name: user.name, surname: user.surname }) }</h3>
      <Input value={value} onChange={e => changeValue(e.target.value)} />
      <Button

        onClick={signOut} > {formatMessage({ id: "sign-out" })} </Button>
    </div>
  );
};

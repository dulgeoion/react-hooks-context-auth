import hu from './hu.json';
import uk from './uk.json';

export const messages = { hu, uk };

console.log("TCL: messages", messages)
export const DEFAULT_LOCALE = 'en';

export default function intlMessages(locale) {
  return messages[locale] || messages[DEFAULT_LOCALE] || '<no value>';
}


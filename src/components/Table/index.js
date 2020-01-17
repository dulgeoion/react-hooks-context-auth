import React from 'react';
import "./styles.scss";
import Skeleton from 'react-loading-skeleton';

export const Table = ({data, className}) => {
  const keys = Object.keys(data);
  const values = Object.values(data); 
  if (!data) {
    return (<Skeleton count={5} />)
  }
  return (
    <table className={className}>
      {
        keys.map((_, i) => {
          return (<tr>
            <td>{keys[i]}</td>
            <td>{values[i]}</td>
          </tr>)
        })
      }
    </table>
  )
}
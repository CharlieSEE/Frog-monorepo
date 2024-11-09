'use client';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import styles from './page.module.css';
import io from 'socket.io-client';

type CheckboxObject = {
  id: number;
  isChecked: boolean;
};

const socket = io('http://localhost:3001');

const changeCheckbox = (checkboxId: number) => {
  socket.emit('checkbox_clicked', checkboxId);
};

export default function Index() {
  const [checkboxes, setCheckboxes] = useState<CheckboxObject[] | []>([]);

  useEffect(() => {
    socket.emit('connected');
    socket.on('sync_checkboxes', (data) => {
      setCheckboxes(data);
    });

    socket.on('checkbox_clicked', (temp) => {
      setCheckboxes(temp);
    });
  }, []);

  return (
    <div className={styles.container}>
      {checkboxes.map((checkboxObject) => (
        <Checkbox
          key={checkboxObject.id}
          idx={checkboxObject.id}
          isChecked={checkboxObject.isChecked}
          socketHandler={changeCheckbox}
        />
      ))}
    </div>
  );
}

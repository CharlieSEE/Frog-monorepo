'use client';
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import io from 'socket.io-client';
import styles from './page.module.css';
import type { CheckboxObject } from '@frog-monorepo/shared-types';

const socket = io('http://localhost:3001');

const changeCheckbox = (checkboxId: number) => {
  socket.emit('checkbox_clicked', checkboxId);
};

export default function Index() {
  const [checkboxes, setCheckboxes] = useState<CheckboxObject[]>([]);

  useEffect(() => {
    socket.emit('connected');
    socket.on('sync_checkboxes', (syncedCheckboxes: CheckboxObject[]) => {
      setCheckboxes(syncedCheckboxes);
    });

    socket.on('checkbox_clicked', (syncedCheckboxes: CheckboxObject[]) => {
      setCheckboxes(syncedCheckboxes);
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

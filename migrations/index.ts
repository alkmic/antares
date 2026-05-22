import * as migration_20260522_100729_initial from './20260522_100729_initial';

export const migrations = [
  {
    up: migration_20260522_100729_initial.up,
    down: migration_20260522_100729_initial.down,
    name: '20260522_100729_initial'
  },
];

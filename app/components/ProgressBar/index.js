/* @flow */

import NProgress from 'nprogress';

import Start from './Start';
import Done from './Done';

export const initProgressBar = () => {
  NProgress.configure({
    showSpinner: false,
    trickle: true,
    speed: 200,
  });

  NProgress.start();
};

export const ProgressBar = {
  Start,
  Done,
};

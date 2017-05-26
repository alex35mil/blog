/* @flow */

import NProgress from 'nprogress';

import Start from './Start';
import Done from './Done';

export const initProgressBar = () => {
  NProgress.configure({
    speed: 200,
    trickle: true,
    trickleSpeed: 20,
    showSpinner: false,
  });

  NProgress.start();
};

export const ProgressBar = {
  Start,
  Done,
};

/* @noflow */
/* global ga */

import { GOOGLE_ANALYTICS_ID } from 'config';

export const init = () => {
  if (!GOOGLE_ANALYTICS_ID) return;

  /* eslint-disable */
  // prettier-ignore
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */

  ga('create', GOOGLE_ANALYTICS_ID, 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
};

export const sendPageview = (pathname: string) => {
  if (typeof ga === 'undefined') return;
  ga('set', 'page', pathname);
  ga('send', 'pageview');
};

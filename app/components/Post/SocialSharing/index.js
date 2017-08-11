/* @flow */

import React from 'react';
import cn from 'classnames';

import { Control } from 'app/components';
import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Props = {|
  title: string,
  shareLink: string,
  facebookAppId: string,
|};

type $State = {| isVisible: boolean |};

export class SocialSharing extends React.Component {
  props: $Props;
  state: $State = { isVisible: false };

  componentDidMount = () => {
    window.addEventListener('scroll', this.updateVisibility);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.updateVisibility);
  };

  updateVisibility = () => {
    const viewportHeight = window.innerHeight;
    const scrolled = window.pageYOffset;
    const isVisible = scrolled > viewportHeight * 0.7;
    if (this.state.isVisible === isVisible) return;
    this.setState({ isVisible });
  };

  shareOnTwitter = () => {
    const title = encodeURIComponent(`"${this.props.title}"`);
    const url = encodeURIComponent(this.props.shareLink);
    const username = 'alexfedoseev';
    this.openPopup(
      `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${username}`,
    );
  };

  shareOnFacebook = () => {
    const { shareLink, facebookAppId } = this.props;
    const url = encodeURIComponent(shareLink);
    this.openPopup(
      `https://www.facebook.com/dialog/share?app_id=${facebookAppId}&display=popup&href=${url}`,
    );
  };

  openPopup = (url: string) => {
    window.open(
      url,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=600',
    );
  };

  render = () =>
    <div className={styles.container}>
      <div className={styles.widget}>
        <div
          className={cn(
            styles.title,
            this.state.isVisible ? styles.visible : styles.hidden,
          )}
        >
          share
        </div>
        <Control
          className={cn(
            styles.shareButton,
            this.state.isVisible ? styles.visible : styles.hidden,
          )}
          onClick={this.shareOnTwitter}
        >
          <Icon.TwitterShare className={styles.shareIcon} />
        </Control>
        <Control
          className={cn(
            styles.shareButton,
            this.state.isVisible ? styles.visible : styles.hidden,
          )}
          onClick={this.shareOnFacebook}
        >
          <Icon.FacebookShare className={styles.shareIcon} />
        </Control>
      </div>
    </div>;
}

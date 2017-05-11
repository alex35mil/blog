/* @flow */

import React from 'react';
import cn from 'classnames';

import { A } from 'app/components';

import styles from './styles.css';

type $Props = {|
  cover?: string,
  credit?: {|
    author: string,
    url: string,
  |},
|};

type $State = {| isLoaded: boolean |};

export class Cover extends React.Component {
  props: $Props;
  state: $State = { isLoaded: false };

  componentDidMount = () => {
    this.preloadCover();
  };

  preloadCover = () => {
    if (!this.props.cover) return;

    let image = new Image();

    image.onload = () => {
      this.setState({ isLoaded: true });
      if (image) image.src = '';
      image = null;
    };
    image.src = this.props.cover;
  };

  render = () => {
    const { cover, credit } = this.props;
    const { isLoaded } = this.state;

    if (!cover) return <div className={styles.background} />;

    return (
      <div className={styles.background}>
        <div
          className={cn(styles.cover, isLoaded ? styles.loaded : styles.loading)}
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className={styles.overlay} />
          {credit &&
            <div className={styles.credit}>
              Artwork:{' '}
              <A unstyled href={credit.url} targetBlank>{credit.author}</A>
            </div>}
        </div>
      </div>
    );
  };
}

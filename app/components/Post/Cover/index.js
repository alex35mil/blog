/* @flow */

import React from 'react';
import cn from 'classnames';
import objectFitImages from 'object-fit-images';

import { A } from 'app/components';

import styles from './styles.css';

type $Props = {|
  cover?: {|
    srcset: string,
    fallback: string,
  |},
  credit?: {|
    author: string,
    url: string,
  |},
|};

type $State = {| isLoaded: boolean |};

export class Cover extends React.Component {
  props: $Props;
  state: $State = { isLoaded: false };
  cover: ?HTMLImageElement;

  componentDidMount = () => {
    if (!this.cover) return;

    objectFitImages(this.cover);

    if (this.cover && this.cover.complete) {
      this.showCover();
    }
  };

  setCoverRef = (ref: HTMLImageElement) => {
    this.cover = ref;
  };

  showCover = () => {
    if (this.state.isLoaded) return;
    this.setState({ isLoaded: true });
  };

  render = () => {
    const { cover, credit } = this.props;
    const { isLoaded } = this.state;

    if (!cover) return <div className={styles.background} />;

    return (
      <div className={styles.background}>
        <div className={cn(styles.cover, isLoaded ? styles.loaded : styles.loading)}>
          <img
            sizes="100vw"
            src={cover.fallback}
            srcSet={cover.srcset}
            className={styles.image}
            alt=""
            ref={this.setCoverRef}
            onLoad={this.showCover}
          />
        </div>
        <div className={styles.overlay} />
        {credit &&
          <div className={styles.credit}>
            Artwork:{' '}
            <A unstyled href={credit.url} targetBlank>{credit.author}</A>
          </div>}&gt;
      </div>
    );
  };
}

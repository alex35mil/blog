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

type $State = {|
  isLoaded: boolean,
  parallaxFactor: number,
|};

export class Cover extends React.Component {
  props: $Props;
  state: $State = {
    isLoaded: false,
    parallaxFactor: 0,
  };
  cover: ?HTMLImageElement;

  componentDidMount = () => {
    if (!this.cover) return;

    objectFitImages(this.cover);

    if (this.cover && this.cover.complete) {
      this.showCover();
    }

    window.addEventListener('scroll', this.parallaxCover);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.parallaxCover);
  };

  setCoverRef = (ref: HTMLImageElement) => {
    this.cover = ref;
  };

  showCover = () => {
    if (this.state.isLoaded) return;
    this.setState({ isLoaded: true });
  };

  parallaxCover = () => {
    if (!this.state.isLoaded) return;
    const scrolled = window.pageYOffset;
    if (scrolled < 0 || scrolled > 1500) return;
    this.setState({ parallaxFactor: scrolled / 3 });
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
            style={{
              transform: `translate3d(0px, ${this.state.parallaxFactor}px, 0px)`,
            }}
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

/* @flow */

import * as React from 'react';
import Scroll from 'moveto';
import cn from 'classnames';

import { routes } from 'app/shell/routes';

import { A, Control } from 'app/components';
import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Position = 'top' | 'sticky' | 'hidden';

type $Props = {|
  year: string,
  date: string,
|};

type $State = {| position: $Position |};

export class Navbar extends React.Component<$Props, $State> {
  props: $Props;
  state: $State = { position: 'top' };

  scrolled: number = 0;
  container: HTMLElement | null;
  scrollTopTrigger: HTMLElement | null;

  componentDidMount = () => {
    window.addEventListener('scroll', this.updatePosition);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.updatePosition);
  };

  setContainerRef = (ref: HTMLElement | null) => {
    this.container = ref;
  };

  setScrollTopTriggerRef = (ref: HTMLElement | null) => {
    this.scrollTopTrigger = ref;
  };

  updatePosition = () => {
    if (!this.container) return;

    const { state } = this;
    const containerPosition = this.container.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const delta = scrolled - this.scrolled;

    if (containerPosition.bottom > 0) {
      if (containerPosition.top >= 0 && state.position !== 'top') {
        this.setState({ position: 'top' });
      }
      this.scrolled = scrolled;
      return;
    }

    if (delta < 0) {
      // showing navbar only if user scrolled up more than 40px
      if (delta > -40) return;
      if (state.position !== 'sticky') {
        this.setState({ position: 'sticky' });
      }
      this.scrolled = scrolled;
      return;
    }

    if (state.position !== 'hidden') {
      this.setState({ position: 'hidden' });
    }
    this.scrolled = scrolled;
  };

  scrollTop = () => {
    const scroll = new Scroll({
      duration: 400,
      callback: this.blurScrollTopTrigger,
    });
    scroll.move(0);
  };

  blurScrollTopTrigger = () => {
    if (!this.scrollTopTrigger) return;
    this.scrollTopTrigger.blur();
  };

  render = () => (
    <div ref={this.setContainerRef} className={styles.container}>
      <div
        className={cn(
          styles.navbar,
          styles[`position--${this.state.position}`],
        )}
      >
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <A
              internal
              unstyled
              href={routes.blog()}
              className={styles.link}
              title="Posts"
            >
              <Icon.Posts />
            </A>
          </div>
          <div className={styles.center}>
            {this.props.date}, {this.props.year}
          </div>
          <div className={styles.rightSide}>
            <Control
              className={styles.link}
              title="Up"
              setRef={this.setScrollTopTriggerRef}
              onClick={this.scrollTop}
            >
              <Icon.Up />
            </Control>
          </div>
        </div>
      </div>
    </div>
  );
}

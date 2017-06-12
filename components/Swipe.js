import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.35 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {

  //handle the use case when the user doesn't pass in functions for onSwipeLeft and onSwipeRight
  static defaultProps = {
      onSwipeRight: () => {},
      onSwipeLeft: () => {},
      keyProp: 'id'
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 })
      },
      onPanResponderRelease: (event, gesture) => {
        /*
        test how far user has swiped card left or right
        and act accordingly
        */
        if(gesture.dx > SWIPE_THRESHOLD){
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD ) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    // used to animate smooth transition of the rest of the deck
    const deckPosition = new Animated.ValueXY();


    this.state = { panResponder, position, index: 0, deckPosition };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
          this.setState({ index: 0 });
      }
  }

  forceSwipe(direction) {
    //const x declaration tests which direction th user swipes
    const x = direction === 'right' ? SCREEN_WIDTH + 90 : -SCREEN_WIDTH - 90;

    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction)
    });
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item =  data[this.state.index]

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    //resets position so next card renders in the correct place with Animated
    Animated.timing(this.state.deckPosition, {
            toValue: { x: 0, y: 0 },
            duration: 300
        }).start(() => {
            // we update state and rerender page after the animation is finished
            this.state.position.setValue({ x: 0, y: 0 });
            this.state.deckPosition.setValue({ x: 0, y: 0 });
            this.setState({ index: this.state.index + 1 });
        });
  }

  resetPosition() {
    Animated.spring(this.state.position,{
      toValue: { x: 0, y: 0}
    }).start();
  }

  getCardStyle(){
    const { position } = this.state;
    /*
    interpolate allows us to relate the units scale to the
    rotation units so that it rotates more as you drag further
    */
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [ '-100deg', '0deg', '100deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    //handle case when there are no more cards to show
    if(this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    const deck = this.props.data.map((item, i) => {
      //handles case where card we want animated next is greater than 0 in array of data
      if(i < this.state.index) { return null; }

      if(i === this.state.index){

        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );

      }
      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[
            styles.cardStyle,
            { zIndex: -i }
          ]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });

    //fix for android having awkward spacing
    return deck.reverse();
  }

  render() {
    return (
      <Animated.View style={this.state.deckPosition.getLayout()}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
}

export default Swipe;

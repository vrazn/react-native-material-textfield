import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Animated, Text, ViewPropTypes } from "react-native";

import styles from "./styles";

export default class Affix extends PureComponent {
  static defaultProps = {
    numberOfLines: 1
  };

  static propTypes = {
    numberOfLines: PropTypes.number,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,

    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,

    type: PropTypes.oneOf(["prefix", "suffix"]).isRequired,

    labelAnimation: PropTypes.instanceOf(Animated.Value).isRequired,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  render() {
    let {
      labelAnimation,
      style,
      containerStyle,
      children,
      type,
      fontSize,
      color
    } = this.props;

    let affixContainerStyle = {
      height: fontSize * 1.5,
      opacity: labelAnimation
    };

    let textStyle = {
      includeFontPadding: false,
      textAlignVertical: "top",

      fontSize,
      color
    };

    switch (type) {
      case "prefix":
        affixContainerStyle.paddingRight = 8;
        textStyle.textAlign = "left";
        break;

      case "suffix":
        affixContainerStyle.paddingLeft = 8;
        textStyle.textAlign = "right";
        break;
    }

    return (
      <Animated.View
        style={[styles.container, affixContainerStyle, containerStyle]}
      >
        <Animated.Text style={[textStyle, style]}>{children}</Animated.Text>
      </Animated.View>
    );
  }
}

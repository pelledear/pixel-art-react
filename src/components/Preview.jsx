import React from 'react';
import { StyleRoot } from 'radium';
import {
  generatePixelDrawCss,
  generateAnimationCSSData
} from '../utils/cssParse';
import Animation from './Animation';

const Preview = props => {
  const generatePreview = () => {
    const { activeFrameIndex, duration } = props;
    const { frames, columns, cellSize, animate } = props.storedData || props;
    const animation = frames.size > 1 && animate;
    let animationData;
    let cssString;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        transform: 'scale(1, 0.75)'
      }
    };

    if (animation) {
      animationData = generateAnimationCSSData(frames, columns, cellSize);
    } else {
      cssString = generatePixelDrawCss(
        frames.get(activeFrameIndex),
        columns,
        cellSize,
        'string'
      );

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;
    }

    return (
      <div style={animation ? null : styles.previewWrapper}>
        {animation ? (
          <StyleRoot>
            <Animation duration={duration} boxShadow={animationData} />
          </StyleRoot>
        ) : null}
      </div>
    );
  };

  const { columns, rows, cellSize } = props.storedData || props;
  const style = {
    width: columns * cellSize,
    height: rows * cellSize,
    position: 'relative'
  };
  const bgheight = cellSize * .75;
  const bgsize = `${cellSize}px ${bgheight}px`;
  console.log(bgsize);
  const stitches = {
    height: '75%',
    width: '100%',
    position: 'absolute',
    top: cellSize * 0.75,
    left: cellSize,
    marginTop: '.5%',
    backgroundSize: bgsize
  };

  return (
    <div className="preview" style={style}>
      <div className="stitches" style={stitches}></div>
      {generatePreview()}
    </div>
  );
};
export default Preview;

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalReact from 'react-modal';
import * as actionCreators from '../store/actions/actionCreators';

import RadioSelector from './RadioSelector';
import LoadDrawing from './LoadDrawing';
import Preview from './Preview';
import CopyCSS from './CopyCSS';
import DownloadDrawing from './DownloadDrawing';
import TwitterForm from './TwitterForm';

class Modal extends React.Component {
  static generateRadioOptions(props) {
    let options;

    if (props.type !== 'load') {
      options = [
        {
          value: 'single',
          label: 'single',
          id: 3
        }
      ];

        const repeatedOption = {
        value: 'repeated',
        label: 'repeated',
        id: 4
      };
      options.push(repeatedOption);
    } else {
      options = [
        { value: 'storage', label: 'Stored', id: 0 },
        { value: 'import', label: 'Import', id: 1 },
        { value: 'export', label: 'Export', id: 2 }
      ];
    }

    return options;
  }

  constructor(props) {
    super(props);
    this.state = {
      previewType: 'single',
      loadType: 'storage'
    };
    this.changeRadioType = this.changeRadioType.bind(this);
  }

  componentWillMount() {
    ModalReact.setAppElement('body');
  }

  getModalContent(props) {
    const options = this.constructor.generateRadioOptions(props);
    let content;
    const radioOptions =
      props.type !== 'load' ? (
        <div className="modal__preview">
          <RadioSelector
            name="preview-type"
            selected={this.state.previewType}
            change={this.changeRadioType}
            options={options}
          />
          {this.state.previewType !== 'spritesheet' ? (
            <div className="modal__preview--wrapper">
              <Preview
                key="0"
                frames={props.frames}
                columns={props.columns}
                rows={props.rows}
                cellSize={props.type === 'preview' ? props.cellSize : 5}
                duration={props.duration}
                activeFrameIndex={props.activeFrameIndex}
                animate={this.state.previewType === 'animation'}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="modal__load">
          <RadioSelector
            name="load-type"
            selected={this.state.loadType}
            change={this.changeRadioType}
            options={options}
          />
        </div>
      );

    switch (props.type) {
      case 'load':
        content = (
          <LoadDrawing
            loadType={this.state.loadType}
            close={props.close}
            open={props.open}
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            paletteGridData={props.paletteGridData}
            actions={{
              setDrawing: props.actions.setDrawing,
              sendNotification: props.actions.sendNotification
            }}
          />
        );
        break;
      case 'twitter':
        content = (
          <TwitterForm
            maxChars="113"
            frames={props.frames}
            activeFrame={props.activeFrame}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            duration={props.duration}
            paletteGridData={props.paletteGridData}
            tweetType={this.state.previewType}
            actions={{
              showSpinner: props.actions.showSpinner,
              sendNotification: props.actions.sendNotification
            }}
          />
        );
        break;
      default:
    }

    return (
      <div className="modal">
        <button
          className="close"
          onClick={() => {
            props.close();
          }}
        >
          CLOSE
        </button>
        {radioOptions}
        {content}
      </div>
    );
  }

  changeRadioType(value, type) {
    const newState = {};
    switch (type) {
      case 'load-type':
        newState.loadType = value;
        break;
      default:
        newState.previewType = value;
    }
    this.setState(newState);
  }

  render() {
    const styles = {
      modal: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5'
      }
    };

    return (
      <ModalReact
        isOpen={this.props.isOpen}
        onRequestClose={() => {
          this.props.close();
        }}
        style={styles.modal}
        contentLabel={`Dialog ${this.props.type || ''}`}
      >
        {this.getModalContent(this.props)}
      </ModalReact>
    );
  }
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
export default ModalContainer;

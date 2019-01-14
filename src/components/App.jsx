import React from 'react';
import CookieBanner from 'react-cookie-banner';
import PixelCanvasContainer from './PixelCanvas';
import CellSizeContainer from './CellSize';
import ColorPickerContainer from './ColorPicker';
import ModalContainer from './Modal';
import DimensionsContainer from './Dimensions';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import EyedropperContainer from './Eyedropper';
import PaletteGridContainer from './PaletteGrid';
import ResetContainer from './Reset';
import SaveDrawingContainer from './SaveDrawing';
import NewProjectContainer from './NewProject';
import SimpleNotificationContainer from './SimpleNotification';
import SimpleSpinnerContainer from './SimpleSpinner';
import UndoRedoContainer from './UndoRedo';
import initialSetup from '../utils/startup';
import drawHandlersProvider from '../utils/drawHandlersProvider';
import DownloadPDF from './DownloadPDF';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalType: null,
      modalOpen: false,
      helpOn: true,
      showCookiesBanner: true
    };
    Object.assign(this, drawHandlersProvider(this));
  }

  componentDidMount() {
    initialSetup(this.props.dispatch, localStorage);
  }

  changeModalType(type) {
    this.setState({
      modalType: type,
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  hideCookiesBanner() {
    this.setState({
      showCookiesBanner: false
    });
  }

  toggleHelp() {
    this.setState({ helpOn: !this.state.helpOn });
  }

  render() {
    return (
      <div
        className="app__main"
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}
        onTouchCancel={this.onMouseUp}
      >
        <svg x="0px" y="0px" width="19pt" height="13pt" viewBox="0 0 19 13" version="1.1">
          <clipPath id="stitch">
            <path d="M 18.472656 0.367188 C 17.160156 -0.820312 13.824219 0.960938 11.019531 4.347656 C 10.441406 5.042969 9.933594 5.753906 9.5 6.449219 C 9.066406 5.753906 8.558594 5.042969 7.980469 4.347656 C 5.175781 0.960938 1.839844 -0.820312 0.527344 0.367188 C -0.78125 1.558594 0.429688 5.265625 3.234375 8.652344 C 5.015625 10.800781 7.011719 12.304688 8.566406 12.8125 C 8.828125 12.953125 9.144531 13.011719 9.5 12.996094 C 9.855469 13.011719 10.171875 12.953125 10.433594 12.8125 C 11.988281 12.304688 13.984375 10.800781 15.765625 8.652344 C 18.570312 5.265625 19.78125 1.558594 18.472656 0.367188 Z M 18.472656 0.367188 "/>
          </clipPath>
        </svg>

        <SimpleSpinnerContainer />
        <SimpleNotificationContainer
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <div className="app__central-container">
          <div className="left col-1-4">
            <div className="app__left-side">
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <div
                    data-tooltip={
                      this.state.helpOn ? 'Undo Redo actions' : null
                    }
                  >
                    <UndoRedoContainer />
                  </div>
                  <div className="app__tools-wrapper grid-2">
                    <div
                      data-tooltip={this.state.helpOn ? 'Remove colors' : null}
                    >
                      <EraserContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn
                          ? 'Sample a color from your drawing'
                          : null
                      }
                    >
                      <EyedropperContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn
                          ? 'It fills an area of the current frame based on color similarity'
                          : null
                      }
                    >
                      <BucketContainer />
                    </div>
                    <div
                      data-tooltip={
                        this.state.helpOn
                          ? 'Choose a new color that is not in your palette'
                          : null
                      }
                    >
                      <ColorPickerContainer />
                    </div>
                  </div>
                </div>
                <div className="app__mobile--group">
                  <PaletteGridContainer />
                </div>
              </div>
            </div>
          </div>
          <div className="center col-2-4">
            <PixelCanvasContainer
              drawHandlersFactory={this.drawHandlersFactory}
            />
          </div>
          <div className="right col-1-4">
            <div className="app__right-side">
              <div className="app__mobile--container">
                <div className="app__mobile--group">
                  <div data-tooltip={this.state.helpOn ? 'New project' : null}>
                    <NewProjectContainer />
                  </div>
                  <div className="app__load-save-container">
                    <button
                      className="app__load-button"
                      onClick={() => {
                        this.changeModalType('load');
                      }}
                      data-tooltip={
                        this.state.helpOn
                          ? 'Load projects you stored before'
                          : null
                      }
                    >
                      Load
                    </button>
                    <div
                      data-tooltip={
                        this.state.helpOn ? 'Save your project' : null
                      }
                    >
                      <SaveDrawingContainer />
                    </div>
                  </div>
                  <button
                    className="app__preview-button"
                    onClick={() => {
                      this.changeModalType('preview');
                    }}
                    data-tooltip={
                      this.state.helpOn
                        ? 'Show a preview of your project'
                        : null
                    }
                  >
                    Preview
                  </button>

                  <div data-tooltip={
                    this.state.helpOn ? 'Download your work as a PDF' : null
                  }>
                    <DownloadPDF />
                  </div>
                </div>
                <div className="app__mobile--group">
                  <div
                    data-tooltip={
                      this.state.helpOn ? 'Number of columns and rows' : null
                    }
                  >
                    <DimensionsContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showCookiesBanner ? (
          <CookieBanner
            disableStyle
            message="
              This website uses cookies. By continuing to use
              this website you are giving consent to cookies
              being used. Thank you. "
            link={{
              msg: '',
              url: 'https://www.jvalen.com/pixelartcss/cookies.html',
              target: '_blank'
            }}
            onAccept={() => this.hideCookiesBanner()}
            cookie="user-has-accepted-cookies"
            dismissOnScroll={false}
          />
        ) : null}
        <ModalContainer
          type={this.state.modalType}
          isOpen={this.state.modalOpen}
          close={() => {
            this.closeModal();
          }}
          open={() => {
            this.changeModalType(this.state.modalType);
          }}
        />
      </div>
    );
  }
}

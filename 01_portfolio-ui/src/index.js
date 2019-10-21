import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from 'react-redux'
import configureStore from './store';

import './index.css';
import './scrollbars.css'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/jquery.min.js'
import "react-toastify/dist/ReactToastify.css";
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const initialState = {};

const store = configureStore();

ReactDOM.render(
  <GoogleReCaptchaProvider
    reCaptchaKey="6LebOLQUAAAAAKW5yF394reuERHSoV1UhGPZKLIM"
    language="eng"
  >
    {" "}
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>{" "}
  </GoogleReCaptchaProvider>,
  document.getElementById("root")
);


if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                  <App />
                </DndProvider>
            </Provider>,
            document.getElementById('root'),
        )
    })
}

serviceWorker.unregister();
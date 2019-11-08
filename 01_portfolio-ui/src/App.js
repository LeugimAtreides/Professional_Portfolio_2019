import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPaperclip,
    faUpload,
    faFile,
    faSignInAlt,
    faSignOutAlt,
    faAddressBook,
    faBuilding,
    faCompressArrowsAlt,
    faPlug,
    faPowerOff,
    faMarker,
    faClock,
    faSignature,
    faCarBattery,
    faHashtag,
    faMicrochip,
    faDiceD20,
    faCalendarAlt,
    faMapMarkerAlt,
    faNetworkWired,
    faEdit,
    faTrophy,
    faServer,
    faSimCard,
    faKey,
    faWindowClose,
    faAt,
    faChevronRight,
    faChevronLeft,
    faCaretLeft,
    faCaretRight,
    faPlus,
    faTimes,
    faSpinner,
    faCheck,
    faArrowsAlt,
  } from '@fortawesome/free-solid-svg-icons'
  import Layout from './Layout';
  import './App.css';
  import {faEthernet} from "@fortawesome/free-solid-svg-icons/faEthernet";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons/faAddressCard";

//   import { getUserData } from './actions/'
// import { getProjects } from './actions/'

library.add([
    faPaperclip,
    faUpload,
    faFile,
    faSignInAlt,
    faSignOutAlt,
    faAddressBook,
    faBuilding,
    faCompressArrowsAlt,
    faPlug,
    faPowerOff,
    faMarker,
    faClock,
    faSignature,
    faCarBattery,
    faHashtag,
    faMicrochip,
    faDiceD20,
    faCalendarAlt,
    faMapMarkerAlt,
    faNetworkWired,
    faEthernet,
    faAddressCard,
    faEdit,
    faTrophy,
    faServer,
    faSimCard,
    faWindowClose,
    faKey,
    faAt,
    faChevronRight,
    faChevronLeft,
    faCaretLeft,
    faCaretRight,
    faPlus,
    faTimes,
    faSpinner,
    faCheck,
    faArrowsAlt
  ]);

  class App extends Component {
      render() {
          return (
              <div className="App">
                  <Layout />
              </div>
          )
      }
  }

  App.propTypes = {
      store: PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => ({ store: state });
  
  const mapDispatchToProps = dispatch => ({
      getProjects: () => dispatch(getProjects()),
      getUserData: () => dispatch(getUserData())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(App);



  
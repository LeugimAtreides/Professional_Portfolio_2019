import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
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
import { getUserData } from "./actions/User";
import { getCompanies } from "./actions/Companies";
import { getEpikBoxesData } from "./actions/EpikBoxes";
import { getUsers } from "./actions/Users";
import {faEthernet} from "@fortawesome/free-solid-svg-icons/faEthernet";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons/faAddressCard";


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
    constructor(props) {
        super(props);
        this.token = localStorage.getItem('jwtToken') || null;
        if (!this.token || this.token === 'null' || this.token === 'undefined') {
            localStorage.removeItem('jwtToken');
            this.token = null;
        }
        this.props.getUserData(this.token);
        this.props.getBoxes(this.token);
        this.props.getCompanies(this.token);
        this.props.getUsers(this.token);
    }

    render() {
        return (
            <div className="App">
                <Layout />
            </div>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({store: state});
const mapDispatchToProps = dispatch => ({
    getUserData: (token) => dispatch(getUserData(token)),
    getCompanies: (token) => dispatch(getCompanies(token)),
    getBoxes: (token) => dispatch(getEpikBoxesData(token)),
    getUsers: (token) => dispatch(getUsers(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

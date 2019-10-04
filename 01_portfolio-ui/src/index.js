import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";


ReactDOM.render(
<GoogleReCaptchaProvider
    reCaptchaKey="6LebOLQUAAAAAKW5yF394reuERHSoV1UhGPZKLIM"
    language="eng">
        
        <App />

</GoogleReCaptchaProvider>
    ,document.getElementById("root"));
   

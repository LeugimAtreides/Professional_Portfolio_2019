const axios = require("axios");

module.exports = {
    sendMail: function(req, res) {
        axios
            .post("mail.php", contactFormData)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
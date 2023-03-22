"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Avatar_1 = require("@material-ui/core/Avatar");
const Button_1 = require("@material-ui/core/Button");
const CssBaseline_1 = require("@material-ui/core/CssBaseline");
const TextField_1 = require("@material-ui/core/TextField");
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
const Link_1 = require("@material-ui/core/Link");
// import Grid from "@material-ui/core/Grid";
const Box_1 = require("@material-ui/core/Box");
const LockOutlined_1 = require("@material-ui/icons/LockOutlined");
const Typography_1 = require("@material-ui/core/Typography");
const styles_1 = require("@material-ui/core/styles");
const Container_1 = require("@material-ui/core/Container");
const apiUtils_1 = require("../../../utils/apiUtils");
function Copyright() {
    return (React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
        "Copyright © ",
        React.createElement(Link_1.default, { color: "inherit", href: "https://material-ui.com/" }, "\"Scavenger Hunts\" by Evan Boggs"),
        " ",
        new Date().getFullYear(),
        "."));
}
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function SignIn() {
    const classes = useStyles();
    const [username, setName] = (0, react_1.useState)("");
    const [password, setPW] = (0, react_1.useState)("");
    const [wrongCreds, setWrongCreds] = (0, react_1.useState)(false);
    const handleSubmit = async () => {
        const data = await (0, apiUtils_1.sendLogin)(username, password);
        console.log(data);
    };
    // Queries
    // const query = useQuery("allUsers", fetchActiveUser);
    // console.log(query);
    return (React.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
        React.createElement(CssBaseline_1.default, null),
        React.createElement("div", { className: classes.paper },
            React.createElement(Avatar_1.default, { className: classes.avatar },
                React.createElement(LockOutlined_1.default, null)),
            React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign in"),
            React.createElement("form", { className: classes.form, noValidate: true, onSubmit: handleSubmit },
                React.createElement(TextField_1.default, { error: wrongCreds, helperText: wrongCreds ? "Incorrect Credentials." : "", variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "username", label: "Username", name: "username", autoComplete: "username", autoFocus: true, onChange: (e) => setName(e.target.value) }),
                React.createElement(TextField_1.default, { error: wrongCreds, helperText: wrongCreds ? "Incorrect Credentials." : "", variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", onChange: (e) => setPW(e.target.value) }),
                React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, "Sign In"))),
        React.createElement(Box_1.default, { mt: 8 },
            React.createElement(Copyright, null))));
}
exports.default = SignIn;

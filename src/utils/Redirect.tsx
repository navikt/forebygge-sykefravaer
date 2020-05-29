import React, { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";

const Redirect: FunctionComponent<RouteComponentProps> = (props) => {
    if (window.location.pathname === "/") {
        props.history.push("/forebygge-sykefravaer");
    }
    return <>{props.children}</>;
};

export default withRouter(Redirect);

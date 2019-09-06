import { observer } from "mobx-react";
import * as React from "react";
import { lazyInject } from "../../ioc";
import { UserState } from "../../state/user.state";
import { TYPE } from "../../types";

@observer
export class DashBoard extends React.PureComponent<{}, {}> {
  @lazyInject(TYPE.IUserInfo) private userState: UserState;

  public render() {
    console.log(this.userState, "userState");
    return <div className="hello">Hello {this.userState.username}</div>;
  }
}

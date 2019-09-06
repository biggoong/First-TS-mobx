import { inject, injectable } from "inversify";
import { action } from 'mobx';
import { IUserAction, IUserInfo } from "../interfaces";
import { UserState } from '../state/user.state';
import { TYPE } from "../types";

@injectable()
export class UserAction implements IUserAction  {
	@inject(TYPE.IUserInfo) public userState: UserState;

	@action.bound public register(userInfo: IUserInfo) {
        if(userInfo){
		this.userState.email = userInfo.email;
		this.userState.password = userInfo.password;
		this.userState.username = userInfo.username;
        this.userState.phone = userInfo.phone;
        return true;
        }
        return false;
	}
}
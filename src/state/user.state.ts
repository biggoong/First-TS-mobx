import { injectable } from "inversify";
import { observable } from 'mobx';
import { IUserInfo } from "../interfaces";

@injectable()
export class UserState implements IUserInfo {
	@observable public email: string = 'test@gmail.com';
	@observable public password: string = 'test';
	@observable public username: string = 'test';
	@observable public phone: string = '+79999999999';
}
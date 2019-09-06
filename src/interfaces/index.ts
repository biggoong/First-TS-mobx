interface IUserInfo {
	email: string;
	password: string;
	username: string;
	phone: string;
}

interface IUserAction {
	userState: IUserInfo;
	register(userInfo: IUserInfo) : boolean;
}

export { IUserInfo, IUserAction }
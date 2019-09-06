import { Container } from "inversify";
import getDecorators from 'inversify-inject-decorators';
import "reflect-metadata";
import { UserAction } from "./actions/user.action";
import { IUserAction, IUserInfo } from './interfaces';
import { UserState } from './state/user.state';
import { TYPE } from "./types";


const AppContainer = new Container();
AppContainer.bind<IUserInfo>(TYPE.IUserInfo).to(UserState);
AppContainer.bind<IUserAction>(TYPE.IUserAction).to(UserAction);

const { lazyInject } = getDecorators(AppContainer);

export { AppContainer, lazyInject };


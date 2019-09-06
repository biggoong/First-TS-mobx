import { Button } from 'antd';
import * as React from 'react';
import { Link } from "react-router-dom";


export const Buttons = () => (
    <div className="buttons">
        <Link to="/login"><Button type="primary" size="large">Log in</Button></Link>
        <Link to="/registration"><Button type="primary" size="large">Sign in</Button></Link>
    </div>
);
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class About extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>About</h1>
            <p>Use this area to provide additional information.</p>
        </div>;
    }
}

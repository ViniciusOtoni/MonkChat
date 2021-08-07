
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MonkChat from './pages/monkchat'



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={MonkChat} />
            </Switch>
        </BrowserRouter>
    )
}

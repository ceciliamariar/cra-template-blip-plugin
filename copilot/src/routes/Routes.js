import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPath from '../constants/routes-path';

import HomePage from '../pages/Home';
import ChatSuggestionspage from '../pages/ChatSuggestions';

import Analytics from './Analytics';

const Routes = () => (
    <BrowserRouter>
        <Analytics>
            <Switch>
                <Route exact path={RoutesPath.HOME.PATH} component={HomePage} />
                <Route exact path={RoutesPath.CHAT_SUGGESTIONS.PATH} component={ChatSuggestionspage} />
            </Switch>
        </Analytics>
    </BrowserRouter>
);

export default Routes;

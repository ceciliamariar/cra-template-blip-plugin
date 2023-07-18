import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import RoutesPath from '../../constants/routes-path';

import settings from '../../config';

import logo from '../../assets/images/svg/blip-balloon.svg';
import Header from './components/Header';

const PAGE_ICON = 'plugin';
const BLANK = '_blank';

const Home = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const suggestions  = [
        ' Lorem ipsum lobortis sollicitudin semper eu velit dapibus tempor euismod quis, potenti lorem neque inceptos vivamus suscipit curabitur est. proin est congue sit tellus turpis enim faucibus litora dictum mauris, sapien habitasse mollis dictum aptent est tellus a duis nunc velit, augue sodales aliquam curabitur suspendisse etiam elit fringilla in.',
        'Lorem ipsum litora curae placerat sed quisque donec fames semper etiam mattis, quis dui nisi non lectus convallis class purus posuere bibendum placerat suscipit, enim volutpat sagittis mi metus accumsan mattis quisque placerat neque. tempor blandit himenaeos pharetra, cras pulvinar.',
        'Lorem ipsum potenti eget potenti eleifend vel leo, porttitor adipiscing malesuada tellus fermentum aliquam lectus morbi, vitae ultrices suscipit nisi nunc varius. velit accumsan eu platea quisque suspendisse fringilla cras nullam orci curae, auctor metus tempor sit aenean massa sed torquent interdum, mattis ornare sociosqu cursus adipiscing ante neque turpis iaculis. augue varius aenean tristique blandit habitasse lectus sit varius lacinia, egestas ad morbi pellentesque per tellus morbi vulputate, nunc morbi posuere praesent pellentesque justo massa vivamus. lobortis curabitur libero himenaeos tincidunt lacinia diam vestibulum sem lectus pulvinar aliquet phasellus, vel posuere varius nisi mi aenean suscipit nisi aliquam eu.'
    ];

    const handleNavigation = useCallback(
        (path, params = {}) => {
            history.push(path, params);
        },
        [history]
    );

    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <Header
                title={t('title.homePage')}
                icon={PAGE_ICON}
                onClick={() => window.open(settings.repositoryUrl, BLANK)}
            />
            <div className="flex flex-column items-center justify-center bp-c-neutral-dark-city f5 h-100 mt4">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="tc">
                    {t('paragraph.homeDescription.part1')}
                    <br />
                    <Trans i18nKey="paragraph.homeDescription.part2">
                        Edit <code>src/pages/Home.js</code> and save to reload.
                    </Trans>
                </p>
                <p className="tc"> COPILOT</p>
                <h5 className="f5 b mt3 mb2">{t('title.homePage')}</h5>
                <span
                    className="f6 flex items-center blue no-underline underline-hover mt1 pointer"
                    data-testid="exemple-two"
                    aria-hidden="true"
                    onClick={() =>
                        handleNavigation(RoutesPath.CHAT_SUGGESTIONS.PATH, {
                            suggestionsState: suggestions
                        })
                    }
                >
                    <bds-icon name="file-txt-1" size="xxx-large" />
                    {t('link.chatSuggestions')}
                </span>           
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;

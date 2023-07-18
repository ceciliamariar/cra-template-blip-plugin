import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChatSuggestions = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const [suggestions, setSuggestions] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const showOrHideSuggestions = () => setShowSuggestions(!showSuggestions);
    const [loading, setLoading] = useState(true);
    const showOrHideLoading = () => setLoading(!loading);
    const [hasFailedToLoadSuggestions, setFailed] = useState(true);
    const showOrHideFailedToLoadSuggestions = () => 
        setFailed(!hasFailedToLoadSuggestions);

    function teste () {
        console.log('Teste 1');
    };
    useEffect(() => {
        if (!!state) {
            const { suggestionsState } = state;
            if (!!suggestionsState) {
                setSuggestions(suggestionsState);
            }
        }
    }, [state]);

    return (
        <div className="hide-small hide-medium">
            <bds-button
                variant="secondary"
                icon="message-talk"
                size="short"
                onClick={teste}
            >
                {t('chatSuggestions.suggestedAnswer.button')}
            </bds-button>
            <bds-paper elevation="static" className="suggestions-dialog" />
            {/* {showSuggestions ? (
                <div className="overlay" onClick={showOrHideSuggestions} />
            ) : null} */}
            {showSuggestions ? (
                <bds-paper
                    elevation="static"
                    className="suggestions-dialog"
                    // data-testid="suggestions-dialog"
                >
                    <div className="h-100 w-100">
                        <div className="suggestions-heading">
                            <bds-typo
                                tag="h3"
                                variant="fs-20"
                                bold="semi-bold"
                                margin="false"
                                className="flex-grow-1"
                            >
                                {t('chatSuggestions.suggestedAnswer.title')}
                            </bds-typo>
                            <bds-button
                                variant="secondary"
                                icon="close"
                                size="short"
                                className="color-content-default"
                                onClick={showOrHideSuggestions}
                            />
                        </div>
                        <div className="suggestions-container">
                            {loading ? (
                                <bds-loading-spinner
                                    size="standard"
                                    color="main"
                                    className="h-100 w-100 center"
                                    onClick={showOrHideLoading}
                                />
                            ) : null}
                            {hasFailedToLoadSuggestions ? (
                                <div className="error-message-container">
                                    <bds-icon
                                        name="attention"
                                        theme="outline"
                                        size="x-large"
                                    />
                                    <bds-typo
                                        tag="h4"
                                        variant="fs-16"
                                        bold="regular"
                                        margin="false"
                                    >
                                        {t('chatSuggestions.error.title')}
                                    </bds-typo>
                                    <bds-button
                                        data-testid="error-button"
                                        variant="ghost"
                                        onClick={
                                            showOrHideFailedToLoadSuggestions
                                        }
                                    >
                                        {t('chatSuggestions.error.button')}
                                    </bds-button>
                                </div>
                            ) : null}
                            {!hasFailedToLoadSuggestions && !!suggestions ? (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion) => (
                                        <li
                                            className="suggestions-item pointer"
                                        >
                                            <bds-typo
                                                onClick={() => alert(suggestion) }
                                                tag="p"
                                                variant="fs-14"
                                                bold="regular"
                                                margin="false"
                                            >
                                                {suggestion}
                                            </bds-typo>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
                </bds-paper>
            ) : null}
        </div>
    );
};

export default ChatSuggestions;

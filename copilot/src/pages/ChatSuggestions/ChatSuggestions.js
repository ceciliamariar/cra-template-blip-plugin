import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChatSuggestions = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasSuggestionsLoaded, setHasSuggestionsLoaded] = useState(false);
    const [hasFailedToLoadSuggestions, setHasFailedToLoadSuggestions] =
        useState(false);

    useEffect(() => {
        if (!!state) {
            const { suggestionsState } = state;
            if (!!suggestionsState) {
                setSuggestions(suggestionsState);
                console.log(suggestionsState);
                console.log(suggestions);
            }
        }
    }, [state]);

    useEffect(() => {
        console.log(`useEffect loading ${loading}`);
    }, [loading]);

    const toggleSuggestionsDialog = () => {
        setShowSuggestions(true);
        console.log(
            `toggleSuggestionsDialog hasSuggestionsLoaded ${hasSuggestionsLoaded}`
        );
        if (!hasSuggestionsLoaded) {
            console.log('Linha 19');
            loadSuggestions();
        }
    };

    const loadSuggestions = async () => {
        setLoading(true);
        console.log(`toggleSuggestionsDialog loading ${loading}`);
        try {
            // suggestions = SuggestionsService.getSuggestions(
            //     ticketId,
            //     ticket.ownerIdentity
            // );
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    console.log('SuggestionsService.getSuggestions!!');
                    resolve();
                }, 5000);
            });
            await promise;

            setHasFailedToLoadSuggestions(false);
        } catch (e) {
            setHasFailedToLoadSuggestions(true);
        } finally {
            setLoading(false);
            setHasSuggestionsLoaded(true);
            console.log(`loadSuggestions showSuggestions ${showSuggestions}`);
            console.log(`loadSuggestions loading ${loading}`);
            console.log(
                `loadSuggestions hasSuggestionsLoaded ${hasSuggestionsLoaded}`
            );
        }
    };
    function selectSuggestion(suggestion) {
        setShowSuggestions(false);
        // this.$emit('onSelectSuggestion', { suggestion })
        // SegmentService.createTicketTrack(
        //   SegmentService.events.CHAT_AI_SUGGESTION_SELECT,
        //   this.ticket,
        //   {
        //     'ticketId': this.ticketId,
        //     'text-suggestions': this.suggestions,
        //     'text-selected': suggestion,
        //     'agentIdentity': decodeURIComponent(this.ticket.agentIdentity.split('@')[0])
        //   }
        // )
        alert(`Opção escolhida: \n ${suggestion.id} - ${suggestion.suggestion}`);
    }

    function close() {
        setShowSuggestions(false);
        console.log('Close');
    }

    return (
        <div className="hide-small hide-medium">
            <bds-button
                variant="secondary"
                icon="message-talk"
                size="short"
                onClick={() => toggleSuggestionsDialog()}
            >
                {t('chatSuggestions.suggestedAnswer.button')} -{' '}
                {showSuggestions}
            </bds-button>
            <bds-paper elevation="static" className="suggestions-dialog" />
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
                                onClick={close}
                            />
                        </div>
                        <div className="suggestions-container">
                            {loading ? (
                                <bds-loading-spinner
                                    size="standard"
                                    color="main"
                                    className="h-100 w-100 center"
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
                                        onClick={loadSuggestions}
                                    >
                                        {t('chatSuggestions.error.button')}
                                    </bds-button>
                                </div>
                            ) : null}
                            {!loading &&
                            !hasFailedToLoadSuggestions &&
                            suggestions ? (
                                    <ul className="suggestions-list">
                                        {suggestions.map((suggestion) => (
                                            <li className="suggestions-item pointer" key={`suggestions-item-${suggestion.id}`} >
                                                <bds-typo
                                                    tag="p"
                                                    variant="fs-14"
                                                    bold="regular"
                                                    margin="false"
                                                    onClick={selectSuggestion(suggestion)}
                                                >
                                                    {suggestion.id} - {suggestion.suggestion}
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

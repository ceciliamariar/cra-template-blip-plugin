import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChatSuggestions = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    let showSuggestions = false;
    let suggestions = [];
    let loading = false;
    let hasSuggestionsLoaded = false;
    let hasFailedToLoadSuggestions = false;

    function toggleSuggestionsDialog() {
        showSuggestions = true;
        if (!hasSuggestionsLoaded) {
            console.log('Linha 19');
            loadSuggestions();
        }
        console.log(
            `toggleSuggestionsDialog showSuggestions ${showSuggestions}`
        );
    }
    function loadSuggestions() {
        loading = true;
        try {
            // suggestions = SuggestionsService.getSuggestions(
            //     ticketId,
            //     ticket.ownerIdentity
            // );
            setTimeout(
                console.log('SuggestionsService.getSuggestions!!'),
                5000000000000
            );
            hasFailedToLoadSuggestions = false;
        } catch (e) {
            hasFailedToLoadSuggestions = true;
        } finally {
            loading = false;
            hasSuggestionsLoaded = true;
            console.log(
                `toggleSuggestionsDialog showSuggestions ${showSuggestions}`
            );
            console.log(`toggleSuggestionsDialog loading ${loading}`);
            console.log(
                `toggleSuggestionsDialog hasSuggestionsLoaded ${hasSuggestionsLoaded}`
            );
        }
    }
    function selectSuggestion(suggestion) {
        showSuggestions = false;
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
        alert(`Opção escolhida: \n ${suggestion}`);
    }

    function close() {
        showSuggestions = false;
        console.log('Close');
    }

    useEffect(() => {
        if (!!state) {
            const { suggestionsState } = state;
            if (!!suggestionsState) {
                suggestions = suggestionsState;
            }
        }
        showSuggestions = false;
        suggestions = [];
        loading = false;
        hasSuggestionsLoaded = false;
        hasFailedToLoadSuggestions = false;
    }, [state]);

    return (
        <div className="hide-small hide-medium">
            <bds-button
                variant="secondary"
                icon="message-talk"
                size="short"
                onClick={toggleSuggestionsDialog}
            >
                {t('chatSuggestions.suggestedAnswer.button')}
            </bds-button>
            <bds-paper elevation="static" className="suggestions-dialog" />
            {showSuggestions ? (
                <div className="overlay"/>
            ) : (
                <p> {showSuggestions}</p>
            )}
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
                            ) : (
                                <p> {loading}</p>
                            )}
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
                            ) : (
                                <p> {hasFailedToLoadSuggestions}</p>
                            )}
                            {!hasFailedToLoadSuggestions && !!suggestions ? (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion) => (
                                        <li className="suggestions-item pointer">
                                            <bds-typo
                                                onClick={selectSuggestion(
                                                    suggestion
                                                )}
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
                            ) : (
                                <p>
                                    {' '}
                                    {!hasFailedToLoadSuggestions &&
                                        !!suggestions}
                                </p>
                            )}
                        </div>
                    </div>
                </bds-paper>
            ) : (
                <p> {showSuggestions}</p>
            )}
        </div>
    );
};

export default ChatSuggestions;

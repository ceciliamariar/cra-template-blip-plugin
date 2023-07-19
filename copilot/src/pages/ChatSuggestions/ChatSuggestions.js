import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/app.scss';

const ChatSuggestions = (props) => {
    const { ticketId } = props;
    const { suggestions } = props;
    const { lastMessage } = props;
    const { t } = useTranslation();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasSuggestionsLoaded, setHasSuggestionsLoaded] = useState(false);
    const [hasFailedToLoadSuggestions, setHasFailedToLoadSuggestions] =
        useState(false);

    useEffect(() => {
        console.log(`useEffect loading ${loading}`);
    }, [loading]);

    const toggleSuggestionsDialog = () => {
        setShowSuggestions(true);
        console.log(suggestions);
        if (!hasSuggestionsLoaded) {
            loadSuggestions();
        }
    };

    const loadSuggestions = async () => {
        setLoading(true);
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
        console.log(suggestion);
    }

    function close() {
        setShowSuggestions(false);
        setHasSuggestionsLoaded(false);
        console.log('Close');
    }

    return (
        <div className="hide-small hide-medium">
            {/* {showSuggestions ? (
                <div> <div className="overlay" onClick={close} onKeyDown={close}/> </div>
            ) : null} */}
            {showSuggestions ? (
                <bds-paper elevation="static" className="suggestions-dialog">
                    <div className="h-100 w-100">
                        <div className="suggestions-heading">
                            <bds-typo
                                tag="h3"
                                variant="fs-20"
                                bold="semi-bold"
                                margin="false"
                                className="flex-grow-1"
                            >
                                {t('chatSuggestions.suggestedAnswer.title')} - {ticketId} - {lastMessage}
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
                            {!loading && !hasFailedToLoadSuggestions && suggestions ? (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion) => (
                                        <li className="suggestions-item pointer">
                                            <bds-typo
                                                key={`suggestions-item-${suggestion.id}`}
                                                onClick={selectSuggestion(suggestion)}
                                                tag="p"
                                                variant="fs-14"
                                                bold="regular"
                                                margin="false"                                                
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
            <bds-button
                variant="secondary"
                icon="message-talk"
                size="short"
                onClick={() => toggleSuggestionsDialog()}
            >
                {t('chatSuggestions.suggestedAnswer.button')}
            </bds-button>
        </div>
    );
};

ChatSuggestions.propTypes = {
    ticketId: PropTypes.string,
    lastMessage: PropTypes.string,
    suggestions: PropTypes.array
};

export default ChatSuggestions;

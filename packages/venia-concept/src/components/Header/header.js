import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

// import Logo from '../Logo';
// import AccountTrigger from './accountTrigger';
// import CartTrigger from './cartTrigger';
// import NavTrigger from './navTrigger';
// import SearchTrigger from './searchTrigger';
// import OnlineIndicator from './onlineIndicator';
// import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
// import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

// import { useStyle } from '../../classify';
// import defaultClasses from './header.module.css';
// import StoreSwitcher from './storeSwitcher';
// import CurrencySwitcher from './currencySwitcher';
// import MegaMenu from '../MegaMenu';
// import PageLoadingIndicator from '../PageLoadingIndicator';
// import { useIntl } from 'react-intl';


// added: 

import Logo from '@magento/venia-ui/lib/components/Logo';
// import AccountTrigger from '@magento/venia-ui/lib/components/Header/accountTrigger.js';
import AccountTrigger from '../Header/accountTrigger.js';
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger.js';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger.js';
import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger.js';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator.js';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify.js';
import defaultClasses from '@magento/venia-ui/lib/components/Header/header.module.css';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher.js';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher.js';
import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';
import { useIntl } from 'react-intl';


// const SearchBar = React.lazy(() => import('../SearchBar'));
const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div>
            <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>

                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>

                    <MegaMenu />
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
                <PageLoadingIndicator absolute />
            </header>
            <OnlineIndicator
                hasBeenOffline={hasBeenOffline}
                isOnline={isOnline}
            />
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;

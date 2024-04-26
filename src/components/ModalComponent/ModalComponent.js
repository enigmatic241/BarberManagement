import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import React, { Component } from 'react'
import { IconButton } from '@material-ui/core'
import ModalCard from '../ModalCard/ModalCard'

import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        zIndex: 1300,

    },
    contents: {
        outline: 'none',
        overflow: 'hidden',
        margin: 'auto',
        backgroundColor: 'white',
    },
    card: {
        width: 600,
        maxHeight: `calc(100vh - ${theme.appBarHeight + 2 * theme.pad?.lg}px)`,
        maxWidth: `calc(100vw - ${2 * theme.pad?.sm}px)`,
        margin: '6px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            borderRadius: 0,
            height: `calc(100vh - ${theme.appBarHeight}px)`,
            width: '100vw',
            maxWidth: 'unset',
            maxHeight: 'unset',
        },
    },
    contentRoot: {
        display: 'block',
    },
    contentWrapper: {
        maxHeight: 600,

    },
})

class ModalComponent extends Component {

    render() {
        const {
            classes,
            children,
            open,
            onClose,
            className,
            modalProps = {},
            disableBackdropClick,
            right,
            left,
            title,
            noCloseInRight,
            allowEventPropogation = true,
            disableEnforceFocus = true,
            id,
            ...rest
        } = this.props,
            {
                className: modalClassName,
                onClick: modalOnClick,
                ...restOfModalProps
            } = modalProps

        const closeIcon = !noCloseInRight ? (
            <IconButton onClick={onClose} id={id ? id + '_close' : null}>
                <CloseIcon />
            </IconButton>
        ) : null

        return (
            <Modal
                open={open}
                onClose={onClose}
                className={cx(classes.root, modalClassName)}
                disableBackdropClick={disableBackdropClick}
                disableEnforceFocus={disableEnforceFocus}
                onClick={e => {
                    if (!allowEventPropogation) e.stopPropagation()
                    if (modalOnClick) modalOnClick(e)
                }}
                {...restOfModalProps}
            >
                <div className={classes.contents}>
                    <ModalCard
                        variant={'raised'}
                        className={cx(classes.card, className)}
                        classes={{
                            contentWrapper: classes.contentWrapper,
                        }}
                        scrollable
                        {...rest}
                        right={right ? right : closeIcon}
                        left={left ? left : null}
                        title={title ? title : null}
                        id={id ? id + '_card' : null}
                    >
                        {children}
                    </ModalCard>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalComponent)